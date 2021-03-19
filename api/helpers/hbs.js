module.exports = {
    // On définit notre fonction
    limitArray: function(arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },
    limitInversed: function(arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.reverse().slice(0, limit);
    },
    ifCond: (v1, v2, options) => {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}