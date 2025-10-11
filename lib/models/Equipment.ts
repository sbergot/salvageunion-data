import { BaseModel } from "../BaseModel.js";
import { SalvageUnionEquipment } from "../types/equipment.js";
import equipmentData from "../../data/equipment.json" with { type: "json" };
import equipmentSchema from "../../schemas/equipment.schema.json" with { type: "json" };

type Equipment = SalvageUnionEquipment[number];
type Trait = NonNullable<Equipment["traits"]>[number];

export class EquipmentModel extends BaseModel<Equipment> {
  constructor() {
    super(equipmentData as Equipment[], equipmentSchema);
  }

  /**
   * Find equipment by tech level
   */
  findByTechLevel(level: number): Equipment[] {
    return this.where((e) => e.techLevel === level);
  }

  /**
   * Find equipment with specific trait
   */
  findByTrait(traitType: string): Equipment[] {
    return this.where(
      (e) => e.traits?.some((t: Trait) => t.type === traitType) ?? false,
    );
  }

  /**
   * Find equipment by activation cost
   */
  findByActivationCost(cost: number): Equipment[] {
    return this.where((e) => e.activationCost === cost);
  }

  /**
   * Get all armor
   */
  getArmor(): Equipment[] {
    return this.findByTrait("armor");
  }

  /**
   * Get all weapons
   */
  getWeapons(): Equipment[] {
    return this.where(
      (e) =>
        e.traits?.some((t: Trait) =>
          ["melee", "ballistic", "energy", "missile"].includes(t.type),
        ) ?? false,
    );
  }

  /**
   * Get all equipment with actions
   */
  getWithActions(): Equipment[] {
    return this.where((e) => (e.actions?.length ?? 0) > 0);
  }
}
