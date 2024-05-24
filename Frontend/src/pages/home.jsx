import { Box } from "@mui/system";
import CarouselComponent from "../components/home/carousel";
import GridViewMovies from "../components/movie/gridviewMovies";
import MoviesRecommend from "../components/movie/moviesRecommend";
import { useContext, useEffect, useState } from "react";
import { filterMovie } from "../api/movie";
import { Tab, Tabs } from "@mui/material";
import { getTVShows } from "../api/tvShow";
import { AuthContext } from "../context/AuthContext";
import { getCommendedFilms } from "../api/film";


export default function Home() {
    const [typeAll, setTypeAll] = useState(0);
    const [films, setFilms] = useState([]);
    const [filmsRecommend, setFilmsRecommend] = useState([]);
    const { user } = useContext(AuthContext)    

    useEffect(() => {
        if (typeAll === 0) {
            filterMovie('')
                .then((value) => {
                    setFilms(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            getTVShows('')
                .then((value) => {
                    setFilms(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [typeAll])

    useEffect(() => {
        getCommendedFilms({ userID: "66227018dea6cbf7a9ab36ba", page: 0, size: 10 })
            .then((value) => {
                setFilmsRecommend(value)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleChange = (event, newValue) => {
        setTypeAll(newValue);
    };

    console.log('user', user)
    return (
        <Box
            sx={
                {
                    marginTop: '100px',
                }
            }
        >
            <CarouselComponent />
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        width: '75%',
                        marginRight: '3rem',
                        boxShadow: '0 0 4px 0 rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                    }}
                >
                    <Box>
                        <Tabs
                            value={typeAll}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Tab label="Movie" />
                            <Tab label="TV Show" />
                        </Tabs>

                    </Box>
                    <GridViewMovies films={films} />
                </Box>
                <Box
                    sx={{
                        width: '25%',
                        boxShadow: '0 0 4px 0 rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        height: '45rem',
                        overflow: 'auto', 
                    }}
                >
                    <MoviesRecommend films={filmsRecommend}/>
                </Box>

            </Box>
        </Box>
    );
}