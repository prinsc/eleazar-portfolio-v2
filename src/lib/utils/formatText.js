function formatText(text) {
    const withSpaces = text.replace(/-/g, ' ');
    return withSpaces
    	.split(' ')
    	.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    	.join(' ');
}
export default formatText;