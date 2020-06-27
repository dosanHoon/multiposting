import React from "react";
import { Button, Grid, Theme, makeStyles, Container } from "@material-ui/core";
import { MobXProviderContext } from "mobx-react";
import Link from "next/link";
import BlogListTable from "../components/Blogs/BlogListTable"
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: 24,
  },
}));

const BlogsManagement: React.FC = () => {
  const classes = useStyles();
  const { BlogStore } = React.useContext(MobXProviderContext);

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
        >
          <Grid item>
            <Button variant="contained" color="secondary">
              <Link href="./registblog">
                <a>블로그 추가 등록하기</a>
              </Link>
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="default">
              <Link href="./">
                <a>홈으로가기</a>
              </Link>
            </Button>
          </Grid>
        </Grid>
        <h1>등록된 블로그</h1>

        <Grid container direction="row" justify="center" alignItems="center">
          <BlogListTable />
          {BlogStore.blogList.map(({ blog }) => {
            return (
              <Button variant="outlined" color="primary" key={blog}>
                <p>{blog}</p>
              </Button>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default BlogsManagement;
