import { Card, CardActionArea, CardMedia, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserById } from "../api/user";

function Profile(){
    const {user} = useContext(AuthContext)
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        getUserById(user)
        .then((value) => {
            console.log('profileeee', value)
            setUserProfile(value)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [user])

    return(
        <Box
            sx={{
                width: '100%',
                height: '100%',
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
             <Card sx={{ maxWidth: 345 }}>
                
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"/>

                
            </Card>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={userProfile?.name}
                    disabled
                />
                
            </Box>
        </Box>
    )
}


export default Profile;