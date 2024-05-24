import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHistoryFilm } from "../api/film";
import { AuthContext } from "../context/AuthContext";
import { getMovieByID } from "../api/movie";
import { getTVShowByID } from "../api/tvShow";

function History() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
 

  useEffect(() => {
    const param = 'page=' + page - 1
    getHistoryFilm(user?.userId, param).then((data) => {
        setFilms([])
      data?.forEach((film) => {
        getMovieByID(film.filmID)
        .then((data) => {
            if(data != null){
                console.log('datalllllllllll', data)
                setFilms((prev) => {
                  return prev.concat([data])
                });
            }
        }).catch((error) => {
            console.error('error', error)
        });

        getTVShowByID(film.filmID)
        .then((data) => {
            if(data != null){
                setFilms((prev) => {
                    return prev.concat([data])
                });
            }
        }).catch((error) => {
            console.error('error', error)
        });


      });
    });
  }, [user, page]);

  return (
    <Box
      sx={{
        marginTop: "100px",
        width: "100%",
        height: "100%",
        padding: "8px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
        <Typography variant="h4" gutterBottom>
            Lịch sử xem phim
        </Typography>
      <Grid container spacing={2}>
        {films?.map((film) => {
          return (
            <Grid item xs={12} md={3} key={film?.id}>
              <Card
                sx={{ maxWidth: 345 }}
                onClick={() => navigate(`/${film?.type}/${film?.id}`)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={film?.banner}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {film?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {film?.duration} min
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {film?.genres?.join(', ')}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        count={10}
        shape="rounded"
        onChange={(e, value) => setPage(value)}
        page={page}
        sx={{
          marginTop: "3rem",
        }}
      />
    </Box>
  );
}

export default History;
