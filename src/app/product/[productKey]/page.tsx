'use client'
import { useEffect, useState } from "react";
import { getProductByKey } from "../../../services";
import {Product} from "@commercetools/platform-sdk/dist/declarations/src/generated/models/product"; // Import your Product and related types

export default function ProductPage(props) {
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<number>(0);

    useEffect(() => {
        // Fetch the product data by key and set it in state
        getProductByKey(props.params.productKey).then((res) => setProduct(res));
    }, [props.params.productKey]);

    const handleVariantChange = (index: number) => {
        setSelectedVariant(index);
    };

    const allVariants = [product?.masterData?.current?.masterVariant, ...(product?.masterData?.current?.variants ?? [])];
    return (
        <div>
            {product ? (
                <>
                    <h1>{product.masterData.current.name?.['en-US']}</h1>
                    <img src={allVariants[selectedVariant]?.images[0]?.url} alt={product.masterData.current.name?.['en-US']} />
                    <p>Description: {product.masterData.current.description?.['en-US']}</p>
                    <p>Price: {allVariants[selectedVariant].prices[0]?.value?.centAmount / 100} USD</p>

                    <div>
                        <h2>Select Variant:</h2>
                        {product?.productType?.obj?.attributes
                            ?.filter((attribute) => attribute?.attributeConstraint?.includes('Unique'))
                            .map((attribute, index) => {
                                return (
                                    <div key={index}>
                                        <h3>{attribute.label?.['en-US']}</h3>
                                        <div>
                                            {allVariants.map((variant, index) => {
                                                const matchingAttribute = variant.attributes.find((attr) => attr.name === attribute.name);

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleVariantChange(index)}
                                                        className={index === selectedVariant ? "selected" : ""}
                                                    >
                                                        {matchingAttribute?.value?.label ?? matchingAttribute?.value}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}





