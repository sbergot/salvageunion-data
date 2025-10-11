import { compile } from "json-schema-to-typescript";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { join, dirname, basename } from "path";

const SCHEMAS_DIR = "schemas";
const OUTPUT_DIR = "lib/types";

// Automatically discover all schema files (excluding shared directory)
function getSchemaFiles(): string[] {
  const files = readdirSync(SCHEMAS_DIR);
  return files
    .filter((file) => file.endsWith(".schema.json"))
    .map((file) => basename(file, ".schema.json"))
    .sort();
}

const schemaFiles = getSchemaFiles();

async function generateTypes() {
  console.log("🔧 Generating TypeScript types from JSON Schemas...\n");

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const schemaName of schemaFiles) {
    const schemaPath = join(SCHEMAS_DIR, `${schemaName}.schema.json`);
    const outputPath = join(OUTPUT_DIR, `${schemaName}.ts`);

    try {
      console.log(`📝 Processing ${schemaName}...`);

      // Read schema
      const schemaContent = readFileSync(schemaPath, "utf-8");
      const schema = JSON.parse(schemaContent);

      // Generate TypeScript with proper $ref resolution
      const ts = await compile(schema, schemaName, {
        bannerComment: "",
        style: {
          semi: true,
          singleQuote: false,
        },
        cwd: dirname(schemaPath),
      });

      // Write to file
      writeFileSync(outputPath, ts);
      console.log(`   ✅ Generated ${outputPath}`);
    } catch (error) {
      console.error(`   ❌ Error processing ${schemaName}:`, error);
    }
  }

  console.log("\n✨ Type generation complete!");
}

generateTypes().catch(console.error);
