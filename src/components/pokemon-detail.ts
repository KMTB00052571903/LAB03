class PokemonDetail extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
      const name: string | null = this.getAttribute('name');
      const img: string | null = this.getAttribute('img');
      const height: string | null = this.getAttribute('height');
      const weight: string | null = this.getAttribute('weight');

      // Validación de atributos requeridos
      if (!name || !img || !height || !weight) {
          console.error('PokemonDetail: Faltan atributos requeridos');
          return;
      }

      this.render(name, img, height, weight);
  }

  private render(name: string, img: string, height: string, weight: string): void {
      this.shadow.innerHTML = `
          <div style="padding: 10px; border: 2px solid #000; margin-top: 20px;">
              <h2>${name}</h2>
              <img src="${img}" alt="${name}" style="max-width: 200px;">
              <p>Altura: ${height}</p>
              <p>Peso: ${weight}</p>
          </div>
      `;
  }

  // Métodos estáticos para observar cambios en atributos
  static get observedAttributes(): string[] {
      return ['name', 'img', 'height', 'weight'];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
      if (oldValue !== newValue && newValue !== null) {
          this.connectedCallback();
      }
  }
}

customElements.define('pokemon-detail', PokemonDetail);