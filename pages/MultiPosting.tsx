import Head from "next/head";
import React from "react";
// import ClipboardJS from "clipboard";
import { parse } from "markdown";
import axios from "axios";
import Input from "../components/Input";

export default function MultiPosting() {
  const [markdownText, setMarkdownText] = React.useState("");
  const [title, setTitle] = React.useState("");

  const _setMarkdownText = (e) => {
    setMarkdownText(e.target.value);
  };

  const markToHtml = parse(markdownText);

  const uploadPosting = () => {
    axios
      .post("http://localhost:3000/api/makepost", {
        title,
        postdata: markToHtml,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

//   React.useEffect(() => {
//     var clipboard = new ClipboardJS(".btn");
//     return clipboard.destroy;
//   }, []);

  return (
    <div className="container">
      <Head>
        <title>MultiPosting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title neumo">한번에 포스팅</h1>
        <Input value={title} onChange={setTitle} className="neumo" />
        <div className="wrap">
          <div className="box">
            <textarea
              value={markdownText}
              onChange={_setMarkdownText}
              className="neumo"
            />
          </div>
          <div className="box">
            <div
              className="preview neumo"
              dangerouslySetInnerHTML={{ __html: markToHtml }}
            ></div>
          </div>
        </div>
        <a
          className="btn neumo"
          data-clipboard-text={markToHtml}
          onClick={uploadPosting}
        >
          포스팅 하기
        </a>
      </main>

      <footer></footer>

      <style jsx>{`
        .neumo {
          border-radius: 30px;
          background: linear-gradient(225deg, #ffffff, #e6e6e6);
          box-shadow: -21px 21px 42px #ededed, 21px -21px 42px #ffffff;
        }
        .btn {
          padding: 10px 15px;
          maring: 10px;
        }
        .preview {
          min-height: 500px;
          height: 100%;
        }
        .wrap {
          display: flex;
          width: 100%;
        }
        .box {
          flex: 1;
          padding: 10px;
        }
        .box textarea {
          width: 100%;
          height: 100%;
          min-height: 500px;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
