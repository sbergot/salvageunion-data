/**
 * Base Model class for querying JSON data with type safety
 */
export class BaseModel<T extends { id: string; name: string }> {
  protected data: T[];
  protected schema: any;

  constructor(data: T[], schema: any) {
    this.data = data;
    this.schema = schema;
  }

  /**
   * Get all items
   */
  all(): T[] {
    return this.data;
  }

  /**
   * Get the count of items
   */
  count(): number {
    return this.data.length;
  }

  /**
   * Find a single item by predicate
   */
  find(predicate: (item: T) => boolean): T | undefined {
    return this.data.find(predicate);
  }

  /**
   * Find all items matching predicate
   */
  where(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  /**
   * Find item by ID
   */
  findById(id: string): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  /**
   * Find item by name (case-sensitive)
   */
  findByName(name: string): T | undefined {
    return this.data.find((item) => item.name === name);
  }

  /**
   * Find items by name (case-insensitive partial match)
   */
  searchByName(query: string): T[] {
    const lowerQuery = query.toLowerCase();
    return this.data.filter((item) =>
      item.name.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Find item by source
   */
  findBySource(source: string): T[] {
    return this.data.filter((item: any) => item.source === source);
  }

  /**
   * Get the first item
   */
  first(): T | undefined {
    return this.data[0];
  }

  /**
   * Get the last item
   */
  last(): T | undefined {
    return this.data[this.data.length - 1];
  }

  /**
   * Map over items
   */
  map<U>(fn: (item: T) => U): U[] {
    return this.data.map(fn);
  }

  /**
   * Check if any item matches predicate
   */
  some(predicate: (item: T) => boolean): boolean {
    return this.data.some(predicate);
  }

  /**
   * Check if all items match predicate
   */
  every(predicate: (item: T) => boolean): boolean {
    return this.data.every(predicate);
  }

  /**
   * Get random item
   */
  random(): T | undefined {
    if (this.data.length === 0) return undefined;
    const index = Math.floor(Math.random() * this.data.length);
    return this.data[index];
  }

  /**
   * Get random items (without duplicates)
   */
  randomMany(count: number): T[] {
    if (count >= this.data.length) return [...this.data];
    const shuffled = [...this.data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Get the JSON schema for this model
   */
  getSchema(): any {
    return this.schema;
  }
}

