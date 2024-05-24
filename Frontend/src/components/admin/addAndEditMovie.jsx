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
import { createMovie, updateMovie } from "../../api/movie";
import { COUNTRY, GENRES, STATUS } from "../../utils/contants";


function alert(type, message) {
  if (type === "success") {
    return <Alert severity="success">{message}</Alert>;
  }
  return <Alert severity="error">{message}</Alert>;
}


function AddAndEditMovie({ film, isOpen, setIsOpen }) {
  console.log("isOpenppppppp", isOpen);
  const [open, setOpen] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState(film ? film?.genres : []);
  const [categories, setCategories] = useState(GENRES);
  const [banner, setBanner] = useState(null);
  const [video, setVideo] = useState(null);
  const [expectedReleaseDate, setExpectedReleaseDate] = useState(null);
  const [name, setName] = useState(film?.name || "");
  const [duration, setDuration] = useState(film?.duration || 0);
  const [firstYearRelease, setFirstYearRelease] = useState(0);
  const [countryOfOrigin, setCountryOfOrigin] = useState(film?.countryOfOrigin || '');
  const [productionCompany, setProductionCompany] = useState(film?.productionCompany || '');
  const [status, setStatus] = useState(film?.status || '');
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState(film?.actors || []);
  const [description, setDescription] = useState(film?.description || '');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (film) {
      setName(film?.name || "");
      setDuration(film?.duration || 0);
      setFirstYearRelease(film?.firstYearRelease || 0);
      setCountryOfOrigin(film?.countryOfOrigin || '');
      setProductionCompany(film?.productionCompany || '');
      setStatus(film?.status || '');
      setActors(film?.actors || []);
      setDescription(film?.description || '');
      setExpectedReleaseDate(film?.property?.expectedReleaseDate ? new Date(film?.property?.expectedReleaseDate).toISOString().substring(0, 10) : expectedReleaseDate)
    }
  }, [film]);

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
    setCategoriesSelected(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleUpload = () => {
    const formData = new FormData();
    if (banner) {
      formData.append("banner", banner);
      formData.append("isChangeBanner", true);
      formData.append("bannerLink", film?.banner)
    }else{
      formData.append("isChangeBanner", false);
      formData.append("bannerLink", film?.banner);
    }

    if (video) {
      formData.append("video", video);
      formData.append("isChangeVideo", true);
      formData.append("videoLink", film?.video);
    }else{
      formData.append("isChangeVideo", false);
      formData.append("videoLink", film?.video);
    }

    formData.append("expectedReleaseDate", new Date(expectedReleaseDate));
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("firstYearRelease", firstYearRelease);
    formData.append("countryOfOrigin", countryOfOrigin);
    formData.append("productionCompany", productionCompany);
    formData.append("status", status);
    categoriesSelected.forEach((genre) => formData.append("genres[]", genre));
    actors.forEach((actor) => formData.append("actors[]", actor));
    formData.append("description", description);
    setLoading(true);
    if(film) {
      updateMovie(formData, film?.id)
      .then((value) => {
        console.log('updated movie', value);
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
      createMovie(formData)
      .then((value) => {
        console.log('created movie', value);
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
    }
  };

  const DrawerList = (
    <Box sx={{ width: "50rem", marginTop: "5rem" }} role="presentation">
      <Paper>
        <Typography variant="h5" sx={{ padding: "1rem" }}>
          {film ? "Edit Movie" : "Add Movie"}
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
            label="Movie Name"
            variant="outlined"
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Duration"
            variant="outlined"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country of origin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryOfOrigin}
              label="Countryoforigin"
              onChange={(e) => setCountryOfOrigin(e.target.value)}
            >
              {COUNTRY?.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

           <TextField
            id="outlined-basic"
            label="Company"
            variant="outlined"
            fullWidth
            value={productionCompany}
            onChange={(e) => setProductionCompany(e.target.value)}
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
            label="Casts / Crews"
            variant="outlined"
            helperText='Separate by ","'
            fullWidth
            value={actors}
            onChange={(e) => setActors(e.target.value.split(","))}
          />
           <TextField
            id="outlined-basic"
            label="Year release"
            variant="outlined"
            fullWidth
            type="number"
            value={firstYearRelease}
            InputProps={{
              inputProps: { 
                min: 1900, max: new Date().getFullYear() 
              }
            }}
            onChange={(e) => {
              const year = e.target.value;
              // if (year >= 1900 && year <= new Date().getFullYear()) {
                
              // }
              setFirstYearRelease(year);
            }}
            InputLabelProps={{
              shrink: true,
            }}
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
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              width: "100%",
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

      {console.log('fimlmasfa', film)}
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

export default AddAndEditMovie;
