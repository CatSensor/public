import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = path.join(projectRoot, 'dist')
const host = process.env.HOST || '127.0.0.1'
const port = Number(process.env.PORT || 4173)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
}

export function resolveDistRequest(pathname) {
  const decodedPath = decodeURIComponent(pathname)
  const relativePath = decodedPath.replace(/^\/+/, '')
  const requestedPath = path.resolve(distRoot, relativePath)

  if (requestedPath !== distRoot && !requestedPath.startsWith(`${distRoot}${path.sep}`)) {
    return null
  }

  if (existsSync(requestedPath) && statSync(requestedPath).isDirectory()) {
    return {
      filePath: path.join(requestedPath, 'index.html'),
      redirect: decodedPath.endsWith('/') ? null : `${decodedPath}/`,
    }
  }

  if (existsSync(requestedPath) && statSync(requestedPath).isFile()) {
    return { filePath: requestedPath, redirect: null }
  }

  return null
}

export function createDistServer() {
  return createServer((request, response) => {
    const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)
    const result = resolveDistRequest(requestUrl.pathname)

    if (!result || !existsSync(result.filePath)) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Not found')
      return
    }

    if (result.redirect) {
      response.writeHead(301, { Location: `${result.redirect}${requestUrl.search}` })
      response.end()
      return
    }

    const extension = path.extname(result.filePath).toLowerCase()
    const cacheControl = result.filePath.includes(`${path.sep}assets${path.sep}`)
      ? 'public, max-age=31536000, immutable'
      : 'no-cache'

    response.writeHead(200, {
      'Cache-Control': cacheControl,
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
    })
    createReadStream(result.filePath).pipe(response)
  })
}

const isDirectRun = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url

if (isDirectRun) {
  if (!existsSync(path.join(distRoot, 'index.html'))) {
    console.error('dist/index.html is missing. Run `npm run build` first.')
    process.exit(1)
  }

  const server = createDistServer()

  server.listen(port, host, () => {
    console.log(`Serving dist at http://${host}:${port}`)
  })
}
