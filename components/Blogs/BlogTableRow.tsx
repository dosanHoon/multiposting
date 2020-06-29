import React from "react";
import {
  TableCell,
  TableRow,
  Checkbox,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface PropsTypes {
  blog: string;
  id: string;
  pw: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

const BlogTableRow: React.FC<PropsTypes> = ({ blog, id, pw }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox
        // checked={isItemSelected}
        // inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {blog}
      </TableCell>
      <TableCell align="right">{id}</TableCell>
      <TableCell align="right">
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={pw}
            // onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default BlogTableRow;
