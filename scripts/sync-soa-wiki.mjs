#!/usr/bin/env node
/**
 * Sync Sands of Arrakis WikiData + textures + About art into this site's public wiki bundle.
 *
 * Usage:
 *   node scripts/sync-soa-wiki.mjs
 *   node scripts/sync-soa-wiki.mjs --bundle "D:/Ternary Labs/SandsOfArrakis/WikiData/site-export"
 *   node scripts/sync-soa-wiki.mjs --soa "D:/Ternary Labs/SandsOfArrakis"
 *   node scripts/sync-soa-wiki.mjs --textures-from "D:/Ternary Labs/SoA_73_agri/Textures"
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
const bundleRoot = resolve(
  argValue('--bundle') ??
    process.env.SOA_WIKI_BUNDLE ??
    join(siteRoot, '..', 'SandsOfArrakis', 'WikiData', 'site-export'),
)
const destRoot = join(siteRoot, 'public', 'wiki', 'soa')
const generatedDest = join(destRoot, 'generated')
const texturesDest = join(destRoot, 'textures')
const brandingDest = join(destRoot, 'branding')
const projectMediaDest = join(siteRoot, 'public', 'project-media')

function assertDir(path, label) {
  if (!existsSync(path)) {
    console.error(`Missing ${label}: ${path}`)
    process.exit(1)
  }
}

function isDir(path) {
  return existsSync(path) && statSync(path).isDirectory()
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

const bundleGeneratedSrc = join(bundleRoot, 'generated')
const bundleTexturesSrc = join(bundleRoot, 'textures')
const bundleBrandingSrc = join(bundleRoot, 'branding')
const useBundle = isDir(bundleGeneratedSrc) && isDir(bundleTexturesSrc)

const generatedSrc = useBundle ? bundleGeneratedSrc : join(soaRoot, 'WikiData', 'generated')
const texturesSrc = useBundle
  ? bundleTexturesSrc
  : resolve(argValue('--textures-from') ?? join(soaRoot, 'Textures'))
const aboutSrc = join(soaRoot, 'About')

assertDir(generatedSrc, useBundle ? 'bundle/generated' : 'WikiData/generated')
assertDir(texturesSrc, useBundle ? 'bundle/textures' : 'Textures')

mkdirSync(destRoot, { recursive: true })
rmSync(generatedDest, { recursive: true, force: true })
rmSync(texturesDest, { recursive: true, force: true })
rmSync(brandingDest, { recursive: true, force: true })
cpSync(generatedSrc, generatedDest, { recursive: true })
cpSync(texturesSrc, texturesDest, { recursive: true })

function firstExisting(...paths) {
  return paths.find((p) => existsSync(p))
}

mkdirSync(brandingDest, { recursive: true })
const previewSrc = useBundle
  ? firstExisting(join(bundleBrandingSrc, 'Preview.png'))
  : firstExisting(
      join(aboutSrc, 'Preview Revised.png'),
      join(aboutSrc, 'Preview.png'),
    )
const iconSrc = useBundle ? join(bundleBrandingSrc, 'ModIcon.png') : join(aboutSrc, 'ModIcon.png')
if (previewSrc) {
  cpSync(previewSrc, join(brandingDest, 'Preview.png'))
}
if (existsSync(iconSrc)) {
  cpSync(iconSrc, join(brandingDest, 'ModIcon.png'))
}

// Keep portfolio project media in sync with mod About art when placeholders are empty/missing.
mkdirSync(projectMediaDest, { recursive: true })
if (previewSrc) {
  cpSync(previewSrc, join(projectMediaDest, 'sands-of-arrakis-preview.png'))
}
if (existsSync(iconSrc)) {
  cpSync(iconSrc, join(projectMediaDest, 'sands-of-arrakis-mod-icon.png'))
}

console.log(`Synced SoA wiki data from:\n  ${useBundle ? bundleRoot : soaRoot}`)
console.log(`  → ${generatedDest}`)
console.log(`  → ${texturesDest}`)
console.log(`  → ${brandingDest}`)
console.log(`Bundle size: ${sizeMb(destRoot)} MB`)
