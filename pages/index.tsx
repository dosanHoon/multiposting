import Head from "next/head";
import React from "react";
import { Button, Grid, Container } from "@material-ui/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>MultiPosting</title>
      </Head>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <main>
          <h1>한번에 포스팅</h1>
          <Grid item container spacing={3}>
            <Grid item>
              <Button variant="contained">
                <Link href="./blogsmanagement">
                  <a>블로그 관리</a>
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                <Link href="./multiposting">
                  <a>포스팅 하기</a>
                </Link>
              </Button>
            </Grid>
          </Grid>
        </main>
      </Grid>
    </Container>
  );
}
