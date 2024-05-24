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
import AddAndEditTvSeason from "../../components/admin/addAndEditSeason";
import DialogDelete from "../../components/dialogDelete";
import { getSeasonByTvShow } from "../../api/tvShow";
import { getSeasonByFilmID } from "../../api/season";

function createCellMovie(name, duration, img) {
  return (
    <TableCell
      align="left"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        variant="square"
        src={img}
        style={{ height: "50px", width: "50px" }}
      />
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
    </TableCell>
  );
}

function ManageSeason({ setMainContent, tvshow, setObjectIntermediate }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [showDialogDelete, setShowDialogDelete] = React.useState(false);
  const [objectToDelete, setObjectToDelete] = React.useState(null);
  const [seasons, setSeasons] = React.useState([]);
  const [page, setPage] = React.useState(2);
  const [seasonEdit, setSeasonEdit] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (season) => {
    setObjectToDelete(season);
    setShowDialogDelete(true);
  };

  React.useEffect(() => {
    console.log("tvshow", tvshow);
    const id = tvshow?.id;
    getSeasonByFilmID({ tvShowID: "6625e6fe967796ed0924be08" }).then((res) => {
      console.log("res", res);
      setSeasons(res);
    });
  }, []);

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
          Thêm mùa mới
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
                <TableCell align="left">Season</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Company</TableCell>
                <TableCell align="left">Publish Date</TableCell>
                <TableCell align="left">Country</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">Quản lí Episode</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {seasons?.map((season) => (
                <TableRow key={season?.name}>
                  {createCellMovie(
                    season?.name,
                    season?.duration,
                    season?.banner
                  )}
                  <TableCell align="left">{season?.seasonNumber}</TableCell>
                  <TableCell align="left">{season?.name}</TableCell>
                  <TableCell align="left">
                    {season?.productionCompany}
                  </TableCell>
                  <TableCell align="left">{season?.firstYearRelease}</TableCell>
                  <TableCell align="left">{season?.countryOfOrigin}</TableCell>
                  <TableCell align="left">
                    <Tooltip title="Edit Movie">
                      <IconButton
                        onClick={() => {
                          setOpenEdit(true);
                          setSeasonEdit(season);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Movie">
                      <IconButton onClick={() => handleDelete(season?.name)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                      onClick={() => {
                        setMainContent("Eposides");
                        setObjectIntermediate(season);
                      }}
                    >
                      Quản lí
                    </Button>
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
      <AddAndEditTvSeason
        isOpen={openEdit}
        setIsOpen={setOpenEdit}
        tvshow={tvshow}
        film={seasonEdit}
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

export default ManageSeason;
