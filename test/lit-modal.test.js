import { html, fixture, expect } from '@open-wc/testing';

import '../lit-modal.js';

describe('LitModal', () => {
  const content =
    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto dolore dolores unde provident explicabo nobis repudiandae quaerat exercitationem! Alias magnam eum sint eius soluta eos commodi nostrum sunt dolore!</p>';

  it('should not be visible by default', async () => {
    const el = await fixture(html`<lit-modal>${content}</lit-modal>`);

    expect(el.isShow).to.be.false;
  });

  it('should open the modal when activate', async () => {
    const el = await fixture(html` <lit-modal>${content}</lit-modal>`);

    el.showModal();
    expect(el.isShow).to.be.true;
  });

  it('should show content when the modal is open', async () => {
    // const el = await fixture(html` <button
    //     @click="${() => {
    //       document.querySelector('lit-modal').showModal();
    //     }}"
    //   ></button>
    //   <lit-modal>${content}</lit-modal>`);

    const el = await fixture(html` <lit-modal>${content}</lit-modal>`);

    // el.shadowRoot.querySelector('button').click();

    el.showModal();
    expect(el.isShow).to.be.true;
    expect(el.children.length > 1);
  });

  it('should close the modal when click the button', async () => {
    const el = await fixture(html` <lit-modal isShow>${content}</lit-modal>`);

    // el.showModal();
    expect(el.isShow).to.be.true;

    el.shadowRoot.querySelector('.btn-close').click();
    expect(el.isShow).to.be.false;
  });

  it('should close the modal when click outside the modal', async () => {
    const el = await fixture(html` <lit-modal isShow>${content}</lit-modal>`);

    expect(el.isBackdropActive).to.be.true;

    // el.showModal();
    expect(el.isShow).to.be.true;

    el.shadowRoot.querySelector('.backdrop').click();
    expect(el.isShow).to.be.false;
  });

  it('should not close the modal when click outside the modal and isBackdropActive is false', async () => {
    const el = await fixture(
      html` <lit-modal isShow .isBackdropActive=${false}>${content}</lit-modal>`
    );

    expect(el.isBackdropActive).to.be.false;

    // el.showModal();
    expect(el.isShow).to.be.true;

    el.shadowRoot.querySelector('.backdrop').click();
    expect(el.isShow).to.be.true;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<lit-modal>${content}</lit-modal>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
