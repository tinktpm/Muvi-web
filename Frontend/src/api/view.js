import axios from "axios";

export async function getViewedFilm(filmID, userID) {
    try {
        console.log(userID)
        const response = await axios.get(
            'http://localhost:8080/api/v1/list_history_film/' + filmID,
            {
                params: {
                    userID
                },
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
