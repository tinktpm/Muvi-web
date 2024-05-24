import axios from "axios";

export async function getMovieByID(id) {
    try {
        const response = await axios.get(
            'http://localhost:8080/api/v1/movie/' + id,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
                }
            }
        )
        if (response.status == 200) {
            return response.data.data
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export async function filterMovie(queryParams){
    try {
        const response = await axios.get(
            'http://localhost:8080/api/v1/movie?' + queryParams,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
                }
            }
        )
        if (response.status == 200) {
            return response.data.data
        } else {
            throw new Error(response.status);
        }
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export async function createMovie(formData){
    try {
        const response = await axios.post(
            'http://localhost:8080/api/v1/movie',
            formData,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ",
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        if (response.status == 201) {
            return response.data.data
        } else {
            throw new Error(response.status);
        }
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}



export async function deleteMovieById(id) {
    try {
        const response = await axios.delete(
            'http://localhost:8080/api/v1/movie/' + id,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
                }
            }
        )
        if (response.status == 200) {
            return response.data.data
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


export async function updateMovie(formData, id){
    try {
        const response = await axios.put(
            'http://localhost:8080/api/v1/movie/' + id,
            formData,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ",
                    "Content-Type": "multipart/form-data",
                }
            }
        )
        if (response.status == 200) {
            return response.data
        } else {
            throw new Error(response.status);
        }
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

