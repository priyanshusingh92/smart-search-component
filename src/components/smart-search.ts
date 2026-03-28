import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
  SearchResult,
  FilterOption,
  SearchConfig,
  SearchEventDetail,
  SelectEventDetail,
  FilterChangeEventDetail
} from '../types/index';
import { debounce, highlightText, filterResults } from '../utils/helpers';
import { baseStyles } from '../styles/themes';

@customElement('smart-search')
export class SmartSearch extends LitElement {
  static styles = [
    baseStyles,
    css`
      .search-container {
        position: relative;
        width: 100%;
      }

      .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        background: var(--background-color);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        transition: border-color 0.2s;
      }

      .search-input-wrapper:focus-within {
        border-color: var(--focus-color);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
      }

      .search-icon {
        padding: 0 12px;
        color: #999;
        pointer-events: none;
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        padding: 12px 12px 12px 0;
        font-size: var(--font-size);
        background: transparent;
        color: var(--text-color);
      }

      .clear-button {
        padding: 8px 12px;
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        font-size: 18px;
        line-height: 1;
        transition: color 0.2s;
      }

      .clear-button:hover {
        color: var(--text-color);
      }

      .clear-button:focus {
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
        border-radius: 2px;
      }

      .dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-height: 400px;
        overflow: hidden;
        z-index: 1000;
        display: flex;
        flex-direction: column;
      }

      .dropdown.hidden {
        display: none;
      }

      .filters-section {
        padding: 12px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: var(--hover-color);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s;
        user-select: none;
      }

      .filter-chip:hover {
        background: var(--selected-color);
      }

      .filter-chip.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .filter-chip input[type="checkbox"] {
        margin: 0;
        cursor: pointer;
      }

      .results-section {
        overflow-y: auto;
        max-height: 320px;
      }

      .result-item {
        padding: 12px;
        cursor: pointer;
        border-bottom: 1px solid var(--hover-color);
        transition: background-color 0.2s;
        display: flex;
        align-items: start;
        gap: 12px;
      }

      .result-item:last-child {
        border-bottom: none;
      }

      .result-item:hover,
      .result-item.highlighted {
        background: var(--hover-color);
      }

      .result-item.selected {
        background: var(--selected-color);
      }

      .result-item:focus {
        outline: 2px solid var(--focus-color);
        outline-offset: -2px;
      }

      .result-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .result-content {
        flex: 1;
        min-width: 0;
      }

      .result-title {
        font-weight: 600;
        margin: 0 0 4px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-subtitle {
        font-size: 12px;
        color: #666;
        margin: 0 0 4px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-description {
        font-size: 13px;
        color: #888;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .result-type-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .type-account {
        background: #e3f2fd;
        color: #1976d2;
      }

      .type-transaction {
        background: #f3e5f5;
        color: #7b1fa2;
      }

      .type-customer {
        background: #e8f5e9;
        color: #388e3c;
      }

      .type-other {
        background: #fff3e0;
        color: #f57c00;
      }

      .no-results {
        padding: 24px;
        text-align: center;
        color: #999;
      }

      .loading {
        padding: 24px;
        text-align: center;
        color: #999;
      }

      mark {
        background: #ffeb3b;
        padding: 0 2px;
        border-radius: 2px;
      }

      @media (max-width: 768px) {
        .dropdown {
          position: fixed;
          top: auto;
          bottom: 0;
          left: 0;
          right: 0;
          max-height: 70vh;
          border-radius: var(--border-radius) var(--border-radius) 0 0;
        }

        .filter-chip {
          font-size: 12px;
          padding: 8px 12px;
        }
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `
  ];

  @property({ type: Array }) results: SearchResult[] = [];
  @property({ type: Array }) filters: FilterOption[] = [];
  @property({ type: Object }) config: SearchConfig = {
    placeholder: 'Search accounts, transactions, customers...',
    minChars: 2,
    debounceMs: 300,
    maxResults: 50,
    enableFilters: true,
    highlightMatches: true,
    caseSensitive: false
  };

