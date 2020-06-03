import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Button,
  Grid,
  Container,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import React from "react";
import { parse } from "markdown";
import axios from "axios";
import Link from "next/link";

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
    <Container>
      <Grid container spacing={3}>
        <Head>
          <title>MultiPosting</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid item container xs={12} spacing={3}>
          <Grid item xs={12}>
            <h1>한번에 포스팅</h1>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">title</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="title"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MdEditorWithNoSSR
              value={markdownText}
              style={{ height: "500px" }}
              renderHTML={(text) => parse(text)}
              onChange={_setMarkdownText}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={3}>
          <Grid item>
            <Button variant="contained" color="secondary">
              <a onClick={uploadPosting}>포스팅 하기</a>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="default">
              <Link href="/">
                <a>목록으로</a>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
