/**
 * Local Storage Helper for Scam Shield Analysis History
 */

const STORAGE_KEY = 'scam_shield_history_v1';

/**
 * Retrieves all stored analysis history items.
 * @returns {Array} List of analysis objects
 */
export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading history from localStorage:', err);
    return [];
  }
}

/**
 * Saves a new analysis entry to history.
 * @param {Object} item 
 * @returns {Array} Updated history list
 */
export function saveAnalysis(item) {
  try {
    const history = getHistory();
    const newItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timestamp: Date.now(),
      ...item
    };

    // Prepend new item, limit history to max 50 items
    const updated = [newItem, ...history].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving item to localStorage:', err);
    return getHistory();
  }
}

/**
 * Deletes a single history item by ID.
 * @param {string} id 
 * @returns {Array} Updated history list
 */
export function deleteHistoryItem(id) {
  try {
    const history = getHistory();
    const filtered = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Error deleting item from localStorage:', err);
    return getHistory();
  }
}

/**
 * Clears all analysis history from storage.
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (err) {
    console.error('Error clearing localStorage:', err);
    return [];
  }
}
