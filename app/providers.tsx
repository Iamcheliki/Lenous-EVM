"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { config } from "./_libs/config";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
  const initialState = cookieToInitialState(config, cookie);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider store={store}>{children}</Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
      <ToastContainer position="top-right" autoClose={5000} />
    </WagmiProvider>
  );
}
