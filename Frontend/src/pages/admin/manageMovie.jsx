import {
  Box,
  Button,
  IconButton,
  Pagination,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import AddAndEditMovie from "../../components/admin/addAndEditMovie";
import DialogDelete from "../../components/dialogDelete";
import { deleteMovieById, filterMovie } from "../../api/movie";

function createCellMovie(name, duration, img) {
  return (
    <Box
      align="left"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar variant="square" src={img} />
      <Box
        sx={{
          marginLeft: "1rem",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>
        <Typography>{duration}</Typography>
      </Box>
    </Box>
  );
}

function ManageMovie() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showDialogDelete, setShowDialogDelete] = React.useState(false);
  const [objectToDelete, setObjectToDelete] = React.useState(null);
  const [movies, setMovies] = React.useState([]);
  const [movieEdit, setMovieEdit] = React.useState(null);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const handleChangePage = (event, newPage) => {
    console.log('newPage', newPage);
    setPage(newPage);
  };

  const handleDelete = (movie) => {
    setObjectToDelete(movie);
    setShowDialogDelete(true)
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
      setTimeout(() => {
        let params = 'name='+search+'&page='+(page-1);
        filterMovie(params).then((res) => {
          if (res) {
            console.log('res by page', res);
            setMovies(res);
          }
        }
        );
      }, 1000)
  
  }, [searchValue, page]);


  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField id="outlined-basic" label="Search..." variant="outlined" onChange={handleSearch}/>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: '12px'
            }}
            onClick={
              () => setSearchValue(search)
            }
          >
            Tìm
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          Thêm phim mới
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
          flexDirection: "column",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "grey.500",
                }}
              >
                <TableCell align="left">Movie</TableCell>
                <TableCell align="left">Quality</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Publish Date</TableCell>
                <TableCell align="left">Added Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie?.id}>
                    <TableCell>
                      {createCellMovie(movie?.name, movie?.duration, movie?.banner)}
                    </TableCell>
                    <TableCell align="left">{movie?.productionCompany}</TableCell>
                    <TableCell align="left">{movie?.genres?.join(', ')}</TableCell>
                    <TableCell align="left">{movie?.firstYearRelease}</TableCell>
                    <TableCell align="left">11/04/2024</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Edit Movie">
                        <IconButton
                          onClick={() => {
                            setOpenEdit(true);
                            setMovieEdit(movie);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Movie">
                        <IconButton
                          onClick={() => handleDelete(movie)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={11}
          page={page}
          onChange={handleChangePage}
          boundaryCount={2}
          sx={{
            marginTop: "2rem",
          }}
        />
      </Box>
      <AddAndEditMovie isOpen={openEdit} setIsOpen={setOpenEdit} film={movieEdit}/>
      {
        showDialogDelete && <DialogDelete setOpenDialog={setShowDialogDelete} objectToDelete={objectToDelete}/>
      }
    </Box>
  );
}

export default ManageMovie;
