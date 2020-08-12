export function hexToRGBA(hex, alpha) {
    if (hex === 'white') return (`rgba(255, 255, 255, ${alpha})`)
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        console.log("rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")");
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}
