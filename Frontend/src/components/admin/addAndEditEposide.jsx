import {
  Alert,
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { createEposide, getSeasonByTvShow, getTVShows } from "../../api/tvShow";
import { STATUS } from "../../utils/contants";
import { updateEpisode } from "../../api/episode";

function alert(type, message) {
  if (type === "success") {
    return <Alert severity="success">{message}</Alert>;
  }
  return <Alert severity="error">{message}</Alert>;
}


function AddAndEditTvEposide({ film, isOpen, setIsOpen, season }) {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [expectedReleaseDate, setExpectedReleaseDate] = useState(null);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const toggleDrawer = (newOpen) => () => {
    setIsOpen(newOpen);
    setOpen(newOpen);
  };

  useEffect(() => {
    if (film) {
      setEpisodeNumber(film?.episodeNumber || 1);
      setName(film?.name || "");
      setDuration(film?.duration || 0);
      setStatus(film?.status || '');
      setExpectedReleaseDate(film?.property?.expectedReleaseDate ? new Date(film?.property?.expectedReleaseDate).toISOString().substring(0, 10) : expectedReleaseDate)
    }
  }, [film]);

  const handleUpload = () => {
    const formData = new FormData();
    if (banner) {
      formData.append("banner", banner);
      formData.append("isChangeBanner", true);
    }else{
      formData.append("isChangeBanner", false);
      formData.append("bannerLink", film?.banner);
    }

    if (banner) {
      formData.append("video", video);
      formData.append("isChangeVideo", true);
    }else{
      formData.append("isChangeVideo", false);
      formData.append("videoLink", film?.video);
    }

    formData.append("expectedReleaseDate", new Date(expectedReleaseDate));
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("status", status);
    formData.append("episodeNumber", episodeNumber);
    formData.append("seasonID", season?.id);
    setLoading(true);
    if(film) {
      updateEpisode(formData, film?.id)
      .then((value) => {
        console.log('updated episode', value);
        if(value === undefined) {
          setIsSuccess(false);
        }else{
          setIsSuccess(true);
        }
        setTimeout(() => {
          setLoading(false);
          setIsOpen(false);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      createEposide(formData)
        .then((data) => {
          console.log("data", data);
          if(data === undefined) {
            setIsSuccess(false);
          }else{
            setIsSuccess(true);
          }
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setIsOpen(false);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
          }, 1500);
        })
        .catch((error) => {
          console.log("error", error);
        }); 
    }
    console.log("Upload");
  };

  const DrawerList = (
    <Box sx={{ width: "50rem", marginTop: "5rem" }} role="presentation">
      <Paper>
        <Typography variant="h5" sx={{ padding: "1rem" }}>
          {film ? "Edit Eposide" : "Add Eposide"}
        </Typography>
        <Box
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Eposide Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            type="number"
            label="Eposide Number"
            variant="outlined"
            fullWidth
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            type="number"
            label="Duration"
            variant="outlined"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS?.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Expected release date"
            variant="outlined"
            type="date"
            fullWidth
            value={expectedReleaseDate}
            onChange={(e) => setExpectedReleaseDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Banner"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setBanner(e.target.files[0])}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Video"
            type="file"
            onChange={(e) => setVideo(e.target.files[0])}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            sx={{
              width: "30%",
              height: "3rem",
              marginLeft: "auto",
              marginBottom: "1rem",
            }}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
      </Paper>
    </Box>
  );
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
      {console.log('filmsdhkf', film)}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {showAlert && (
        <Box
          sx={{
            position: "fixed",
            top: "7rem",
            left: "50%",
          }}
        >
          {isSuccess ? alert("success", "Create episode successfully") : null}
          {isSuccess === false ? alert("error", "Create episode failed") : null}
        </Box>
      )}
    </Box>
  );
}

export default AddAndEditTvEposide;
