import axios from "axios";
import {API_URL, PROJECT_KEY} from "../../constants";
import {ProductProjectionPagedSearchResponse} from "@commercetools/platform-sdk";
import {facetDefinitions} from "./facetDefinitions";

export const getProducts = async (facets: Record<string, string[]>, query: string): Promise<ProductProjectionPagedSearchResponse> => {
    try {
        const filter = Object.entries(facets ?? {}).filter(([key, value]) => value.length > 0)
            .map(([key, value]) => `${key}:${value.map(v => `"${v}"`).join(',')}`);
        const result = await axios.post<ProductProjectionPagedSearchResponse>(`${API_URL}/${PROJECT_KEY}/product-projections/search`, {
            facet: Object.keys(facetDefinitions).map(key => `${key} counting products`),
            filter,
            ['filter.facets']: filter,
            ['text.en-US']: query ?? undefined,
            fuzzy: true,
        });

        return result.data;
    } catch (e) {
        console.log(e);
    }
}
