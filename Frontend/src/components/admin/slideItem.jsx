import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

function SlideItem({ slide, onDelete }) {
  return (
    <Box>
      <Card 
        sx={{ 
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
      >
        <CardMedia
          sx={{ height: '20rem', width: '80%', objectFit: 'cover'}}
          image="https://lumiere-a.akamaihd.net/v1/images/p_20cs_freeguy_homeent_21930_49e74453.jpeg?region=0%2C0%2C540%2C810"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {slide?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Movie
          </Typography>
         <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: '12px'
            }}
         >
            <Typography variant="body2" color="text.secondary">
                12K views
            </Typography>
            <Typography variant="body2" color="text.secondary">
                12K rating
            </Typography>
         </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SlideItem;
