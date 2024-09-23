import { map } from "./io.mjs"

map("data/abilities.json", d => {
  const apc = d.apCost;
  if (/[0-9] ?AP/.test(apc)) {
    d.apCost = parseInt(apc[0]);
  }
  if (apc === "X AP") {
    d.apCost = "Variable";
  }
  if (apc === "Passive") {
    delete d.apCost;
  }
  if (apc === "Downtime Action") {
    delete d.apCost;
  }
  if (apc == "Pilot Equipment") {
    d.traits = [{type: "pilot equipment"}]
    delete d.apCost;
  }
  return d;
});