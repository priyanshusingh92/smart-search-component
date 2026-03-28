import { css as v, LitElement as w, html as a } from "lit";
import { property as f, state as h, query as _, customElement as y } from "lit/decorators.js";
import { classMap as p } from "lit/directives/class-map.js";
import { unsafeHTML as g } from "lit/directives/unsafe-html.js";
function u(e, t) {
  let r;
  return function(...i) {
    const l = () => {
      clearTimeout(r), e(...i);
    };
    clearTimeout(r), r = setTimeout(l, t);
  };
}
function b(e, t, r = !1) {
  if (!t) return e;
  const s = r ? "g" : "gi", i = new RegExp(`(${k(t)})`, s);
  return e.replace(i, "<mark>$1</mark>");
}
function k(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function $(e, t, r, s = !1) {
  let i = e;
  if (t) {
    const n = s ? t : t.toLowerCase();
    i = i.filter((c) => {
      const x = s ? c.title : c.title.toLowerCase(), m = c.subtitle ? s ? c.subtitle : c.subtitle.toLowerCase() : "";
      return x.includes(n) || m.includes(n);
    });
  }
  const l = r.filter((n) => n.checked).map((n) => n.value);
  return l.length > 0 && (i = i.filter((n) => l.includes(n.type))), i;
}
const R = v`
  * {
    box-sizing: border-box;
  }

  :host {
    --primary-color: var(--search-primary-color, #0066cc);
    --background-color: var(--search-background-color, #ffffff);
    --text-color: var(--search-text-color, #333333);
    --border-color: var(--search-border-color, #dddddd);
    --hover-color: var(--search-hover-color, #f5f5f5);
    --selected-color: var(--search-selected-color, #e6f2ff);
    --focus-color: var(--search-focus-color, #0066cc);
    --font-size: var(--search-font-size, 14px);
    --border-radius: var(--search-border-radius, 4px);
    
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-size: var(--font-size);
    color: var(--text-color);
    position: relative;
  }
`;
var E = Object.defineProperty, C = Object.getOwnPropertyDescriptor, d = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? C(t, r) : t, l = e.length - 1, n; l >= 0; l--)
    (n = e[l]) && (i = (s ? n(t, r, i) : n(i)) || i);
  return s && i && E(t, r, i), i;
};
let o = class extends w {
  constructor() {
    super(...arguments), this.results = [], this.filters = [], this.config = {
      placeholder: "Search accounts, transactions, customers...",
      minChars: 2,
      debounceMs: 300,
      maxResults: 50,
      enableFilters: !0,
      highlightMatches: !0,
      caseSensitive: !1
    }, this._query = "", this._isOpen = !1, this._highlightedIndex = -1, this._filteredResults = [], this._isLoading = !1, this._debouncedSearch = u((e) => {
      this._performSearch(e);
    }, this.config.debounceMs || 300), this._handleClickOutside = (e) => {
      var t;
      (t = this.shadowRoot) != null && t.contains(e.target) || this._closeDropdown();
    }, this._handleResize = u(() => {
      this._isOpen && this._adjustDropdownPosition();
    }, 100), this._handleScroll = u(() => {
      this._isOpen && this._adjustDropdownPosition();
    }, 50);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._handleClickOutside), window.addEventListener("resize", this._handleResize), window.addEventListener("scroll", this._handleScroll, !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._handleClickOutside), window.removeEventListener("resize", this._handleResize), window.removeEventListener("scroll", this._handleScroll, !0);
  }
  updated(e) {
    super.updated(e), e.has("results") && this._updateFilteredResults(), e.has("_isOpen") && this._isOpen && this._adjustDropdownPosition();
  }
  _adjustDropdownPosition() {
    if (!this._dropdown) return;
    const e = this.getBoundingClientRect(), t = window.innerHeight - e.bottom, r = this._dropdown.offsetHeight;
    window.innerWidth <= 768 || (t < r && e.top > r ? (this._dropdown.style.top = "auto", this._dropdown.style.bottom = "calc(100% + 4px)") : (this._dropdown.style.top = "calc(100% + 4px)", this._dropdown.style.bottom = "auto"));
  }
  _handleInput(e) {
    const t = e.target;
    this._query = t.value, this._query.length >= (this.config.minChars || 2) ? (this._isLoading = !0, this._openDropdown(), this._debouncedSearch(this._query)) : this._query.length === 0 && (this._filteredResults = [], this._closeDropdown()), this._dispatchSearchEvent();
  }
  _performSearch(e) {
    this._updateFilteredResults(), this._isLoading = !1, this._highlightedIndex = -1;
  }
  _updateFilteredResults() {
    this.filters.filter((e) => e.checked), this._filteredResults = $(
      this.results,
      this._query,
      this.filters,
      this.config.caseSensitive
    ), this.config.maxResults && (this._filteredResults = this._filteredResults.slice(0, this.config.maxResults));
  }
  _handleClear() {
    this._query = "", this._filteredResults = [], this._closeDropdown(), this._searchInput.focus(), this._dispatchSearchEvent();
  }
  _handleKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(), this._highlightNext();
        break;
      case "ArrowUp":
        e.preventDefault(), this._highlightPrevious();
        break;
      case "Enter":
        e.preventDefault(), this._highlightedIndex >= 0 && this._selectResult(this._filteredResults[this._highlightedIndex]);
        break;
      case "Escape":
        e.preventDefault(), this._closeDropdown();
        break;
    }
  }
  _highlightNext() {
    if (!this._isOpen) {
      this._openDropdown();
      return;
    }
    this._highlightedIndex < this._filteredResults.length - 1 && (this._highlightedIndex++, this._scrollToHighlighted());
  }
  _highlightPrevious() {
    this._highlightedIndex > 0 && (this._highlightedIndex--, this._scrollToHighlighted());
  }
  _scrollToHighlighted() {
    requestAnimationFrame(() => {
      var t;
      const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".result-item.highlighted");
      e && e.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }
  _handleFilterChange(e, t) {
    const r = t.target.checked;
    this.filters = this.filters.map(
      (s) => s.id === e.id ? { ...s, checked: r } : s
    ), this._updateFilteredResults(), this._dispatchFilterChangeEvent(), this._dispatchSearchEvent();
  }
  _selectResult(e) {
    this.dispatchEvent(
      new CustomEvent("select", {
        detail: { result: e },
        bubbles: !0,
        composed: !0
      })
    ), this._closeDropdown();
  }
  _openDropdown() {
    this._isOpen = !0, this.dispatchEvent(new CustomEvent("open", { bubbles: !0, composed: !0 }));
  }
  _closeDropdown() {
    this._isOpen = !1, this._highlightedIndex = -1, this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _dispatchSearchEvent() {
    this.dispatchEvent(
      new CustomEvent("search", {
        detail: {
          query: this._query,
          filters: this.filters.filter((e) => e.checked)
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _dispatchFilterChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("filter-change", {
        detail: {
          filters: this.filters.filter((e) => e.checked)
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _renderFilters() {
    return !this.config.enableFilters || this.filters.length === 0 ? null : a`
      <div class="filters-section" role="group" aria-label="Filter options">
        ${this.filters.map((e) => a`
          <label class="filter-chip ${p({ active: e.checked || !1 })}">
            <input
              type="checkbox"
              .checked=${e.checked || !1}
              @change=${(t) => this._handleFilterChange(e, t)}
              aria-label="Filter by ${e.label}"
            />
            <span>${e.label}</span>
          </label>
        `)}
      </div>
    `;
  }
  _renderResult(e, t) {
    const r = t === this._highlightedIndex, s = this.config.highlightMatches ? b(e.title, this._query, this.config.caseSensitive) : e.title, i = e.subtitle && this.config.highlightMatches ? b(e.subtitle, this._query, this.config.caseSensitive) : e.subtitle;
    return a`
      <div
        class="result-item ${p({ highlighted: r })}"
        role="option"
        aria-selected=${r}
        tabindex="0"
        @click=${() => this._selectResult(e)}
        @keydown=${(l) => {
      (l.key === "Enter" || l.key === " ") && (l.preventDefault(), this._selectResult(e));
    }}
      >
        ${e.icon ? a`<div class="result-icon">${e.icon}</div>` : null}
        <div class="result-content">
          <div class="result-title">${g(s)}</div>
          ${i ? a`<div class="result-subtitle">${g(i)}</div>` : null}
          ${e.description ? a`<div class="result-description">${e.description}</div>` : null}
          <span class="result-type-badge type-${e.type}">${e.type}</span>
        </div>
      </div>
    `;
  }
  _renderResults() {
    return this._isLoading ? a`<div class="loading" role="status" aria-live="polite">Loading...</div>` : this._filteredResults.length === 0 ? a`
        <div class="no-results" role="status" aria-live="polite">
          No results found for "${this._query}"
        </div>
      ` : a`
      <div
        class="results-section"
        role="listbox"
        aria-label="Search results"
      >
        ${this._filteredResults.map((e, t) => this._renderResult(e, t))}
      </div>
    `;
  }
  render() {
    return a`
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            class="search-input"
            .value=${this._query}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
            placeholder=${this.config.placeholder || "Search..."}
            aria-label="Search"
            aria-expanded=${this._isOpen}
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant=${this._highlightedIndex >= 0 ? `result-${this._highlightedIndex}` : ""}
            role="combobox"
          />
          ${this._query ? a`
                <button
                  class="clear-button"
                  @click=${this._handleClear}
                  aria-label="Clear search"
                  type="button"
                >
                  ✕
                </button>
              ` : null}
        </div>

        <div
          id="search-results"
          class="dropdown ${p({ hidden: !this._isOpen })}"
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
};
o.styles = [
  R,
  v`
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
d([
  f({ type: Array })
], o.prototype, "results", 2);
d([
  f({ type: Array })
], o.prototype, "filters", 2);
d([
  f({ type: Object })
], o.prototype, "config", 2);
d([
  h()
], o.prototype, "_query", 2);
d([
  h()
], o.prototype, "_isOpen", 2);
d([
  h()
], o.prototype, "_highlightedIndex", 2);
d([
  h()
], o.prototype, "_filteredResults", 2);
d([
  h()
], o.prototype, "_isLoading", 2);
d([
  _(".search-input")
], o.prototype, "_searchInput", 2);
d([
  _(".dropdown")
], o.prototype, "_dropdown", 2);
o = d([
  y("smart-search")
], o);
export {
  o as SmartSearch
};
