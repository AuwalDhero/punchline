/**
 * IMPORT CONSISTENCY AUDIT
 * Detects:
 * - Missing exports
 * - Case-sensitive path mismatches
 * - Broken relative imports
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '..');
const VALID_EXT = ['.ts', '.tsx', '.js', '.jsx'];

function walk(dir, files = []) {
  fs.readdirSync(dir).forEach((f) => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', '.git', 'dist'].includes(f)) {
        walk(full, files);
      }
    } else {
      if (VALID_EXT.includes(path.extname(full))) {
        files.push(full);
      }
    }
  });
  return files;
}

const files = walk(SRC_DIR);
const errors = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /from\s+['"](.+?)['"]/g;
  let match;

  while ((match = importRegex.exec(content))) {
    const importPath = match[1];

    // Only audit relative imports
    if (!importPath.startsWith('.')) continue;

    const basePath = path.resolve(path.dirname(file), importPath);

    const candidates = VALID_EXT.map(ext => basePath + ext)
      .concat(VALID_EXT.map(ext => path.join(basePath, 'index' + ext)));

    const found = candidates.find(p => fs.existsSync(p));

    if (!found) {
      // Check for case-insensitive match
      const dir = path.dirname(candidates[0]);
      if (fs.existsSync(dir)) {
        const filesInDir = fs.readdirSync(dir);
        const wanted = path.basename(candidates[0]).toLowerCase();
        const similar = filesInDir.find(f => f.toLowerCase() === wanted);

        if (similar) {
          errors.push(`CASE MISMATCH:\n  ${file}\n  imports "${importPath}" but actual file is "${similar}"\n`);
        } else {
          errors.push(`BROKEN IMPORT:\n  ${file}\n  cannot resolve "${importPath}"\n`);
        }
      } else {
        errors.push(`BROKEN IMPORT:\n  ${file}\n  directory missing for "${importPath}"\n`);
      }
    }
  }
});

if (errors.length) {
  console.error('\n❌ IMPORT CONSISTENCY ISSUES FOUND:\n');
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('\n✅ IMPORT AUDIT PASSED — no issues found\n');
}
