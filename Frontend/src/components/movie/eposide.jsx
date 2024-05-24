
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";

import { getSeasonByFilmID } from "../../api/season";
import { getEpisodeBySeasonID } from "../../api/episode";
import { useEffect, useState } from "react";

function Eposide({ filmID, setVideo }) {
    const [seasonID, setSeasonID] = useState("");

    const [seasons, setSeasons] = useState([])
    const [episodes, setEpisodes] = useState([])

    useEffect(() => {
        
        getSeasonByFilmID({ tvShowID: filmID })
            .then((value) => {
                setSeasons(value)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        if(seasons.length > 0){
            setSeasonID(seasons[0].id)
        }
    }, [seasons])

    useEffect(() => {
        getEpisodeBySeasonID({ seasonID: seasonID })
            .then((value) => {
                setEpisodes(value)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [seasonID])

    useEffect(() => {
        if(episodes.length > 0){
            setVideo(episodes[0].video)
        }
        
    }, [episodes])

    const handleChange = (event) => {
        setSeasonID(event.target.value);
    };

    return (
        <Box
            sx={{
                width: "25%",
                marginRight: "1rem",
                border: "4px solid rgba(0, 0, 0, 0.8)",
                borderRadius: '8px',
                padding: "1rem",
                marginTop: '12px',
            }}
        >
            <Box
                sx={{
                    width: "95%",
                    padding: "1rem",
                    marginRight: "1rem",
                }}
            >
                <FormControl fullWidth>
                    <InputLabel
                        id="demo-simple-select-label"
                    >
                        {seasons.length < 1 ? "Movie": "Season"}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={seasonID}
                        disabled={seasons.length < 1}
                        label="Season"
                        onChange={handleChange}
                        sx={{
                            color: 'rgba(255, 0, 0, 1)',
                        }}
                    >
                        {seasons.map((season, index) => {
                            return <MenuItem key={index} value={season.id}>{season.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    maxHeight: "200px",
                    overflow: "auto",
                    padding: "1rem",
                }}
            >
                <Stack direction="column" spacing={2}>
                    {episodes.map((episode, index) => {
                        return (
                            <Button
                                key={index}
                                sx={{
                                    color: 'rgba(255, 0, 0, 1)',
                                }}
                                onClick={() => setVideo(episode.video)}
                            >
                                {episode.name}
                            </Button>
                        )
                    })}
                </Stack>
            </Box>
        </Box>
    );
}

export default Eposide;
