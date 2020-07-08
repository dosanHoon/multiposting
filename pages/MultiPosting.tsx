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
import SelectBlogModal from "../src/components/Blogs/SelectBlogModal";
import { MobXProviderContext } from "mobx-react";
import MarkdownIt from "markdown-it";

const MdEditorWithNoSSR = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

function onImageUpload(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (data) => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function MultiPosting() {
  const { BlogStore } = React.useContext(MobXProviderContext);

  const [htmlText, setHtmlText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  function _setMarkdownText({ html, text }) {
    setHtmlText(html);
    console.log("handleEditorChange", html, text);
  }

  const uploadPosting = React.useCallback(() => {
    if (BlogStore.selectedBlogList.length) {
      axios
        .post("http://localhost:3000/api/makepost", {
          blogList: BlogStore.selectedBlogList,
          title,
          postdata: htmlText,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [BlogStore.selectedBlogList, title, htmlText]);
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
      /*
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
      }
      return '' // use external default escaping
      */
    },
  });
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
              onImageUpload={onImageUpload}
              value={""}
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={_setMarkdownText}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={3}>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              <a>포스팅 하기</a>
            </Button>
          </Grid>
          <SelectBlogModal
            handleClose={handleClose}
            open={open}
            uploadPosting={uploadPosting}
          />
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
