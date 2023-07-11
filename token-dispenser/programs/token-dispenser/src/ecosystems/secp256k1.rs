use {
    super::cosmos::CosmosPubkey,
    crate::ErrorCode,
    anchor_lang::{
        prelude::*,
        solana_program::{
            hash,
            instruction::Instruction,
            secp256k1_program::ID as SECP256K1_ID,
            secp256k1_recover::secp256k1_recover,
        },
        AnchorDeserialize,
        AnchorSerialize,
    },
};

pub const SECP256K1_FULL_PREFIX: u8 = 0x04;
pub const SECP256K1_ODD_PREFIX: u8 = 0x03;
pub const SECP256K1_EVEN_PREFIX: u8 = 0x02;
pub const SECP256K1_COMPRESSED_PUBKEY_LENGTH: usize = 33;

#[derive(AnchorDeserialize, AnchorSerialize, Clone, Copy, PartialEq)]
pub struct EvmPubkey(pub [u8; Self::LEN]);
impl EvmPubkey {
    pub const LEN: usize = 20;
}

#[derive(AnchorDeserialize, AnchorSerialize, Clone)]
pub struct Secp256k1Signature(pub [u8; Secp256k1Signature::LEN]);
impl Secp256k1Signature {
    pub const LEN: usize = 64;
}


#[derive(AnchorDeserialize, AnchorSerialize, Clone, PartialEq, Eq, Debug)]
pub struct Secp256k1InstructionHeader {
    pub num_signatures:                u8,
    pub signature_offset:              u16,
    pub signature_instruction_index:   u8,
    pub eth_address_offset:            u16,
    pub eth_address_instruction_index: u8,
    pub message_data_offset:           u16,
    pub message_data_size:             u16,
    pub message_instruction_index:     u8,
}

impl Secp256k1InstructionHeader {
    pub const LEN: u16 = 1 + 2 + 1 + 2 + 1 + 2 + 2 + 1;
}

/** The layout of a Secp256k1 signature verification instruction on Solana */
pub struct Secp256k1InstructionData {
    pub header:      Secp256k1InstructionHeader,
    pub signature:   Secp256k1Signature,
    pub recovery_id: u8,
    pub eth_address: EvmPubkey,
    pub message:     Vec<u8>,
}

impl Secp256k1InstructionHeader {
    pub fn expected_header(message_length: u16, instruction_index: u8) -> Self {
        Secp256k1InstructionHeader {
            num_signatures:                1,
            signature_offset:              Secp256k1InstructionHeader::LEN,
            signature_instruction_index:   instruction_index,
            eth_address_offset:            Secp256k1InstructionHeader::LEN
                + Secp256k1Signature::LEN as u16
                + 1,
            eth_address_instruction_index: instruction_index,
            message_data_offset:           Secp256k1InstructionHeader::LEN
                + Secp256k1Signature::LEN as u16
                + 1
                + EvmPubkey::LEN as u16,
            message_data_size:             message_length,
            message_instruction_index:     instruction_index,
        }
    }
}

impl Secp256k1InstructionData {
    pub fn from_instruction_and_check_signer(
        instruction: &Instruction,
        pubkey: &EvmPubkey,
    ) -> Result<Self> {
        if instruction.program_id != SECP256K1_ID {
            return Err(ErrorCode::SignatureVerificationWrongProgram.into());
        }

        if !instruction.accounts.is_empty() {
            return Err(ErrorCode::SignatureVerificationWrongAccounts.into());
        }

        let result = Self::try_from_slice(&instruction.data)?;
        if result.header
            != Secp256k1InstructionHeader::expected_header(
                result.header.message_data_size,
                result.header.message_instruction_index,
            )
        {
            return Err(ErrorCode::SignatureVerificationWrongHeader.into());
        }

        if result.eth_address != *pubkey {
            return Err(ErrorCode::SignatureVerificationWrongSigner.into());
        }

        Ok(result)
    }
}
impl AnchorDeserialize for Secp256k1InstructionData {
    fn deserialize(
        buf: &mut &[u8],
    ) -> std::result::Result<Secp256k1InstructionData, std::io::Error> {
        let header = Secp256k1InstructionHeader::deserialize(buf)?;
        let signature = Secp256k1Signature::deserialize(buf)?;
        let recovery_id = u8::deserialize(buf)?;
        let eth_address = EvmPubkey::deserialize(buf)?;

        let mut message: Vec<u8> = vec![];
        message.extend_from_slice(&buf[..header.message_data_size as usize]);
        *buf = &buf[header.message_data_size as usize..];
        Ok(Secp256k1InstructionData {
            header,
            eth_address,
            signature,
            recovery_id,
            message,
        })
    }
}

impl AnchorSerialize for Secp256k1InstructionData {
    fn serialize<W: std::io::Write>(
        &self,
        writer: &mut W,
    ) -> std::result::Result<(), std::io::Error> {
        self.header.serialize(writer)?;
        self.signature.serialize(writer)?;
        self.recovery_id.serialize(writer)?;
        self.eth_address.serialize(writer)?;

        writer.write_all(&self.message)?;
        Ok(())
    }
}

/** Cosmos uses a different signing algorith than Evm for signing
 * messages. Instead of using Keccak256, Cosmos uses SHA256. This prevents
 * us from using the Secp256k1 instruction struct for Cosmos.
 */
pub fn secp256k1_sha256_verify_signer(
    signature: &Secp256k1Signature,
    recovery_id: &u8,
    pubkey: &CosmosPubkey,
    message: &Vec<u8>,
) -> Result<()> {
    let recovered_key = secp256k1_recover(
        &hash::hashv(&[message]).to_bytes(),
        *recovery_id,
        &signature.0,
    )
    .map_err(|_| ErrorCode::SignatureVerificationWrongSigner)?;
    if !(recovered_key.0 == pubkey.0[1..] && pubkey.0[0] == SECP256K1_FULL_PREFIX) {
        return Err(ErrorCode::SignatureVerificationWrongSigner.into());
    }
    Ok(())
}