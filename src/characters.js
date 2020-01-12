const request = require('request');



const characters = () => {
    let Promises = [];
    // Can be converted to a recursive function with adding promises and getting all data.
    Promises.push(new Promise( ( resolve, reject )=>{
        // eslint-disable-next-line quotes
        const url = `https://rickandmortyapi.com/api/character/`;
        request({
            url,
            json: true
        }, function( error, response, body ){
            if( error || response.body.error ){
                reject(error);
            } else {
                resolve( body );
            }
        });
    }));
    Promises.push(new Promise( ( resolve, reject )=>{
        // eslint-disable-next-line quotes
        const url = `https://rickandmortyapi.com/api/character/?page=2`;
        request({
            url,
            json: true
        }, function( error, response, body ){
            if( error || response.body.error ){
                reject(error);
            } else {
                resolve( body );
            }
        });
    }));
    return Promise.all(Promises);
};

const getSpecies = (data) => {
    let obj = {};
    data.forEach( elem => {
        if(!obj[elem.species]){
            obj[elem.species] = 1;
        }
    });
    return Object.keys(obj);
};

const getGender = (data) => {
    let obj = {};
    data.forEach( elem => {
        if(!obj[elem.gender]){
            obj[elem.gender] = 1;
        }
    });
    return Object.keys(obj);
};

module.exports = {
    characters,
    getSpecies,
    getGender
};