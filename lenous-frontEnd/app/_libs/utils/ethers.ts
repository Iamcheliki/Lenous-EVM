'use client';

import { useEffect, useMemo, useState } from 'react';
import { ethers, providers as ethersProviders } from 'ethers';
import type { Client, Chain, Transport, Account } from 'viem';
import { Config, useClient, useConnectorClient } from 'wagmi';
export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback')
    return new ethersProviders.FallbackProvider(
      (transport.transports as ReturnType<Transport>[]).map(
        ({ value }) => new ethersProviders.JsonRpcProvider(value?.url, network)
      )
    );
  return new ethersProviders.JsonRpcProvider(transport.url, network);
}

export function useCustomProvider() {
  const [provider, setProvider] = useState<ethers.providers.Provider | undefined>(undefined);

  useEffect(() => {
    console.log("use custom provider")
    async function connectToProvider() {
      try {
        // Connect to the custom provider using ethers.js
        const customProvider = new ethers.providers.JsonRpcProvider("https://sepolia.base.org", {
          chainId: 84532, // Specify your chain ID
          name: 'Sepolia' // Optional: specify the name of the network
        });

        // Verify the connection by fetching the network details
        const network = await customProvider.getNetwork();
        console.log('Connected to network:', network);

        setProvider(customProvider);
      } catch (error) {
        console.error('Failed to connect to provider:', error);
      }
    }

    connectToProvider();
  }, []);

  return provider;
}

/** Hook to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({
  chainId,
}: { chainId?: number | undefined } = {}) {
  const [provider, setProvider] = useState<any>(undefined);
  console.log(chainId)
  const client = useClient({ chainId });

  console.log("client before hook",client)

  useEffect(() => {
    console.log("client start hook",client)
    if (client) {
      const newProvider = clientToProvider(client);
      setProvider(newProvider);
    } else {
      setProvider(undefined);
    }
  }, [client]); // Re-run this effect whenever `client` changes

  console.log("provider state",provider)

  return provider;
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new ethersProviders.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
