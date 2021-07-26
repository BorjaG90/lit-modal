import { html } from 'lit-html';
import '../lit-modal.js';

export default {
  title: 'LitModal',
  component: 'lit-modal',
  argTypes: {
    isShow: { control: 'boolean' },
    isBackdropActive: { control: 'boolean' },
    textColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    backdropColor: { control: 'color' },
    borderColor: { control: 'color' },
    buttonColor: { control: 'color' },
  },
};

function Template({
  isShow = false,
  isBackdropActive = true,
  textColor = '#000',
  backgroundColor = '#fefefe',
  backdropColor = '#00000040',
  borderColor = '#888',
  buttonColor = '#aaaaaa',
  slot,
}) {
  return html`
    <button @click=${() => document.getElementById('modal').showModal()}>
      Show modal
    </button>
    <lit-modal
      id="modal"
      style="--lit-modal-text-color: ${textColor || '#000'}; 
      --lit-modal-background-color: ${backgroundColor || '#fefefe'};
      --lit-modal-backdrop-color: ${backdropColor || '#00000040'};
      --lit-modal-border-color: ${borderColor || '#888'};
      --lit-modal-btn-color: ${buttonColor || '#aaaaaa'};
      "
      .isShow=${isShow}
      .isBackdropActive=${isBackdropActive}
    >
      ${slot}
    </lit-modal>
  `;
}

export const Regular = Template.bind({});
Regular.args = {
  slot: html`<p>Regular component</p>`,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<h1>Slotted content</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ad
      aliquam consequatur molestiae fugiat quo placeat, quos ea, repellat
      accusamus commodi ducimus sit consequuntur at laborum. Animi alias
      laudantium consequatur.
    </p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};

export const BackdropInactive = Template.bind({});
BackdropInactive.args = {
  isBackdropActive: false,
};
BackdropInactive.args = {
  slot: html`<p>Backdrop inactive</p>`,
};
