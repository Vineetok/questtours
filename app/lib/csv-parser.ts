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
        inQuotes = !inQuotes;
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
    const line = lines[i].trim();
    if (!line) continue;

    const values = splitLine(line);
    const obj: any = {};

    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Remove surrounding quotes if they exist
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }

      // Handle JSON strings (for itineraries)
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // Replace single quotes with double quotes for valid JSON
          const jsonStr = value.replace(/'/g, '"');
          obj[header] = JSON.parse(jsonStr);
        } catch (e) {
          obj[header] = value;
        }
      } else if (!isNaN(Number(value)) && value !== '') {
        obj[header] = Number(value);
      } else {
        obj[header] = value;
      }
    });

    result.push(obj as T);
  }

  return result;
}
