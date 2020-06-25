import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Button,
  ButtonGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const blogTypeList = [
  { name: "네이버", type: "naver" },
  { name: "티스토리", type: "tistory" },
  { name: "velog", type: "velog" },
];

export default function RegistBlog() {
  const classes = useStyles();
  const [password, setPassword] = React.useState("");
  const [blogId, setBlogId] = React.useState("");
  const [blogList, setBlogList] = React.useState([]);
  const [blogType, setBlogType] = React.useState({ name: "", type: "" });

  const addNewBlog = React.useCallback(() => {
    setBlogList((prev) => {
      prev.push({ blog: blogType.type, id: blogId, pw: password });
      return [...prev];
    });
  }, [blogType, blogId, password]);

  const selectBlogType = React.useCallback(
    (blog) => () => {
      setBlogType(blog);
    },
    []
  );

  const saveNewBlogList = () => {
    // blogList
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid md={6}>
          <ButtonGroup
            color="primary"
            aria-label="contained primary button group"
          >
            {blogTypeList.map((blog) => (
              <Button
                variant={blogType.name === blog.name ? "contained" : "outlined"}
                onClick={selectBlogType(blog)}
              >
                {blog.name}
              </Button>
            ))}
          </ButtonGroup>
          <div>
            <h1>{blogType.name}</h1>
          </div>
          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="blog_id">id</InputLabel>
              <OutlinedInput
                id="blog_id"
                value={blogId}
                onChange={(e) => setBlogId(e.target.value)}
                label="id"
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="blog_password">password</InputLabel>
              <OutlinedInput
                id="blog_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="password"
                type="password"
              />
            </FormControl>
          </div>
          <div>
            <Button variant="contained" onClick={addNewBlog}>
              추가 하기
            </Button>
          </div>
        </Grid>
        <Grid md={6}>
          <h1>등록 대기 리스트</h1>
          <div>
            {blogList.map(({ blog, id }) => (
              <div>
                {blog}({id})
              </div>
            ))}
          </div>
          <div>
            <Button variant="contained" onClick={saveNewBlogList}>
              저장 하기
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
