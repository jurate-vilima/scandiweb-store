export function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function getPageTitle(title) {
    return title ? `${title} | Scandiweb Store` : 'Scandiweb Store';
}
