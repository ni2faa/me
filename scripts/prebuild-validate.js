#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const logDir = path.join(process.cwd(), 'validate_logs')
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const logFile = path.join(logDir, `prebuild-${stamp}.log`)
fs.mkdirSync(logDir, { recursive: true })

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(msg)
  fs.appendFileSync(logFile, line + '\n')
}

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', ...opts })
}

let failed = false

function section(title) {
  log(`=== ${title} ===`)
}

function checkNodeEnv() {
  section('Environment prerequisites')
  try {
    const nodeV = run('node -v').trim()
    const npmV = run('npm -v').trim()
    log(`Node: ${nodeV}`)
    log(`npm: ${npmV}`)
    const major = parseInt(nodeV.replace('v', '').split('.')[0], 10)
    if (Number.isNaN(major) || major < 18) {
      failed = true
      log('ERROR: Node.js >= 18 is required')
    }
  } catch (e) {
    failed = true
    log(`ERROR: Node/npm not available: ${e.message}`)
  }
}

function checkDependencies() {
  section('Dependency validation')
  try {
    if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
      failed = true
      log('ERROR: package.json not found')
      return
    }
    const hasNodeModules = fs.existsSync(path.join(process.cwd(), 'node_modules'))
    log(`node_modules present: ${hasNodeModules}`)
    // quick integrity check without full install
    const out = run('npm ls --depth=0 --json || true')
    const info = JSON.parse(out)
    if (info.problems && info.problems.length) {
      failed = true
      log(`ERROR: npm ls problems: ${info.problems.join('; ')}`)
    } else {
      log('✓ Dependencies tree looks consistent')
    }
    // Ensure core deps are resolvable
    ['next', 'react', 'react-dom'].forEach((mod) => {
      try {
        require.resolve(mod)
        log(`✓ Module resolvable: ${mod}`)
      } catch (_) {
        failed = true
        log(`ERROR: Module not resolvable: ${mod}`)
      }
    })
  } catch (e) {
    failed = true
    log(`ERROR: Dependency check failed: ${e.message}`)
  }
}

function validateConfigs() {
  section('Configuration validation')
  try {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')
    if (fs.existsSync(tsconfigPath)) {
      const tsText = fs.readFileSync(tsconfigPath, 'utf-8')
      JSON.parse(tsText)
      log('✓ tsconfig.json is valid JSON')
    } else {
      log('WARN: tsconfig.json not found')
    }
  } catch (e) {
    failed = true
    log(`ERROR: tsconfig.json invalid: ${e.message}`)
  }
  try {
    const nextCfgPath = path.join(process.cwd(), 'next.config.js')
    if (fs.existsSync(nextCfgPath)) {
      const cfg = require(nextCfgPath)
      if (!cfg || typeof cfg !== 'object') {
        failed = true
        log('ERROR: next.config.js did not export an object')
      } else {
        log('✓ next.config.js loaded')
      }
    } else {
      log('WARN: next.config.js not found')
    }
  } catch (e) {
    failed = true
    log(`ERROR: next.config.js invalid: ${e.message}`)
  }
}

function checkSourceSyntax() {
  section('Source syntax check (TypeScript)')
  try {
    // fast syntax/type check without emitting build artifacts
    run('npx --yes tsc --noEmit', { stdio: 'pipe' })
    log('✓ TypeScript typecheck passed')
  } catch (e) {
    failed = true
    log(`ERROR: TypeScript typecheck failed\n${e.stdout || e.message}`)
  }
}

function checkFileAccess() {
  section('Source file accessibility')
  try {
    const srcFiles = ['app/layout.tsx', 'app/page.tsx']
    srcFiles.forEach((p) => {
      const full = path.join(process.cwd(), p)
      if (fs.existsSync(full)) {
        fs.accessSync(full, fs.constants.R_OK)
        log(`✓ Readable: ${p}`)
      } else {
        log(`WARN: Missing expected file: ${p}`)
      }
    })
  } catch (e) {
    failed = true
    log(`ERROR: Source accessibility check failed: ${e.message}`)
  }
}

function main() {
  log(`Log file: ${logFile}`)
  checkNodeEnv()
  checkDependencies()
  validateConfigs()
  checkSourceSyntax()
  checkFileAccess()
  if (failed) {
    log('✗ Pre-build validation failed')
    process.exit(1)
  } else {
    log('✓ Pre-build validation passed')
  }
}

main()