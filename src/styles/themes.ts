import { css } from 'lit';

export const baseStyles = css`
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