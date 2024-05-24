import { Box, color } from "@mui/system";
import Search from "../components/search";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Grid,
    Pagination,
    Typography,
    Tabs,
    Tab,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import GridViewMovies from "../components/movie/gridviewMovies";
import Movie from "@mui/icons-material/Movie";
import MoviesRecommend from "../components/movie/moviesRecommend";
import { filterMovie } from "../api/movie";
import { getCommendedFilms } from "../api/film";
import { unstable_HistoryRouter, useNavigate, useParams } from "react-router-dom";
import { getTVShows } from "../api/tvShow";
import { AuthContext } from "../context/AuthContext";
import { COUNTRY, GENRES } from "../utils/contants";


// Hàm để render ô chọn category
function RenderSelectByCategory(categoryName, listCategory, selectedItems, setSelectedItems) {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleChecked = (category) => {
        category = category.replace("-", "_")
        if (!selectedItems.includes(category)) {
            setSelectedItems(prev => prev.concat(category))
        }
        else {
            const index = selectedItems.indexOf(category)
            setSelectedItems(prev => prev.splice(index, 1))
        }
    }

    const [categories, setCategories] = useState([]);
    return (
        <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">{categoryName}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={categories}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
            >
                {listCategory.map((category) => (
                    <MenuItem key={category} value={category} onClick={() => handleChecked(category)}>
                        <Checkbox checked={categories.indexOf(category) > -1} />
                        <ListItemText primary={category} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

function AllFilm() {
    const [type, setType] = useState([])
    const [genre, setGenre] = useState([]);
    const [country, setCountry] = useState([]);
    const [rating, setRating] = useState([]);
    const [year, setYear] = useState([]);
    const [films, setFilms] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [url, setUrl] = useState(window.location.search);
    const [page, setPage] = useState(1);
    const [filmsRecommend, setFilmsRecommend] = useState([]);
    const urlParams = new URLSearchParams(url);
    const name = urlParams.get('name');

    const { user } = useContext(AuthContext)

    useEffect(() => {
        setUrl(window.location.search)

    }, [window.location.search])

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setType(["Movie", "TV Show",])
        setGenre(GENRES);
        setCountry(COUNTRY);
        setRating(["1", "2", "3", "4", "5"]);
        setYear(["2021", "2020", "2019", "2018", "2017"]);
        getCommendedFilms({ userID: user?.userId, page: 0, size: 10, token: user?.token })
            .then((value) => {
                setFilmsRecommend(value)
                setFilms(value)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [user]);

    const handleClickFilter = () => {

        var queryParams = new URLSearchParams({});

        selectedGenre.map((genre, index) => { queryParams.append("genres", genre.toUpperCase()) })

        selectedYear.map((year, index) => { queryParams.append("years", year) })

        selectedCountry.map((country, index) => { queryParams.append("countries", country) })

        selectedRating.map((rating, index) => { queryParams.append("ratings", rating) })

        queryParams.append("name", nameSearch)

        setFilms([])

        setPage(1)
        if (selectedType.includes("Movie") && !selectedType.includes("TV Show")) {
            filterMovie(queryParams.toString())
                .then((value) => {
                    setFilms(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        else if (!selectedType.includes("Movie") && selectedType.includes("TV Show")) {
            getTVShows(queryParams.toString())
                .then((value) => {
                    setFilms(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        else {

            filterMovie(queryParams.toString())
                .then((value) => {
                    setFilms(prev => prev.concat(value))
                })
                .catch((error) => {
                    console.error(error)
                })
            getTVShows(queryParams.toString())
                .then((value) => {
                    setFilms(prev => prev.concat(value))
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    useEffect(() => {
        let pageNumber = 'page=' + (page - 1)
        if (type === "Movie") {
            filterMovie(pageNumber)
                .then((value) => {
                    setFilms(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        } else if (type === 'TVSeries') {
            getTVShows(pageNumber)
                .then((value) => {
                    console.log('valueee', value)
                    setFilms(value)
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            const params = name ? 'name=' + name + '&' + pageNumber : '';
            filterMovie(params)
                .then((value) => {
                    setFilms(value)
                    getTVShows(params)
                        .then((value) => {
                            setFilms(prevFilms => prevFilms.concat(value));
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [page, name])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "8px",
            }}
        >
            {/* Thanh filter chứa các category */}
            <Box
                sx={{
                    marginTop: "10rem",
                    color: "black",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <TextField
                            sx={{
                                color: "black",
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Search..."
                            onChange={(event) => {
                                setNameSearch(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        {RenderSelectByCategory("Type", type, selectedType, setSelectedType)}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        {RenderSelectByCategory("Genre", genre, selectedGenre, setSelectedGenre)}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        {RenderSelectByCategory("Country", country, selectedCountry, setSelectedCountry)}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        {RenderSelectByCategory("Rating", rating, selectedRating, setSelectedRating)}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        {RenderSelectByCategory("Year", year, selectedYear, setSelectedYear)}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button
                            sx={{
                                border: "1px solid",
                                height: "100%",
                                width: "80%",
                                textAlign: "center",
                            }}
                            onClick={handleClickFilter}
                        >
                            Filter
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {/* END Thanh filter chứa các category */}

            {/* Danh sách phim */}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    padding: "8px",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "75%",
                        marginRight: "2rem",
                        boxShadow: 5,
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >

                    <GridViewMovies films={films} />
                    {/* <GridViewMovies films={films} /> */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "2.5rem",
                            marginBottom: "2rem",
                        }}
                    >
                        <Pagination count={10} showFirstButton showLastButton onChange={handleChangePage} />
                        {/* <Pagination count={10} showFirstButton showLastButton onChange={(e, page) => handleChangePage(page - 1)}/> */}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "25%",
                        boxShadow: 5,
                        borderRadius: "8px",
                        padding: "4px",
                        paddingBottom: "8px",
                    }}
                >
                    <MoviesRecommend films={filmsRecommend} />
                </Box>
            </Box>
            {/* END Danh sách phim */}

        </Box>
    );
}

export default AllFilm;
