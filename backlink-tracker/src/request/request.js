import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/";
axios.defaults.baseURL = BASE_URL;

const request = {

    addLinks: async (jsonData) => {

        try {
            const response = await axios.post('/addLinks', jsonData);
            return response;
        } catch (error) {
            console.log(error);
            return error.response;

        }
    },

    getLinks: async () => {

        try {
            const response = await axios.get('/links');
            return response;
        } catch (error) {
            return error.response;
        }
    },

    deleteLink: async (id) => {

        try {
            const response = await axios.delete(`/links/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    checkAvailability: async(backlinks) =>{
        try {
            const response = await axios.post('/checkAvailability', backlinks);
            return response;
        }catch(error){
            return error.response;
        }
    }

}

export default request;