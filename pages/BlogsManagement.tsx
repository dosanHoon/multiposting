import React from "react";
import { Button, Grid, Theme, makeStyles, Container } from "@material-ui/core";
import { MobXProviderContext } from "mobx-react";
import Link from "next/link";
import BlogListTable from "../src/components/Blogs/BlogListTable";
import BlogModel from "../src/models/BlogModel";
import Axios from "axios";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: 24,
  },
  btn_root: {
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const BlogsManagement: React.FC = () => {
  const classes = useStyles();
  const { BlogStore } = React.useContext(MobXProviderContext);
  const [list, setList] = React.useState(BlogStore.blogList);

  React.useEffect(() => {
    setOriginList();
  }, [BlogStore.blogList]);

  const handleDelete = React.useCallback(
    (selected) => {
      setList(list.filter(({ uiId }) => selected.indexOf(uiId) === -1));
    },
    [list]
  );

  const addNewBlog = React.useCallback(() => {
    const newList = list.slice();
    newList.push(new BlogModel());
    setList(newList);
  }, [list]);

  const setOriginList = React.useCallback(() => {
    setList(BlogStore.blogList);
  }, [BlogStore.blogList]);

  const saveNewBlogList = () => {
    Axios.post("http://localhost:3000/api/addblog", {
      blogdata: list,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
        >
          <Grid>
            <Button variant="contained" color="default">
              <Link href="./">
                <a>홈으로가기</a>
              </Link>
            </Button>
          </Grid>
        </Grid>
        <h1>등록된 블로그</h1>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
          className={classes.btn_root}
        >
          <Button variant="contained" color="default" onClick={addNewBlog}>
            <a>블로그 추가 등록하기</a>
          </Button>
          <Button variant="contained" color="secondary" onClick={setOriginList}>
            <a>초기화 하기</a>
          </Button>
          <Button variant="contained" color="primary" onClick={saveNewBlogList}>
            <a>저장하기</a>
          </Button>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <BlogListTable list={list} handleDelete={handleDelete} />
        </Grid>
      </Container>
    </div>
  );
};

export default BlogsManagement;
