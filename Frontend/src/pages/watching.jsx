import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Video from "../components/movie/video";
import DetailMovie from "../components/movie/detailFilm";
import Comment from "../components/comment/comment";
import Eposide from "../components/movie/eposide";
import { useEffect, useState } from "react";
import { getTVShowByID } from "../api/tvShow";
import { useParams } from "react-router-dom";
import { getMovieByID } from "../api/movie";

function Watching() {
    const { type, id } = useParams();

    const [film, setFilm] = useState(null)
    const [video, setVideo] = useState("")

    useEffect(() => {
        if (type === "TV_SHOW") {
            
            getTVShowByID({id})
                .then((value) => {
                    setFilm(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        }else{
            getMovieByID(id)
                .then((value) => {
                    setFilm(value)
                    console.log(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        
    }, [id])

    useEffect(() => {
        console.log('film', film)
        setVideo(film?.video)
    }, [film])

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            {film != null? <Video video={video} filmID={film.id}/>: null}
            {film != null ? 
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: 'space-evenly',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <DetailMovie film={film} />
                    <Eposide filmID={film?.id} setVideo={setVideo}/>
                </Box>: null
            }
            
            <Comment filmID={film?.id}/>
        </Box>
    );
}

export default Watching;
