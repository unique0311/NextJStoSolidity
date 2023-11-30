import { FC, ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { PageStaticProps } from "@/types/page";

import "@/assets/css/index.scss";

import MainLayout from "@/layouts/MainLayout";

import { WalletProvider } from "@/hooks/walletConnect";

export const metadata = {
  title: "Next.js",
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function getDefaultLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
}
const MyApp: FC<Omit<AppPropsWithLayout, "pageProps"> & { pageProps: PageStaticProps }> = ({
  Component,
  pageProps,
  router,
}) => {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  return (
    <WalletProvider>
      {getLayout(
        <Component
          {...(pageProps as any)}
          router={router}
        />
      )}
    </WalletProvider>
  );
};

export default MyApp;
