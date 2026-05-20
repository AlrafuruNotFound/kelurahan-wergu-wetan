/* eslint-disable */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

console.log(`${YELLOW}🔍 Running Git Security Validator...${RESET}`);

// Regex rules to detect secrets
const RULES = [
  {
    name: 'Prisma/PostgreSQL Database URL',
    regex: /postgresql:\/\/[^@\s]+:[^@\s]+@[^\s]+/i,
    excludeFiles: [/schema\.prisma$/, /seed\.ts$/, /\.env\.example$/, /\.md$/]
  },
  {
    name: 'Hardcoded JWT Secret',
    regex: /JWT_SECRET\s*=\s*['"`][a-zA-Z0-9_\-]{8,}['"`]/i,
    excludeFiles: [/\.env\.example$/, /\.md$/]
  },
  {
    name: 'Hardcoded Supabase Service Role/API Key',
    regex: /sb_[a-zA-Z0-9]{20,}/i,
    excludeFiles: []
  },
  {
    name: 'Potential Raw Private Key / PEM File',
    regex: /-----BEGIN[ A-Z0-9_-]+PRIVATE KEY-----/i,
    excludeFiles: []
  }
];

// Block list for forbidden files to ever be staged
const FORBIDDEN_FILES = [
  /^\.env$/,
  /^\.env\.local$/,
  /^\.env\.development\.local$/,
  /^\.env\.production\.local$/,
  /.*\.pem$/,
  /.*\.key$/
];

try {
  // Get staged files
  const stdout = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
  const files = stdout.split('\n').map(f => f.trim()).filter(Boolean);

  if (files.length === 0) {
    console.log(`${GREEN}✅ No staged files to scan.${RESET}`);
    process.exit(0);
  }

  let violationFound = false;

  for (const file of files) {
    // 1. Check if the file is forbidden
    const isForbidden = FORBIDDEN_FILES.some(regex => regex.test(file));
    if (isForbidden) {
      console.error(`${RED}❌ SECURITY VIOLATION: Berkas terlarang terdeteksi di area staging: "${file}"${RESET}`);
      console.error(`${RED}   Jangan pernah men-stage file .env atau kunci privat (.pem/.key) ke Git!${RESET}`);
      violationFound = true;
      continue;
    }

    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      continue; // File might have been deleted in this commit
    }

    // Skip binary files or directories
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    // Check size to prevent locking on large assets
    if (stat.size > 2 * 1024 * 1024) continue; // Skip files larger than 2MB

    const content = fs.readFileSync(filePath, 'utf-8');

    // 2. Scan file content against security rules
    for (const rule of RULES) {
      if (rule.regex.test(content)) {
        // Check if the file is excluded from this rule
        const isExcluded = rule.excludeFiles.some(regex => regex.test(file));
        if (!isExcluded) {
          console.error(`${RED}❌ SECURITY VIOLATION di file: "${file}"${RESET}`);
          console.error(`${RED}   Terdeteksi: ${rule.name}${RESET}`);
          console.error(`${YELLOW}   Harap pindahkan nilai sensitif tersebut ke dalam file .env dan gunakan process.env!${RESET}`);
          violationFound = true;
        }
      }
    }
  }

  if (violationFound) {
    console.error(`\n${RED}🛑 Commit DIGAGALKAN demi keamanan. Silakan bersihkan file di atas sebelum commit kembali.${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`${GREEN}✅ Git Security Validator: Semua aman dari kebocoran kunci rahasia!${RESET}`);
    process.exit(0);
  }
} catch (error) {
  console.error(`${RED}⚠️ Gagal menjalankan Security Validator: ${error.message}${RESET}`);
  // If git command fails (like in a non-git repo), let it pass to not block build
  process.exit(0);
}
