'use client'
import {useEffect, useMemo, useState} from "react";
import { getProductByKey } from "../../../services";
import {Product} from "@commercetools/platform-sdk/dist/declarations/src/generated/models/product";
import {AttributeDefinition} from "@commercetools/platform-sdk"; // Import your Product and related types
import "./page.css"

export default function ProductPage(props) {
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<number>(0);

    useEffect(() => {
        // Fetch the product data by key and set it in state
        getProductByKey(props.params.productKey).then((res) => setProduct(res));
    }, [props.params.productKey]);

    const filtered = useMemo<AttributeDefinition[]>(() => {
        return product?.productType?.obj?.attributes
            ?.filter((attribute) => attribute?.attributeConstraint?.includes('Unique')) || []
    }, [product])

    const handleVariantChange = (index: number) => {
        setSelectedVariant(index);
    };

    const doesHaveVariant = (attribute: AttributeDefinition): boolean => {
        return allVariants.some((variant) => {
            return Boolean(variant.attributes.find(attr => attr.name === attribute.name))
        })
    }

    const allVariants = [product?.masterData?.current?.masterVariant, ...(product?.masterData?.current?.variants ?? [])];
    return (
        <div className="container">
            {product ? (
                <>
                    <h1>{product.masterData.current.name?.['en-US']}</h1>
                    <div>
                        {filtered.length ? <h2>Select Variant:</h2> : null}
                        {filtered
                            .map((attribute, index) => {
                                return doesHaveVariant(attribute) ? (
                                    <div key={index}>
                                        <h3>{attribute.label?.['en-US']}</h3>
                                        <div className="attributes-container">
                                            {allVariants.map((variant, index) => {
                                                const matchingAttribute = variant.attributes.find((attr) => attr.name === attribute.name);

                                                return matchingAttribute ? (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleVariantChange(index)}
                                                        className={index === selectedVariant ? "selected" : ""}
                                                    >
                                                        {matchingAttribute?.value?.label ?? matchingAttribute?.value}
                                                    </button>
                                                ): null
                                            })}
                                        </div>
                                    </div>
                                ) : null;
                            })}
                    </div>
                    <img src={allVariants[selectedVariant]?.images[0]?.url} alt={product.masterData.current.name?.['en-US']} className="product-image"/>
                    <p>Description: {product.masterData.current.description?.['en-US']}</p>
                    <p>Price: {allVariants[selectedVariant].prices[0]?.value?.centAmount / 100} USD</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}





