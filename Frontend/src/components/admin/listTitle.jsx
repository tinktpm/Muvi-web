import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import TheatersIcon from "@mui/icons-material/Theaters";
import CategoryIcon from "@mui/icons-material/Category";
import ReportIcon from "@mui/icons-material/Report";
import TvIcon from "@mui/icons-material/Tv";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const mainListItems = (setMainContent) => { 
  
  return (
  <React.Fragment>
    <ListItemButton
       onClick={() => {
        setMainContent('Dashboard')
        console.log("ListItemButton clicked");
      }}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton
       onClick={() => {
        setMainContent("TVShow");
        console.log("ListItemButton clicked");
      }}
    >
      <ListItemIcon>
        <TvIcon />
      </ListItemIcon>
      <ListItemText primary="TV Show" />
    </ListItemButton>

    <ListItemButton
       onClick={() => {
        setMainContent("Movie");
        console.log("ListItemButton clicked");
      }}
    >
      <ListItemIcon>
        <TheatersIcon />
      </ListItemIcon>
      <ListItemText primary="Movie" />
    </ListItemButton>

    <ListItemButton
       onClick={() => {
        setMainContent("User");
        console.log("ListItemButton clicked");
      }}
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lí người dùng" />
    </ListItemButton>

    {/* <ListItemButton
       onClick={() => {
        setMainContent("Report");
        console.log("ListItemButton clicked");
      }}
    >
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lí báo cáo" />
    </ListItemButton> */}
  </React.Fragment>
)
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </React.Fragment>
);
