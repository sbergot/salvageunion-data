import { map } from "./io.mjs"

const mapping = {
  'Turn Action': "Turn",
  'Long Action': "Long",
  'Short Action': "Short",
  'Passive': "Passive",
  'Reaction': "Reaction",
  'Free Action': "Free",
  'Downtime Action': "DownTime",
}

map("data/abilities.json", d => {
  const actionType = mapping[d.usage];
  if (actionType) {
    delete d.usage;
    d.actionType = actionType;
  }
  return d;
});