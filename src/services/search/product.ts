import axios from "axios";
import {API_URL, PROJECT_KEY} from "../../constants";

export const getProducts = async () => {
    try {
        const result = await axios.post(`${API_URL}/${PROJECT_KEY}/product-projections/search`, {});

        return result;
    } catch (e) {
        console.log(e);
    }
}
