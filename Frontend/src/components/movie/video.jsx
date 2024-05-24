import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Alert,
  CardActionArea,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import StorageIcon from "@mui/icons-material/Storage";
import useWebSocket from "react-use-websocket";
import { AuthContext } from "../../context/AuthContext";
import { getWatchList, updateWatchList } from "../../api/watchlist";
import CheckIcon from "@mui/icons-material/Check";
import { getViewedFilm } from "../../api/view";

function Video({ video, filmID }) {
  const { sendMessage, lastMessage } = useWebSocket(
    "ws://localhost:8080/api/v1/update_history_film",
    { share: true }
  );

  const videoRef = React.useRef(null);
  const [duration, setDuration] = React.useState(null);
  const { user } = React.useContext(AuthContext);
  const [openWatchList, setOpenWatchList] = React.useState(false);
  const [watchList, setWatchList] = React.useState([{}]);
  const [openDialogAddWatchList, setOpenDialogAddWatchList] =
    React.useState(false);
  const [openDialogAddWatchListSuccess, setOpenDialogAddWatchListSuccess] =
    React.useState(false);
  const [isAddedToWatchList, setIsAddedToWatchList] = React.useState(false);

  React.useEffect(() => {
    getWatchList({ userID: user?.userId })
      .then((value) => {
        setWatchList(value);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user, openDialogAddWatchListSuccess]);

  React.useEffect(() => {
    getViewedFilm(filmID, user?.userId)
      .then((value) => {
        setDuration(value.duration)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user])

  const addToWatchList = (watchListID) => {
    updateWatchList("add", watchListID, filmID)
      .then((value) => {
        setOpenDialogAddWatchListSuccess(true);
        setTimeout(() => {
          setOpenDialogAddWatchList(true);
          setTimeout(() => {
            setOpenDialogAddWatchList(false);
          }, 2000);
        }, 1000);
      })
      .catch((error) => {
        setOpenDialogAddWatchListSuccess(false);
        setTimeout(() => {
          setOpenDialogAddWatchList(true);
          setTimeout(() => {
            setOpenDialogAddWatchList(false);
          }, 2000);
        }, 1000);
        console.error(error);
      });
  };

  const checkAddedToWatchList = () => {
    return watchList?.some((item) => {
      const isFilmInMovies = item.movies?.some((movie) => movie.id === filmID);
      const isFilmInTvShows = item.tvshows?.some(
        (tvshow) => tvshow.id === filmID
      );
      return isFilmInMovies || isFilmInTvShows;
    });
  };

  React.useEffect(() => {
    const isAdded = checkAddedToWatchList();

    setIsAddedToWatchList(isAdded);
  }, [watchList]);

  const [updatedTime, setUpdatedTime] = React.useState(0)

  React.useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      const { currentTime } = videoElement;
      setUpdatedTime(currentTime);
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  React.useEffect(() => {
    sendMessage(
      JSON.stringify({
        userID: user?.userId,
        filmID,
        duration: updatedTime,
      })
    );
  }, [updatedTime]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      
      setUpdatedTime(duration)
      setDuration(duration);
      videoRef.current.currentTime = duration
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "8px",
        }}
      >
        <video
          ref={videoRef}
          src={video}
          controls
          width="100%"
          height="100%"
          onLoadedMetadata={handleLoadedMetadata}
        />
          {/* <source src={video} type="video/mp4" />
        </video> */}
        <CardActionArea>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                gap: "2.5rem",
                display: "flex",
                backgroundColor: "rgba(25, 21, 56, 1)",
                borderRadius: 5,
                padding: 2,
                color: "white",
                width: "25%",
                height: "3rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  borderRadius: 5,
                  "&:hover": {
                    backgroundColor: "rgba(44, 20, 58, 1.0)",
                    borderColor: "rgba(238, 15, 89, 1.0)",
                    borderWidth: 1,
                    borderStyle: "solid",
                  },
                  padding: "4px 8px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StorageIcon
                    fontSize="small"
                    sx={{
                      marginRight: "4px",
                    }}
                  />
                  Server
                </Typography>
                <Typography variant="h5">One</Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                  borderRadius: 5,
                  "&:hover": {
                    backgroundColor: "rgba(44, 20, 58, 1.0)",
                    borderColor: "rgba(238, 15, 89, 1.0)",
                    borderWidth: 1,
                    borderStyle: "solid",
                  },
                  padding: "4px 8px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StorageIcon
                    fontSize="small"
                    sx={{
                      marginRight: "4px",
                    }}
                  />
                  Server
                </Typography>
                <Typography variant="h5">Two</Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                  borderRadius: 5,
                  "&:hover": {
                    backgroundColor: "rgba(44, 20, 58, 1.0)",
                    borderColor: "rgba(238, 15, 89, 1.0)",
                    borderWidth: 1,
                    borderStyle: "solid",
                  },
                  padding: "4px 8px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StorageIcon
                    fontSize="small"
                    sx={{
                      marginRight: "4px",
                    }}
                  />
                  Server
                </Typography>
                <Typography variant="h5">Three</Typography>
              </Box>
            </Box>
            {user || isAddedToWatchList ? (
              <Button
                sx={{
                  right: 0,
                  position: "absolute",
                  whiteSpace: "normal",
                  width: "10rem",
                  marginRight: "16px",
                  marginTop: "4px",
                }}
                disabled={isAddedToWatchList}
                onClick={() => setOpenWatchList(true)}
              >
                {isAddedToWatchList
                  ? "Đã thêm vào danh sách xem"
                  : "Thêm vào danh sách xem sau"}
              </Button>
            ) : (
              <></>
            )}

            <Dialog
              open={openWatchList}
              onClose={() => setOpenWatchList(false)}
            >
              <DialogTitle>Danh sách xem</DialogTitle>
              {watchList?.map((item) => {
                return (
                  <IconButton
                    key={item?.id}
                    onClick={() => {
                      addToWatchList(item?.id);
                      setOpenWatchList(false);
                    }}
                  >
                    {item?.name}
                  </IconButton>
                );
              })}
            </Dialog>


          </CardContent>
        </CardActionArea>
        {openDialogAddWatchList ? (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity={openDialogAddWatchListSuccess ? "success" : "error"}
          >
            {openDialogAddWatchListSuccess
              ? "Thêm vào danh sách xem thành công"
              : "Thêm vào danh sách xem thất bại"}
          </Alert>
        ) : (
          <></>
        )}
      </Card>
    </Box>
  );
  // function Video({ video }) {
  //   const [videoError, setVideoError] = React.useState(false);
  //   const handleVideoError = () => {
  //     setVideoError(true);
  //   };

  //   const videoUrl = "https://www.youtube.com/watch?v=J1jzs6dk4bs";
  //   return (
  //     <Box
  //       sx={{
  //         width: "100%",
  //         height: "50%",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Card
  //         sx={{
  //           width: "100%",
  //           height: "100%",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           flexDirection: "column",
  //           marginTop: "8px",
  //         }}
  //       >
  //         {videoError ? (
  //           <CardMedia
  //             component="video"
  //             src={videoUrl}
  //             autoPlay
  //             controls
  //             sx={{
  //               width: "70%",
  //               objectFit: "contain",
  //             }}
  //           />
  //         ) : (
  //           <CardMedia
  //             component="video"
  //             src={video}
  //             autoPlay
  //             controls
  //             onError={handleVideoError}
  //             sx={{
  //               width: "70%",
  //               objectFit: "contain",
  //             }}
  //           />
  //         )}
  //         <CardActionArea>
  //           <CardContent
  //             sx={{
  //               display: "flex",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <Box
  //               sx={{
  //                 gap: "2.5rem",
  //                 display: "flex",
  //                 backgroundColor: "rgba(25, 21, 56, 1)",
  //                 borderRadius: 5,
  //                 padding: 2,
  //                 color: "white",
  //                 width: "25%",
  //                 height: "3rem",
  //                 justifyContent: "center",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Box
  //                 sx={{
  //                   textAlign: "center",
  //                   borderRadius: 5,
  //                   "&:hover": {
  //                     backgroundColor: "rgba(44, 20, 58, 1.0)",
  //                     borderColor: "rgba(238, 15, 89, 1.0)",
  //                     borderWidth: 1,
  //                     borderStyle: "solid",
  //                   },
  //                   padding: "4px 8px",
  //                 }}
  //               >
  //                 <Typography
  //                   variant="subtitle1"
  //                   sx={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <StorageIcon
  //                     fontSize="small"
  //                     sx={{
  //                       marginRight: "4px",
  //                     }}
  //                   />
  //                   Server
  //                 </Typography>
  //                 <Typography variant="h5">One</Typography>
  //               </Box>
  //               <Box
  //                 sx={{
  //                   textAlign: "center",
  //                   borderRadius: 5,
  //                   "&:hover": {
  //                     backgroundColor: "rgba(44, 20, 58, 1.0)",
  //                     borderColor: "rgba(238, 15, 89, 1.0)",
  //                     borderWidth: 1,
  //                     borderStyle: "solid",
  //                   },
  //                   padding: "4px 8px",
  //                 }}
  //               >
  //                 <Typography
  //                   variant="subtitle1"
  //                   sx={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <StorageIcon
  //                     fontSize="small"
  //                     sx={{
  //                       marginRight: "4px",
  //                     }}
  //                   />
  //                   Server
  //                 </Typography>
  //                 <Typography variant="h5">Two</Typography>
  //               </Box>
  //               <Box
  //                 sx={{
  //                   textAlign: "center",
  //                   borderRadius: 5,
  //                   "&:hover": {
  //                     backgroundColor: "rgba(44, 20, 58, 1.0)",
  //                     borderColor: "rgba(238, 15, 89, 1.0)",
  //                     borderWidth: 1,
  //                     borderStyle: "solid",
  //                   },
  //                   padding: "4px 8px",
  //                 }}
  //               >
  //                 <Typography
  //                   variant="subtitle1"
  //                   sx={{
  //                     display: "flex", // This will make the Typography a flex container
  //                     alignItems: "center", // This will center the items vertically
  //                   }}
  //                 >
  //                   <StorageIcon
  //                     fontSize="small"
  //                     sx={{
  //                       marginRight: "4px",
  //                     }}
  //                   />
  //                   Server
  //                 </Typography>
  //                 <Typography variant="h5">Three</Typography>
  //               </Box>
  //             </Box>
  //             <Button
  //               sx={{
  //                 right: 0,
  //                 position: "absolute",
  //                 whiteSpace: "normal",
  //                 width: "10%",
  //                 marginRight: "16px",
  //                 marginTop: "4px",
  //               }}
  //             >
  //               Thêm vào danh sách xem sau
  //             </Button>
  //           </CardContent>
  //         </CardActionArea>
  //       </Card>
  //     </Box>
  //   );
  // }
}

export default Video;
