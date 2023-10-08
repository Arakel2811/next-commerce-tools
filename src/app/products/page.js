'use client'

import {useEffect} from "react";
import {getProducts} from "./../../services/search";


export default function Products() {
    useEffect(() => {
        getProducts().then(res => console.log(res));
    }, []);

    return (
        <div>
            <p>Test Products</p>
        </div>
    )
}
