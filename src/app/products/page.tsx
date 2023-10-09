'use client'

import {useEffect, useState} from "react";
import {getProducts} from "./../../services/search";
import {ProductProjectionPagedSearchResponse, type TermFacetResult} from "@commercetools/platform-sdk";
import {facetDefinitions} from "../../services/search/facetDefinitions";


export default function Products() {
    const [productsResult, setProductsResult] = useState<ProductProjectionPagedSearchResponse | null>(null);
    const [selectedFacets, setSelectedFacets] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const handleSelectFacet = (facet, term) => {
        setSelectedFacets((prevSelectedFacets) => {
            // Create a copy of the selected terms for the facet
            const selectedTerms = [...(prevSelectedFacets[facet] || [])];

            // Check if the term is already selected
            const termIndex = selectedTerms.indexOf(term);

            if (termIndex !== -1) {
                // If the term is already selected, remove it (deselect)
                selectedTerms.splice(termIndex, 1);
            } else {
                // If the term is not selected, add it (select)
                selectedTerms.push(term);
            }

            // Update the selected facets with the modified array
            return {
                ...prevSelectedFacets,
                [facet]: selectedTerms,
            };
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        // Include searchQuery in the getProducts call
        getProducts(selectedFacets, searchQuery).then((res) => setProductsResult(res));
    };

    useEffect(() => {
        // Trigger the search when selectedFacets change
        handleSearch();
    }, [selectedFacets]);

    console.log(selectedFacets);

    return (
        <div style={{ margin: '20px 10%'}}>
            <h1>Products</h1>
            <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress} // Handle Enter key press
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                <div style={{ display: 'inline-block', width: '20%', verticalAlign: 'top'}}>
                    {Object.keys(productsResult?.facets ?? {})?.filter(
                        (facetKey) => (productsResult?.facets?.[facetKey] as TermFacetResult)?.terms?.length
                    ).map((facet, index) => (
                        <div key={facet}>
                            <h3>{facetDefinitions[facet]?.label ?? facet}</h3>
                            {
                                (productsResult?.facets?.[facet] as TermFacetResult)?.terms?.map((term, index) => (
                                    <div key={term.term}>
                                        <input
                                            onChange={(event) => {
                                                handleSelectFacet(facet, term.term);
                                            }}
                                            type="checkbox"
                                            checked={
                                                (selectedFacets[facet] || []).includes(term.term) // Check if the term is in the selected facet array
                                            }
                                        />
                                        <span>{term.term}</span>
                                        <span>({term.productCount})</span>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                </div>
                <div style={{ display: 'inline-block', width: '75%'}}>
                    {
                        productsResult?.results?.map((product, index) => (
                            <a href={`/product/${product.key}`} style={{ display: 'inline-block', height: '200px', margin: 20}} key={product.id}>
                                <img style={{ objectFit: 'contain', height: '100%' }} src={product.masterVariant?.images?.[0]?.url} />
                                <h3>{product.name['en-US']}</h3>
                                <p>{product.masterVariant?.prices?.[0]?.value?.centAmount / 100} USD</p>

                            </a>
                        ))
                    }
                </div>
            </div>

        </div>

    )
}
