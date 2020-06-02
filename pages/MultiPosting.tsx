import Head from "next/head";
import dynamic from "next/dynamic";
import { Button } from "@material-ui/core";
import React from "react";
import { parse } from "markdown";
import axios from "axios";
import Input from "../components/Input";

const MdEditorWithNoSSR = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
export default function MultiPosting() {
  const [markdownText, setMarkdownText] = React.useState("");
  const [htmlText, setHtmlText] = React.useState("");
  const [title, setTitle] = React.useState("");

  function _setMarkdownText({ html, text }) {
    setMarkdownText(text);
    setHtmlText(html);
    console.log("handleEditorChange", html, text);
  }

  const uploadPosting = () => {
    axios
      .post("http://localhost:3000/api/makepost", {
        title,
        postdata: htmlText,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Head>
        <title>MultiPosting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title neumo">한번에 포스팅</h1>
        <Input value={title} onChange={setTitle} />
        <div className="wrap">
          <div className="box">
            <MdEditorWithNoSSR
              value={markdownText}
              style={{ height: "500px" }}
              renderHTML={(text) => parse(text)}
              onChange={_setMarkdownText}
            />
          </div>
        </div>
        <Button variant="contained" color="secondary">
          <a onClick={uploadPosting}>포스팅 하기</a>
        </Button>
      </main>

      <footer></footer>
    </div>
  );
}
