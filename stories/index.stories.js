import { html } from 'lit-html';
import '../lit-modal.js';

export default {
  title: 'LitModal',
  component: 'lit-modal',
  argTypes: {
    isShow: { control: 'boolean' },
    closeByBackdrop: { control: 'boolean' },
    textColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    backdropColor: { control: 'color' },
    borderColor: { control: 'color' },
    buttonColor: { control: 'color' },
    borderRadius: { control: 'text' },
  },
};

function Template({
  isShow = false,
  closeByBackdrop = false,
  textColor = 'blue',
  backgroundColor = '#fefefe',
  backdropColor = '#00000040',
  borderColor = '#888',
  buttonColor = 'red',
  borderRadius = '5px',
  slot,
  modalClose,
}) {
  return html`
    <style>
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
    </style>

    <button @click=${() => document.getElementById('modal').setModalShow(true)}>
      Show modal
    </button>

    <lit-modal
      id="modal"
      style="--lit-modal-text-color: ${textColor || '#000'}; 
      --lit-modal-background-color: ${backgroundColor || '#fefefe'};
      --lit-modal-backdrop-color: ${backdropColor || '#00000040'};
      --lit-modal-border-color: ${borderColor || '#888'};
      --lit-modal-btn-color: ${buttonColor || '#aaaaaa'};
      --lit-modal-border-radius: ${borderRadius || '5px'} ;
      "
      ?show=${isShow}
      ?close-backdrop=${closeByBackdrop}
    >
      ${modalClose} ${slot}
    </lit-modal>
  `;
}

export const Regular = Template.bind({});
const modalCloseHtml = html`<span slot="modal-close" class="btn-close"
  >&#62;</span
>`;
Regular.args = {
  closeByBackdrop: true,
  modalClose: modalCloseHtml,
  slot: html`<p>Regular component</p>`,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  closeByBackdrop: true,
  modalClose: modalCloseHtml,
  slot: html`<h1>Slotted content</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ad
      aliquam consequatur molestiae fugiat quo placeat, quos ea, repellat
      accusamus commodi ducimus sit consequuntur at laborum. Animi alias
      laudantium consequatur.
    </p>`,
};
SlottedContent.argTypes = {
  modalClose: modalCloseHtml,
  slot: { table: { disable: true } },
};

export const BackdropInactive = Template.bind({});
BackdropInactive.args = {
  modalClose: modalCloseHtml,
  slot: html`<p>Backdrop inactive</p>`,
};
