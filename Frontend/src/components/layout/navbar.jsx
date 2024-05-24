import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./toggleColorMode";
import { GENRES, URL_LOGO } from "../../utils/contants";
import { border } from "@mui/system";
import SimpleBackdrop from "./backdrop";
import SignIn from "../../pages/signIn";
import BasicModal from "./modal";
import {
  Badge,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import Search from "../search";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../../api/notification";
import useWebSocket from "react-use-websocket";
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { payment } from "../../api/payment";
import SignUp from "../../pages/signUp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HistoryIcon from '@mui/icons-material/History';

const logoStyle = {
  width: "100px",
  height: "100px",
  cursor: "pointer",
};

function Header({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [genre, setGenre] = React.useState([]);
  const [showGenre, setShowGenre] = React.useState(false);
  const [country, setCountry] = React.useState([]);
  const [showNotification, setShowNotification] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const { user, logout } = React.useContext(AuthContext);
  const [openDiaLogPayment, setOpenDiaLogPayment] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const navigate = useNavigate();
  const openMenuAccount = Boolean(anchorEl);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
    setGenre(GENRES);
  }, []);

  const [filmNotification, setFilmNotification] = React.useState([]);
  const [accountNotification, setAccountNotification] = React.useState([]);
  const [commentNotification, setCommentNotification] = React.useState([]);

  const [numberOfReadFalse, setNumberOfReadFalse] = React.useState(0);

  const theme = useTheme();

  React.useEffect(() => {
    console.log(user?.userId);
    getNotifications({ userID: user?.userId, page: 0, size: 12 })
      .then((value) => {
        setFilmNotification(value.film_notification);
        setAccountNotification(value.account_notification);
        setCommentNotification(value.comment_notification);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.userId]);
  React.useEffect(() => {
    // Function to count falsy 'read' properties
    const countFalseReads = (notifications) => {
      return notifications.reduce((count, notification) => {
        if (!notification.read) {
          return count + 1;
        }
        return count;
      }, 0);
    };

    // Update numberOfReadFalse when any of the notification states change
    setNumberOfReadFalse(
      countFalseReads(filmNotification) +
        countFalseReads(accountNotification) +
        countFalseReads(commentNotification)
    );
  }, [filmNotification, accountNotification, commentNotification]);

  // Init 3 websocket for film-notification, account-notification, comment-notification
  const { sendMessage: sendFilmMessage, lastMessage: lastFilmMessage } =
    useWebSocket("ws://localhost:8080/api/v1/film-notification", {
      share: true,
    });
  const { sendMessage: sendAccountMessage, lastMessage: lastAccountMessage } =
    useWebSocket("ws://localhost:8080/api/v1/account-notification", {
      share: true,
    });
  const { sendMessage: sendCommentMessage, lastMessage: lastCommentMessage } =
    useWebSocket("ws://localhost:8080/api/v1/comment-notification", {
      share: true,
    });

  React.useEffect(() => {
    if (lastFilmMessage != null) {
      const data = JSON.parse(lastFilmMessage.data);
      if (data.userID == user?.userId) {
        setFilmNotification((prev) => {
          if (!filmNotification?.some((item) => item.id == data.id)) {
            prev.concat([data]);
          } else {
            return prev.map((item) => {
              if (item.id === data.id) {
                return { ...item, read: data.read };
              }
              return item;
            });
          }
        });
      }
    }
  }, [lastFilmMessage]);

  React.useEffect(() => {
    if (lastAccountMessage != null) {
      const data = JSON.parse(lastAccountMessage.data);
      if (data.userID == user?.userId) {
        setAccountNotification((prev) => {
          if (!accountNotification?.some((item) => item.id == data.id)) {
            prev.concat([data]);
          } else {
            return prev.map((item) => {
              if (item.id === data.id) {
                return { ...item, read: data.read };
              }
              return item;
            });
          }
        });
      }
    }
  }, [lastAccountMessage]);

  React.useEffect(() => {
    if (lastCommentMessage != null) {
      const data = JSON.parse(lastCommentMessage.data);
      if (data.userID == user?.userId) {
        setCommentNotification((prev) => {
          if (!prev.some((item) => item.id == data.id)) {
            // Concatenate the new data to the previous state and return it
            return prev.concat([data]);
          } else {
            // Update the 'read' property of the existing item and return the modified array
            return prev.map((item) => {
              if (item.id === data.id) {
                return { ...item, read: data.read };
              }
              return item;
            });
          }
        });
      }
    }
  }, [lastCommentMessage]);

  const handleReadNotification = (type, notificationID) => {
    if (type == "account") {
      sendAccountMessage(
        JSON.stringify({
          action: "read",
          notificationID,
        })
      );
    }
    if (type == "film") {
      sendFilmMessage(
        JSON.stringify({
          action: "read",
          notificationID,
        })
      );
    }
    if (type == "comment") {
      sendCommentMessage(
        JSON.stringify({
          action: "read",
          notificationID,
        })
      );
    }
  };

  function getTimeVip(time) {
    const vipDeadline = new Date(time || "2024-06-04T15:17:20.644+00:00");
    const localTime = vipDeadline.toLocaleString();

    // Calculate remaining time
    const currentTime = new Date();
    const remainingTimeInMilliseconds =
      vipDeadline.getTime() - currentTime.getTime();

    const remainingTimeInDays = Math.ceil(
      remainingTimeInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return remainingTimeInDays;
  }
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
          width: "100%",
        }}
      >
        <Container maxWidth="false">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            {/* Thanh NavBar bên trái */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
                padding: 1,
              }}
            >
              <img
                src={URL_LOGO}
                style={{
                  ...logoStyle,
                  width: "60px",
                  height: "60px",
                  // border: "2px solid black",
                  borderRadius: "50%",
                  hover: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
                alt="Home"
                onClick={() => navigate("/home")}
              />
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  marginLeft: "1rem",
                }}
              >
                <MenuItem
                  onClick={() => navigate("/Movie")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="button" color="text.primary">
                    Movie
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/TV_SHOW")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="button" color="text.primary">
                    TV SHOW
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("testimonials")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Box>
                    <Box
                      sx={{
                        position: "relative",
                        color: "primary.main",
                      }}
                      onClick={() => setShowGenre(!showGenre)}
                    >
                      GENRE
                    </Box>
                    {showGenre && (
                      <Box
                        sx={{
                          position: "absolute",
                          width: "38rem",
                          height: "12rem",
                          top: "4rem",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          overflow: "auto",
                          padding: "4px",
                          boxShadow: 3,
                        }}
                      >
                        <Grid container spacing={1}>
                          {genre?.map((item, index) => {
                            return (
                              <Grid
                                item
                                xs={4}
                                sm={4}
                                md={4}
                                lg={4}
                                key={index}
                              >
                                <Button
                                  sx={{
                                    whiteSpace: "normal", // Allow text to wrap
                                    overflow: "hidden", // Hide overflow
                                    textOverflow: "ellipsis", // Add ellipsis for overflow text
                                  }}
                                >
                                  {item}
                                </Button>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("testimonials")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="button" color="text.primary">
                    Country
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            {/* END Thanh NavBar bên trái */}

            {/* Thanh NavBar bên phải */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <TextField
                  id="filled-textarea"
                  placeholder="TV Series, Movies, ..."
                  multiline
                  variant="filled"
                  value={search}
                  onChange={handleSearchChange}
                  InputProps={{
                    style: {
                      backgroundColor: "transparent",
                      fontSize: "0.8rem",
                    },
                    startAdornment: (
                      <InputAdornment>
                        <IconButton
                          onClick={() => navigate("/all?name=" + search)}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    maxWidth: 400,
                    color: "white",
                    marginBottom: "16px",
                  }}
                />
              </Box>

              {/* Notification */}
              <Box>
                <IconButton
                  sx={{
                    // backgroundColor: "transparent",
                    hover: {
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      cursor: "pointer",
                    },
                    borderRadius: 12,
                  }}
                  onClick={() => setShowNotification(!showNotification)}
                >
                  <Badge badgeContent={numberOfReadFalse} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                {showNotification && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "20rem",
                      height: "12rem",
                      top: "4rem",
                      right: "0",
                      borderRadius: "8px",
                      overflow: "auto",
                      padding: "4px",
                      boxShadow: 3,
                      background: theme.palette.background.default,
                    }}
                  >
                    <List>
                      {filmNotification?.map((notification, index) => {
                        return (
                          <ListItemButton
                            key={index}
                            onClick={() =>
                              handleReadNotification("film", notification.id)
                            }
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: notification?.read
                                  ? theme.palette.text.primary
                                  : "red",
                              }}
                            >
                              {notification.title}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                      {accountNotification?.map((notification, index) => {
                        return (
                          <ListItemButton
                            key={index}
                            onClick={() =>
                              handleReadNotification("account", notification.id)
                            }
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: notification?.read
                                  ? theme.palette.text.primary
                                  : "red",
                              }}
                            >
                              {notification.title}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                      {commentNotification?.map((notification, index) => {
                        return (
                          <ListItemButton
                            key={index}
                            onClick={() =>
                              handleReadNotification("comment", notification.id)
                            }
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: notification?.read
                                  ? theme.palette.text.primary
                                  : "blue",
                              }}
                            >
                              {notification.title}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Box>
                )}
              </Box>
              {/* END Notification */}
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

              {/* Menu Account */}
              <IconButton
                sx={{
                  backgroundColor: "transparent",
                  hover: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                  },
                  borderRadius: 12,
                }}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={openMenuAccount}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {user ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        setOpenDiaLogPayment(true);
                      }}
                    >
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        target="_blank"
                        disabled={user?.isVip}
                      >
                        <WorkspacePremiumIcon
                          sx={{
                            marginRight: 1,
                          }}
                        />
                        {user?.isVip
                          ? `VIP (${getTimeVip(user?.vipDeadline)})`
                          : "Upgrade to VIP"}
                      </Button>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/watchlist");
                      }}
                    >
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        target="_blank"
                      >
                        <ViewListIcon
                          sx={{
                            marginRight: 1,
                          }}
                        />
                        Watch List
                      </Button>
                      
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/history");
                      }}
                    >
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        target="_blank"
                      >
                        <HistoryIcon
                          sx={{
                            marginRight: 1,
                          }}
                        />
                        History Film Watched
                      </Button>
                      
                    </MenuItem>

                    {user?.isAdmin && (
                      <MenuItem
                        onClick={() => {
                          navigate("/admin");
                        }}
                      >
                        <Button
                          color="primary"
                          variant="text"
                          size="small"
                          component="a"
                          target="_blank"
                        >
                          <AdminPanelSettingsIcon
                            sx={{
                              marginRight: 1,
                            }}
                          />
                          Admin
                        </Button>
                      </MenuItem>
                    )}

                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        target="_blank"
                        onClick={() => {}}
                      >
                        Change Password
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        target="_blank"
                        onClick={() => {
                          setIsOpen(!isOpen);
                          logout();
                        }}
                      >
                        <LogoutIcon
                          sx={{
                            marginRight: 1,
                          }}
                        />
                        Log out
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        component="a"
                        target="_blank"
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                      >
                        Sign in
                      </Button>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        setOpenSignUp(true);
                      }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        target="_blank"
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Menu>
              {/* END Menu Account */}
            </Box>
            {/* END Thanh NavBar bên phải */}

            {/* Chuyển thành menu dạng mobile */}
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem onClick={() => scrollToSection("features")}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("testimonials")}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("highlights")}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("pricing")}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
            {/* END Chuyển thành menu dạng mobile */}
          </Toolbar>
        </Container>
      </AppBar>

      <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SignIn />
      </BasicModal>

      <BasicModal isOpen={openSignUp} setIsOpen={setOpenSignUp}>
        <SignUp />
      </BasicModal>

      <Dialog
        onClose={() => setOpenDiaLogPayment(false)}
        open={openDiaLogPayment}
      >
        <DialogTitle>Nâng cấp tài khoản</DialogTitle>
        <DialogContent>
          <Typography>
            Chỉ tốn 10$/tháng bạn sẽ được nhận những ưu đãi tốt hơn
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDiaLogPayment(false);
              payment("66213353dfc66d451374342c")
                .then((value) => {
                  if (value) {
                    window.location.href = value.data;
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            sx={{}}
          >
            Cancel
          </Button>
          <Button onClick={() => setOpenDiaLogPayment(false)}>Payment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;
