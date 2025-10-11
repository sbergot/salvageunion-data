import { BaseModel } from "../BaseModel.js";
import { SalvageUnionMechChassis } from "../types/chassis.js";
import chassisData from "../../data/chassis.json" with { type: "json" };
import chassisSchema from "../../schemas/chassis.schema.json" with { type: "json" };

type Chassis = SalvageUnionMechChassis[number];

export class ChassisModel extends BaseModel<Chassis> {
  constructor() {
    super(chassisData as Chassis[], chassisSchema);
  }

  /**
   * Find chassis by tech level
   */
  findByTechLevel(level: number): Chassis[] {
    return this.where((c) => c.stats?.tech_level === level);
  }

  /**
   * Find chassis by salvage value
   */
  findBySalvageValue(value: number): Chassis[] {
    return this.where((c) => c.stats?.salvage_value === value);
  }

  /**
   * Find chassis with minimum structure points
   */
  findByMinStructurePoints(min: number): Chassis[] {
    return this.where((c) => (c.stats?.structure_pts ?? 0) >= min);
  }

  /**
   * Find chassis with minimum system slots
   */
  findByMinSystemSlots(min: number): Chassis[] {
    return this.where((c) => (c.stats?.system_slots ?? 0) >= min);
  }

  /**
   * Find chassis with minimum module slots
   */
  findByMinModuleSlots(min: number): Chassis[] {
    return this.where((c) => (c.stats?.module_slots ?? 0) >= min);
  }

  /**
   * Find chassis by cargo capacity
   */
  findByMinCargoCap(min: number): Chassis[] {
    return this.where((c) => (c.stats?.cargo_cap ?? 0) >= min);
  }
}
