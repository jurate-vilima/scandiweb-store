export const getMainImage = (product) =>
    product.mainImage || product.gallery?.[0] || '/fallback.jpg';

export const getDefaultAttributes = (attributes = []) =>
    attributes.reduce((acc, attr) => {
        acc[attr.name] = attr.items?.[0]?.value;
        return acc;
    }, {});
