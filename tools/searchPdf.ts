#!/usr/bin/env tsx

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

interface TextItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontName?: string;
}

interface PageData {
  pageNumber: number;
  width: number;
  height: number;
  textItems: TextItem[];
  fullText: string;
}

function loadParsedPdf(): PageData[] {
  const pdfPath = join(projectRoot, ".rules", "parsed-pdf.json");
  const content = readFileSync(pdfPath, "utf-8");
  return JSON.parse(content);
}

function searchByPageNumber(
  pages: PageData[],
  pageNumber: number
): PageData | null {
  const page = pages.find((p) => p.pageNumber === pageNumber);
  return page || null;
}

function searchByText(
  pages: PageData[],
  searchTerm: string,
  caseSensitive = false
): Array<{ page: number; text: string; context: string }> {
  const results: Array<{ page: number; text: string; context: string }> = [];
  const searchPattern = caseSensitive ? searchTerm : searchTerm.toLowerCase();

  for (const page of pages) {
    const pageText = caseSensitive
      ? page.fullText
      : page.fullText.toLowerCase();

    if (pageText.includes(searchPattern)) {
      // Find the position and extract context
      const index = pageText.indexOf(searchPattern);
      const start = Math.max(0, index - 100);
      const end = Math.min(pageText.length, index + searchPattern.length + 100);
      const context = page.fullText.substring(start, end);

      results.push({
        page: page.pageNumber,
        text: searchTerm,
        context: context.trim(),
      });
    }
  }

  return results;
}

function getPageRange(
  pages: PageData[],
  startPage: number,
  endPage: number
): PageData[] {
  return pages.filter(
    (p) => p.pageNumber >= startPage && p.pageNumber <= endPage
  );
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("📚 Salvage Union PDF Search Tool");
    console.log("=================================\n");
    console.log("Usage:");
    console.log(
      "  tsx tools/searchPdf.ts page <number>           - Get content from a specific page"
    );
    console.log(
      "  tsx tools/searchPdf.ts range <start> <end>     - Get content from a page range"
    );
    console.log(
      "  tsx tools/searchPdf.ts search <term>           - Search for text across all pages"
    );
    console.log(
      "  tsx tools/searchPdf.ts stats                   - Show PDF statistics"
    );
    console.log("\nExamples:");
    console.log("  tsx tools/searchPdf.ts page 50");
    console.log("  tsx tools/searchPdf.ts range 10 20");
    console.log('  tsx tools/searchPdf.ts search "Mech Chassis"');
    process.exit(0);
  }

  console.log("📄 Loading parsed PDF data...\n");
  const pages = loadParsedPdf();
  console.log(`✅ Loaded ${pages.length} pages\n`);

  const command = args[0];

  switch (command) {
    case "page": {
      const pageNum = parseInt(args[1], 10);
      if (isNaN(pageNum)) {
        console.error("❌ Invalid page number");
        process.exit(1);
      }

      const page = searchByPageNumber(pages, pageNum);
      if (!page) {
        console.error(`❌ Page ${pageNum} not found`);
        process.exit(1);
      }

      console.log(`📖 Page ${page.pageNumber}`);
      console.log(`   Dimensions: ${page.width} x ${page.height}`);
      console.log(`   Text items: ${page.textItems.length}`);
      console.log(`\n📝 Content:\n`);
      console.log(page.fullText);
      break;
    }

    case "range": {
      const startPage = parseInt(args[1], 10);
      const endPage = parseInt(args[2], 10);

      if (isNaN(startPage) || isNaN(endPage)) {
        console.error("❌ Invalid page range");
        process.exit(1);
      }

      const rangePages = getPageRange(pages, startPage, endPage);
      console.log(
        `📖 Pages ${startPage}-${endPage} (${rangePages.length} pages)\n`
      );

      for (const page of rangePages) {
        console.log(`\n${"=".repeat(60)}`);
        console.log(`PAGE ${page.pageNumber}`);
        console.log("=".repeat(60));
        console.log(page.fullText);
      }
      break;
    }

    case "search": {
      const searchTerm = args.slice(1).join(" ");
      if (!searchTerm) {
        console.error("❌ No search term provided");
        process.exit(1);
      }

      console.log(`🔍 Searching for: "${searchTerm}"\n`);
      const results = searchByText(pages, searchTerm);

      if (results.length === 0) {
        console.log("❌ No results found");
        process.exit(0);
      }

      console.log(`✅ Found ${results.length} result(s):\n`);

      for (const result of results) {
        console.log(`📄 Page ${result.page}:`);
        console.log(`   ...${result.context}...`);
        console.log("");
      }
      break;
    }

    case "stats": {
      const totalTextItems = pages.reduce(
        (sum, p) => sum + p.textItems.length,
        0
      );
      const totalChars = pages.reduce((sum, p) => sum + p.fullText.length, 0);
      const avgTextItemsPerPage = (totalTextItems / pages.length).toFixed(2);
      const avgCharsPerPage = (totalChars / pages.length).toFixed(2);

      console.log("📊 PDF Statistics:");
      console.log(`   Total pages: ${pages.length}`);
      console.log(`   Total text items: ${totalTextItems}`);
      console.log(`   Total characters: ${totalChars}`);
      console.log(`   Avg text items per page: ${avgTextItemsPerPage}`);
      console.log(`   Avg characters per page: ${avgCharsPerPage}`);

      // Show first and last page info
      if (pages.length > 0) {
        console.log(`\n📖 First page preview:`);
        console.log(`   ${pages[0].fullText.substring(0, 150)}...`);

        console.log(`\n📖 Last page preview:`);
        const lastPage = pages[pages.length - 1];
        console.log(`   ${lastPage.fullText.substring(0, 150)}...`);
      }
      break;
    }

    default:
      console.error(`❌ Unknown command: ${command}`);
      console.log("Run without arguments to see usage");
      process.exit(1);
  }
}

main();
