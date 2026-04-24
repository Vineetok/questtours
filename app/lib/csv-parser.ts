/**
 * Simple CSV Parser Utility
 * Parses a CSV string into an array of objects.
 * Assumes the first row contains headers.
 */

export function parseCSV<T>(csvString: string): T[] {
  const lines = csvString.split(/\r?\n/);
  if (lines.length < 2) return [];

  // Robust regex to split CSV line while ignoring commas inside quotes
  const splitLine = (line: string) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        // Handle escaped double quotes ("")
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++; // Skip the next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = splitLine(lines[0]);
  const result: T[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Skip empty lines
    const values = splitLine(lines[i]);
    if (values.length < headers.length) continue; // Skip malformed lines

    const obj: any = {};

    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Remove surrounding quotes if they exist
      value = value.trim().replace(/^"|"$/g, '');

      // Handle JSON strings (for itineraries)
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // Try parsing directly first
          obj[header] = JSON.parse(value);
        } catch (e) {
          try {
            // Fallback: Replace single quotes with double quotes for valid JSON
            const jsonStr = value.replace(/'/g, '"');
            obj[header] = JSON.parse(jsonStr);
          } catch (e2) {
            obj[header] = value;
          }
        }
      } else if (!isNaN(Number(value)) && value !== '' && !header.toLowerCase().includes('duration')) {
        obj[header] = Number(value);
      } else {
        obj[header] = value;
      }
    });

    result.push(obj as T);
  }

  return result;
}
