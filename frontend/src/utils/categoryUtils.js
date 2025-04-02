export function getCategoryDisplayName(categories, categoryName) {
    if (!categoryName || !categories?.length) return categoryName;

    return (
        categories.find(
            (category) =>
                (category.name || '').toLowerCase() ===
                categoryName.toLowerCase(),
        )?.displayName || categoryName
    );
}
