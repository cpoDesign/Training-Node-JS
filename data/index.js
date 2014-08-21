(function (data) {
    var seedData = require("./seedData");

    data.getNodeCategories = function (next) { // its async operation
        next(null, seedData.initalNotes);
    };
})(module.exports);