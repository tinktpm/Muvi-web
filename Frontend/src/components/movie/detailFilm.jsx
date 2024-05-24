import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import { Stack } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { addRate, getRateByFilmID } from "../../api/rate";
import { AuthContext } from "../../context/AuthContext";

function DetailMovie({ film }) {
    var genres_string = film?.genres.join(" ")
    const {user} = useContext(AuthContext)

    const [rate, setRate] = useState()

    const [vote, setVote] = useState(0)

    useEffect(() => {
        console.log('filmDEtailassss', film)
        getRateByFilmID(film?.id)
            .then(value => {
                setRate(value)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [vote])
    return (
        <Box
            sx={{
                display: 'flex',
                width: '75%',
                // height: '100%',
                marginTop: '12px',
                position: 'relative',
                justifyContent: 'space-evenly',
                border: '4px solid #000',
                borderRadius: '8px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-envenly',
                    width: '80%',
                    height: '100%',
                }}
            >
                <Box
                >
                    <Card
                        sx={{
                            maxWidth: 300,
                            height: '100%',
                        }}
                    >

                        <CardMedia
                            component="img"
                            image={film?.banner}
                            title="green iguana"
                            sx={{
                                height: '100%'
                            }}
                        />
                    </Card>
                </Box>
                <Stack
                    sx={{
                        marginLeft: '2rem',
                    }}
                    spacing={1} direction="column"
                >
                    <Typography variant="h5">{film?.name}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="subtitle1">HD</Typography>
                        <StarIcon fontSize="4px" /> {rate?.average}
                    </Box>
                    <Typography variant="subtitle2">Tóm tắt phim: {film?.description}</Typography>
                    <Typography variant="subtitle2">Thể loại: {genres_string}</Typography>
                    <Typography variant="subtitle2">Thời lượng: {film?.duration}</Typography>
                    <Typography variant="subtitle2">Ngày công chiếu: {film?.firstYearRelease}</Typography>
                    <Typography variant="subtitle2">Công ty sản xuất: {film?.productionCompany}</Typography>
                    <Typography variant="subtitle2">Diễn viên</Typography>
                    <Typography variant="subtitle2">Quốc gia: {film?.countryOfOrigin}</Typography>
                    <Typography variant="subtitle2">Ngôn ngữ:</Typography>
                </Stack>
            </Box>
            <Box
                sx={{
                    width: '20%',
                    height: '100%',
                }}
            >
                <Rating name="half-rating" defaultValue={5} precision={0.5} value={rate?.average / 10 * 5} onChange={(e, value) => {
                    addRate({ userID: user?.userId, filmID: film?.id, score: value * 2 })
                        .then((value) => {
                            setVote(value.average)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }}/>
                <Typography variant="subtitle2">{rate? rate?.average: 0}/10 ({rate? rate?.count: 0} reviews)</Typography>
            </Box>
        </Box>
    )
}

export default DetailMovie;