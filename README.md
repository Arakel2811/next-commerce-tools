This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## About

This project is using NextJS to create an e-commerce frontend that's integrated with commercetools.

We authenticate to commercetools using Client Credentials Flow. This means that we need to provide a client ID and a client secret to get an access token. This access token is then used to make requests to commercetools.

We have a PLP(Product Listing Page) and a PDP (Product Detail Page). The PLP shows a list of products and the PDP shows a single product.

PLP has facets that can be used to filter products. The facets are fetched from commercetools and are dynamically calculated.
It also has free-text search that can be used to search for products. The search is done on the commercetools backend and the results are returned to the frontend.
We use Product Projections search endpoint for PLP.

PDP shows product details and has a variant selector. The variant selector is dynamically calculated based on the product attributes data.
