class ThemeEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    const root = document.createElement('ha-card');
    const content = document.createElement('div');
    content.style.padding = '16px';

    const colorPicker = document.createElement('div');
    colorPicker.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px;">
        <label>Background Color:</label>
        <input type="color" id="bgColor" />
      </div>
    `;

    colorPicker.querySelector('#bgColor').addEventListener('change', (e) => {
      this._updateTheme(e.target.value);
    });

    content.appendChild(colorPicker);
    root.appendChild(content);
    this.shadowRoot.appendChild(root);
  }

  _updateTheme(color) {
    const theme = {
      "modes": {
        "light": {
          "primary-background-color": color
        },
        "dark": {
          "primary-background-color": color
        }
      }
    };

    // Update theme via service call
    const hass = document.querySelector('home-assistant').hass;
    hass.callService('frontend', 'set_theme', {
      name: 'default',
      theme: theme
    });
  }

  set hass(hass) {
    this._hass = hass;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('theme-editor', ThemeEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "theme-editor",
  name: "Theme Editor",
  preview: false,
  description: "A card that allows you to edit Home Assistant themes"
});
