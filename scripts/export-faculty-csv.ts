import * as fs from "node:fs";
import * as path from "node:path";

const srcFile = path.resolve(process.cwd(), "src/data/program-faculty.ts");
const tmpFile = path.resolve(process.cwd(), "scripts/.program-faculty-export.ts");

let source = fs.readFileSync(srcFile, "utf-8");
source = source.replace(
  /import\s+\{\s*assetUrl\s*\}\s+from\s+["']@lib\/assets["'];?/,
  "const assetUrl = (path: string): string => path;"
);
fs.writeFileSync(tmpFile, source);

const {
  biomedicalFaculty,
  biotechnologyFaculty,
  communicationFaculty,
  lawFaculty,
  managementFaculty,
  midwiferyAssociateFaculty,
  midwiferyBachelorFaculty,
} = await import(tmpFile);

fs.unlinkSync(tmpFile);

const programs = [
  ["biomedical", biomedicalFaculty],
  ["biotechnology", biotechnologyFaculty],
  ["communication", communicationFaculty],
  ["law", lawFaculty],
  ["management", managementFaculty],
  ["midwifery-associate", midwiferyAssociateFaculty],
  ["midwifery-bachelor", midwiferyBachelorFaculty],
] as const;

const fields = [
  "name",
  "id",
  "title",
  "photo",
  "nidn",
  "link",
  "scopus_id",
  "scopus_index",
  "sinta_id",
  "sinta_index",
  "specialization",
] as const;

function escapeCsv(value: unknown): string {
  const text = value == null ? "" : String(value);
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

const rows: string[][] = [["program", ...fields]];

for (const [programKey, data] of programs) {
  for (const member of data.facultyMembers) {
    rows.push([programKey, ...fields.map((field) => member[field] ?? "")]);
  }
}

const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
const outPath = path.resolve(process.cwd(), "program-faculty.csv");

fs.writeFileSync(outPath, csv);
console.log(`Wrote ${outPath} (${rows.length - 1} members)`);
