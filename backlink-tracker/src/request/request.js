import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;

const request = {

    addLinks: async (jsonData) => {

        try {

            const response = await axios.post('/addLinks', jsonData,  {
                headers :{
                    "Authorization" : 'Bearer ' + sessionStorage.getItem('jwt-token'),
                    'Content-Type' : 'application/json'
                }
            });
            return response;

        } catch (error) {
            console.log(error);
            return error.response;

        }
    },

    getLinks: async () => {

        try {
            const response = await axios.get('/linkById', {
                headers :{
                    "Authorization" : 'Bearer ' + sessionStorage.getItem('jwt-token'),
                    'Content-Type' : 'application/json'
                }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    },

    deleteLink: async (id) => {

        try {
            const response = await axios.delete(`/links/${id}`, {
                headers :{
                    "Authorization" : 'Bearer ' + sessionStorage.getItem('jwt-token'),
                    'Content-Type' : 'application/json'
                }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    },

    checkAvailability: async (backlinks) => {
        try {
            const response = await axios.post('/checkAvailability', backlinks,{
                headers :{
                    "Authorization" : 'Bearer ' + sessionStorage.getItem('jwt-token'),
                    'Content-Type' : 'application/json'
                }
            });

            return response;
        } catch (error) {
            return error.response;
        }
    },

    register: async (user) => {
        try {
            const response = await axios.post('/register', user);
            return response;

        } catch (error) {
            return error.response;
        }
    },

    login: async (user) => {
        console.log(user);
        try {
            const response = await axios.post('/login', user);
            return response;

        } catch (error) {
            return error.response;
        }
    }

}

export default request;