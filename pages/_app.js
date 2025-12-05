"use client";

import "@/styles/globals.css";
import Layout from "@/components/layout";
import RouteGuard from "@/components/RouteGuard";
import { SWRConfig } from "swr";
import { getToken } from "@/lib/authenticate";

export default function App({ Component, pageProps }) {
  
  // 🔥 Public fetcher: OpenLibrary (no JWT)
  const publicFetcher = (url) => fetch(url).then((res) => res.json());

  // 🔥 Authenticated fetcher: User API (NEEDS JWT)
  const authFetcher = (url) =>
    fetch(url, {
      headers: { Authorization: `JWT ${getToken()}` },
    }).then((res) => res.json());

  return (
    <SWRConfig
      value={{
        fetcher: publicFetcher, // default
        revalidateOnFocus: false,
      }}
    >
      <RouteGuard>
        <Layout>
          <Component {...pageProps} authFetcher={authFetcher} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}

