import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
export default function BlogTypeSelect(props) {
  const classes = useStyles();
  const [blogType, setBlogType] = React.useState(props.blogType);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBlogType(event.target.value as string);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel >블로그선택해주세요</InputLabel>
      <Select
        // labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={blogType}
        onChange={handleChange}
      >
        <MenuItem value={"tistory"}>tistory</MenuItem>
        <MenuItem value={"naver"}>naver</MenuItem>
      </Select>
    </FormControl>
  );
}
