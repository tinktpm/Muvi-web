import {
  Alert,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
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
import { createSeason } from "../../api/tvShow";
import { COUNTRY, GENRES, STATUS } from "../../utils/contants";
import { updateSeason } from "../../api/season";

function alert(type, message) {
  if (type === "success") {
    return <Alert severity="success">{message}</Alert>;
  }
  return <Alert severity="error">{message}</Alert>;
}

function AddAndEditTvSeason({ film, isOpen, setIsOpen, tvshow }) {
  const [open, setOpen] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState(film?.genres || []);
  const [categories, setCategories] = useState(GENRES);
  const [banner, setBanner] = useState(null);
  const [expectedReleaseDate, setExpectedReleaseDate] = useState(null);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [firstYearRelease, setFirstYearRelease] = useState(0);
  const [countryOfOrigin, setCountryOfOrigin] = useState(COUNTRY);
  const [countrySelected, setCountrySelected] = useState("");
  const [status, setStatus] = useState("");
  const [seasonNumber, setSeasonNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (film?.genres) {
      setCategoriesSelected(film.genres);
    }
  }, [film]);

  const toggleDrawer = (newOpen) => () => {
    setIsOpen(newOpen);
    setOpen(newOpen);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoriesSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeCountry = (e) => {
    setCountrySelected(e.target.value);
  };

  useEffect(() => {
    if (film) {
      setName(film?.name);
      setDuration(film?.duration);
      setFirstYearRelease(film?.firstYearRelease);
      setCountrySelected(film?.countryOfOrigin);
      setStatus(film?.status);
      setDescription(film?.description);
      setSeasonNumber(film?.seasonNumber);
      setExpectedReleaseDate(film?.property?.expectedReleaseDate ? new Date(film?.property?.expectedReleaseDate)?.toISOString().substring(0, 10) : expectedReleaseDate);

    }
  }, [film]);

  const handleUpload = () => {
    setLoading(true);
    console.log("uploading", tvshow); 
    const formData = new FormData();
    if (banner) {
      formData.append("banner", banner);
      formData.append("isChangeBanner", true);
    }else{
      formData.append("isChangeBanner", false);
      formData.append("bannerLink", tvshow?.banner);
    }
    formData.append("expectedReleaseDate", new Date(expectedReleaseDate));
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("firstYearRelease", firstYearRelease);
    formData.append("countryOfOrigin", countrySelected);
    formData.append("productionCompany", tvshow?.productionCompany);
    formData.append("status", status);
    categoriesSelected.forEach((genre) => formData.append("genres[]", genre));
    formData.append("seasonNumber", seasonNumber);
    formData.append("tvShowID", tvshow?.id);
    formData.append("description", description);
    console.log("upload");
    if(film) {
      updateSeason(formData, film?.id)
      .then((value) => {
        console.log('updated season', value);
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
      createSeason(formData)
        .then((value) => {
          console.log("created season", value);
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
          setIsSuccess(false);
          setTimeout(() => {
            setLoading(false);
            setIsOpen(false);
            setShowAlert(true);
          }, 2000);
        });
    }
  };

  const DrawerList = (
    <Box sx={{ width: "50rem", marginTop: "5rem" }} role="presentation">
      <Paper>
        <Typography variant="h5" sx={{ padding: "1rem" }}>
          {film ? "Edit Season" : "Add Season"}
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
            label="Season Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="First Year Released"
            variant="outlined"
            type="number"
            fullWidth
            value={firstYearRelease}
            onChange={(e) => setFirstYearRelease(e.target.value)}
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
            label="Season Number"
            type="number"
            variant="outlined"
            fullWidth
            value={seasonNumber}
            onChange={(e) => setSeasonNumber(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Country of origin
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countrySelected}
              label="Country of Origin"
              onChange={handleChangeCountry}
            >
              {countryOfOrigin?.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Duration"
            type="number"
            variant="outlined"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

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

          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={categoriesSelected}
            onChange={handleChange}
            input={<OutlinedInput label="Genres" />}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              width: "100%",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={categoriesSelected.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Banner"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setBanner(e.target.files[0])}
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
          {isSuccess ? alert("success", "Create season successfully") : null}
          {isSuccess === false ? alert("error", "Create season failed") : null}
        </Box>
      )}
    </Box>
  );
}

export default AddAndEditTvSeason;
