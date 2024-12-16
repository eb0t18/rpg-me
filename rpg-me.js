
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
    this.seed= "00000000";
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
      settings: {type: Object},
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
          opacity:1;
        }
        .options {
          min-width: 200px;
          text-align: left;
        }
        rpg-character{
        transition: width 0.3s ease, height 0.3s ease;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
      <div class = "seed"><h2>${this.seed}</h2></div>
          <rpg-character
            base="${this.settings.base}"
            face="${this.settings.face}"
            faceitem="${this.settings.faceitem}"
            hair="${this.settings.hair}"
            pants="${this.settings.pants}"
            shirt="${this.settings.shirt}"
            skin="${this.settings.skin}"
            hatColor="${this.settings.hatColor}"
            style="width: ${this.settings.size}px; height: ${this.settings.size}px;"
          ></rpg-character>



    <div class = options>
        <label>Has hair? </label>
        ${this.wiredCheckbox("base")}
        <label>Face: </label>
        ${this.wiredSlider("face", 0, 5)}
        <label>Face Item: </label>
        ${this.wiredSlider("faceitem", 0, 9)}
        <label>Hair Color: </label>
        ${this.wiredSlider("hair", 0, 9)}
        <label>Pants: </label>
        ${this.wiredSlider("pants", 0, 9)}
        <label>Shirt: </label>
        ${this.wiredSlider("shirt", 0, 9)}
        <label>Skin: </label>
        ${this.wiredSlider("skin", 0, 9)}
        <label>Hat Color: </label>
        ${this.wiredSlider("hatColor", 0, 9)}
        <label>Size: </label>
        ${this.wiredSlider("size", 100, 600)}
       
     </div> 
     </div>
        
    `;
  }

  wiredSlider(property, min, max) {
    return html`
      <div class="slider-container">
        <wired-slider
          min="${min}"
          max="${max}"
          step="1"
          value="${this.settings[property]}"
          @change="${(e) => this.updateCharacter(property, e.target.value)}"
        ></wired-slider>
      </div>
    `;
  }

  wiredCheckbox(property){
    return html`
  <wired-checkbox
      ?checked="${this.settings.base === 1}"
      @change="${(e) =>this.updateCharacter('base', e.target.checked ? 1 : 0)}">
  </wired-checkbox>
    `
    
  }



updateCharacter(property, value) {
  this.settings = { 
    ...this.settings, 
    [property]: property === "size" ? parseInt(value, 10) : parseInt(value, 10) 
  };
  this.updateSeed();
}

updateSeed() {
  const { base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.settings;
  this.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
}
}
customElements.define(RpgMe.tag, RpgMe);