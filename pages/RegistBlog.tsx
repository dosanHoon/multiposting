import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Button,
} from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function RegistBlog() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [password, setPassword] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [blogList, setBlogList] = React.useState([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid md={6}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="네이버" {...a11yProps(0)} />
              <Tab label="티스토리" {...a11yProps(1)} />
              <Tab label="velog" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <h1>네이버</h1>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <h1>티스토리</h1>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <h1>velog</h1>
          </TabPanel>
          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="id">id</InputLabel>
              <OutlinedInput
                id="blog_id"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="id"
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="blog_password">password</InputLabel>
              <OutlinedInput
                id="blog_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="password"
                type="password"
              />
            </FormControl>
          </div>
          <div>
            <Button variant="contained">추가 하기</Button>
          </div>
        </Grid>
        <Grid md={6}>
          <h1>등록 대기 리스트</h1>
          <div>
            {blogList.map(({ blogType, blogId }) => (
              <div>
                {blogType}({blogId})
              </div>
            ))}
          </div>
          <div>
            <Button variant="contained">저장 하기</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
