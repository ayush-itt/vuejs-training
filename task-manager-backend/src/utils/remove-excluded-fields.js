const removeExcludedFields = function (object, excludes) {
    const excludedFields = excludes.split(" ").map((key) => key.substr(1));
    const response = {};
    for (const key in object)
        if (!excludedFields.includes(key)) response[key] = object[key];
    return response;
};

module.exports = removeExcludedFields;
