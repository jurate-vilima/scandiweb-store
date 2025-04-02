export function generateCartItemKey(productId, selectedAttributes) {
    const sortedKeys = Object.keys(selectedAttributes).sort();
    const serialized = sortedKeys
        .map((key) => `${key}:${selectedAttributes[key]}`)
        .join('|');
    return `${productId}-${serialized}`;
}
