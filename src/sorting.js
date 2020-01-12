const fs = require('fs');
let ejs = require('ejs');
const path = require('path');

async function mainTemplate(characterList, order, filters){
    let filePath = path.join(__dirname, '..', '/templates/partials/mainContent.ejs');
    let data = fs.readFileSync(filePath, 'utf-8');


    let filePathFilter = path.join(__dirname, '..', '/templates/partials/filter.ejs');
    let filterData = fs.readFileSync(filePathFilter, 'utf-8');

    let newData = Object.assign({}, characterList);

    if(order == 'ascending'){
        newData.results.sort( (a, b) => a.id - b.id);
    } else {
        newData.results.sort( (a, b) => b.id - a.id);
    }
    let html = await ejs.render(data.toString(), {
        data: newData.results
    });
    let filterHtml = await ejs.render(filterData.toString(), {
        filters
    });
    return { html, filterHtml };
}

const filterFunc = {
    gender: (test, value) => test.toLowerCase() == value,
    species: (test, value) => test.toLowerCase() == value
};

function filterAllKeys(array, filters) {

    return array.filter(item => {
        // validates all filter criteria
        let result1 = Object.keys(filters).every(key => {

            if(filters[key].length == 0){
                return true;
            }
            let result =  filters[key].some((val) => {
                return filterFunc[key](item[key], val);
            });
            return result;
        });
        return result1;
    });
}

async function addFilter(characterList, filterArray, order){
    let newData = Object.assign({}, characterList);

    newData.results = filterAllKeys(newData.results, filterArray);

    let html = await mainTemplate(newData, order, filterArray);
    return { html,  newData};
}


module.exports.mainTemplate = mainTemplate;
module.exports.addFilter = addFilter;