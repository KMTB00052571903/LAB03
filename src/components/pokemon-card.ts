class PokemonCard extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
      const name: string | null = this.getAttribute('name');
      const url: string | null = this.getAttribute('url');

      if (!name || !url) {
          console.error('PokemonCard: Missing required attributes "name" or "url"');
          return;
      }

      this.shadow.innerHTML = `
          <div id=${name} style="cursor: pointer; padding: 10px; border: 1px solid #ccc; margin: 5px;">
              <strong>${name}</strong>
          </div>
      `;

      const div = this.shadow.querySelector('div');
      if (div) {
          div.addEventListener('click', () => {
              this.dispatchEvent(new CustomEvent('show-detail', {
                  detail: { url, name },
                  bubbles: true,
                  composed: true
              }));
          });
      }
  }
}

customElements.define('pokemon-card', PokemonCard);