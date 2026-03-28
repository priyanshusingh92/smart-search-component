export interface SearchResult {
  id: string;
  type: 'account' | 'transaction' | 'customer' | 'other';
  title: string;
  subtitle?: string;
  description?: string;
  metadata?: Record<string, any>;
  icon?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  checked?: boolean;
}

export interface SearchConfig {
  placeholder?: string;
  minChars?: number;
  debounceMs?: number;
  maxResults?: number;
  enableFilters?: boolean;
  highlightMatches?: boolean;
  caseSensitive?: boolean;
}

export interface Theme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverColor?: string;
  selectedColor?: string;
  focusColor?: string;
  fontSize?: string;
  borderRadius?: string;
}

export type SearchEventDetail = {
  query: string;
  filters: FilterOption[];
};

export type SelectEventDetail = {
  result: SearchResult;
};

export type FilterChangeEventDetail = {
  filters: FilterOption[];
};