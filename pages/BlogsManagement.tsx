import React from "react";
import { Button, Grid } from "@material-ui/core";
import { list } from "../auth.json";

const BlogsManagement: React.FC = () => {
  return (
    <div>
      <Button>블로그 추가 등록하기</Button>
      <h1>등록된 블로그</h1>
      <Grid container direction="row" justify="center" alignItems="center">
        {list.map(({ blog }) => {
          return (
            <div key={blog}>
              <p>{blog}</p>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default BlogsManagement;
