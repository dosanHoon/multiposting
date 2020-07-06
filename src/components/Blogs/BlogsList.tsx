import React from "react";
import { MobXProviderContext, observer } from "mobx-react";
import { Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import BlogModel from "../../models/BlogModel";

const BlogsList: React.FC = () => {
  const { BlogStore } = React.useContext(MobXProviderContext);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {BlogStore.blogList.map(({ blog, checked, handleChecked }: BlogModel) => {
        return (
          <FormControlLabel
            key={blog}
            control={
              <Checkbox
                checked={checked}
                onChange={handleChecked}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label={blog}
          />
        );
      })}
    </Grid>
  );
};

export default observer(BlogsList);
