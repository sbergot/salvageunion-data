#!/usr/bin/env tsx

import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { writeFileSync, mkdirSync, existsSync } from "fs";
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

async function parsePdf(pdfPath: string): Promise<PageData[]> {
  console.log(`📄 Parsing PDF: ${pdfPath}`);

  const pdfExtract = new PDFExtract();
  const options: PDFExtractOptions = {};

  try {
    const data = await pdfExtract.extract(pdfPath, options);

    console.log(`✅ Successfully extracted ${data.pages.length} pages`);

    const pages: PageData[] = data.pages.map((page, index) => {
      // Extract text items with their positions
      const textItems: TextItem[] = page.content.map((item: any) => ({
        str: item.str,
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
        fontName: item.fontName,
      }));

      // Combine all text on the page
      const fullText = page.content
        .map((item: any) => item.str)
        .join(" ")
        .trim();

      return {
        pageNumber: index + 1, // 1-based page numbering
        width: page.pageInfo.width,
        height: page.pageInfo.height,
        textItems,
        fullText,
      };
    });

    return pages;
  } catch (error) {
    console.error("❌ Error parsing PDF:", error);
    throw error;
  }
}

async function main() {
  console.log("📚 Salvage Union PDF Parser");
  console.log("============================\n");

  const pdfPath = join(
    projectRoot,
    ".rules",
    "Salvage Union Core Book Digital Edition 2.0a.pdf"
  );

  try {
    const pages = await parsePdf(pdfPath);

    // Create .rules directory if it doesn't exist
    const pdfDir = join(projectRoot, ".rules");
    if (!existsSync(pdfDir)) {
      mkdirSync(pdfDir, { recursive: true });
      console.log("📁 Created .rules/ directory");
    }

    // Save the parsed data to JSON
    const outputPath = join(pdfDir, "parsed-pdf.json");
    writeFileSync(outputPath, JSON.stringify(pages, null, 2), "utf-8");

    console.log(`\n💾 Saved parsed data to: .rules/parsed-pdf.json`);
    console.log(`\n📊 Summary:`);
    console.log(`   Total pages: ${pages.length}`);
    console.log(
      `   Total text items: ${pages.reduce(
        (sum, p) => sum + p.textItems.length,
        0
      )}`
    );

    // Show sample from first page
    if (pages.length > 0) {
      console.log(`\n📖 Sample from page 1:`);
      console.log(`   ${pages[0].fullText.substring(0, 200)}...`);
    }

    // Show page number examples
    console.log(`\n📄 Page number examples:`);
    [1, 10, 50, 100].forEach((pageNum) => {
      if (pageNum <= pages.length) {
        const page = pages[pageNum - 1];
        const preview = page.fullText.substring(0, 100).replace(/\n/g, " ");
        console.log(`   Page ${pageNum}: "${preview}..."`);
      }
    });

    console.log("\n✅ PDF parsing complete!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Failed to parse PDF");
    process.exit(1);
  }
}

main();
