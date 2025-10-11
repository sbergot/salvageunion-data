#!/usr/bin/env tsx

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Validator } from "jsonschema";

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

interface ValidationConfig {
  dataFile: string;
  schemaFile: string;
  name: string;
}

const validationConfigs: ValidationConfig[] = [
  {
    name: "Abilities",
    dataFile: "data/abilities.json",
    schemaFile: "schemas/abilities.schema.json",
  },
  {
    name: "Ability Tree Requirements",
    dataFile: "data/ability-tree-requirements.json",
    schemaFile: "schemas/ability-tree-requirements.schema.json",
  },
  {
    name: "Bio-Titans",
    dataFile: "data/bio-titans.json",
    schemaFile: "schemas/bio-titans.schema.json",
  },
  {
    name: "Chassis",
    dataFile: "data/chassis.json",
    schemaFile: "schemas/chassis.schema.json",
  },
  {
    name: "Classes",
    dataFile: "data/classes.json",
    schemaFile: "schemas/classes.schema.json",
  },
  {
    name: "Crawlers",
    dataFile: "data/crawlers.json",
    schemaFile: "schemas/crawlers.schema.json",
  },
  {
    name: "Creatures",
    dataFile: "data/creatures.json",
    schemaFile: "schemas/creatures.schema.json",
  },
  {
    name: "Drones",
    dataFile: "data/drones.json",
    schemaFile: "schemas/drones.schema.json",
  },
  {
    name: "Equipment",
    dataFile: "data/equipment.json",
    schemaFile: "schemas/equipment.schema.json",
  },
  {
    name: "Keywords",
    dataFile: "data/keywords.json",
    schemaFile: "schemas/keywords.schema.json",
  },
  {
    name: "Meld",
    dataFile: "data/meld.json",
    schemaFile: "schemas/meld.schema.json",
  },
  {
    name: "Modules",
    dataFile: "data/modules.json",
    schemaFile: "schemas/modules.schema.json",
  },
  {
    name: "NPCs",
    dataFile: "data/npcs.json",
    schemaFile: "schemas/npcs.schema.json",
  },
  {
    name: "Squads",
    dataFile: "data/squads.json",
    schemaFile: "schemas/squads.schema.json",
  },
  {
    name: "Systems",
    dataFile: "data/systems.json",
    schemaFile: "schemas/systems.schema.json",
  },
  {
    name: "Tables",
    dataFile: "data/tables.json",
    schemaFile: "schemas/tables.schema.json",
  },
  {
    name: "Traits",
    dataFile: "data/traits.json",
    schemaFile: "schemas/traits.schema.json",
  },
  {
    name: "Vehicles",
    dataFile: "data/vehicles.json",
    schemaFile: "schemas/vehicles.schema.json",
  },
];

function loadJson(filePath: string): any {
  const fullPath = join(projectRoot, filePath);
  const content = readFileSync(fullPath, "utf-8");
  return JSON.parse(content);
}

const globalValidator = new Validator();

function loadSharedSchemas() {
  const sharedSchemas = [
    {
      path: "schemas/shared/common.schema.json",
      relativeId: "shared/common.schema.json",
    },
    {
      path: "schemas/shared/enums.schema.json",
      relativeId: "shared/enums.schema.json",
    },
    {
      path: "schemas/shared/objects.schema.json",
      relativeId: "shared/objects.schema.json",
    },
  ];

  for (const sharedInfo of sharedSchemas) {
    try {
      const sharedSchema = loadJson(sharedInfo.path);

      // Register with the relative ID for $ref resolution
      globalValidator.addSchema(sharedSchema, sharedInfo.relativeId);

      // Also register with the $id URL if present (best practice)
      if (sharedSchema.$id) {
        globalValidator.addSchema(sharedSchema, sharedSchema.$id);
      }

      // Log successful registration
      console.log(
        `   ✓ Loaded ${sharedInfo.relativeId}${
          sharedSchema.$id ? ` ($id: ${sharedSchema.$id})` : ""
        }`
      );
    } catch (error) {
      console.error(
        `   ✗ Warning: Could not load shared schema ${sharedInfo.path}`
      );
      if (error instanceof Error) {
        console.error(`     ${error.message}`);
      }
    }
  }
}

function loadSchema(schemaPath: string): any {
  return loadJson(schemaPath);
}

function validateData(config: ValidationConfig): boolean {
  try {
    console.log(`\n📋 Validating ${config.name}...`);

    const data = loadJson(config.dataFile);
    const schema = loadSchema(config.schemaFile);

    const result = globalValidator.validate(data, schema);

    if (result.valid) {
      console.log(`✅ ${config.name}: VALID`);
      return true;
    } else {
      console.log(`❌ ${config.name}: INVALID`);

      // Group errors by item for better readability
      const errorsByItem = new Map<string, string[]>();

      result.errors.forEach((error) => {
        const itemPath = error.property || "root";
        if (!errorsByItem.has(itemPath)) {
          errorsByItem.set(itemPath, []);
        }
        errorsByItem.get(itemPath)!.push(error.stack);
      });

      // Show first 20 errors to avoid overwhelming output
      const maxErrors = 20;
      let errorCount = 0;

      console.log(`   Errors (showing first ${maxErrors}):`);
      for (const [, errors] of errorsByItem) {
        for (const error of errors) {
          if (errorCount >= maxErrors) {
            const remaining = result.errors.length - maxErrors;
            console.log(`   ... and ${remaining} more errors`);
            return false;
          }
          console.log(`   ${errorCount + 1}. ${error}`);
          errorCount++;
        }
      }

      return false;
    }
  } catch (error) {
    console.log(`❌ ${config.name}: ERROR`);
    console.log(`   ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

function main() {
  console.log("🔍 Salvage Union Data Validation");
  console.log("=================================");
  console.log("\n📚 Loading Shared Schemas...");

  // Load shared schemas once before validating
  loadSharedSchemas();

  console.log("\n🔍 Validating Data Files...");
  console.log("=================================");

  let allValid = true;
  let validCount = 0;
  let invalidCount = 0;

  for (const config of validationConfigs) {
    const isValid = validateData(config);
    if (isValid) {
      validCount++;
    } else {
      invalidCount++;
      allValid = false;
    }
  }

  console.log("\n=================================");
  console.log(`📊 Summary: ${validCount} valid, ${invalidCount} invalid`);

  if (allValid) {
    console.log("✅ All data files are valid!");
    process.exit(0);
  } else {
    console.log("❌ Some data files have validation errors.");
    process.exit(1);
  }
}

main();
