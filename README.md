# Smart Banking Search Component

A reusable, accessible, and customizable web component for banking applications built with Lit.

## Features

- ✅ **Framework agnostic** — Works with React, Vue, Angular, or vanilla JavaScript
- ✅ **Fully accessible** — WCAG 2.1 compliant with keyboard navigation and screen reader support
- ✅ **Themeable** — Light/dark themes with CSS custom properties
- ✅ **Mobile responsive** — Touch-friendly on all devices
- ✅ **Type-safe** — Built with TypeScript
- ✅ **Tested** — Comprehensive test coverage
- ✅ **Performant** — Debounced search with efficient filtering

## Installation

```bash
npm install smart-banking-search
```

## Usage

### HTML

```html
<script type="module" src="smart-banking-search/dist/smart-search.js"></script>

<smart-search id="search"></smart-search>

<script>
  const search = document.getElementById('search');

  search.results = [
    { id: '1', type: 'account', title: 'Checking Account', subtitle: '**** 1234' },
    { id: '2', type: 'customer', title: 'John Doe', subtitle: 'Premium Member' }
  ];

  search.addEventListener('select', (e) => {
    console.log('Selected:', e.detail.result);
  });
</script>
```

### React

```tsx
import 'smart-banking-search';

function App() {
  const results = [
    { id: '1', type: 'account', title: 'Checking Account' }
  ];

  return (
    <smart-search
      results={results}
      onSelect={(e) => console.log(e.detail)}
    />
  );
}
```

## API

### Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `results` | `SearchResult[]` | `[]` | Array of search results |
| `filters` | `FilterOption[]` | `[]` | Filter options |
| `config` | `SearchConfig` | `{}` | Configuration options |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `search` | `{ query, filters }` | Fired when search query changes |
| `select` | `{ result }` | Fired when a result is selected |
| `filter-change` | `{ filters }` | Fired when filters change |
| `open` | `-` | Fired when dropdown opens |
| `close` | `-` | Fired when dropdown closes |

### SearchConfig

```ts
interface SearchConfig {
  placeholder?: string;           // Input placeholder text
  minChars?: number;             // Minimum characters to trigger search (default: 2)
  debounceMs?: number;            // Debounce delay in ms (default: 300)
  maxResults?: number;            // Maximum results to display (default: 50)
  enableFilters?: boolean;        // Show filter chips (default: true)
  highlightMatches?: boolean;     // Highlight search terms (default: true)
  caseSensitive?: boolean;        // Case-sensitive search (default: false)
}
```

## Keyboard Navigation

| Key | Action |
| --- | --- |
| `ArrowDown` | Highlight next result |
| `ArrowUp` | Highlight previous result |
| `Enter` | Select highlighted result |
| `Escape` | Close dropdown |

## Accessibility

- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management
- High contrast mode support
- Proper semantic HTML

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

## Development

Install dependencies and start the local server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
npm run test:ui
```
