import Head from "next/head";
import React from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>MultiPosting</title>
      </Head>
      <main>
        <h1>한번에 포스팅</h1>
        <Button variant="contained">
          <Link href="./blogsmanagement">블로그 관리</Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link href="./multiposting">포스팅 하기</Link>
        </Button>
      </main>
      <footer></footer>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
