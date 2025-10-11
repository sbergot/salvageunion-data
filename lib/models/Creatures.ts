import { BaseModel } from "../BaseModel.js";
import { SalvageUnionCreatures } from "../types/creatures.js";
import creaturesData from "../../data/creatures.json" with { type: "json" };
import creaturesSchema from "../../schemas/creatures.schema.json" with { type: "json" };

type Creature = SalvageUnionCreatures[number];

export class CreaturesModel extends BaseModel<Creature> {
  constructor() {
    super(creaturesData as Creature[], creaturesSchema);
  }

  /**
   * Find creatures by hit points
   */
  findByHitPoints(hp: number): Creature[] {
    return this.where((c) => c.hitPoints === hp);
  }

  /**
   * Find creatures with minimum hit points
   */
  findByMinHitPoints(min: number): Creature[] {
    return this.where((c) => (c.hitPoints ?? 0) >= min);
  }
}

