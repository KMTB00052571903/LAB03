

import './style.css';
import './components/pokemon-card';
import './components/pokemon-detail';
import { PokemonService } from './services/pokemonService';

async function renderPokemonList(): Promise<void> {
  const service = new PokemonService();

  const pokemons = await service.getPokemonList(10);

  const appElement = document.querySelector<HTMLDivElement>('#app')!;

  // appElement.innerHTML ="hola "+pokemons[0].name+", como estas";
  appElement.innerHTML = `
  <div>
    <h1>Pokémon App</h1>
    <div id="pokemon-detail-container"></div>
    <div class="pokemon-list" id="pokemon-list"></div>

  </div>
  `;

  const listContainer = document.querySelector<HTMLDivElement>('#pokemon-list')!;

  pokemons.forEach(pokemon => {
    const card = document.createElement('pokemon-card');
    card.setAttribute('name', pokemon.name);
    card.setAttribute('url', pokemon.url);
    listContainer.appendChild(card);
  });

  document.addEventListener('show-detail', async (e: Event) => {
    const event = e as CustomEvent;
    const name = event.detail.name;

    const service = new PokemonService();
    const pokemonDetails = await service.getPokemonDetails(name);

    if(pokemonDetails){
      const detailContainer = document.getElementById('pokemon-detail-container')!;
      detailContainer.innerHTML = '';

      const detailElement = document.createElement('pokemon-detail');
      detailElement.setAttribute('name', pokemonDetails.name);
      detailElement.setAttribute('img', pokemonDetails.sprites.front_default);
      detailElement.setAttribute('height', pokemonDetails.height.toString());
      detailElement.setAttribute('weight', pokemonDetails.weight.toString());

      detailContainer.appendChild(detailElement)
    }
  })

}


  

renderPokemonList();