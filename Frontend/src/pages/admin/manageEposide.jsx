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
import AddAndEditTvEposide from "../../components/admin/addAndEditEposide";
import DialogDelete from "../../components/dialogDelete";
import { getEposide } from "../../api/tvShow";
import { getEpisodeBySeasonID } from "../../api/episode";

function createCellMovie(name, duration, img) {
  return (
    <Box
      align="left"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar variant="square" src={img} style={{height: '50px', width: '60px'}}/>
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

function ManageEposide({season}) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [episodes, setEpisodes] = React.useState(null);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showDialogDelete, setShowDialogDelete] = React.useState(false);
  const [objectToDelete, setObjectToDelete] = React.useState(null);
  const [episodeEdit, setEpisodeEdit] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleDelete = (season) => {
    setObjectToDelete(season);
    setShowDialogDelete(true)
    console.log("Delete");
  };

  React.useEffect(() => {
    
      getEpisodeBySeasonID({seasonID: season?.id}).then((data) => {
          console.log(data);
          setEpisodes(data);
      })
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
        <TextField id="outlined-basic" label="Search..." variant="outlined" />
        <Button
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={() => setOpenEdit(true)}
        >
          Thêm tập phim mới
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
                <TableCell align="left">Info</TableCell>
                <TableCell align="left">Season</TableCell>
                <TableCell align="left">Eposide</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Publish Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {episodes?.map((episode) => (
                <TableRow key={episode?.id}>
                  <TableCell align="left">
                    {createCellMovie(episode?.name, episode?.duration, episode?.banner)}
                  </TableCell>
                  <TableCell align="left">{season?.name}</TableCell>
                  <TableCell align="left">{episode?.episodeNumber}</TableCell>
                  <TableCell align="left">{episode?.name}</TableCell>
                  <TableCell align="left">{episode?.status}</TableCell>
                  <TableCell align="left">{new Date(episode?.property?.expectedReleaseDate).toLocaleDateString()}</TableCell>
                  <TableCell align="left">
                    <Tooltip title="Edit Movie">
                      <IconButton
                        onClick={() => {
                          setOpenEdit(true);
                          setEpisodeEdit(episode);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Movie">
                      <IconButton
                        onClick={() => handleDelete(row.name)}
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
          defaultPage={6}
          boundaryCount={2}
          sx={{
            marginTop: "2rem",
          }}
        />
      </Box>
      <AddAndEditTvEposide film={episodeEdit} isOpen={openEdit} setIsOpen={setOpenEdit} season={season}/>
      {
          showDialogDelete && <DialogDelete setOpenDialog={setShowDialogDelete} objectToDelete={objectToDelete}/>
        }
    </Box>
  );
}

export default ManageEposide;
