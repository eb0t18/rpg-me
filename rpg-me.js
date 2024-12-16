
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
    const urlParams = new URLSearchParams(window.location.search);
    const urlSeed = urlParams.get('seed')
    if (urlSeed){
      this.seed =urlSeed;
      const seedKeys = ["base", "face", "faceitem", "hair", "pants", "shirt", "skin", "hatColor"];
      seedKeys.forEach((key, index) => {
        this.settings[key] = parseInt(this.seed[index], 10) || 0; // Default to 0 if the seed is invalid
    });
    this.requestUpdate();
    }
    else{
      this.seed= "00000000";
      const seedKeys = ["base", "face", "faceitem", "hair", "pants", "shirt", "skin", "hatColor"];
      seedKeys.forEach((key, index) => {
        this.settings[key] = parseInt(this.seed[index], 10) || 0; // Default to 0 if the seed is invalid
    });
    this.requestUpdate();
    }
    console.log(this.seed);
  
    
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
       
       <button @click ="${this.convertSeed}">Convert to URL</button>
     </div> 

     </div>
        
    `;
  }
  
  applySeedToSettings() {
    const paddedSeed = this.seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
    [
      this.settings.base,
      this.settings.face,
      this.settings.faceitem,
      this.settings.hair,
      this.settings.pants,
      this.settings.shirt,
      this.settings.skin,
      this.settings.hatColor,
    ] = values;
  
    this.requestUpdate(); // Ensure UI updates after applying settings
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

  convertSeed(){
     const link = `${location.origin}${location.pathname}?seed=${this.seed}&hat=${this.hat}&fire=${this.fire}&walking=${this.walking}&circle=${this.circle}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
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
  this.requestUpdate();
}
}
customElements.define(RpgMe.tag, RpgMe);