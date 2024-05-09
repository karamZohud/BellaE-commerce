import axios from "axios";
import { baseUrl  } from "./Api";
import Cookie from "cookie-universal";

const cooike=Cookie();
const token=cooike.get("e-commerce");

export const Axios= axios.create({
    baseURL: baseUrl ,
        headers:{
           Authorization : `Bearer ${token}`,
        }, 
});