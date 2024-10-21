import { map } from "./io.mjs"

map("data/abilities.json", d => {
  const apc = d.activationCost;
  if (/[0-9] ?AP/.test(apc)) {
    d.activationCost = parseInt(apc[0]);
  }
  if (apc === "X AP") {
    d.activationCost = "Variable";
  }
  if (apc === "Passive") {
    delete d.activationCost;
  }
  if (apc === "Downtime Action") {
    delete d.activationCost;
  }
  if (apc == "Pilot Equipment") {
    d.traits = [{type: "pilot equipment"}]
    delete d.activationCost;
  }
  return d;
});