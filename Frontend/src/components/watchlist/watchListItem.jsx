import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateWatchList } from "../../api/watchlist";
import { useNavigate } from "react-router-dom";

function WatchListItem({watchlistSelected, setDeletedFilm}) {
  const [dialogDelete, setDialogDelete] = useState(false);
  const [filmDelete, setFilmDelete] = useState(null);
  const [watchListFilms, setWatchListFilms] = useState(watchlistSelected);
  const [filmDeleted, setFilmDeleted] = useState();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDelete = (film) => {
    setDialogDelete(true);
    setFilmDelete(film);
  };

  const handleDeleteFilm = () => {
    setDialogDelete(false);
    updateWatchList('remove', watchlistSelected?.id, filmDelete?.id)
      .then((value) => {
        console.log(value);
        setDeletedFilm(filmDelete);
        setFilmDeleted(filmDelete);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (filmDeleted) {

      let newWatchList = watchListFilms;
      if (filmDeleted?.type === 'MOVIE') {
        newWatchList.movies = newWatchList?.movies?.filter((item) => item.id !== filmDeleted.id);
      } else {
        newWatchList.tvshows = newWatchList?.tvshows?.filter((item) => item.id !== filmDeleted.id);
      }
      setWatchListFilms(newWatchList);
    }
      
  }, [filmDeleted]);


  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        padding: "1rem",
      }}
    >
    <Typography variant="h4" gutterBottom>
      {watchlistSelected?.name}
    </Typography>
      {
        watchListFilms?.movies?.map((item) => {
          return (
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: "1rem",
                margin: "1rem",
              }}
              key = {item?.id}
            >
              <CardMedia
                sx={{
                  height: 140,
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                image={item?.banner}
                onClick={() => {
                  navigate(`/${item?.type}/${item?.id}`)
                }}
                title="green iguana"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardContent
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {item?.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small"
                    onClick={() => handleDelete(item)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Box>
            </Card>
          );
        })
      }
      {
        watchListFilms?.tvShows?.map((item) => {
          return (
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: "1rem",
                margin: "1rem",
              }}
              key = {item?.id}
            >
              <CardMedia
                sx={{
                  height: 140,
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                image={item?.banner}
                onClick={() => {
                  navigate(`/${item?.type}/${item?.id}`)
                }}
                title="green iguana"
                
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardContent
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {item?.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small"
                    onClick={() => handleDelete(item)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Box>
            </Card>
          );
        })
      }

     {
      dialogDelete && (
        <Dialog
          open={dialogDelete}
          onClose={() => setDialogDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogActions>
            <Button 
              onClick={() => setDialogDelete(false)}
              sx={{
                backgroundColor: theme.palette.grey[500],
                '&:hover': {
                  backgroundColor: theme.palette.grey[700],
                },
                color: theme.palette.common.white,
              }}
            >
              Disagree
            </Button>
            <Button onClick={() => handleDeleteFilm()} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )
     }

    </Box>
  );
}

//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstirBRd3pYYdCk2HtCbpa73eptwXw2Tt0TA&s

export default WatchListItem;
