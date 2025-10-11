import { BaseModel } from "../BaseModel.js";
import { SalvageUnionKeywords } from "../types/keywords.js";
import keywordsData from "../../data/keywords.json" with { type: "json" };
import keywordsSchema from "../../schemas/keywords.schema.json" with { type: "json" };

type Keyword = SalvageUnionKeywords[number];

export class KeywordsModel extends BaseModel<Keyword> {
  constructor() {
    super(keywordsData as Keyword[], keywordsSchema);
  }
}

