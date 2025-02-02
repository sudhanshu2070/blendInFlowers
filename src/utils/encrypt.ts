export const encryptText = (text: string): string => {
    return text.replace(/S/g, '*'); // Replacing 'S' with '*'
};