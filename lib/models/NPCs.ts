import { BaseModel } from "../BaseModel.js";
import { SalvageUnionNPCs } from "../types/npcs.js";
import npcsData from "../../data/npcs.json" with { type: "json" };
import npcsSchema from "../../schemas/npcs.schema.json" with { type: "json" };

type NPC = SalvageUnionNPCs[number];

export class NPCsModel extends BaseModel<NPC> {
  constructor() {
    super(npcsData as NPC[], npcsSchema);
  }

  /**
   * Find NPCs by hit points
   */
  findByHitPoints(hp: number): NPC[] {
    return this.where((n) => n.hitPoints === hp);
  }

  /**
   * Find NPCs with minimum hit points
   */
  findByMinHitPoints(min: number): NPC[] {
    return this.where((n) => (n.hitPoints ?? 0) >= min);
  }
}
