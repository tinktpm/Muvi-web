import { Grid } from "@mui/material";
import MovieItem from "./movieItem";

function GridViewMovies({ films }) {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                width: "100%",
                marginTop: "16px",
                padding: "8px",
            }}
        >

            {films?.map((movie, index) => {
                return (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}
                        // sx={{
                        //     hover: {
                        //         boxShadow: '0 0 4px 0 rgba(0,0,0,0.2)',
                        //         cursor: 'pointer',
                        //     }
                        // }}
                    >
                        <MovieItem film={movie} />
                    </Grid>
                )
            })}

        </Grid>
    );
}

export default GridViewMovies;
