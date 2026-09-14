#!/usr/bin/env node
/**
 * Sync Sands of Arrakis WikiData + textures into this site's public wiki bundle.
 *
 * Usage:
 *   node scripts/sync-soa-wiki.mjs
 *   node scripts/sync-soa-wiki.mjs --soa "D:/Ternary Labs/SandsOfArrakis"
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteRoot = resolve(__dirname, '..')

function argValue(flag) {
  const idx = process.argv.indexOf(flag)
  return idx >= 0 ? process.argv[idx + 1] : undefined
}

const soaRoot = resolve(
  argValue('--soa') ??
    process.env.SOA_REPO ??
    join(siteRoot, '..', 'SandsOfArrakis'),
)

const generatedSrc = join(soaRoot, 'WikiData', 'generated')
const texturesSrc = join(soaRoot, 'Textures')
const destRoot = join(siteRoot, 'public', 'wiki', 'soa')
const generatedDest = join(destRoot, 'generated')
const texturesDest = join(destRoot, 'textures')

function assertDir(path, label) {
  if (!existsSync(path)) {
    console.error(`Missing ${label}: ${path}`)
    process.exit(1)
  }
}

function sizeMb(path) {
  let total = 0
  const walk = (p) => {
    const st = statSync(p)
    if (st.isDirectory()) {
      for (const name of readdirSync(p)) walk(join(p, name))
    } else {
      total += st.size
    }
  }
  walk(path)
  return (total / (1024 * 1024)).toFixed(1)
}

assertDir(generatedSrc, 'WikiData/generated')
assertDir(texturesSrc, 'Textures')

mkdirSync(destRoot, { recursive: true })
rmSync(generatedDest, { recursive: true, force: true })
rmSync(texturesDest, { recursive: true, force: true })
cpSync(generatedSrc, generatedDest, { recursive: true })
cpSync(texturesSrc, texturesDest, { recursive: true })

console.log(`Synced SoA wiki data from:\n  ${soaRoot}`)
console.log(`  → ${generatedDest}`)
console.log(`  → ${texturesDest}`)
console.log(`Bundle size: ${sizeMb(destRoot)} MB`)
