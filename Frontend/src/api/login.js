import { useState } from 'react';
import axios from 'axios';

function loginHook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return { login, loading, error };
}

export default loginHook;