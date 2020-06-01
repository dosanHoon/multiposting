import React from "react";
import { Button, Grid } from "@material-ui/core";
import { MobXProviderContext } from "mobx-react";

const BlogsManagement: React.FC = () => {
  const Store = React.useContext(MobXProviderContext);
  console.log("BlogStore", Store);
  return (
    <div>
      <Button variant="contained" color="secondary">
        블로그 추가 등록하기
      </Button>
      <h1>등록된 블로그</h1>
      <Grid container direction="row" justify="center" alignItems="center">
        {Store.blogList.map(({ blog }) => {
          return (
            <Button variant="outlined" color="primary" key={blog}>
              <p>{blog}</p>
            </Button>
          );
        })}
      </Grid>
    </div>
  );
};

export default BlogsManagement;
