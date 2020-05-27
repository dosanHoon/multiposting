import Head from "next/head";
import React from "react";
import ClipboardJS from "clipboard";
import { parse } from "markdown";

export default function Home() {
  const [markdownText, setMarkdownText] = React.useState("");

  const _setMarkdownText = (e) => {
    setMarkdownText(e.target.value);
  };

  const markToHtml = parse(markdownText);

  React.useEffect(() => {
    var clipboard = new ClipboardJS(".btn");
    return clipboard.destroy;
  }, []);

  return (
    <div className="container">
      <Head>
        <title>MultiPosting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">한번에 포스팅</h1>
        <div className="wrap">
          <div className="box">
            <textarea value={markdownText} onChange={_setMarkdownText} />
          </div>
          <div className="box">
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: markToHtml }}
            ></div>
          </div>
        </div>
        <a className="btn" data-clipboard-text={markToHtml} href="http://blog.naver.com/hangru1106?Redirect=Write" target="_blank">
          네이버 블로그 열기
        </a>
        <button className="btn" data-clipboard-text={markToHtml}>
          Copy to clipboard
        </button>
      </main>

      <footer></footer>

      <style jsx>{`
        .preview {
          border: 1px solid black;
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
          width: 100%;
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
          border-top: 1px solid #eaeaea;
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

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
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

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
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
