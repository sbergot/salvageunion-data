import { BaseModel } from "../BaseModel.js";
import { SalvageUnionVehicles } from "../types/vehicles.js";
import vehiclesData from "../../data/vehicles.json" with { type: "json" };
import vehiclesSchema from "../../schemas/vehicles.schema.json" with { type: "json" };

type Vehicle = SalvageUnionVehicles[number];

export class VehiclesModel extends BaseModel<Vehicle> {
  constructor() {
    super(vehiclesData as Vehicle[], vehiclesSchema);
  }

  /**
   * Find vehicles by tech level
   */
  findByTechLevel(level: number): Vehicle[] {
    return this.where((v) => v.techLevel === level);
  }

  /**
   * Find vehicles by salvage value
   */
  findBySalvageValue(value: number): Vehicle[] {
    return this.where((v) => v.salvageValue === value);
  }

  /**
   * Find vehicles with minimum structure points
   */
  findByMinStructurePoints(min: number): Vehicle[] {
    return this.where((v) => (v.structurePoints ?? 0) >= min);
  }
}
