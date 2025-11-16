#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const logDir = path.join(process.cwd(), 'validate_logs')
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const logFile = path.join(logDir, `prebuild-${stamp}.log`)
fs.mkdirSync(logDir, { recursive: true })

function log(level, msg) {
  const timestamp = new Date().toISOString()
  const consoleMsg = `[${level}] ${msg}`
  const fileLine = `[${timestamp}] [${level}] ${msg}`
  console.log(consoleMsg)
  fs.appendFileSync(logFile, fileLine + '\n')
}

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', ...opts })
}

let failed = false

function section(title) {
  log('INFO', `=== ${title} ===`)
}

function checkNodeEnv() {
  section('Environment prerequisites')
  try {
    const nodeV = run('node -v').trim()
    const npmV = run('npm -v').trim()
    log('INFO', `Node: ${nodeV}`)
    log('INFO', `npm: ${npmV}`)
    const major = parseInt(nodeV.replace('v', '').split('.')[0], 10)
    if (Number.isNaN(major) || major \u003c 18) {
      failed = true
      log('ERROR', 'Node.js \u003e= 18 is required')
    }

    // Resource checks
    const minCpuCores = 2 // Minimum 2 CPU cores
    const minRamGb = 4 // Minimum 4 GB RAM
    const minDiskGb = 10 // Minimum 10 GB free disk space

    const cpuCores = os.cpus().length
    log('INFO', `CPU Cores: ${cpuCores}`)
    if (cpuCores \u003c minCpuCores) {
      failed = true
      log('ERROR', `Insufficient CPU cores. Required: ${minCpuCores}, Found: ${cpuCores}`)
    }

    const totalRamBytes = os.totalmem()
    const totalRamGb = (totalRamBytes / (1024 ** 3)).toFixed(2)
    log('INFO', `Total RAM: ${totalRamGb} GB`)
    if (totalRamGb \u003c minRamGb) {
      failed = true
      log('ERROR', `Insufficient RAM. Required: ${minRamGb} GB, Found: ${totalRamGb} GB`)
    }

    try {
      const dfOutput = run('df -h .').trim().split('\n')
      const diskLine = dfOutput[dfOutput.length - 1]
      const diskParts = diskLine.split(/\s+/).filter(Boolean)
      // Assuming output format: Filesystem Size Used Avail Use% Mounted_on
      const availDisk = diskParts[3] // e.g., 100G, 500M
      let availDiskGb = 0
      if (availDisk.endsWith('G')) {
        availDiskGb = parseFloat(availDisk.replace('G', ''))
      } else if (availDisk.endsWith('M')) {
        availDiskGb = parseFloat(availDisk.replace('M', '')) / 1024
      } else if (availDisk.endsWith('T')) {
        availDiskGb = parseFloat(availDisk.replace('T', '')) * 1024
      }
      log('INFO', `Available Disk Space: ${availDiskGb.toFixed(2)} GB`)
      if (availDiskGb \u003c minDiskGb) {
        failed = true
        log('ERROR', `Insufficient free disk space. Required: ${minDiskGb} GB, Found: ${availDiskGb.toFixed(2)} GB`)
      }
    } catch (e) {
      failed = true
      log('ERROR', `Could not determine free disk space: ${e.message}`)
    }

  } catch (e) {
    failed = true
    log('ERROR', `Environment check failed: ${e.message}`)
  }
}

function checkDependencies() {
  section('Dependency validation')
  try {
    if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
      failed = true
      log('ERROR', 'package.json not found')
      return
    }
    const hasNodeModules = fs.existsSync(path.join(process.cwd(), 'node_modules'))
    log('INFO', `node_modules present: ${hasNodeModules}`)
    // quick integrity check without full install
    const out = run('npm ls --depth=0 --json || true')
    const info = JSON.parse(out)
    if (info.problems && info.problems.length) {
      failed = true
      log('ERROR', `npm ls problems: ${info.problems.join('; ')}`)
    } else {
      log('INFO', '✓ Dependencies tree looks consistent')
    }
    // Ensure core deps are resolvable
    ['next', 'react', 'react-dom'].forEach((mod) => {
      try {
        require.resolve(mod)
        log('INFO', `✓ Module resolvable: ${mod}`)
      } catch (_) {
        failed = true
        log('ERROR', `Module not resolvable: ${mod}`)
      }
    })

    // npm audit for vulnerabilities
    const severityThreshold = 'moderate' // Can be 'low', 'moderate', 'high', 'critical'
    try {
      const auditOutput = run('npm audit --json || true')
      const auditInfo = JSON.parse(auditOutput)
      let vulnerable = false
      if (auditInfo.vulnerabilities) {
        const severities = ['low', 'moderate', 'high', 'critical']
        const thresholdIndex = severities.indexOf(severityThreshold)

        for (const vulnType in auditInfo.vulnerabilities) {
          if (auditInfo.vulnerabilities.hasOwnProperty(vulnType)) {
            const vulnerability = auditInfo.vulnerabilities[vulnType]
            if (vulnerability.severity \u0026\u0026 severities.indexOf(vulnerability.severity) \u003e= thresholdIndex) {
              vulnerable = true
              break
            }
          }
        }
      }

      if (vulnerable) {
        failed = true
        log('ERROR', `npm audit found vulnerabilities above ${severityThreshold} severity. Run 'npm audit' for details.`)
      } else {
        log('INFO', '✓ npm audit found no vulnerabilities above specified severity.')
      }
    } catch (auditError) {
      log('WARN', `npm audit failed to run or parse: ${auditError.message}`)
    }

  } catch (e) {
    failed = true
    log('ERROR', `Dependency check failed: ${e.message}`)
  }
}

