import squadsData from "../../data/squads.json" with { type: "json" };
import squadsSchema from "../../schemas/squads.schema.json" with { type: "json" };

interface Squad {
  id: string;
  name: string;
  source: string;
  description?: string;
  hitPoints?: number;
  structurePoints?: number;
  abilities?: any[];
  page: number;
}

export class SquadsModel {
  protected data: Squad[];
  protected schema: any;

  constructor() {
    this.data = squadsData as Squad[];
    this.schema = squadsSchema;
  }

  /**
   * Get all items
   */
  all(): Squad[] {
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
  find(predicate: (item: Squad) => boolean): Squad | undefined {
    return this.data.find(predicate);
  }

  /**
   * Find all items matching predicate
   */
  where(predicate: (item: Squad) => boolean): Squad[] {
    return this.data.filter(predicate);
  }

  /**
   * Find by ID
   */
  findById(id: string): Squad | undefined {
    return this.find((item) => item.id === id);
  }

  /**
   * Find by name
   */
  findByName(name: string): Squad | undefined {
    return this.find((item) => item.name === name);
  }

  /**
   * Find squads by hit points
   */
  findByHitPoints(hp: number): Squad[] {
    return this.where((s) => s.hitPoints === hp);
  }

  /**
   * Find squads with minimum hit points
   */
  findByMinHitPoints(min: number): Squad[] {
    return this.where((s) => (s.hitPoints ?? 0) >= min);
  }

  /**
   * Find squads with minimum structure points
   */
  findByMinStructurePoints(min: number): Squad[] {
    return this.where((s) => (s.structurePoints ?? 0) >= min);
  }

  /**
   * Get the schema
   */
  getSchema(): any {
    return this.schema;
  }
}
