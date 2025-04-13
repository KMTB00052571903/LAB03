export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonDetails {
    name: string;
    sprites: {
      front_default: string;
    };
    height: number;
    weight: number;
    types: {
      type: {
        name: string;
      };
    }[];
    abilities: {
      ability: {
        name: string;
      };
      is_hidden: boolean;
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  }


export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    async getPokemonList(limit: number = 10): Promise<PokemonListItem[]>{
        try{
            const response = await fetch(`${this.baseUrl}?limit=${limit}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.results;
        }catch (error) {
            console.error('Error fetching Pokémon list:', error);
            throw error;
        }
    }


    // ----------------- segundo metodo -----------------
    async getPokemonDetails(name: string): Promise<PokemonDetails> {
        try {
            const response = await fetch(`${this.baseUrl}/${name}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }catch (error) {
            console.error('Error fetching Pokémon details:', error);
            throw error;
        }
    }
}