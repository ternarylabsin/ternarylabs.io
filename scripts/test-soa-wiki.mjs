import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Load the real data helpers without requiring a browser or another test dependency.
const source = readFileSync(new URL('../src/wiki/data.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText.replace("import { CATEGORY_ORDER, WIKI_DATA_BASE } from './constants';",
  "const CATEGORY_ORDER = []; const WIKI_DATA_BASE = '/wiki/soa';")
const data = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

assert.equal(data.formatStatValue({ value: 1.5, unit: 'C' }, 'Insulation_Cold'), '1.5°C')
assert.equal(data.formatStatValue(2, 'Insulation_Heat'), '2°C')
assert.equal(data.formatStatValue(0.1, 'MoveSpeedOffset'), '0.1')
assert.equal(data.formatStatValue({ value: 0.7, unit: 'percent' }, 'ShootingAccuracyPawn'), '70%')
assert.equal(data.formatStatValue(2.5, 'ArmorRating_Sharp'), '250%')
assert.equal(data.formatStatValue({ value: 1.25, unit: 'multiplier' }, 'CaravanRidingSpeedFactor'), '1.25×')
assert.equal(data.formatStatValue({ value: 250, unit: 'W' }, 'PowerConsumption'), '250 W')
assert.equal(data.formatStatValue({ value: 0.00002, unit: 'percent' }), '0.002%')

const index = {
  entities: {
    technical: { slug: 'sample', visibility: 'technical', path: 'entities/technical.json' },
    sample: { slug: 'sample', visibility: 'public', path: 'entities/sample.json' },
  },
  mechanics: { water: { slug: 'water', path: 'mechanics/water.json' } },
}
const calls = new Map()
globalThis.fetch = async (url, options) => {
  assert.equal(options.cache, 'no-cache')
  const count = (calls.get(url) ?? 0) + 1
  calls.set(url, count)
  return { ok: count > 1, status: count > 1 ? 200 : 503,
    json: async () => url.endsWith('index.json') ? index : { id: url } }
}
// Concurrent failures must share a request, then navigation must be able to retry.
const first = await Promise.allSettled([data.loadIndex(), data.loadIndex()])
assert(first.every((result) => result.status === 'rejected'))
assert.equal(calls.get('/wiki/soa/generated/index.json'), 1)
assert.equal(await data.loadIndex(), index)
await data.loadIndex()
assert.equal(calls.get('/wiki/soa/generated/index.json'), 2)
for (const load of [data.loadManifest, () => data.loadEntityBySlug('sample'), () => data.loadMechanicBySlug('water')]) {
  await assert.rejects(load(), /503/)
  const value = await load()
  assert.equal(await load(), value)
}
assert.equal(await data.loadEntityBySlug('absent'), null)
assert.equal(await data.loadMechanicBySlug('absent'), null)
assert.equal(calls.has('/wiki/soa/generated/entities/technical.json'), false)
console.log('Wiki regression checks passed: units, percent scale, shared requests, failed-request recovery, and missing pages.')
