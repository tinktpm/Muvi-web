
import axios from 'axios';

export async function register(name, email, password) {
    try {
        const response = await axios.post(
            'http://localhost:5001/api/v1/auth/signup',
            {
                name,
                email,
                password
            },
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