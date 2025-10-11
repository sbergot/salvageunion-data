import { BaseModel } from "../BaseModel.js";
import { SalvageUnionModules } from "../types/modules.js";
import modulesData from "../../data/modules.json" with { type: "json" };
import modulesSchema from "../../schemas/modules.schema.json" with { type: "json" };

type Module = SalvageUnionModules[number];
type Trait = NonNullable<Module["traits"]>[number];

export class ModulesModel extends BaseModel<Module> {
  constructor() {
    super(modulesData as Module[], modulesSchema);
  }

  /**
   * Find modules by tech level
   */
  findByTechLevel(level: number): Module[] {
    return this.where((m) => m.techLevel === level);
  }

  /**
   * Find modules by salvage value
   */
  findBySalvageValue(value: number): Module[] {
    return this.where((m) => m.salvageValue === value);
  }

  /**
   * Find modules by slots required
   */
  findBySlotsRequired(slots: number): Module[] {
    return this.where((m) => m.slotsRequired === slots);
  }

  /**
   * Find modules with specific trait
   */
  findByTrait(traitType: string): Module[] {
    return this.where(
      (m) => m.traits?.some((t: Trait) => t.type === traitType) ?? false,
    );
  }

  /**
   * Get all recommended modules
   */
  getRecommended(): Module[] {
    return this.where((m) => m.recommended === true);
  }

  /**
   * Find modules by action type
   */
  findByActionType(actionType: string): Module[] {
    return this.where((m) => m.actionType === actionType);
  }
}

