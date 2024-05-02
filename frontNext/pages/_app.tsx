import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  base,
  baseGoerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Head from 'next/head'


const customChain = {
  id: 690,
  name: 'Redstone',
  network: 'Redstone',
  nativeCurrency: {
    decimals: 18,
    name: 'Custom Token',
    symbol: 'CT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.redstonechain.com'],
    },
    public: {
      http: ['https://rpc.redstonechain.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Block explorer', url: 'https://explorer.redstone.xyz' },
  },
  testnet: false,
} as const;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [customChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'r1337',
  projectId: '8c038d5f393301be234998ee77eab910',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Head>
          <title>R1337</title>
          <meta property='og:title' content='R1337 - Are you 1337?' />
          <meta
            property='og:description'
            content='R1337 is a fully onchain number game for AW/FOCG users.'
          />
          <meta property='og:image' content='/ogp.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='apple-touch-icon' sizes='200x200' href='/apple-touch-icon.png' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='R1337 - Are you 1337?' />
          <meta
            name='twitter:description'
            content='R1337 is a fully onchain number game for AW/FOCG users.'
          />
          <meta
            name='twitter:image'
            content='https://r1337.vercel.app/ogp.png'
          />
        </Head>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
