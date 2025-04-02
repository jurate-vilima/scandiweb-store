export function formatAttributeValue(attr, item) {
    const isSize = attr.name.toLowerCase() === 'size';
    return isSize ? item.value : item.displayValue;
}
