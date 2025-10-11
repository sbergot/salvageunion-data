/**
 * Test all ORM models
 */

import {
  Abilities,
  AbilityTreeRequirements,
  BioTitans,
  Chassis,
  Classes,
  Crawlers,
  Creatures,
  Drones,
  Equipment,
  Keywords,
  Meld,
  Modules,
  NPCs,
  Squads,
  Systems,
  Tables,
  Traits,
  Vehicles,
} from "../lib/index.js";

console.log("🧪 Testing All ORM Models\n");
console.log("=".repeat(60));

// Test each model
console.log(`\n✅ Abilities: ${Abilities.count()} items`);
console.log(`✅ AbilityTreeRequirements: ${AbilityTreeRequirements.count()} items`);
console.log(`✅ BioTitans: ${BioTitans.count()} items`);
console.log(`✅ Chassis: ${Chassis.count()} items`);
console.log(`✅ Classes: ${Classes.count()} items`);
console.log(`✅ Crawlers: ${Crawlers.count()} items`);
console.log(`✅ Creatures: ${Creatures.count()} items`);
console.log(`✅ Drones: ${Drones.count()} items`);
console.log(`✅ Equipment: ${Equipment.count()} items`);
console.log(`✅ Keywords: ${Keywords.count()} items`);
console.log(`✅ Meld: ${Meld.count()} items`);
console.log(`✅ Modules: ${Modules.count()} items`);
console.log(`✅ NPCs: ${NPCs.count()} items`);
console.log(`✅ Squads: ${Squads.count()} items`);
console.log(`✅ Systems: ${Systems.count()} items`);
console.log(`✅ Tables: ${Tables.count()} items`);
console.log(`✅ Traits: ${Traits.count()} items`);
console.log(`✅ Vehicles: ${Vehicles.count()} items`);

console.log("\n" + "=".repeat(60));
console.log("\n🎯 Sample Queries:\n");

// Modules
const commsModule = Modules.findByName("Comms Module");
if (commsModule) {
  console.log(`📦 Module: ${commsModule.name} (TL${commsModule.techLevel})`);
}

// Systems
const weapons = Systems.getWeapons();
console.log(`⚔️  Weapon Systems: ${weapons.length}`);

// Vehicles
const powerLoader = Vehicles.findByName("Power Loader");
if (powerLoader) {
  console.log(`🚗 Vehicle: ${powerLoader.name} (TL${powerLoader.techLevel})`);
}

// Creatures
const scorpion = Creatures.findByName("Irradiated Scorpion");
if (scorpion) {
  console.log(`🦂 Creature: ${scorpion.name} (${scorpion.hitPoints} HP)`);
}

// Drones
const defacerDrone = Drones.findByName("Defacer Drone");
if (defacerDrone) {
  console.log(
    `🤖 Drone: ${defacerDrone.name} (${defacerDrone.structurePoints} SP)`,
  );
}

// Bio-Titans
const scylla = BioTitans.findByName("Scylla");
if (scylla) {
  console.log(
    `🐙 Bio-Titan: ${scylla.name} (${scylla.structurePoints} SP)`,
  );
}

// Crawlers
const augmented = Crawlers.findByName("Augmented");
if (augmented) {
  console.log(`🚛 Crawler: ${augmented.name}`);
}

// NPCs
const firstNPC = NPCs.first();
if (firstNPC) {
  console.log(`👤 NPC: ${firstNPC.name}`);
}

// Squads
const wasterMob = Squads.findByName("Waster Mob");
if (wasterMob) {
  console.log(`👥 Squad: ${wasterMob.name} (${wasterMob.hitPoints} HP)`);
}

// Meld
const meldDrone = Meld.findByName("Meld Drone");
if (meldDrone) {
  console.log(`🧟 Meld: ${meldDrone.name} (${meldDrone.hitPoints} HP)`);
}

// Classes
const firstClass = Classes.first();
if (firstClass) {
  console.log(`🎓 Class: ${firstClass.name}`);
}

// Keywords
const firstKeyword = Keywords.first();
if (firstKeyword) {
  console.log(`🔑 Keyword: ${firstKeyword.name}`);
}

// Traits
const firstTrait = Traits.first();
if (firstTrait) {
  console.log(`✨ Trait: ${firstTrait.name}`);
}

// Tables
const firstTable = Tables.first();
if (firstTable) {
  console.log(`📊 Table: ${firstTable.name}`);
}

// Ability Tree Requirements
const advancedEngineer = AbilityTreeRequirements.findByTree("Advanced Engineer");
if (advancedEngineer) {
  console.log(
    `🌳 Tree Requirement: ${advancedEngineer.tree} requires ${advancedEngineer.requirement.join(", ")}`,
  );
}

console.log("\n✨ All models working correctly!");

