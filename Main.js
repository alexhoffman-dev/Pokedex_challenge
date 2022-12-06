const PokeAPI = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonObjects = [];
const searchInput = document.getElementById('pokemon-search');
const typeFilter = document.querySelectorAll('li.filterType');
searchInput.addEventListener('keyup', searchPokedex);
typeFilter.forEach((filter) => filter.addEventListener('click', filterPokemon));

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
    }
}
// create a function that dynamically created pokedex cell DOM elements from each
// object in the pokemonObjects array
function createDOMElements() {
    let pokedexContainer = document.createElement('div');
    pokedexContainer.classList.add('pokedex-container');
    document.body.appendChild(pokedexContainer);
    // spacer is for making sure the pokedex container is spaced correctly in .png frame 
    let spacer = document.createElement('div',);
    spacer.classList.add('space');
    document.body.appendChild(spacer);
    for(let i = 0; i < pokemonObjects.length; i++) {
        let entry = document.createElement('div');
        let entrySprite = document.createElement('img');
        let entryText = document.createElement('div');
        entrySprite.classList.add('pokemon-image');
        entry.classList.add('cell'); 

        entrySprite.src = `${pokemonObjects[i].image}`;
        entryText.innerHTML = 
            `<ul>
                <li>name: ${pokemonObjects[i].name.toUpperCase()}</li>
                <li>number: ${pokemonObjects[i].number}</li>
                <li class="types">types: ${pokemonObjects[i].types}</li>
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
    let searchTerm = event.target.value.toUpperCase();
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

function filterPokemon(event) {
    let filterClick = event.target.innerHTML.toLowerCase();    
    // Here we use the inner HTML of the targetted filter to iterate through the created DOM elements and only display
    // pokemon with matching types. 
    let pokemonTypes = document.querySelectorAll('.cell');
    for(let i = 0; i < pokemonObjects.length; i++) {
        let eachType = pokemonTypes[i].getElementsByTagName('li')[2].innerText.slice(7);
        if(eachType.indexOf(filterClick) > -1) {
            pokemonTypes[i].classList.remove('hidden');
        } else {
            pokemonTypes[i].classList.add('hidden');
        }
    }
}

