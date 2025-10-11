#!/usr/bin/env tsx
/**
 * Generate documentation from schema files
 * This ensures documentation stays in sync with actual schemas
 */

import fs from "fs";
import path from "path";

interface SchemaInfo {
  id: string;
  title: string;
  description: string;
  dataFile: string;
  schemaFile: string;
  itemCount: number;
  requiredFields: string[];
}

interface DataFileCounts {
  [key: string]: number;
}

// Get all schema files
function getSchemaFiles(): string[] {
  const schemasDir = path.join(process.cwd(), "schemas");
  return fs
    .readdirSync(schemasDir)
    .filter((file) => file.endsWith(".schema.json") && file !== "index.json")
    .sort();
}

// Get item count from data file
function getItemCount(dataFile: string): number {
  try {
    const fullPath = path.join(process.cwd(), dataFile);
    const data = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    return Array.isArray(data) ? data.length : 0;
  } catch (error) {
    return 0;
  }
}

// Extract required fields from schema
function getRequiredFields(schema: any, schemaId: string): string[] {
  // Try items.required first (for array schemas)
  if (schema.items?.required) {
    return schema.items.required;
  }

  // Handle oneOf schemas (like classes)
  if (schema.items?.oneOf && Array.isArray(schema.items.oneOf)) {
    // Get required fields from first oneOf option
    if (schema.items.oneOf[0]?.required) {
      return schema.items.oneOf[0].required;
    }
  }

  // Try top-level required
  if (schema.required) {
    return schema.required;
  }

  // Handle schemas that use shared definitions
  // These inherit required fields from the shared schema
  const sharedDefinitionSchemas: { [key: string]: string[] } = {
    keywords: ["name", "source", "page"],
    traits: ["name", "source", "page"],
    modules: ["name", "page"],
    systems: ["name", "page"],
  };

  if (sharedDefinitionSchemas[schemaId]) {
    return sharedDefinitionSchemas[schemaId];
  }

  return [];
}

// Parse schema file to get info
function parseSchemaFile(schemaFile: string): SchemaInfo | null {
  try {
    const fullPath = path.join(process.cwd(), "schemas", schemaFile);
    const schema = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

    const id = schemaFile.replace(".schema.json", "");
    const dataFile = `data/${id}.json`;

    return {
      id,
      title: schema.title || id,
      description: schema.description || "",
      dataFile,
      schemaFile: `schemas/${schemaFile}`,
      itemCount: getItemCount(dataFile),
      requiredFields: getRequiredFields(schema, id),
    };
  } catch (error) {
    console.error(`Error parsing ${schemaFile}:`, error);
    return null;
  }
}

// Generate schema index
function generateSchemaIndex(schemas: SchemaInfo[]): void {
  const index = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Salvage Union Data Schema Catalog",
    description:
      "Catalog of all available schemas in the salvageunion-data repository",
    version: "1.0.0",
    generated: new Date().toISOString(),
    schemas: schemas.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      dataFile: s.dataFile,
      schemaFile: s.schemaFile,
      itemCount: s.itemCount,
      requiredFields: s.requiredFields,
    })),
  };

  const outputPath = path.join(process.cwd(), "schemas", "index.json");
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2) + "\n");
  console.log(`✅ Generated schemas/index.json (${schemas.length} schemas)`);
}