  @state() private _query = '';
  @state() private _isOpen = false;
  @state() private _highlightedIndex = -1;
  @state() private _filteredResults: SearchResult[] = [];
  @state() private _isLoading = false;

  @query('.search-input') private _searchInput!: HTMLInputElement;
  @query('.dropdown') private _dropdown!: HTMLElement;

  private _debouncedSearch = debounce((query: string) => {
    this._performSearch(query);
  }, this.config.debounceMs || 300);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
    window.addEventListener('resize', this._handleResize);
    window.addEventListener('scroll', this._handleScroll, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('scroll', this._handleScroll, true);
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('results')) {
      this._updateFilteredResults();
    }

    if (changedProperties.has('_isOpen') && this._isOpen) {
      this._adjustDropdownPosition();
    }
  }

  private _handleClickOutside = (event: MouseEvent) => {
    if (!this.shadowRoot?.contains(event.target as Node)) {
      this._closeDropdown();
    }
  };

  private _handleResize = debounce(() => {
    if (this._isOpen) {
      this._adjustDropdownPosition();
    }
  }, 100);

  private _handleScroll = debounce(() => {
    if (this._isOpen) {
      this._adjustDropdownPosition();
    }
  }, 50);

  private _adjustDropdownPosition() {
    if (!this._dropdown) return;

    const rect = this.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = this._dropdown.offsetHeight;

    // On mobile, use fixed positioning at bottom
    if (window.innerWidth <= 768) {
      return;
    }

    // Adjust position if not enough space below
    if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
      this._dropdown.style.top = 'auto';
      this._dropdown.style.bottom = 'calc(100% + 4px)';
    } else {
      this._dropdown.style.top = 'calc(100% + 4px)';
      this._dropdown.style.bottom = 'auto';
    }
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._query = target.value;

    if (this._query.length >= (this.config.minChars || 2)) {
      this._isLoading = true;
      this._openDropdown();
      this._debouncedSearch(this._query);
    } else if (this._query.length === 0) {
      this._filteredResults = [];
      this._closeDropdown();
    }

    this._dispatchSearchEvent();
  }

  private _performSearch(query: string) {
    // Filter results based on query and active filters
    this._updateFilteredResults();
    this._isLoading = false;
    this._highlightedIndex = -1;
  }

  private _updateFilteredResults() {
    const activeFilters = this.filters.filter(f => f.checked);
    this._filteredResults = filterResults(
      this.results,
      this._query,
      this.filters,
      this.config.caseSensitive
    );

    if (this.config.maxResults) {
      this._filteredResults = this._filteredResults.slice(0, this.config.maxResults);
    }
  }

  private _handleClear() {
    this._query = '';
    this._filteredResults = [];
    this._closeDropdown();
    this._searchInput.focus();
    this._dispatchSearchEvent();
  }

  private _handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._highlightNext();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._highlightPrevious();
        break;
      case 'Enter':
        e.preventDefault();
        if (this._highlightedIndex >= 0) {
          this._selectResult(this._filteredResults[this._highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._closeDropdown();
        break;
    }
  }

  private _highlightNext() {
    if (!this._isOpen) {
      this._openDropdown();
      return;
    }

    if (this._highlightedIndex < this._filteredResults.length - 1) {
      this._highlightedIndex++;
      this._scrollToHighlighted();
    }
  }

  private _highlightPrevious() {
    if (this._highlightedIndex > 0) {
      this._highlightedIndex--;
      this._scrollToHighlighted();
    }
  }

  private _scrollToHighlighted() {
    requestAnimationFrame(() => {
      const highlighted = this.shadowRoot?.querySelector('.result-item.highlighted');
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  private _handleFilterChange(filter: FilterOption, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    
    // Update filter state
    this.filters = this.filters.map(f =>
      f.id === filter.id ? { ...f, checked } : f
    );

    this._updateFilteredResults();
    this._dispatchFilterChangeEvent();
    this._dispatchSearchEvent();
  }

  private _selectResult(result: SearchResult) {
    this.dispatchEvent(
      new CustomEvent<SelectEventDetail>('select', {
        detail: { result },
        bubbles: true,
        composed: true
      })
    );
    this._closeDropdown();
  }

  private _openDropdown() {
    this._isOpen = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private _closeDropdown() {
    this._isOpen = false;
    this._highlightedIndex = -1;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _dispatchSearchEvent() {
    this.dispatchEvent(
      new CustomEvent<SearchEventDetail>('search', {
        detail: {
          query: this._query,
          filters: this.filters.filter(f => f.checked)
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private _dispatchFilterChangeEvent() {
    this.dispatchEvent(
      new CustomEvent<FilterChangeEventDetail>('filter-change', {
        detail: {
          filters: this.filters.filter(f => f.checked)
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private _renderFilters() {
    if (!this.config.enableFilters || this.filters.length === 0) {
      return null;
    }

    return html`
      <div class="filters-section" role="group" aria-label="Filter options">
        ${this.filters.map(filter => html`
          <label class="filter-chip ${classMap({ active: filter.checked || false })}">
            <input
              type="checkbox"
              .checked=${filter.checked || false}
              @change=${(e: Event) => this._handleFilterChange(filter, e)}
              aria-label="Filter by ${filter.label}"
            />
            <span>${filter.label}</span>
          </label>
        `)}
      </div>
    `;
  }

  private _renderResult(result: SearchResult, index: number) {
    const isHighlighted = index === this._highlightedIndex;
    const title = this.config.highlightMatches
      ? highlightText(result.title, this._query, this.config.caseSensitive)
      : result.title;
    const subtitle = result.subtitle && this.config.highlightMatches
      ? highlightText(result.subtitle, this._query, this.config.caseSensitive)
      : result.subtitle;

    return html`
      <div
        class="result-item ${classMap({ highlighted: isHighlighted })}"
        role="option"
        aria-selected=${isHighlighted}
        tabindex="0"
        @click=${() => this._selectResult(result)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._selectResult(result);
          }
        }}
      >
        ${result.icon ? html`<div class="result-icon">${result.icon}</div>` : null}
        <div class="result-content">
          <div class="result-title">${unsafeHTML(title)}</div>
          ${subtitle ? html`<div class="result-subtitle">${unsafeHTML(subtitle)}</div>` : null}
          ${result.description ? html`<div class="result-description">${result.description}</div>` : null}
          <span class="result-type-badge type-${result.type}">${result.type}</span>
        </div>
      </div>
    `;
  }

  private _renderResults() {
    if (this._isLoading) {
      return html`<div class="loading" role="status" aria-live="polite">Loading...</div>`;
    }

    if (this._filteredResults.length === 0) {
      return html`
        <div class="no-results" role="status" aria-live="polite">
          No results found for "${this._query}"
        </div>
      `;
    }

    return html`
      <div
        class="results-section"
        role="listbox"
        aria-label="Search results"
      >
        ${this._filteredResults.map((result, index) => this._renderResult(result, index))}
      </div>
    `;
  }

  render() {
    return html`
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            class="search-input"
            .value=${this._query}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
            placeholder=${this.config.placeholder || 'Search...'}
            aria-label="Search"
            aria-expanded=${this._isOpen}
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant=${this._highlightedIndex >= 0 
              ? `result-${this._highlightedIndex}` 
              : ''}
            role="combobox"
          />
          ${this._query
            ? html`
                <button
                  class="clear-button"
                  @click=${this._handleClear}
                  aria-label="Clear search"
                  type="button"
                >
                  ✕
                </button>
              `
            : null}
        </div>

        <div
          id="search-results"
          class="dropdown ${classMap({ hidden: !this._isOpen })}"
          role="region"
          aria-label="Search results dropdown"
        >
          ${this._renderFilters()}
          ${this._renderResults()}
        </div>

        <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
          ${this._filteredResults.length} results found
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'smart-search': SmartSearch;
  }
}