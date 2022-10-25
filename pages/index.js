import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GlobalLayout from "../layouts/global-layout";
import StartPageLayout from "../layouts/start-page-layout";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/select-profile/");
  }, []);

  return <> </>;
}
