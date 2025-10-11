import { BaseModel } from "../BaseModel.js";
import { SalvageUnionDrones } from "../types/drones.js";
import dronesData from "../../data/drones.json" with { type: "json" };
import dronesSchema from "../../schemas/drones.schema.json" with { type: "json" };

type Drone = SalvageUnionDrones[number];

export class DronesModel extends BaseModel<Drone> {
  constructor() {
    super(dronesData as Drone[], dronesSchema);
  }

  /**
   * Find drones by tech level
   */
  findByTechLevel(level: number): Drone[] {
    return this.where((d) => d.techLevel === level);
  }

  /**
   * Find drones by salvage value
   */
  findBySalvageValue(value: number): Drone[] {
    return this.where((d) => d.salvageValue === value);
  }

  /**
   * Find drones with minimum structure points
   */
  findByMinStructurePoints(min: number): Drone[] {
    return this.where((d) => (d.structurePoints ?? 0) >= min);
  }
}
