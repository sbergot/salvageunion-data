import { BaseModel } from "../BaseModel.js";
import { SalvageUnionAbilities, Traits } from "../types/abilities.js";
import abilitiesData from "../../data/abilities.json" with { type: "json" };
import abilitiesSchema from "../../schemas/abilities.schema.json" with { type: "json" };

type Ability = SalvageUnionAbilities[number];

export class AbilitiesModel extends BaseModel<Ability> {
  constructor() {
    super(abilitiesData as Ability[], abilitiesSchema);
  }

  /**
   * Find abilities by level
   */
  findByLevel(level: number): Ability[] {
    return this.where((a) => a.level === level);
  }

  /**
   * Find abilities by tree
   */
  findByTree(treeName: string): Ability[] {
    return this.where((a) => a.tree === treeName);
  }

  /**
   * Find abilities with specific trait
   */
  findByTrait(traitType: string): Ability[] {
    return this.where(
      (a) =>
        a.traits?.some((t: Traits[number]) => t.type === traitType) ?? false,
    );
  }

  /**
   * Get all ability trees
   */
  getAllTrees(): string[] {
    const trees = new Set<string>();
    this.data.forEach((a) => {
      if (a.tree) trees.add(a.tree);
    });
    return Array.from(trees).sort();
  }
}
