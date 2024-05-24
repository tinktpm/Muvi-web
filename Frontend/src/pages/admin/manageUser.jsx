import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Pagination,
  TablePagination,
  TextField,
  Tooltip,
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
import { blockedUser, deleteUser, getAllUsers, getUserByEmail } from "../../api/user";

function dialog(message, type, setOpenDialog, object) {
  const agree = () => {
    if (type === "block") {
      blockedUser(object?._id, true).then((res) => {
        console.log(res);
      });
    }

    if (type === "delete") {
      deleteUser(object?._id).then((res) => {
        console.log(res);
      });
    }

    if (type === "unblock") {
      console.log(type, object?._id);
      blockedUser(object?._id, false).then((res) => {
        console.log(res);
      });
    }
    setOpenDialog(false);
  };

  return (
    <Dialog open={true} onClose={() => setOpenDialog(false)}>
      <DialogTitle>{message}</DialogTitle>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button
          onClick={agree}
          sx={{
            backgroundColor: type !== "unblock" ? "red" : "green",
            color: "white",
            ":hover": {
              backgroundColor:
                type !== "unblock" ? "error.light" : "success.light",
            },
          }}
        >
          {type === "block" ? "Block" : ""}
          {type === "delete" ? "Delete" : ""}
          {type === "unblock" ? "UnBlock" : ""}
        </Button>
      </Box>
    </Dialog>
  );
}

function ManageUser() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openDialogBlock, setOpenDialogBlock] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [openBlock, setOpenBlock] = React.useState(false);
  const [userBlocked, setUserBlocked] = React.useState(null);
  const [userDeleted, setUserDeleted] = React.useState(null);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  const handleDelete = (userDeleted) => {
    setOpenDialogDelete(true);
    setUserDeleted(userDeleted);
  };

  const handleBlock = (userBlocked) => {
    setUserBlocked(userBlocked);
    if (userBlocked?.isBlocked) {
      setOpenBlock(true);
    } else {
      setOpenDialogBlock(true);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
   
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        const params = "page=" + pageNumber;
        let searchingEmail = event.target.value;
        if (event.target.value === "") {
          searchingEmail = ''
          getAllUsers(params).then((res) => {
            setUsers(res);
          });
          return
        }
        getUserByEmail(searchingEmail)
        .then((res) => {
          console.log(res);
          setUsers(res);
        });
      }, 3600)
    );
  };

  React.useEffect(() => {
    const params = "page=" + pageNumber;
    getAllUsers(params).then((res) => {
      setUsers(res);
    });
  }, [openDialogDelete, openDialogBlock, openBlock, page]);

  return (
    <Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          onChange={handleSearch}
        />
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
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Privilege</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Join Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users?.map((user) => (
                <TableRow key={user?.name}>
                  <TableCell align="left">
                    <Avatar />
                  </TableCell>
                  <TableCell align="left">{user?.name}</TableCell>
                  <TableCell align="left">{user?.email}</TableCell>
                  <TableCell align="left">
                    {user?.isVip ? "Vip" : "Normal"}
                  </TableCell>
                  <TableCell align="left">
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </TableCell>
                  <TableCell align="left">
                    {user?.birthdate?.toLocaleString()}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip
                      title={user?.isBlocked ? "Unblock User" : "Block User"}
                    >
                      <IconButton onClick={() => handleBlock(user)}>
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton onClick={() => handleDelete(user)}>
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
          boundaryCount={2}
          onChange={handlePageChange}
          sx={{
            marginTop: "2rem",
          }}
        />
      </Box>

      {/* HIển thị dialog xác nhận xóa và block */}
      {openDialogDelete &&
        dialog(
          `Are you sure you want to delete ${userDeleted?.name}?`,
          "delete",
          setOpenDialogDelete,
          userDeleted
        )}
      {openDialogBlock &&
        dialog(
          `Are you sure you want to block ${userBlocked?.name}?`,
          "block",
          setOpenDialogBlock,
          userBlocked
        )}
      {openBlock &&
        dialog(
          `Are you sure you want to unblock ${userBlocked?.name}?`,
          "unblock",
          setOpenBlock,
          userBlocked
        )}
    </Box>
  );
}

export default ManageUser;
