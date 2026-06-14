import { build } from "esbuild";
import { mkdirSync, readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("package.json", "utf-8")) as {
    version: string;
    repository: { url: string };
};

const repoUrl = pkg.repository?.url ?? "";
const repo = repoUrl.match(/github\.com\/([^/]+\/[^.]+)/)?.[1] ?? "OWNER/REPO";
const releaseBase = `https://github.com/${repo}/releases/latest/download`;

// Comprehensive list of active Amazon TLDs
const AMAZON_TLDS = [
    // North America
    "com",
    "ca",
    "com.mx",
    // Europe
    "co.uk",
    "de",
    "fr",
    "it",
    "es",
    "nl",
    "se",
    "pl",
    "com.be",
    // Asia & Pacific
    "co.jp",
    "in",
    "com.au",
    "sg",
    // Middle East & Africa
    "ae",
    "sa",
    "eg",
    "com.tr",
    "co.za",
    // South America
    "com.br",
];

// Dynamically generate the @match rules for product pages
const matchRules = AMAZON_TLDS.flatMap((tld) => [
    `// @match        https://www.amazon.${tld}/*/dp/*`,
    `// @match        https://www.amazon.${tld}/gp/product/*`,
]);

const banner = [
    "// ==UserScript==",
    "// @name         Amazon Auto-Decline Warranty",
    `// @namespace    https://github.com/${repo}`,
    `// @version      ${pkg.version}`,
    '// @description  Automatically clicks "No thanks" on Amazon\'s warranty popup.',
    "// @author       Claudios",
    "// @license      MIT",
    ...matchRules,
    "// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com",
    `// @updateURL    ${releaseBase}/warranty-deny.user.js`,
    `// @downloadURL  ${releaseBase}/warranty-deny.user.js`,
    "// @grant        none",
    "// ==/UserScript==\n",
].join("\n");

mkdirSync("dist", { recursive: true });

await build({
    entryPoints: ["src/warranty-deny.ts"],
    bundle: true,
    format: "iife",
    outfile: "dist/warranty-deny.user.js",
    banner: { js: banner },
    platform: "browser",
    target: ["es2025"],
});

console.log(`Built dist/warranty-deny.user.js (v${pkg.version})`);
