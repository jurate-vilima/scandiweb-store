import { createBrowserRouter, redirect } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import React, { lazy } from 'react';
import { graphQLRequest } from '@/services/api';
import { GET_CATEGORIES } from '@/graphql/categoryQueries';

import SuspenseWrapper from '@/components/ui/SuspenseWrapper/SuspenseWrapper';

const CategoryPage = lazy(() => import('@/pages/CategoryPage/CategoryPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

async function indexLoader() {
    const data = await graphQLRequest(GET_CATEGORIES);
    const cats = data.categories;

    if (!cats || cats.length === 0) return null;

    const firstCat = cats[0].name.toLowerCase();
    throw redirect(`/category/${firstCat}`);
}

async function categoryLoader({ params }) {
    const { categoryName } = params;
    const data = await graphQLRequest(GET_CATEGORIES);
    const categories = data.categories || [];

    const exists = categories.some(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
    );

    if (!exists) throw redirect('/404');

    return null;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                loader: indexLoader,
                element: null,
            },
            {
                path: 'category/:categoryName',
                loader: categoryLoader,
                element: (
                    <SuspenseWrapper>
                        <CategoryPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'product/:productId',
                element: (
                    <SuspenseWrapper>
                        <ProductPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: '404',
                element: (
                    <SuspenseWrapper>
                        <NotFound />
                    </SuspenseWrapper>
                ),
            },
            {
                path: '*',
                element: (
                    <SuspenseWrapper>
                        <NotFound />
                    </SuspenseWrapper>
                ),
            },
        ],
    },
]);

export default router;
