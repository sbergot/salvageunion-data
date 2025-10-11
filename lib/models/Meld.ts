import meldData from "../../data/meld.json" with { type: "json" };
import meldSchema from "../../schemas/meld.schema.json" with { type: "json" };

interface Meld {
  id: string;
  name: string;
  source: string;
  description?: string;
  hitPoints?: number;
  structurePoints?: number;
  salvageValue?: number;
  abilities?: any[];
  traits?: any[];
  page: number;
}

export class MeldModel {
  protected data: Meld[];
  protected schema: any;

  constructor() {
    this.data = meldData as Meld[];
    this.schema = meldSchema;
  }

  /**
   * Get all items
   */
  all(): Meld[] {
    return this.data;
  }

  /**
   * Get count of items
   */
  count(): number {
    return this.data.length;
  }

  /**
   * Find single item matching predicate
   */
  find(predicate: (item: Meld) => boolean): Meld | undefined {
    return this.data.find(predicate);
  }

  /**
   * Find all items matching predicate
   */
  where(predicate: (item: Meld) => boolean): Meld[] {
    return this.data.filter(predicate);
  }

  /**
   * Find by ID
   */
  findById(id: string): Meld | undefined {
    return this.find((item) => item.id === id);
  }

  /**
   * Find by name
   */
  findByName(name: string): Meld | undefined {
    return this.find((item) => item.name === name);
  }

  /**
   * Find by hit points
   */
  findByHitPoints(hp: number): Meld[] {
    return this.where((m) => m.hitPoints === hp);
  }

  /**
   * Find with minimum hit points
   */
  findByMinHitPoints(min: number): Meld[] {
    return this.where((m) => (m.hitPoints ?? 0) >= min);
  }

  /**
   * Find with minimum structure points
   */
  findByMinStructurePoints(min: number): Meld[] {
    return this.where((m) => (m.structurePoints ?? 0) >= min);
  }

  /**
   * Get the schema
   */
  getSchema(): any {
    return this.schema;
  }
}
