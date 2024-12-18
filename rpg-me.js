
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
      hatColor: 0,
      size: 200,
      name: "",
      fire: false,
      walking: false,
      hat: "none"
    };
    const urlParams = new URLSearchParams(window.location.search);
    const urlSeed = urlParams.get('seed');
    if (urlParams.has('walking')) {
      this.settings.walking = urlParams.get('walking') === 'true';
    }
  
    if (urlParams.has('fire')) {
      this.settings.fire = urlParams.get('fire') === 'true';
    }

    if (urlSeed){
      this.seed =urlSeed;
      const seedKeys = ["base", "face", "faceitem", "hair", "pants", "shirt", "skin", "hatColor"];
      seedKeys.forEach((key, index) => {
        this.settings[key] = parseInt(this.seed[index], 10) || 0; // Default to 0 if the seed is invalid
    });
    }
    else{
      this.seed= "00000000";
  }
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
          background-color:var(--ddd-theme-default-navy60);
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
        wired-slider,
        wired-combo {
          display: block;
          margin-bottom: 20px;
          max-width: 200px;
          opacity:1;
        }

        wired-item{
          opacity:1;
        }
        .options {
          min-width: 200px;
          text-align: left;
          padding: 10px;
          background-color: var(--ddd-theme-default-navy40);
          border-radius: var(--ddd-radius-sm);
        }
        rpg-character{
        display: block;
        transition: width 0.3s ease, height 0.3s ease;
        margin: var(--ddd-spacing-1);

        }
      
        .seed-container {
          display:block;
          text-align: center; 
          margin-bottom: 10px; 
          justify-content:center;
       } 
       button {
        background-color: var(--button-background, var(--ddd-theme-default-beaverBlue)); 
        color: var(--button-text-color, #ffffff); 
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
      }

    button:hover {
        background-color: var(--button-hover-background, var(--ddd-theme-default-beeaver70)); 
        transform: scale(1.05); 
    }

    button:active {
        background-color: var(--button-active-background, var(--ddd-theme-default-beaver80)); 
        transform: scale(0.95); 
    }

    button:focus {
        outline: 2px solid var(--button-focus-outline, #ffcc00); 
        outline-offset: 2px;
    }



        @media (prefers-color-scheme: dark) {
        :host {
        background-color: #121212;
        color: #ffffff;
       }
}
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
      <div class = "seed-container"><h2>Seed: ${this.seed}</h2>
      <div><a href="https://github.com/haxtheweb/issues/issues/1414" target="blank">Link to github</a></div>
      </div>
          <rpg-character
            literalseed
            base="${this.settings.base}"
            face="${this.settings.face}"
            faceitem="${this.settings.faceitem}"
            hair="${this.settings.hair}"
            pants="${this.settings.pants}"
            shirt="${this.settings.shirt}"
            skin="${this.settings.skin}"
            hatColor="${this.settings.hatColor}"
            hat="${this.settings.hat}"
            .fire="${this.settings.fire}"
            .walking="${this.settings.walking}"
            style="width: ${this.settings.size}px; height: ${this.settings.size}px;"
          ></rpg-character>


    <div class = options>
        <label>Has hair? </label>
        ${this.wiredCheckboxBase("base")}
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
        <label>Hat: </label>
        ${this.hatDropdown()}
        <label>Size: </label>
        ${this.wiredSlider("size", 100, 600)}
        <label>Walking?: </label>
        ${this.wiredCheckbox("walking")}
        <label>On Fire?: </label>
        ${this.wiredCheckbox("fire")}
       
       <button @click ="${this.convertSeedToLink}">Convert to URL</button>
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

  wiredCheckboxBase(property){
    return html`
  <wired-checkbox
      ?checked="${this.settings.base === 1}"
      @change="${(e) =>this.updateCharacter('base', e.target.checked ? 1 : 0)}">
  </wired-checkbox>
    `
  }

  wiredCheckbox(property){
    return html`
  <wired-checkbox
      ?checked="${this.settings[property]}"
      @change="${(e) => this.updateCharacter(property, e.target.checked)}">
  </wired-checkbox>
    `
  }

  hatDropdown(){
    return html`
    <wired-combo id="hat" .selected="${this.hat}"
      @selected="${(e) => this.updateCharacter('hat', e.detail.selected)}">
        <wired-item value="none">None</wired-item>
        <wired-item value="bunny">Bunny</wired-item>
        <wired-item value="coffee">Coffee</wired-item>
        <wired-item value="construction">Construction</wired-item>
        <wired-item value="cowboy">Cowboy</wired-item>
        <wired-item value="education">Education</wired-item>
        <wired-item value="knight">Knight</wired-item>
        <wired-item value="ninja">Ninja</wired-item>
        <wired-item value="party">Party</wired-item>
        <wired-item value="pirate">Pirate</wired-item>
        <wired-item value="watermelon">Watermelon</wired-item>
      </wired-combo>
                `
  }


  convertSeedToLink(){
    const link = `${location.origin}${location.pathname}?seed=${this.seed}&walking=${this.settings.walking}&fire=${this.settings.fire}`;
    navigator.clipboard.writeText(link);
    alert("Link copied.");
  }


updateCharacter(property, value) {
  this.settings = { 
    ...this.settings, 
    [property]: value
  };
  this.updateSeed();
}

updateSeed() {
  const { base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.settings;
  this.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
}


}


customElements.define(RpgMe.tag, RpgMe);