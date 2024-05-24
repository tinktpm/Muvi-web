import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import { deleteTvShow } from "../api/tvShow";
import { deleteMovieById } from "../api/movie";

function DialogDelete({setOpenDialog, objectToDelete}) {
  const handleDelete = () => {
    if(objectToDelete?.type === "TV_SHOW") {
      deleteTvShow(objectToDelete?.id)
      .then(() => {
        console.log("Delete success");
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error(error);
        setOpenDialog(false);
      });
    }

    if(objectToDelete?.type === "MOVIE") {
      deleteMovieById(objectToDelete?.id)
        .then(() => {
          console.log("Delete success");
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error(error);
          setOpenDialog(false);
        });
    }


   
  }

  return (
    <Dialog open={true} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Bạn có chắc muốn xóa {objectToDelete?.name} không ?</DialogTitle>
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
          onClick={() => setOpenDialog(false)}
          sx={{
            backgroundColor: "red",
            color: "white",
            ":hover": {
              backgroundColor: "error.light",
            },
          }}
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  );
}

export default DialogDelete;
