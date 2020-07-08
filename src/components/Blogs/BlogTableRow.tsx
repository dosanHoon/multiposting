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
import BlogModel from "../../models/BlogModel";
import BlogTypeSelect from "./BlogTypeSelect";

interface PropsTypes {
  blogInfo: BlogModel;
  isItemSelected: boolean;
  onClick: (event: React.MouseEvent<unknown>) => void;
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

const BlogTableRow: React.FC<PropsTypes> = ({
  blogInfo,
  isItemSelected,
  onClick,
}) => {
  const {
    blog,
    id,
    pw,
    aliasName,
    uiId,
    changeAliasName,
    changeId,
    changePassword,
  } = blogInfo;
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

  const onChange = (handler) => (e) => {
    console.log(e.target.value);
    handler(e.target.value);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} onClick={onClick} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <BlogTypeSelect blogType={blog} />
      </TableCell>
      <TableCell align="right">
        <FormControl className={classes.textField}>
          <InputLabel htmlFor={`standard-aliasName${uiId}`}>
            블로그 별칭
          </InputLabel>
          <Input
            id={`standard-aliasName${uiId}`}
            value={aliasName}
            onChange={onChange(changeAliasName)}
          />
        </FormControl>
      </TableCell>
      <TableCell align="right">
        <FormControl className={classes.textField}>
          <InputLabel htmlFor={`standard-id${uiId}`}>id</InputLabel>
          <Input
            id={`standard-id${uiId}`}
            value={id}
            onChange={onChange(changeId)}
          />
        </FormControl>
      </TableCell>
      <TableCell align="right">
        <FormControl className={classes.textField}>
          <InputLabel htmlFor={`standard-adornment-password${uiId}`}>
            Password
          </InputLabel>
          <Input
            id={`standard-adornment-password${uiId}`}
            type={showPassword ? "text" : "password"}
            value={pw}
            onChange={onChange(changePassword)}
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