function validateConfigs() {
  section('Configuration validation')
  try {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')
    if (fs.existsSync(tsconfigPath)) {
      const tsText = fs.readFileSync(tsconfigPath, 'utf-8')
      JSON.parse(tsText)
      log('INFO', '✓ tsconfig.json is valid JSON')
    } else {
      log('WARN', 'tsconfig.json not found')
    }
  } catch (e) {
    failed = true
    log('ERROR', `tsconfig.json invalid: ${e.message}`)
  }
  try {
    const nextCfgPath = path.join(process.cwd(), 'next.config.js')
    if (fs.existsSync(nextCfgPath)) {
      const cfg = require(nextCfgPath)
      if (!cfg || typeof cfg !== 'object') {
        failed = true
        log('ERROR', 'next.config.js did not export an object')
      } else {
        log('INFO', '✓ next.config.js loaded')
      }
    } else {
      log('WARN', 'next.config.js not found')
    }
  } catch (e) {
    failed = true
    log('ERROR', `next.config.js invalid: ${e.message}`)
  }
}

function checkSourceSyntax() {
  section('Source syntax check (TypeScript)')
  try {
    // fast syntax/type check without emitting build artifacts
    run('npx --yes tsc --noEmit', { stdio: 'pipe' })
    log('INFO', '✓ TypeScript typecheck passed')
  } catch (e) {
    failed = true
    log('ERROR', `TypeScript typecheck failed\n${e.stdout || e.message}`)
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
        log('INFO', `✓ Readable: ${p}`)
      } else {
        log('WARN', `Missing expected file: ${p}`)
      }
    })
  } catch (e) {
    failed = true
    log('ERROR', `Source accessibility check failed: ${e.message}`)
  }
}

function exists(cmd) {
  try { run(`${cmd} --version`); return true } catch (_) { return false }
}

function detectKubeconfig() {
  const envKC = process.env.KUBECONFIG || ''
  const candidates = []
  if (envKC) candidates.push(envKC)
  candidates.push('/etc/rancher/k3s/k3s.yaml')
  candidates.push(path.join(process.env.HOME || '', '.kube/config'))
  candidates.push('/root/.kube/config')
  candidates.push('/home/runner/.kube/config')
  candidates.push('/var/lib/rancher/k3s/agent/kubeconfig.yaml')
  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p } catch (_) {}
  }
  return null
}

function decodeIfBase64(filePath) {
  try {
    const buf = fs.readFileSync(filePath)
    const firstLine = buf.toString('utf-8').split(/\r?\n/)[0]
    if (/^[A-Za-z0-9+/=]+$/.test(firstLine)) {
      const decoded = Buffer.from(buf.toString('utf-8'), 'base64').toString('utf-8')
      const out = path.join(logDir, 'kubeconfig_decoded.yaml')
      fs.writeFileSync(out, decoded)
      return out
    }
    return filePath
  } catch (_) {
    return filePath
  }
}

function checkKubeconfig() {
  section('Kubernetes kubeconfig validation')
  const required = (process.env.CI === 'true') || (process.env.K8S_VALIDATE === 'true')
  const kc = detectKubeconfig()
  if (!kc) {
    if (required) { failed = true; log('ERROR', 'kubeconfig not found') } else { log('SKIP', 'kubeconfig not found') }
    return
  }
  let useKC = decodeIfBase64(kc)
  try {
    const first = fs.readFileSync(useKC, 'utf-8').split(/\r?\n/)[0]
    if (!/apiVersion|kind/.test(first)) {
      failed = true
      log('ERROR', 'kubeconfig missing apiVersion/kind header')
      return
    }
  } catch (e) {
    failed = true
    log('ERROR', `kubeconfig read failed: ${e.message}`)
    return
  }
  if (exists('kubectl')) {
    try {
      run(`kubectl version --client --request-timeout=5s`, { stdio: 'pipe' })
      run(`kubectl config view --kubeconfig="${useKC}" -o=json`, { stdio: 'pipe' })
      log('INFO', '✓ kubectl config view succeeded')
      try {
        run(`kubectl cluster-info --request-timeout=5s --kubeconfig="${useKC}"`, { stdio: 'pipe' })
        log('INFO', '✓ cluster-info reachable')
      } catch (_) {
        log('WARN', 'cluster-info unreachable, may be expected from CI runner')
      }
    } catch (e) {
      if (required) { failed = true; log('ERROR', `kubectl validation failed: ${e.message}`) } else { log('WARN', `kubectl validation failed: ${e.message}`) }
    }
  } else {
    if (required) { failed = true; log('ERROR', 'kubectl not installed for required validation') } else { log('SKIP', 'kubectl not installed') }
  }
}

function main() {
  log('INFO', `Log file: ${logFile}`)
  checkNodeEnv()
  checkDependencies()
  validateConfigs()
  checkSourceSyntax()
  checkFileAccess()
  checkKubeconfig()
  if (failed) {
    log('ERROR', '✗ Pre-build validation failed')
    process.exit(1)
  } else {
    log('INFO', '✓ Pre-build validation passed')
  }
}

main()