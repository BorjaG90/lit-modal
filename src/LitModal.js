import { html, css, LitElement } from 'lit-element';

export class LitModal extends LitElement {
  static get is() {
    return 'lit-modal';
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        padding: 25px;
        color: var(--lit-modal-text-color, #000);
      }

      .backdrop {
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: var(--lit-modal-backdrop-color, #00000040) !important;
        background-color: rgba(0, 0, 0, 0.4);
      }

      .modal {
        background-color: var(--lit-modal-background-color, #fefefe);
        margin: auto;
        padding: 20px;
        border: 1px solid var(--lit-modal-border-color, #888);
        border-radius: var(--lit-modal-border-radius, '5px');
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
      canBackdropClose: { type: Boolean, attribute: 'close-backdrop' },
      isShow: { type: Boolean, attribute: 'show' },
    };
  }

  constructor() {
    super();
    this.canBackdropClose = false;
    this.isShow = false;
  }

  setModalShow(value) {
    this.isShow = value;
  }

  onKeyup(e) {
    if (e.code in [13, 27, 32]) {
      this.closeModal();
    }
  }

  onBackdropClick(e) {
    if (e.target.nodeName === 'DIV' && e.target.className === 'backdrop') {
      return this.canBackdropClose ? this.setModalShow(false) : null;
    }
    return null;
  }

  render() {
    return html`
      <slot
        name="modal-open"
        @click="${() => this.setModalShow(true)}"
        @keyup="${this.onKeyup}"
      ></slot>
      <div
        class="backdrop"
        @click="${this.onBackdropClick}"
        @keyup="${this.onKeyup}"
        style="${this.isShow ? 'display: flex' : 'display: none'}"
      >
        <div class="modal">
          <slot
            name="modal-close"
            class=".btn-close"
            @click="${() => this.setModalShow(false)}"
            @keyup="${this.onKeyup}"
          ></slot>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
