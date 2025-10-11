/**
 * Example usage of the Salvage Union Data ORM
 */

import { Abilities, Chassis, Equipment } from "../lib/index.js";

console.log("🎮 Salvage Union Data ORM Examples\n");

// ============================================================================
// EQUIPMENT QUERIES
// ============================================================================
console.log("📦 EQUIPMENT EXAMPLES");
console.log("=".repeat(50));

// Get all equipment
const allEquipment = Equipment.all();
console.log(`Total equipment items: ${allEquipment.length}`);

// Find by name
const firstAidKit = Equipment.findByName("First Aid Kit");
if (firstAidKit) {
  console.log(`\nFound: ${firstAidKit.name}`);
  console.log(`  Tech Level: ${firstAidKit.techLevel ?? "N/A"}`);
  console.log(`  Source: ${firstAidKit.source}, Page: ${firstAidKit.page}`);
  if (firstAidKit.description) {
    console.log(
      `  Description: ${firstAidKit.description.substring(0, 80)}...`,
    );
  }
}

// Search by name (partial match)
const searchResults = Equipment.searchByName("laser");
console.log(`\nItems matching "laser": ${searchResults.length}`);
searchResults.forEach((item) => {
  console.log(`  - ${item.name} (TL${item.techLevel ?? "?"})`);
});

// Find by tech level
const t3Equipment = Equipment.findByTechLevel(3);
console.log(`\nTech Level 3 equipment: ${t3Equipment.length} items`);
t3Equipment.slice(0, 5).forEach((item) => {
  console.log(`  - ${item.name}`);
});

// Get all armor
const armor = Equipment.getArmor();
console.log(`\nArmor items: ${armor.length}`);
armor.forEach((item) => {
  console.log(`  - ${item.name} (TL${item.techLevel ?? "?"})`);
});

// Get all weapons
const weapons = Equipment.getWeapons();
console.log(`\nWeapons: ${weapons.length}`);
weapons.slice(0, 5).forEach((item) => {
  console.log(`  - ${item.name}`);
});

// Find equipment with specific trait
const explosiveItems = Equipment.findByTrait("explosive");
console.log(`\nExplosive items: ${explosiveItems.length}`);
explosiveItems.forEach((item) => {
  console.log(`  - ${item.name}`);
});

// Get random equipment
const randomItem = Equipment.random();
console.log(`\nRandom item: ${randomItem?.name}`);

// ============================================================================
// CHASSIS QUERIES
// ============================================================================
console.log("\n\n🤖 CHASSIS EXAMPLES");
console.log("=".repeat(50));

// Get all chassis
const allChassis = Chassis.all();
console.log(`Total chassis: ${allChassis.length}`);

// Find by name
const atlas = Chassis.findByName("Atlas");
if (atlas && atlas.stats) {
  console.log(`\nFound: ${atlas.name}`);
  console.log(`  Structure Points: ${atlas.stats.structure_pts}`);
  console.log(`  Energy Points: ${atlas.stats.energy_pts}`);
  console.log(`  System Slots: ${atlas.stats.system_slots}`);
  console.log(`  Module Slots: ${atlas.stats.module_slots}`);
  console.log(`  Tech Level: ${atlas.stats.tech_level}`);
}

// Find by tech level
const t2Chassis = Chassis.findByTechLevel(2);
console.log(`\nTech Level 2 chassis: ${t2Chassis.length}`);
t2Chassis.forEach((c) => {
  console.log(`  - ${c.name} (SP: ${c.stats?.structure_pts ?? "?"})`);
});

// Find chassis with high structure points
const tankyChassis = Chassis.findByMinStructurePoints(20);
console.log(`\nChassis with 20+ SP: ${tankyChassis.length}`);
tankyChassis.forEach((c) => {
  console.log(`  - ${c.name} (SP: ${c.stats?.structure_pts ?? "?"})`);
});

