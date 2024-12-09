
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
      seed: "00000000",
      base: 0, // boolean, 0 = no, 1= yes
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
      ...super.properties,
      title: {type: String},
      settings: { type: Object },
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
      <label> Base (Hair or no?)</label>
      <wired-checkbox></wired-checkbox>
      <label> Walking? </label>
      <wired-checkbox></wired-checkbox>
      <label> On fire? </label>
      <wired-checkbox></wired-checkbox>
      <label> Face </label>
      <wired-slider></wired-slider>
      <label> Face Item </label>
      <wired-slider></wired-slider>
      <label> Hair </label>
      <wired-slider></wired-slider>
      <label> Pants </label>
      <wired-slider></wired-slider>
      <label> Shirt </label>
      <wired-slider></wired-slider>
      <label> Skin </label>
      <wired-slider></wired-slider>
      <label> Hat Color </label>
      <wired-slider></wired-slider>

    
     </div> 
     </div>
        
    `;
  }
}

customElements.define(RpgMe.tag, RpgMe);