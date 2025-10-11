import { BaseModel } from "../BaseModel.js";
import { SalvageUnionTraits } from "../types/traits.js";
import traitsData from "../../data/traits.json" with { type: "json" };
import traitsSchema from "../../schemas/traits.schema.json" with { type: "json" };

type Trait = SalvageUnionTraits[number];

export class TraitsModel extends BaseModel<Trait> {
  constructor() {
    super(traitsData as Trait[], traitsSchema);
  }
}

