import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';

function Search(){
    return (
        <Box
            sx={
                {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '75%',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 12,
                }
            }
        >
            <IconButton
                sx={
                    {
                        color: 'white',
                        backgroundColor: 'transparent',
                        hover: {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                        },
                        borderRadius: 12,
                    }
                }
            >
                <FilterAltIcon />
            </IconButton>
            <TextField 
                id="filled-basic" 
                label="Search" 
                variant="filled"
                InputProps={
                    {
                        style: {
                            backgroundColor: 'transparent',
                            color: 'white',
                        }
                    }
                
                }
                InputLabelProps={
                    {
                        style: {
                            color: 'white',
                        }
                    }
                
                }
                sx={
                    {
                        width: '100%',
                        maxWidth: 400,
                        color: 'white',
                    }
                }
            />
        </Box>
    )
}


export default Search;