// Find chassis with lots of system slots
const systemHeavy = Chassis.findByMinSystemSlots(4);
console.log(`\nChassis with 4+ system slots: ${systemHeavy.length}`);
systemHeavy.slice(0, 5).forEach((c) => {
  console.log(`  - ${c.name} (${c.stats?.system_slots ?? "?"} slots)`);
});

// ============================================================================
// ABILITIES QUERIES
// ============================================================================
console.log("\n\n⚡ ABILITIES EXAMPLES");
console.log("=".repeat(50));

// Get all abilities
const allAbilities = Abilities.all();
console.log(`Total abilities: ${allAbilities.length}`);

// Find by level
const level1Abilities = Abilities.findByLevel(1);
console.log(`\nLevel 1 abilities: ${level1Abilities.length}`);
level1Abilities.slice(0, 5).forEach((a) => {
  console.log(`  - ${a.name} (${a.tree ?? "No tree"})`);
});

// Get all ability trees
const allTrees = Abilities.getAllTrees();
console.log(`\nAbility trees: ${allTrees.length}`);
allTrees.slice(0, 5).forEach((tree) => {
  console.log(`  - ${tree}`);
});

// Find by tree
const mechanicalKnowledge = Abilities.findByTree("Mechanical Knowledge");
console.log(`\nMechanical Knowledge abilities: ${mechanicalKnowledge.length}`);
mechanicalKnowledge.slice(0, 5).forEach((a) => {
  console.log(`  - ${a.name} (Level ${a.level})`);
});

// ============================================================================
// ADVANCED QUERIES
// ============================================================================
console.log("\n\n🔍 ADVANCED QUERY EXAMPLES");
console.log("=".repeat(50));

// Custom filter with where()
const highTechEquipment = Equipment.where((e) => (e.techLevel ?? 0) >= 4);
console.log(`High-tech equipment (TL4+): ${highTechEquipment.length}`);
highTechEquipment.slice(0, 5).forEach((e) => {
  console.log(`  - ${e.name} (TL${e.techLevel})`);
});

// Chaining with map()
const equipmentNames = Equipment.findByTechLevel(3).map((e) => e.name);
console.log(`\nTech Level 3 equipment names (${equipmentNames.length} total):`);
equipmentNames.slice(0, 5).forEach((name) => {
  console.log(`  - ${name}`);
});

// Check if any item matches
const hasExplosives = Equipment.some(
  (e) => e.traits?.some((t) => t.type === "explosive") ?? false,
);
console.log(`\nHas explosive equipment: ${hasExplosives}`);

// Get multiple random items
const randomEquipment = Equipment.randomMany(3);
console.log(`\n3 random equipment items:`);
randomEquipment.forEach((e) => {
  console.log(`  - ${e.name}`);
});

// ============================================================================
// COMBINING QUERIES
// ============================================================================
console.log("\n\n🔗 COMBINING QUERIES");
console.log("=".repeat(50));

// Find high-tech armor
const advancedArmor = Equipment.where(
  (e) =>
    (e.traits?.some((t) => t.type === "armor") ?? false) &&
    (e.techLevel ?? 0) >= 3,
);
console.log(`Advanced armor (TL3+): ${advancedArmor.length}`);
advancedArmor.forEach((a) => {
  console.log(`  - ${a.name} (TL${a.techLevel})`);
});

// Find abilities from a specific tree
const combatAbilities = Abilities.findByTree("Combat");
console.log(`\nCombat abilities: ${combatAbilities.length}`);
if (combatAbilities.length > 0) {
  combatAbilities.slice(0, 5).forEach((a) => {
    console.log(`  - ${a.name} (Level ${a.level})`);
  });
} else {
  console.log("  (No Combat abilities found)");
}

// Find high-capacity cargo haulers
const cargoHaulers = Chassis.where((c) => (c.stats?.cargo_cap ?? 0) >= 10);
console.log(
  `\nHigh-capacity cargo haulers (10+ cargo): ${cargoHaulers.length}`,
);
cargoHaulers.forEach((c) => {
  console.log(`  - ${c.name} (${c.stats?.cargo_cap ?? "?"} cargo)`);
});

console.log("\n✨ Done!");
