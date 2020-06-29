import React from "react";
import { Modal, makeStyles, Button, Grid } from "@material-ui/core";
import BlogsList from "./BlogsList";
import Alert from "@material-ui/lab/Alert";
import { MobXProviderContext, observer } from "mobx-react";
interface Props {
  handleClose: () => void;
  open: boolean;
  uploadPosting: () => void;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SelectBlogModal: React.FC<Props> = ({
  handleClose,
  open,
  uploadPosting,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { BlogStore } = React.useContext(MobXProviderContext);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Grid>
          <BlogsList />
        </Grid>

        {!BlogStore.selectedBlogList.length && (
          <Alert severity="error">블로그를 선택해주세요.</Alert>
        )}
        <Button variant="contained" color="secondary" onClick={uploadPosting}>
          <a>포스팅 하기</a>
        </Button>
      </div>
    </Modal>
  );
};

export default observer(SelectBlogModal);
