import React, { useMemo } from 'react'
import Arrow from '../../images/arrow.inline.svg'
import Coin from '../../images/coin.inline.svg'

import TooltipIcon from '../../images/tooltip.inline.svg'
import Verified from '../../images/verified.inline.svg'
import NotEligible from '../../images/not.inline.svg'
import Discord from '../../images/discord.inline.svg'
import Signed from '../../images/signed.inline.svg'
import Tooltip from '@components/Tooltip'

import { AptosWalletButton } from '@components/wallets/Aptos'
import { SuiWalletButton } from '@components/wallets/Sui'
import { EVMWalletButton } from '@components/wallets/EVM'
import { CosmosWalletButton } from '@components/wallets/Cosmos'
import { SolanaWalletButton } from '@components/wallets/Solana'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const Eligibility2 = ({
  onBack,
  onProceed,
}: {
  onBack: Function
  onProceed: Function
}) => {
  return (
    <div className=" overflow-auto border border-light-35 bg-dark">
      <div className="min-w-[650px]">
        <div className="flex items-center justify-between border-b border-light-35 bg-[#242339] py-8 px-10">
          <h4 className="   font-header text-[28px] font-light leading-[1.2]">
            Verify Eligibility
          </h4>
          <div className="flex gap-4">
            <button
              className="btn before:btn-bg  btn--dark before:bg-dark hover:text-dark hover:before:bg-light"
              onClick={() => onBack()}
            >
              <span className="relative inline-flex items-center whitespace-nowrap">
                <Arrow className="mr-2.5 origin-center rotate-180" />
                back
              </span>
            </button>
            <button
              className="btn before:btn-bg  btn--light  before:bg-light hover:text-light hover:before:bg-dark"
              onClick={() => onProceed()}
            >
              <span className="relative inline-flex items-center gap-2.5  whitespace-nowrap">
                proceed
                <Arrow />
              </span>
            </button>
          </div>
        </div>

        <table className="">
          <tbody>
            <tr className="border-b border-light-35">
              <td className="w-full py-2 pl-10 pr-4">
                <div className="flex items-center justify-between ">
                  <span className="min-w-[150px] font-header text-base18 font-thin">
                    Solana Activity
                  </span>

                  <span className="flex flex-1  items-center justify-between gap-5">
                    <SolanaWalletButton />
                    <button className="btn before:btn-bg btn--dark  before:bg-dark hover:text-dark hover:before:bg-light">
                      <span className="relative inline-flex items-center gap-2.5  whitespace-nowrap">
                        <span className="flex items-center gap-3">
                          Signed... <Signed />
                        </span>
                      </span>
                    </button>
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-darkGray5">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  1000 <Coin />
                </span>
              </td>
            </tr>
            <tr className="border-b border-light-35">
              <td className="w-full py-2 pl-10 pr-4">
                <div className="flex items-center justify-between ">
                  <span className="min-w-[150px] font-header text-base18 font-thin ">
                    EVM Activity
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-5">
                    <EVMWalletButton />

                    <button className="btn before:btn-bg btn--dark  before:bg-dark hover:text-dark hover:before:bg-light">
                      <span className="relative inline-flex items-center gap-2.5  whitespace-nowrap">
                        <span className="flex items-center gap-3">Sign</span>
                      </span>
                    </button>
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  N/A
                </span>
              </td>
            </tr>
            <tr className="disabled border-b border-light-35">
              <td className="w-full py-2 pl-10 pr-4">
                <div className="flex items-center justify-between">
                  <span className="font-header text-base18 font-thin">
                    Aptos Activity
                  </span>
                  <span className="flex items-center gap-5">
                    <AptosWalletButton />
                    <TooltipIcon />
                    <Verified className="opacity-0" />
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  {''}
                </span>
              </td>
            </tr>
            <tr className="disabled border-b border-light-35 ">
              <td className="w-full py-2 pl-10 pr-4">
                <div className="flex items-center justify-between">
                  <span className="font-header text-base18 font-thin">
                    Sui Activity
                  </span>
                  <span className="flex items-center gap-5">
                    <SuiWalletButton />
                    <TooltipIcon />
                    <Verified className="opacity-0" />
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  {''}
                </span>
              </td>
            </tr>
            <tr className="disabled border-b border-light-35 ">
              <td className="w-full py-2 pl-10 pr-4">
                <div className="flex items-center justify-between">
                  <span className="font-header text-base18 font-thin">
                    Injective Activity
                  </span>
                  <span className="flex items-center gap-5">
                    <CosmosWalletButton chainName="injective" />
                    <TooltipIcon />
                    <Verified className="opacity-0" />
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  {''}
                </span>
              </td>
            </tr>
            <tr className="disabled border-b border-light-35 ">
              <td className="w-full py-2 pl-10 pr-4">
                <div className="flex items-center justify-between">
                  <span className="font-header text-base18 font-thin">
                    Osmosis Activity
                  </span>
                  <span className="flex items-center gap-5">
                    <CosmosWalletButton chainName="osmosis" />
                    <TooltipIcon />
                    <Verified className="opacity-0" />
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  {''}
                </span>
              </td>
            </tr>
            <tr className="disabled border-b border-light-35 ">
              <td className="w-full py-2 pl-10 pr-4">
                <div className="flex items-center justify-between">
                  <span className="font-header text-base18 font-thin">
                    Neutron Activity
                  </span>
                  <span className="flex items-center gap-5">
                    <CosmosWalletButton chainName="neutron" />
                    <TooltipIcon />
                    <Verified className="opacity-0" />
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  {''}
                </span>
              </td>
            </tr>
            <tr className="border-b border-light-35 ">
              <td className="w-full py-2 pl-10 pr-4 ">
                <div className="flex items-center justify-between">
                  <span className="font-header text-base18 font-thin">
                    Discord Activity
                  </span>
                  <span className="flex items-center gap-5">
                    <DiscordButton />
                    <TooltipIcon />
                    <Verified className="opacity-0" />
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className="flex items-center justify-center  gap-1 text-[20px]">
                  {''}
                </span>
              </td>
            </tr>
            <tr className="border-b border-light-35 ">
              <td className="w-full bg-darkGray5 py-2 pl-10 pr-4">
                <div className="flex items-center justify-between">
                  <span className="font-header text-base18 font-semibold">
                    Eligible Token Allocation
                  </span>
                </div>
              </td>
              <td className="min-w-[130px] border-l border-light-35 bg-dark-25">
                <span className=" flex min-h-[60px]  items-center justify-center gap-1 text-[20px] font-semibold">
                  1000 <Coin />{' '}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DiscordButton() {
  const { data, status } = useSession()

  const { logo, text } = useMemo(() => {
    if (status === 'authenticated')
      return {
        logo: data.user?.image ? (
          <Image
            src={data.user?.image}
            alt="user image"
            width={20}
            height={20}
          />
        ) : (
          <Discord />
        ),
        text: data.user?.name ?? 'Signed In',
      }

    return {
      logo: <Discord />,
      text: 'Sign In',
    }
  }, [status, data?.user])

  return (
    <button
      className={
        'btn before:btn-bg  btn--dark before:bg-dark hover:text-dark hover:before:bg-light'
      }
      onClick={() => {
        if (status === 'unauthenticated') signIn('discord')
        if (status === 'authenticated') signOut()
      }}
    >
      <span className="relative inline-flex items-center gap-2.5  whitespace-nowrap">
        {logo}
        <span>{text}</span>
      </span>
    </button>
  )
}

export default Eligibility2