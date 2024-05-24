import {
  Alert,
  Avatar,
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
import { createTvShow, updateTvShow } from "../../api/tvShow";
import { COUNTRY, GENRES, STATUS } from "../../utils/contants";

function alert(type, message) {
  if (type === "success") {
    return <Alert severity="success">{message}</Alert>;
  }
  return <Alert severity="error">{message}</Alert>;
}

function AddAndEditTvShow({ film, isOpen, setIsOpen }) {
  const [open, setOpen] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState( film ? film?.genres : []);
  const [categories, setCategories] = useState(GENRES);
  const [banner, setBanner] = useState(null);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [firstYearRelease, setFirstYearRelease] = useState(0);
  const [countryOfOrigin, setCountryOfOrigin] = useState(COUNTRY);
  const [countrySelected, setCountrySelected] = useState("");
  const [productionCompany, setProductionCompany] = useState("");
  const [status, setStatus] = useState("");
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
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
      setOpen(newOpen);
      setIsOpen(newOpen);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoriesSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    if (film) {
      setName(film.name);
      setDuration(film.duration);
      setFirstYearRelease(film.firstYearRelease);
      setCountrySelected(film.countryOfOrigin);
      setProductionCompany(film.productionCompany);
      setStatus(film.status);
      setActors(film.actors);
      setDescription(film.description);

    }
  }, [film]);

  const handleUpload = () => {
    const formData = new FormData();
    if (banner) {
      formData.append("banner", banner);
      formData.append("isChangeBanner", true);
    } else {
      formData.append("isChangeBanner", false);
      formData.append("bannerLink", film?.banner);
    }
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("firstYearRelease", firstYearRelease);
    formData.append("countryOfOrigin", countrySelected);
    formData.append("productionCompany", productionCompany);
    formData.append("status", status);
    categoriesSelected.forEach((genre) => formData.append("genres[]", genre));
    actors.forEach((actor) => formData.append("actors[]", actor));
    formData.append("description", description);
    setLoading(true);
    if (film) {
      updateTvShow(formData, film?.id)
        .then((data) => {
          if(data === undefined) {
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
          console.error("error", error);
          setIsSuccess(false);
          setTimeout(() => {
            setLoading(false);
            setIsOpen(false);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
          }, 1500);
        });
    }else{
        createTvShow(formData)
            .then((data) => {
                console.log('data create tv show', data);
                if(data === undefined) {
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
                console.error('error', error);
                setIsSuccess(false);
                setTimeout(() => {
                  setLoading(false);
                  setIsOpen(false);
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 2000);
                }, 1500);
            })
    }
    
  }

  const DrawerList = (
    <Box sx={{ width: "50rem", marginTop: "5rem" }} role="presentation">
      <Paper>
        <Typography variant="h5" sx={{ padding: "1rem" }}>
          {film ? "Edit TV Show" : "Add TV Show"}
        </Typography>
        <Box
            sx={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
          {
            film ? (
              <Avatar
                alt="Image Film"
                src={film?.banner}
                sx={{ 
                  width: 80, height: 80 ,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            ) : (
              <></>
            )
          }
          <TextField
            id="outlined-basic"
            label="TV Show Name"
            variant="outlined"
            fullWidth
            value={name}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Duration"
            variant="outlined"
            fullWidth
            value={duration}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setDuration(e.target.value)}

          />
           <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setCountrySelected(e.target.value)}
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
            label="Casts / Crews"
            variant="outlined"
            fullWidth
            value={actors.join(',')}
            helperText="Enter casts and crews separated by ',' "
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setActors(e.target.value.split(","))}

          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Status
            </InputLabel>
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
            label="Company"
            variant="outlined"
            fullWidth
            value={productionCompany}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setProductionCompany(e.target.value)}
          />

          
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
             Genres
            </InputLabel>
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
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Year release"
            variant="outlined"
            fullWidth
            type="number"
            value={firstYearRelease}
            InputLabelProps={{ shrink: true }}
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
          />

          <TextField
            label="Banner"
            type="file"
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setBanner(e.target.files[0])}
          />

        <Button
            sx={{
                width:'30%',
                height: '3rem',
                marginLeft: 'auto',
                marginBottom: '1rem',
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

export default AddAndEditTvShow;
