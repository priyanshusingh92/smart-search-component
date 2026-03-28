export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function highlightText(text: string, query: string, caseSensitive = false): string {
  if (!query) return text;
  
  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(`(${escapeRegExp(query)})`, flags);
  return text.replace(regex, '<mark>$1</mark>');
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function filterResults(
  results: any[],
  query: string,
  filters: any[],
  caseSensitive = false
): any[] {
  let filtered = results;

  // Apply text filter
  if (query) {
    const searchTerm = caseSensitive ? query : query.toLowerCase();
    filtered = filtered.filter(result => {
      const title = caseSensitive ? result.title : result.title.toLowerCase();
      const subtitle = result.subtitle 
        ? (caseSensitive ? result.subtitle : result.subtitle.toLowerCase())
        : '';
      return title.includes(searchTerm) || subtitle.includes(searchTerm);
    });
  }

  // Apply category filters
  const activeFilters = filters.filter(f => f.checked).map(f => f.value);
  if (activeFilters.length > 0) {
    filtered = filtered.filter(result => activeFilters.includes(result.type));
  }

  return filtered;
}