#!/usr/bin/env tsx

/**
 * Example script showing how to extract data with page number references
 * This demonstrates how to maintain source page numbers when extracting game data
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

interface PageData {
  pageNumber: number;
  fullText: string;
}

interface ExtractedItem {
  name: string;
  content: string;
  pageNumber: number;
}

function loadParsedPdf(): PageData[] {
  const pdfPath = join(projectRoot, ".rules", "parsed-pdf.json");
  const content = readFileSync(pdfPath, "utf-8");
  return JSON.parse(content);
}

/**
 * Example: Extract all Chassis Abilities with their page numbers
 */
function extractChassisAbilities(pages: PageData[]): ExtractedItem[] {
  const results: ExtractedItem[] = [];

  for (const page of pages) {
    // Look for pages that contain "CHASSIS ABILITY"
    if (page.fullText.includes("CHASSIS ABILITY")) {
      // Try to extract the chassis name (usually appears before CHASSIS ABILITY)
      const lines = page.fullText.split(/\s+/);
      const abilityIndex = lines.findIndex((line) => line === "CHASSIS");

      if (abilityIndex > 0) {
        // Extract a snippet around the chassis ability
        const start = Math.max(0, abilityIndex - 20);
        const end = Math.min(lines.length, abilityIndex + 50);
        const snippet = lines.slice(start, end).join(" ");

        results.push({
          name: `Chassis on page ${page.pageNumber}`,
          content: snippet,
          pageNumber: page.pageNumber,
        });
      }
    }
  }

  return results;
}

/**
 * Example: Find all mentions of a specific term with page references
 */
function findTermWithPages(
  pages: PageData[],
  term: string
): Array<{ page: number; excerpt: string }> {
  const results: Array<{ page: number; excerpt: string }> = [];
  const searchTerm = term.toLowerCase();

  for (const page of pages) {
    const pageText = page.fullText.toLowerCase();

    if (pageText.includes(searchTerm)) {
      // Find the position and extract a small excerpt
      const index = pageText.indexOf(searchTerm);
      const start = Math.max(0, index - 50);
      const end = Math.min(page.fullText.length, index + 100);
      const excerpt = page.fullText.substring(start, end).trim();

      results.push({
        page: page.pageNumber,
        excerpt: `...${excerpt}...`,
      });
    }
  }

  return results;
}

/**
 * Example: Extract content from a specific page range
 */
function extractPageRange(
  pages: PageData[],
  startPage: number,
  endPage: number
): ExtractedItem[] {
  return pages
    .filter((p) => p.pageNumber >= startPage && p.pageNumber <= endPage)
    .map((p) => ({
      name: `Page ${p.pageNumber}`,
      content: p.fullText,
      pageNumber: p.pageNumber,
    }));
}

function main() {
  console.log("📚 Example: Extracting Data with Page References");
  console.log("=================================================\n");

  console.log("📄 Loading parsed PDF...");
  const pages = loadParsedPdf();
  console.log(`✅ Loaded ${pages.length} pages\n`);

  // Example 1: Extract chassis abilities
  console.log("🔍 Example 1: Finding Chassis Abilities");
  console.log("---------------------------------------");
  const chassisAbilities = extractChassisAbilities(pages);
  console.log(`Found ${chassisAbilities.length} chassis with abilities:\n`);

  // Show first 3 examples
  chassisAbilities.slice(0, 3).forEach((item) => {
    console.log(`📄 ${item.name}:`);
    console.log(`   ${item.content.substring(0, 150)}...`);
    console.log("");
  });

  // Example 2: Find all mentions of "Tech Level"
  console.log('\n🔍 Example 2: Finding "Tech Level" mentions');
  console.log("-------------------------------------------");
  const techLevelMentions = findTermWithPages(pages, "Tech Level");
  console.log(`Found ${techLevelMentions.length} mentions:\n`);

  // Show first 3 examples
  techLevelMentions.slice(0, 3).forEach((result) => {
    console.log(`📄 Page ${result.page}:`);
    console.log(`   ${result.excerpt}`);
    console.log("");
  });

  // Example 3: Extract a specific page range
  console.log("\n🔍 Example 3: Extracting pages 100-102");
  console.log("--------------------------------------");
  const pageRange = extractPageRange(pages, 100, 102);
  pageRange.forEach((item) => {
    console.log(`\n📄 ${item.name}:`);
    console.log(`   ${item.content.substring(0, 200)}...`);
  });

  console.log("\n✅ Examples complete!");
  console.log("\n💡 Key Takeaway:");
  console.log(
    "   Every extracted piece of data maintains its source page number,"
  );
  console.log("   making it easy to reference back to the original PDF.");
}

main();
