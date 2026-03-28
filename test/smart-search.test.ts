import { expect, fixture, html, waitUntil, oneEvent } from '@open-wc/testing';
import { SmartSearch } from '../src/components/smart-search';
import '../src/components/smart-search';
import { describe, it } from 'node:test';

describe('SmartSearch', () => {
  it('renders with default properties', async () => {
    const el = await fixture<SmartSearch>(html`<smart-search></smart-search>`);
    expect(el).to.exist;
    
    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    expect(input).to.exist;
    expect(input.placeholder).to.include('Search');
  });

  it('displays search results', async () => {
    const el = await fixture<SmartSearch>(html`
      <smart-search
        .results=${[
          { id: '1', type: 'account', title: 'Checking Account' },
          { id: '2', type: 'customer', title: 'John Doe' }
        ]}
      ></smart-search>
    `);

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = 'checking';
    input.dispatchEvent(new Event('input'));

    await waitUntil(() => 
      el.shadowRoot!.querySelectorAll('.result-item').length > 0
    );

    const results = el.shadowRoot!.querySelectorAll('.result-item');
    expect(results.length).to.be.greaterThan(0);
  });

  it('handles keyboard navigation', async () => {
    const el = await fixture<SmartSearch>(html`
      <smart-search
        .results=${[
          { id: '1', type: 'account', title: 'Account 1' },
          { id: '2', type: 'account', title: 'Account 2' }
        ]}
      ></smart-search>
    `);

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = 'account';
    input.dispatchEvent(new Event('input'));

    await el.updateComplete;

    // Arrow down
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;

    const highlighted = el.shadowRoot!.querySelector('.result-item.highlighted');
    expect(highlighted).to.exist;
  });

  it('emits select event when result is clicked', async () => {
    const el = await fixture<SmartSearch>(html`
      <smart-search
        .results=${[
          { id: '1', type: 'account', title: 'Checking Account' }
        ]}
      ></smart-search>
    `);

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = 'checking';
    input.dispatchEvent(new Event('input'));

    await waitUntil(() => 
      el.shadowRoot!.querySelectorAll('.result-item').length > 0
    );

    setTimeout(() => {
      const result = el.shadowRoot!.querySelector('.result-item') as HTMLElement;
      result.click();
    });

    const { detail } = await oneEvent(el, 'select');
    expect(detail.result.id).to.equal('1');
  });

  it('filters results by type', async () => {
    const el = await fixture<SmartSearch>(html`
      <smart-search
        .results=${[
          { id: '1', type: 'account', title: 'Account 1' },
          { id: '2', type: 'customer', title: 'Customer 1' }
        ]}
        .filters=${[
          { id: 'account', label: 'Accounts', value: 'account', checked: true },
          { id: 'customer', label: 'Customers', value: 'customer', checked: false }
        ]}
      ></smart-search>
    `);

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = '1';
    input.dispatchEvent(new Event('input'));

    await el.updateComplete;
    await waitUntil(() => 
      el.shadowRoot!.querySelectorAll('.result-item').length > 0
    );

    const results = el.shadowRoot!.querySelectorAll('.result-item');
    expect(results.length).to.equal(1);
  });

  it('clears search when clear button is clicked', async () => {
    const el = await fixture<SmartSearch>(html`<smart-search></smart-search>`);

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    await el.updateComplete;

    const clearButton = el.shadowRoot!.querySelector('.clear-button') as HTMLButtonElement;
    expect(clearButton).to.exist;
    
    clearButton.click();
    await el.updateComplete;

    expect(input.value).to.equal('');
  });

  it('handles escape key to close dropdown', async () => {
    const el = await fixture<SmartSearch>(html`
      <smart-search
        .results=${[{ id: '1', type: 'account', title: 'Account 1' }]}
      ></smart-search>
    `);

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    input.value = 'account';
    input.dispatchEvent(new Event('input'));

    await el.updateComplete;

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.dropdown');
    expect(dropdown?.classList.contains('hidden')).to.be.true;
  });

  it('respects custom configuration', async () => {
    const el = await fixture<SmartSearch>(html`
      <smart-search
        .config=${{
          placeholder: 'Custom placeholder',
          minChars: 3,
          enableFilters: false
        }}
      ></smart-search>
    `);

    const input = el.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
    expect(input.placeholder).to.equal('Custom placeholder');

    const filtersSection = el.shadowRoot!.querySelector('.filters-section');
    expect(filtersSection).to.not.exist;
  });
});