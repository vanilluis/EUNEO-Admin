import "../styles/global.scss";
import type { AppProps } from "next/app";
import { UIProvider } from "../context/UIContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  );
}

export default MyApp;
