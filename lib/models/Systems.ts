import { BaseModel } from "../BaseModel.js";
import { SalvageUnionSystems } from "../types/systems.js";
import systemsData from "../../data/systems.json" with { type: "json" };
import systemsSchema from "../../schemas/systems.schema.json" with { type: "json" };

type System = SalvageUnionSystems[number];
type Trait = NonNullable<System["traits"]>[number];

export class SystemsModel extends BaseModel<System> {
  constructor() {
    super(systemsData as System[], systemsSchema);
  }

  /**
   * Find systems by tech level
   */
  findByTechLevel(level: number): System[] {
    return this.where((s) => s.techLevel === level);
  }

  /**
   * Find systems by salvage value
   */
  findBySalvageValue(value: number): System[] {
    return this.where((s) => s.salvageValue === value);
  }

  /**
   * Find systems by slots required
   */
  findBySlotsRequired(slots: number): System[] {
    return this.where((s) => s.slotsRequired === slots);
  }

  /**
   * Find systems with specific trait
   */
  findByTrait(traitType: string): System[] {
    return this.where(
      (s) => s.traits?.some((t: Trait) => t.type === traitType) ?? false,
    );
  }

  /**
   * Get all weapon systems
   */
  getWeapons(): System[] {
    return this.where(
      (s) =>
        s.traits?.some((t: Trait) =>
          ["melee", "ballistic", "energy", "missile"].includes(t.type),
        ) ?? false,
    );
  }

  /**
   * Find systems by damage type
   */
  findByDamageType(damageType: "SP" | "HP" | "EP"): System[] {
    return this.where(
      (s) =>
        s.damage !== undefined &&
        typeof s.damage === "object" &&
        "type" in s.damage &&
        s.damage.type === damageType,
    );
  }

  /**
   * Find systems with minimum damage
   */
  findByMinDamage(minDamage: number): System[] {
    return this.where(
      (s) =>
        s.damage !== undefined &&
        typeof s.damage === "object" &&
        "amount" in s.damage &&
        s.damage.amount >= minDamage,
    );
  }
}
