
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.title = "Customize Your RPG Character!";
    seed: "00000000",
    this.settings = {
      base: 0, // 0 for no hair, 1 for hair
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      glasses: false,
      hatColor: 0,
      size: 200,
      name: "",
      fire: false,
      walking: false,
    };
  }

  static get properties() {
    return {
      title: {type: String},
      settings: {type: String},
      seed: {type: String},
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
        }
        label {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        wired-input,
        wired-checkbox,
        wired-slider {
          display: block;
          margin-bottom: 20px;
          max-width: 200px;
        }
        .options {
          min-width: 200px;
          text-align: left;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
          <rpg-character
            base="${this.settings.base}"
            face="${this.settings.face}"
            faceitem="${this.settings.faceitem}"
            hair="${this.settings.hair}"
            pants="${this.settings.pants}"
            shirt="${this.settings.shirt}"
            skin="${this.settings.skin}"
            hatColor="${this.settings.hatColor}"
          ></rpg-character>



    <div class = options>
      <label>Face: </label>
      ${this.wiredSlider("face", 0, 5)}

      <label>Face Item: </label>
      ${this.wiredSlider("faceitem", 0, 9)}

      <label>Pants: </label>
      ${this.wiredSlider("pants", 0, 9)}

      <label>Shirt: </label>
      ${this.wiredSlider("shirt", 0, 9)}

      <label>Skin: </label>
      ${this.wiredSlider("skin", 0, 9)}

      <label>Size: </label>
      ${this.wiredSlider("size", 100, 600)}

      <label>hair: </label>
      ${this.wiredSlider("hair", 0, 9)}
     </div> 
     </div>
        
    `;
  }

wiredSlider(feature, minimum, maximum){
  return html`
  <wired-slider
  value="${this.settings[feature]}"
  min ="${minimum}"
  max = "${maximum}"
  step = "1"
  @change="${(e) => this.updateCharacter(property, e.target.value)}"
  ></wired-slider>`
}


updateCharacter(property, value) {
  this.settings = { 
    ...this.settings, 
    [property]: property === "size" ? parseInt(value, 10) : parseInt(value, 10) 
  };
  this.updateSeed();
}

updateSeed() {
  const {
    base,
    face,
    faceitem,
    hair,
    pants,
    shirt,
    skin,
    size,
  } = this.settings;
  this.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${size}`;
}
}
customElements.define(RpgMe.tag, RpgMe);