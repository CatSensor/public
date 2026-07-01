import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = path.join(projectRoot, 'dist')

const pages = [
  { file: 'index.html', lang: 'fr', canonical: 'https://catsensor.ca/' },
  { file: 'about/index.html', lang: 'fr', canonical: 'https://catsensor.ca/about/' },
  { file: 'privacy/index.html', lang: 'fr', canonical: 'https://catsensor.ca/privacy/' },
  { file: 'en/index.html', lang: 'en', canonical: 'https://catsensor.ca/en/' },
  { file: 'en/about/index.html', lang: 'en', canonical: 'https://catsensor.ca/en/about/' },
  { file: 'en/privacy/index.html', lang: 'en', canonical: 'https://catsensor.ca/en/privacy/' },
]

const errors = []

for (const page of pages) {
  const absolutePath = path.join(distRoot, page.file)

  if (!existsSync(absolutePath)) {
    errors.push(`${page.file}: file is missing`)
    continue
  }

  const html = readFileSync(absolutePath, 'utf8')

  if (statSync(absolutePath).size < 5_000) {
    errors.push(`${page.file}: output is suspiciously small and is probably an empty SSG shell`)
  }

  if (!html.includes(`<html lang="${page.lang}"`)) {
    errors.push(`${page.file}: expected html lang="${page.lang}"`)
  }

  if (!html.includes(`<link rel="canonical" href="${page.canonical}"`)) {
    errors.push(`${page.file}: expected canonical ${page.canonical}`)
  }

  if (!html.includes('<meta name="description"')) {
    errors.push(`${page.file}: meta description is missing`)
  }

  if (!html.includes('<h1')) {
    errors.push(`${page.file}: H1 is missing`)
  }

  if (!html.includes('data-server-rendered="true"')) {
    errors.push(`${page.file}: server-rendered application markup is missing`)
  }

  for (const match of html.matchAll(/(?:src|href)="\/(assets\/[^"?#]+)/g)) {
    const assetPath = path.join(distRoot, match[1])

    if (!existsSync(assetPath)) {
      errors.push(`${page.file}: referenced asset /${match[1]} is missing`)
    }
  }
}

const sitemapPath = path.join(distRoot, 'sitemap.xml')

if (!existsSync(sitemapPath)) {
  errors.push('sitemap.xml: file is missing')
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8')

  for (const page of pages) {
    if (!sitemap.includes(`<loc>${page.canonical}</loc>`)) {
      errors.push(`sitemap.xml: ${page.canonical} is missing`)
    }
  }
}

if (errors.length > 0) {
  console.error(`Invalid production build:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`Validated ${pages.length} prerendered pages and their production assets.`)
