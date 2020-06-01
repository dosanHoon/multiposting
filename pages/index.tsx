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
          <Link href="./blogsmanagement">
            <a>블로그 관리</a>
          </Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link href="./multiposting">
            <a>포스팅 하기</a>
          </Link>
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
