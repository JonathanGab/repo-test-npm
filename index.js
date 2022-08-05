const axios = require('axios');

const apiCall = async (url, state) => {
    try {
        const response = await axios.get(url);
        return state(response.data);
    } catch (err) {
        console.error({ message: err });
    }
};

const getToken = (name, password) => {
    axios
        .post(
            'http://localhost/module/wp-json/jwt-auth/v1/token',
            {
                username: name,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        )
        .then((res) => {
            localStorage.setItem('token', res.data.token);
        })
        .catch((err) => console.error(err));
};

const postData = async (e, url, object) => {
    e.preventDefault();
    try {
        await axios.post(
            url,
            object,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
            { withCredentials: true }
        );
    } catch (err) {
        console.error(err);
    }
};

module.exports = { apiCall, postData, getToken };
