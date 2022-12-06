const PokeAPI = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonObjects = [];
const searchInput = document.getElementById('pokemon-search');
searchInput.addEventListener('keyup', searchPokedex);
// Use a for loop to append i to the PokeAPI URL to cycle through
// vanilla pokemon (1-150) and return an array of objects representing
// each pokemon and the key value pairs we need


async function pokedexSetup() {
    await getPokemon();
    await createDOMElements();   
}

async function getPokemon() {
// Use a for loop to append i to the PokeAPI URL to cycle through
// vanilla pokemon (1-150) and return an array of objects representing
// each pokemon and the key value pairs we need
    for(let i = 1; i <= 151; i++) {
        const pokeAPIResponse = await fetch(`${PokeAPI}${i}`);
        const json = await pokeAPIResponse.json();
        console.log(json);
        //Use object destructruting to access nested type characteristic within objects/arrays. These
        // types are then saved in an empty array then used later with the ToString method 
        const iveGotAType = []; 
        json.types.forEach((orange) => {
            let { type: { name } } = orange;
            iveGotAType.push(name); 
        });
        let pokemon = {
            name: `${json.name}`,
            number: `${json.order}`,
            image: `${json.sprites.front_default}`,
            types: iveGotAType.toString(),
            weight: `${json.weight}`
        };
        pokemonObjects.push(pokemon);
        console.log(pokemon);
    }
}
// create a function that dynamically created pokedex cell DOM elements from each
// object in the pokemonObjects array
function createDOMElements() {
    let pokedexContainer = document.createElement('div');
    pokedexContainer.classList.add('pokedex-container');
    document.body.appendChild(pokedexContainer);
    let spacer = document.createElement('div',);
    spacer.classList.add('space');
    document.body.appendChild(spacer);
    for(let i = 0; i < pokemonObjects.length; i++) {
        let entry = document.createElement('div');
        let entrySprite = document.createElement('img');
        let entryText = document.createElement('div');
        entrySprite.classList.add('pokemon-image');
        entry.classList.add('cell');
        entry.addEventListener('click', highlightPokemon); 

        entrySprite.src = `${pokemonObjects[i].image}`;
        entryText.innerHTML = 
            `<ul>
                <li>name: ${pokemonObjects[i].name.toUpperCase()}</li>
                <li>number: ${pokemonObjects[i].number}</li>
                <li>types: ${pokemonObjects[i].types}</li>
                <li>weight: ${pokemonObjects[i].weight / 10} Kg </li>
            </ul>`;
        pokedexContainer.appendChild(entry);
        entry.appendChild(entrySprite);                
        entry.appendChild(entryText);
    } 

}
pokedexSetup();

// add and event listener to the input search id: pokemon-search that checks each entry against 
// the name of each pokemon 

function searchPokedex(event) {
    console.log(event);
    let searchTerm = event.target.value.toUpperCase();
    console.log(searchTerm);
    let pokemonNames = document.querySelectorAll('.cell');
    for(let i = 0; i < pokemonObjects.length; i++) {
        let pokemonCardName = pokemonNames[i].getElementsByTagName('li')[0].innerText.slice(6);
        //console.log(pokemonCardName);
        if(pokemonCardName.indexOf(searchTerm) > -1) {
        //Set the display of the correspodning pokemon entry to '' or change back to '' 
            pokemonNames[i].classList.remove('hidden');
        } else {
            //change display to hidden
            pokemonNames[i].classList.add('hidden');
        }


    }
}
// I want to let users of the pokedex  

function highlightPokemon(event) {
    let clickedCell = event.target; 

}

