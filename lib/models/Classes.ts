import { BaseModel } from "../BaseModel.js";
import { SalvageUnionClasses } from "../types/classes.js";
import classesData from "../../data/classes.json" with { type: "json" };
import classesSchema from "../../schemas/classes.schema.json" with { type: "json" };

type Class = SalvageUnionClasses[number];

export class ClassesModel extends BaseModel<Class> {
  constructor() {
    super(classesData as Class[], classesSchema);
  }
}

