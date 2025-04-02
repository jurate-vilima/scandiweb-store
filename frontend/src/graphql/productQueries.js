export const GET_PRODUCTS_BY_CATEGORY = `
    query GetProductsByCategory($category: String!) {
        productsByCategory(category: $category) {
            id
            name
            inStock
            price
            currency
            mainImage
        }
    }
`;

export const GET_PRODUCT_BY_ID = `
    query GetProductById($id: String!) {
        productById(id: $id) {
            id
            name
            category {
                name
            }
            brand
            description
            inStock
            price
            currency
            gallery
            attributes {
                id
                name
                type
                items {
                    value
                    displayValue
                }
            }
        }
    }
`;
