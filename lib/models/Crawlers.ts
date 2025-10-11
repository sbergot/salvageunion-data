import { BaseModel } from "../BaseModel.js";
import { SalvageUnionCrawlers } from "../types/crawlers.js";
import crawlersData from "../../data/crawlers.json" with { type: "json" };
import crawlersSchema from "../../schemas/crawlers.schema.json" with { type: "json" };

type Crawler = SalvageUnionCrawlers[number];

export class CrawlersModel extends BaseModel<Crawler> {
  constructor() {
    super(crawlersData as Crawler[], crawlersSchema);
  }
}
