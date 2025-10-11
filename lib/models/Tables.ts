import { BaseModel } from "../BaseModel.js";
import { SalvageUnionTables } from "../types/tables.js";
import tablesData from "../../data/tables.json" with { type: "json" };
import tablesSchema from "../../schemas/tables.schema.json" with { type: "json" };

type Table = SalvageUnionTables[number];

export class TablesModel extends BaseModel<Table> {
  constructor() {
    super(tablesData as Table[], tablesSchema);
  }
}

