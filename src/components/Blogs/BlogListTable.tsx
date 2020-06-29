import React from "react";
import TableHead, { HeadCell } from "../Table/TableHead";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  makeStyles,
  Toolbar,
  Typography,
  TableRow,
  TableCell,
  Checkbox,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { BlogModel } from "../../stores/BlogStore";
import BlogTableRow from "./BlogTableRow";

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

interface PropsTypes {
  list: BlogModel[];
}
const BlogListTable: React.FC<PropsTypes> = ({ list }) => {
  const classes = useStyles();
  const headCells: HeadCell[] = [
    {
      id: "blogType",
      numeric: false,
      disablePadding: true,
      label: "블로그",
    },
    { id: "id", numeric: true, disablePadding: false, label: "블로그 계정" },
    { id: "pw", numeric: true, disablePadding: false, label: "패스워드" },
  ];

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelecteds = BlogListTable.map((n) => n.BlogListTable);
      // setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          aria-label="enhanced table"
        >
          <TableHead headCells={headCells} />
          <TableBody>
            {list.map((row) => {
              return <BlogTableRow {...row}></BlogTableRow>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BlogListTable;