// Generate VSCode settings
function generateVSCodeSettings(schemas: SchemaInfo[]): void {
  const settings = {
    "json.schemas": schemas.map((s) => ({
      fileMatch: [s.dataFile],
      url: `./${s.schemaFile}`,
    })),
    "json.format.enable": true,
    "editor.formatOnSave": true,
    "[json]": {
      "editor.defaultFormatter": "vscode.json-language-features",
      "editor.tabSize": 2,
    },
  };

  const outputPath = path.join(process.cwd(), ".vscode", "settings.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(settings, null, 2) + "\n");
  console.log(
    `✅ Generated .vscode/settings.json (${schemas.length} mappings)`
  );
}

// Generate README section
function generateReadmeSection(schemas: SchemaInfo[]): string {
  const totalItems = schemas.reduce((sum, s) => sum + s.itemCount, 0);

  let section = "## 📚 Overview\n\n";
  section +=
    "This repository contains structured game data with full JSON Schema validation, including:\n\n";

  // Group by category
  const categories = {
    Pilot: schemas.filter((s) =>
      ["abilities", "classes", "equipment"].includes(s.id)
    ),
    Mech: schemas.filter((s) =>
      ["systems", "modules", "chassis"].includes(s.id)
    ),
    Enemies: schemas.filter((s) =>
      ["bio-titans", "creatures", "npcs", "squads", "meld"].includes(s.id)
    ),
    Vehicles: schemas.filter((s) =>
      ["drones", "vehicles", "crawlers"].includes(s.id)
    ),
    Reference: schemas.filter((s) =>
      ["keywords", "traits", "tables", "ability-tree-requirements"].includes(
        s.id
      )
    ),
  };

  for (const [category, items] of Object.entries(categories)) {
    if (items.length > 0) {
      section += `**${category}:**\n`;
      for (const item of items) {
        section += `- **${item.itemCount} ${item.title}**\n`;
      }
      section += "\n";
    }
  }

  section += `**Total: ${totalItems} items across ${schemas.length} data files**\n\n`;
  section +=
    "All data entries include **page references** to the source material for easy verification.\n";

  return section;
}

// Generate data file listing
function generateDataFileListing(schemas: SchemaInfo[]): string {
  let listing =
    "```\nsalvageunion-data/\n├── data/                    # JSON data files\n";

  for (const schema of schemas) {
    const fileName = path.basename(schema.dataFile);
    const comment = `${schema.title} (${schema.itemCount} items)`;
    listing += `│   ├── ${fileName.padEnd(28)} # ${comment}\n`;
  }

  listing += "│\n";
  listing += "├── schemas/                 # JSON Schema definitions\n";
  listing += "│   ├── shared/              # Shared schema definitions\n";
  listing +=
    "│   │   ├── common.schema.json    # Common types (damage, traits, etc.)\n";
  listing +=
    "│   │   ├── enums.schema.json     # Enumerations (sources, ranges, etc.)\n";
  listing +=
    "│   │   └── objects.schema.json   # Complex objects (systems, actions, etc.)\n";
  listing += "│   └── *.schema.json        # Individual data file schemas\n";
  listing += "│\n";
  listing += "└── tools/                   # Utility scripts\n";
  listing += "    ├── validateAll.ts       # Schema validation tool\n";
  listing += "    ├── format.ts            # JSON formatting tool\n";
  listing += "    ├── generateDocs.ts      # Documentation generator\n";
  listing += "    ├── parsePdf.ts          # PDF parsing tool\n";
  listing += "    └── searchPdf.ts         # PDF search tool\n";
  listing += "```\n";

  return listing;
}

// Main function
function main() {
  console.log("📝 Generating documentation from schemas...\n");

  const schemaFiles = getSchemaFiles();
  const schemas = schemaFiles
    .map(parseSchemaFile)
    .filter((s): s is SchemaInfo => s !== null);

  console.log(`Found ${schemas.length} schema files\n`);

  // Generate schema index
  generateSchemaIndex(schemas);

  // Generate VSCode settings
  generateVSCodeSettings(schemas);

  // Generate documentation snippets
  const readmeSection = generateReadmeSection(schemas);
  const dataListing = generateDataFileListing(schemas);

  // Save snippets for manual inclusion
  const snippetsDir = path.join(process.cwd(), ".docs-snippets");
  fs.mkdirSync(snippetsDir, { recursive: true });

  fs.writeFileSync(path.join(snippetsDir, "readme-overview.md"), readmeSection);
  console.log("✅ Generated .docs-snippets/readme-overview.md");

  fs.writeFileSync(path.join(snippetsDir, "data-file-listing.md"), dataListing);
  console.log("✅ Generated .docs-snippets/data-file-listing.md");

  // Generate required fields table
  let requiredFieldsTable = "| Data Type | Required Fields |\n";
  requiredFieldsTable += "|-----------|----------------|\n";
  for (const schema of schemas) {
    const fields = schema.requiredFields.map((f) => `\`${f}\``).join(", ");
    requiredFieldsTable += `| ${schema.title} | ${fields} |\n`;
  }

  fs.writeFileSync(
    path.join(snippetsDir, "required-fields-table.md"),
    requiredFieldsTable
  );
  console.log("✅ Generated .docs-snippets/required-fields-table.md");

  console.log("\n✨ Documentation generation complete!");
  console.log(
    "\n💡 Tip: Use the snippets in .docs-snippets/ to update documentation files"
  );
}

main();
