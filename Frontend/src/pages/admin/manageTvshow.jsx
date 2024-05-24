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
import AddAndEditTvShow from "../../components/admin/addAndEditTvShow";
import DialogDelete from "../../components/dialogDelete";
import { getTVShows } from "../../api/tvShow";

function createCellMovie(name, duration, img) {
  return (
    <Box
      align="left"
      sx={{
        display: "flex",
        // justifyContent: "center",
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {name}
        </Typography>
        <Typography>{duration}</Typography>
      </Box>
    </Box>
  );
}

function ManageTvshow({ setMainContent, setObjectIntermediate }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [showDialogDelete, setShowDialogDelete] = React.useState(false);
  const [objectToDelete, setObjectToDelete] = React.useState(null);
  const [tvShows, setTvShows] = React.useState([]);
  const [tvShowEdit, setTvShowEdit] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (tvShow) => {
    setObjectToDelete(tvShow);
    setShowDialogDelete(true);
    console.log("Delete");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    setTimeout(() => {
      let params = "name=" + search + "&page=" + (page - 1);
      getTVShows(params).then((res) => {
        if (res) {
          setTvShows(res);
        }
      });
    }, 1000);
  }, [searchValue, page]);

  React.useEffect(() => {
    getTVShows("page=" + (page - 1)).then((data) => {
      console.log("data", data);
      setTvShows(data);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search..."
            variant="outlined"
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: "12px",
            }}
            onClick={() => setSearchValue(search)}
          >
            Tìm
          </Button>
        </Box>
        <Button
          variant="contained"
          sx={{
            marginLeft: "1rem",
            height: "100%",
          }}
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          Thêm TV Show mới
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
                <TableCell align="left">TV Show</TableCell>
                <TableCell align="left">Company</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Publish Date</TableCell>
                <TableCell align="left">Added Date</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">Quản lí Season</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tvShows.map((tvShow) => (
                <TableRow key={tvShow?.id}>
                  <TableCell>
                    {createCellMovie(
                      tvShow?.name,
                      tvShow?.duration,
                      tvShow?.banner
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {tvShow?.productionCompany}
                  </TableCell>
                  <TableCell align="left">
                    {tvShow?.genres?.join(", ")}
                  </TableCell>
                  <TableCell align="left">{tvShow?.firstYearRelease}</TableCell>
                  <TableCell align="left">11/04/2024</TableCell>
                  <TableCell align="left">
                    <Tooltip title="Edit Movie">
                      <IconButton
                        onClick={() => {
                          setOpenEdit(true);
                          setTvShowEdit(tvShow);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Movie">
                      <IconButton onClick={() => handleDelete(tvShow)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "green",
                      }}
                      onClick={() => {
                        setMainContent("Seasons");
                        setObjectIntermediate(tvShow);
                      }}
                    >
                      Quản lí Season
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={11}
          onChange={handleChangePage}
          sx={{
            marginTop: "2rem",
          }}
        />
      </Box>

      <AddAndEditTvShow
        isOpen={openEdit}
        setIsOpen={setOpenEdit}
        film={tvShowEdit}
      />
      {showDialogDelete && (
        <DialogDelete
          setOpenDialog={setShowDialogDelete}
          objectToDelete={objectToDelete}
        />
      )}
    </Box>
  );
}

export default ManageTvshow;
