import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import CarouselItem from "./carouselitem";
import { useEffect, useState } from "react";
import { getCommingSoonFilm } from "../../api/film";

function CarouselComponent({ items }) {
  const [comingSoonFilm, setComingSoonFilm] = useState([]);
  useEffect(() => {
    getCommingSoonFilm()
      .then((value) => {
        console.log("coming soon filmmmm", value);
        setComingSoonFilm([...value?.movies, ...value?.tvShows]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Box
      sx={{
        margin: "2rem auto",
        maxWidth: "80vw",
      }}
    >
      <Carousel
        indicatorContainerProps={{
          style: {
            marginTop: "4rem",
          },
        }}
        height={"400px"}
        sx={{
          padding: "1.5rem",
        }}
      >
        {comingSoonFilm?.map((item, i) => {
          return <CarouselItem key={i} item={item} />;
        })}
      </Carousel>
    </Box>
  );
}

export default CarouselComponent;
