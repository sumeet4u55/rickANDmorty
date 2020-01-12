  
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

//Define Path FOr Express config!
const pathToPublic = path.join(__dirname, '../public');


let characterList = {};
let filterCharacters = {};
//set up EJS and dir for views in them.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates'));

//static directory to serve.
app.use(express.static(pathToPublic));

const { characters, getSpecies, getGender } = require( './characters' );

const { mainTemplate, addFilter } = require( './sorting' );

app.get('/mainTemplate', async (req, res) => {
    let order = req.headers.sort;
    let filters = JSON.parse(req.headers.filters);
    let data = await mainTemplate(filterCharacters, order, filters);
    res.json(data);
});

app.get('/filter', async (req, res) => {
    let allFilters = JSON.parse(req.headers.filters);
    let order = req.headers.order;
    let { html, newData } = await addFilter(characterList, allFilters, order);
    filterCharacters = newData;
    res.json(html);
});

app.get('/', async (req, res)=>{
    characterList = await characters();
    let data = [];
    characterList.forEach(element => {
        data = data.concat(element.results);
    });
    characterList = Object.assign({}, characterList[0]);
    characterList.results = data;
    filterCharacters = characterList;
    let gender = getGender(characterList.results);
    let species = getSpecies(characterList.results);
    let filters = null;
    res.render('index', {
        title: 'Rick and Morty Characters',
        data: characterList.results,
        gender,
        species,
        filters,
        name: 'Sumeet'
    });
});


app.listen(port, ()=>{
    // eslint-disable-next-line no-console
    console.log(`Server is listening - ${port}`);
});