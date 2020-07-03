import React from "react";
import TableHead, { HeadCell } from "../Table/TableHead";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  makeStyles,
} from "@material-ui/core";

import BlogTableRow from "./BlogTableRow";
import TableToolBar from "../Table/TableToolBar";
import BlogModel from "../../models/BlogModel";

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
  handleDelete: Function;
}
const BlogListTable: React.FC<PropsTypes> = ({ list, handleDelete }) => {
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

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelecteds = BlogListTable.map((n) => n.BlogListTable);
      // setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => () => {
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const clearSelected = () => {
    setSelected([]);
  };

  const _handleDelete = () => {
    handleDelete(selected);
    clearSelected();
  };
  return (
    <Paper className={classes.paper}>
      <TableToolBar
        numSelected={selected.length}
        handleDelete={_handleDelete}
      />
      <TableContainer>
        <Table aria-labelledby="tableTitle" aria-label="enhanced table">
          <TableHead headCells={headCells} />
          <TableBody>
            {list.map((row, i) => {
              const isItemSelected = isSelected(row.uiId);
              return (
                <BlogTableRow
                  key={i}
                  blogInfo={row}
                  isItemSelected={isItemSelected}
                  onClick={handleClick(row.uiId)}
                ></BlogTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BlogListTable;
