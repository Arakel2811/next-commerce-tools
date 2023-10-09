import {API_URL, PROJECT_KEY} from "../../constants";
import axios from "axios";
import {Product} from "@commercetools/platform-sdk/dist/declarations/src/generated/models/product";

export const getProductByKey = async (key): Promise<Product> => {
    try {
        const result = await axios.get(`${API_URL}/${PROJECT_KEY}/products/key=${key}?expand=productType`);

        return result.data;
    } catch (e) {
        console.log(e);
    }
};
