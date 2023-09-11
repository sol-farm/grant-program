import { ReactNode } from 'react'
import { ActivityProvider } from './ActivityProvider'
import { EligibilityProvider } from './EligibilityProvider'
import { SignatureProvider } from './SignatureProvider'

export enum Ecosystem {
  SOLANA = 'Solana',
  EVM = 'Evm',
  APTOS = 'Aptos',
  SUI = 'Sui',
  INJECTIVE = 'Injective',
  OSMOSIS = 'Osmosis',
  NEUTRON = 'Neutron',
  DISCORD = 'Pyth Discord',
}

// We will store data by using wallets' addresses as index
// The main assumption here is data won't change for a given wallet address
export type ProviderProps = {
  children: ReactNode
}
export function EcosystemProviders({ children }: ProviderProps) {
  return (
    <ActivityProvider>
      <EligibilityProvider>
        <SignatureProvider>{children}</SignatureProvider>
      </EligibilityProvider>
    </ActivityProvider>
  )
}