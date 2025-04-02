export function isColorLight(hex) {
    if (!hex || typeof hex !== 'string') return false;

    const color = hex.replace('#', '');
    const bigint = parseInt(color, 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 200;
}
