import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function GlobalLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (
      router.pathname != "/register" &&
      router.pathname != "/login" &&
      router.pathname != "/forget-password" &&
      router.pathname != "/forget-password-success" &&
      !router.pathname.startsWith("/id")
    ) {
      if (
        !localStorage.getItem("GZIToken") ||
        localStorage.getItem("GZIToken") == null
      ) {
        router.push("/login");
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title> HibritCard - HibritMedya </title>{" "}
        <meta name="description" content="Hibirt Card - HibritMedia" />
        <link rel="icon" href="/hibri.jpg" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>{" "}
      <div> {children} </div>{" "}
    </>
  );
}

export default GlobalLayout;
