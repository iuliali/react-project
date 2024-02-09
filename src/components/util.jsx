const inverseColor = (color) => {
    return `#${(parseInt(color.replace('#', ''), 16) ^ 0xffffff).toString(16).padStart(6, '0')}`;
}
export { inverseColor };