const pokemonNome = document.querySelector('.pokemon_nome');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImagem = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonProx = document.querySelector('.btn-prox');

let procurarPokemon = 1;

const fetchpokemon = async(pokemon) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) { 
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async(pokemon) => {
    pokemonNome.innerHTML = 'Carregando...'
    pokemonNumero.innerHTML = '';
    const data = await fetchpokemon(pokemon);
    if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    procurarPokemon = data.id;
} else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Não encontrado :(';
    pokemonNumero.innerHTML = '';
}
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => {
    if (procurarPokemon > 1){
    procurarPokemon -= 1;
    renderPokemon(procurarPokemon);
    }
});

buttonProx.addEventListener('click', (event) => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
 });

renderPokemon(procurarPokemon);