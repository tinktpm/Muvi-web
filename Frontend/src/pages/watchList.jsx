import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  List,
  TextField,
  Typography,
} from "@mui/material";
import GridViewMovies from "../components/movie/gridviewMovies";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createWatchList, getWatchList } from "../api/watchlist";
import WatchListContainer from "../components/watchlist/watchListContainer";
import WatchListItem from "../components/watchlist/watchListItem";

function WatchList() {
  const { user } = useContext(AuthContext);
  const [films, setFilms] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isOpenListFilm, setIsOpenListFilm] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistSelected, setWatchlistSelected] = useState({});
  const [deletedFilm, setDeletedFilm] = useState();

  const handleCloseDrawer = () => {
    setIsOpenListFilm(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateWatchList = () => {
    console.log(name);
    createWatchList(user?.userId, name)
      .then((value) => {
        console.log(value);
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
      });
  };

  
  useEffect(() => {
    getWatchList({ userID: user?.userId })
      .then((value) => {
        console.log(value);
        setWatchlist(value);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user, deletedFilm]);


  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">Watch List</Typography>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ marginTop: "1rem" }}
      >
        Tạo WatchList
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tạo Watch List mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên Watch List"
            type="text"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleCreateWatchList} autoFocus>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WatchListContainer setIsOpenListFilm={setIsOpenListFilm} watchlist={watchlist} setWatchlistSelected={setWatchlistSelected}/>
      </Box>
      <Drawer
        anchor={'right'}
        open={isOpenListFilm}
        onClose={handleCloseDrawer}
      >
        <Box
          sx={{
            width: "30rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <WatchListItem watchlistSelected={watchlistSelected} setDeletedFilm={setDeletedFilm}/>
        </Box>
      </Drawer>
    </Box>
  );
}

export default WatchList;
