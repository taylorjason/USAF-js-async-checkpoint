const fetch = require('node-fetch');
let fs = require('fs');

const input = 'input.txt'
const input1 = 'input2.txt'

//I: a pokemon name
//O: space separted list of types of pokemon
//C: use pokeapi.co
//E: Edge cases?? N/A?

//creat a function to read in list of pokemon and call api on each pokemon

let getPokemonList = (file) => {
  try {
        let data = fs.readFileSync(file);
        let pokemonList = data.toString().split('\n');
        for (let idx in pokemonList) {
        if (pokemonList[idx] != '') {
            getPokemonTypes(pokemonList[idx].toLowerCase())
        }
        }
    }
  catch (err) {
    console.log('File',file,'does not exist\n');
    return;
  }
}

//create a function that takes a pokemon and logs the type in format 'pokemon: {space separated list of types}'

let getPokemonTypes = (pokemon) => {
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
  .then(response => {
    // console.log('executing then(response) with ', pokemon);
    // console.log('response.json() is ',response.json())
    return response.json();
    })
  .then(data => {
    // console.log('executing then(data) with ', pokemon)
    // console.log('data is ', data)
    if (data === undefined) {
      console.log(pokemon, ' not in database.');
    } else {}
      console.log(pokemon, ': ',data.types.map(slot => slot.type.name).join(", "))
  })
  .catch(response => {console.log('error occurred: could not find', pokemon, 'in database.')})
}

getPokemonList(input1)
getPokemonList(input)
