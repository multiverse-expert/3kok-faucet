import "../styles/globals.css";
import ConfigContext from "../contexts/config";

function MyApp({ Component, pageProps }) {
  return (
    <ConfigContext>
      <Component {...pageProps} />
    </ConfigContext>
  );
}

export default MyApp;
