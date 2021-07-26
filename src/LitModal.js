import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import '@polymer/iron-icons/iron-icons.js';

export class LitModal extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--lit-modal-text-color, #000);
      }

      .backdrop {
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: var(--lit-modal-backdrop-color, #000);
        background-color: rgba(0, 0, 0, 0.4);
      }

      .modal {
        background-color: var(--lit-modal-background-color, #fefefe);
        margin: auto;
        padding: 20px;
        border: 1px solid var(--lit-modal-border-color, #888);
        width: 80%;
      }

      .btn-close {
        color: var(--lit-modal-btn-color, #aaaaaa);
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .btn-close:hover,
      .btn-close:focus {
        color: var(--lit-modal-text-color, #000);
        text-decoration: none;
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {
      content: { type: String },
      isBackdropActive: { type: Boolean },
      isShow: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.content = '<h1>Hey there</h1>';
    this.isBackdropActive = true;
    this.isShow = false;
  }

  showModal() {
    this.isShow = true;
  }

  closeModal() {
    this.isShow = false;
  }

  onKeyup(e) {
    if (e.code in [13, 27, 32]) {
      this.closeModal();
    }
  }

  render() {
    return html`
      <div
        class="backdrop"
        @click="${this.isBackdropActive ? this.closeModal : nothing}"
        @keyup="${this.onKeyup}"
        style="${this.isShow ? 'display: block' : 'display: none'}"
      >
        <div class="modal">
          <span
            @click="${this.closeModal}"
            @keyup="${this.onKeyup}"
            class="btn-close"
            >&times;</span
          >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
