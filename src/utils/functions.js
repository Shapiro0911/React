export const compareArrays = (firstArray, secondArray) => {
    // if the other array is a falsy value, return
    if (!firstArray || !secondArray)
        return false;

    if (firstArray.length !== secondArray.length)
        return false;

    for (var i = 0, l = firstArray.length; i < l; i++) {
        // Check if we have nested arrays
        if (firstArray[i] instanceof Array && secondArray[i] instanceof Array) {
            // recurse into the nested arrays
            if (!firstArray[i].equals(secondArray[i]))
                return false;
        }
        else if (firstArray[i] !== secondArray[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}