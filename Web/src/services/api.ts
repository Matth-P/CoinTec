import axios from "axios";


const api = axios.create({
    baseURL:'https://ab8f-2804-954-3c0-aa00-2cd2-b927-e182-6a51.ngrok-free.app',
    headers:{
        'Content-Type':'application/json',
    }
})


export default api;
