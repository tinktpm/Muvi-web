import axios from "axios";

export async function getUserById(id) {
    try {
        console.log('id', id)
        const response = await axios.get(
            'http://localhost:5002/api/v1/user/' + id,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
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

export async function getAllUsers(params) {
    try {
        const response = await axios.get(
            'http://localhost:5002/api/v1/user?'+params,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
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

export async function blockedUser(id, block) {
    try {
        const response = await axios.put(
            'http://localhost:5002/api/v1/user/'+id,
            {
                
                "isBlocked": block
                
            },
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
                }
            },
            
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


export async function deleteUser(id) {
    try {
        const response = await axios.delete(
            'http://localhost:5002/api/v1/user/'+id,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
                }
            },
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


export async function getUserByEmail(email) {
    try {
        const response = await axios.get(
            'http://localhost:5002/api/v1/user/search/' + email,
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNzZWEzMDNAZ21haWwuY29tIiwiaWQiOiI2NjAyNjgyN2RhMjgwOTVlODhiM2U4YWIiLCJpYXQiOjE3MTE3Mjg3OTZ9.3zNbbMaQt2YtwqBV5oamFJW1KFlx35TPfNRLIuSQmkQ"
                }
            },
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


