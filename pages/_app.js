import GlobalLayout from "../layouts/global-layout";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../stores/";
import jwtDecode from "jwt-decode"; //jwt time install

import Head from "next/head";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



if (typeof window !== "undefined") {
  console.log("You are on the browser");

  const newTokenLocal = localStorage.GZIToken;
  //console.log("datafromthere: ", localStorage.GZIToken)

  if (newTokenLocal) {
    const decodedToken = jwtDecode(newTokenLocal);
    //   console.log("veriler:", decodedToken)
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("GZIToken");

      delete axios.defaults.headers.common["Authorization"];
      window.location.href = "/login";
      //router.push("/login");
    } else {
      // console.log("süre:", decodedToken.exp * 1000)
      // console.log("authenticated is true")
    }
  }
} else {
  console.log("You are on the server");
  // 👉️ can't use localStorage
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale = 1.0,"
        />
        <title> aaa </title>{" "}
      </Head>{" "}
      <GlobalLayout>
        <Provider store={store}>
          <Component {...pageProps} />{" "}
        </Provider>{" "}
        <ToastContainer />
      </GlobalLayout>
    </>
  );
}

export default MyApp;
