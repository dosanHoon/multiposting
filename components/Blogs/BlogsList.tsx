import React from "react";
import { MobXProviderContext } from "mobx-react";
import { Grid, Button, Checkbox } from "@material-ui/core";

const BlogsList: React.FC = () => {
  const { BlogStore } = React.useContext(MobXProviderContext);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {BlogStore.blogList.map(({ blog }) => {
        return (
          <Button variant="outlined" color="primary" key={blog}>
            <Checkbox
              defaultChecked
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <p>{blog}</p>
          </Button>
        );
      })}
    </Grid>
  );
};

export default BlogsList;
