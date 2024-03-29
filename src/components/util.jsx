const inverseColor = (color) => {
    return `#${(parseInt(color.replace('#', ''), 16) ^ 0xffffff).toString(16).padStart(6, '0')}`;
}

const randomIndex = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return index;
}

export { inverseColor, randomIndex };