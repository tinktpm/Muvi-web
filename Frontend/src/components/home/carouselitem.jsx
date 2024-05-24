import { Button, Dialog, DialogTitle, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import { object } from "yup";
import { useContext, useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { registerFilmCommingSoon } from "../../api/film";
import { AuthContext } from "../../context/AuthContext";

function CarouselItem({ item }) {
  const { user } = useContext(AuthContext);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(formattedDate);
  useEffect(() => {
    console.log("item comming sônnnnn", item);
  }, [item]);

  console.log(
    "date tetstodimhgod",
    new Date().setMonth(new Date().getMonth() + 1)
  );

  const regiserFilm = () => {
    registerFilmCommingSoon({
      filmID: item?.id,
      id: item?.property?.id,
      email: user?.email,
      userID: user?.userId,
      type: item?.type,
      expectedReleaseDate: item?.property?.expectedReleaseDate
        ? item?.property?.expectedReleaseDate
        : formattedDate,
    })
      .then((value) => {
        console.log("register film comming soon", value);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        "&:hover": {
          cursor: "pointer",
        },
        justifyContent: "center",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-end",
          width: "50%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            left: "50%",
          }}
        >
          <Typography
            variant="h20"
            sx={{
              backgroundColor: "grey",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            Full HD
          </Typography>

          <Typography
            variant="h30"
            sx={{
              padding: "0.5rem",
              borderRadius: "50%",
              border: "1px solid grey",
              marginX: "0.5rem",
              fontSize: "0.7rem",
            }}
          >
            Sắp ra mắt
          </Typography>
          <br />
          <Typography
            variant="h5"
            sx={{
              marginY: "1rem",
            }}
          >
            {item?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "50%",
            marginTop: "6rem",
          }}
        >
          <Box
            sx={{
              maxHeight: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              variant="h10"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {truncateText(item?.description, 200)}
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.1rem",
                }}
              >
                <StarIcon fontSize="small" />
                {item?.rating}
              </Box>
              <CircleIcon
                sx={{
                  fontSize: "12px",
                  marginX: "0.5rem",
                }}
              />
              {item?.firstYearRelease}
              <CircleIcon
                sx={{
                  fontSize: "12px",
                  marginX: "0.5rem",
                }}
              />
              {item?.duration} min
            </Box>
            <Typography variant="h10" component="h4">
              {item?.genres?.join(", ")}
            </Typography>
          </Box>
          <Button
            sx={{
              marginTop: "1rem",
              borderRadius: "1rem",
              ":hover": {
                boxShadow: "0 0 10px 0.5px black",
              },
            }}
            onClick={regiserFilm}
            disabled={item?.property?.registerUserIds?.includes(user?.userId)}
          >
            {item?.property?.registerUserIds?.includes(user?.userId) ? 'Đã đăng ký' : 'Đăng ký'}
          </Button>
        </Box>
      </Box>

      <Box
        component="img"
        sx={{
          objectFit: "scale-down",
          width: "50%",
          height: "100%",
          display: "flex",
          pointerEvents: "none",
        }}
        src={item?.banner}
      />
    </Box>
  );
}

export default CarouselItem;
