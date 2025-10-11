import { SalvageUnionAbilityTreeRequirements } from "../types/ability-tree-requirements.js";
import abilityTreeRequirementsData from "../../data/ability-tree-requirements.json" with { type: "json" };
import abilityTreeRequirementsSchema from "../../schemas/ability-tree-requirements.schema.json" with { type: "json" };

type AbilityTreeRequirement = SalvageUnionAbilityTreeRequirements[number];

export class AbilityTreeRequirementsModel {
  protected data: AbilityTreeRequirement[];
  protected schema: any;

  constructor() {
    this.data = abilityTreeRequirementsData as AbilityTreeRequirement[];
    this.schema = abilityTreeRequirementsSchema;
  }

  /**
   * Get all items
   */
  all(): AbilityTreeRequirement[] {
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
  find(
    predicate: (item: AbilityTreeRequirement) => boolean,
  ): AbilityTreeRequirement | undefined {
    return this.data.find(predicate);
  }

  /**
   * Find all items matching predicate
   */
  where(
    predicate: (item: AbilityTreeRequirement) => boolean,
  ): AbilityTreeRequirement[] {
    return this.data.filter(predicate);
  }

  /**
   * Find by ID
   */
  findById(id: string): AbilityTreeRequirement | undefined {
    return this.find((item) => item.id === id);
  }

  /**
   * Find by tree name
   */
  findByTree(tree: string): AbilityTreeRequirement | undefined {
    return this.find((item) => item.tree === tree);
  }

  /**
   * Get the schema
   */
  getSchema(): any {
    return this.schema;
  }
}
