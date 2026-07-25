import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const serverDirectory = resolve('dist/server')
const workerPath = resolve(serverDirectory, 'index.js')

const workerSource = `export default {
  async fetch(request, env) {
    if (!env.ASSETS) {
      return new Response('Static asset binding is unavailable.', { status: 503 })
    }

    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404 || request.method !== 'GET') {
      return response
    }

    const requestUrl = new URL(request.url)
    const acceptsHtml = request.headers.get('accept')?.includes('text/html')
    if (!acceptsHtml) {
      return response
    }

    const pathname = requestUrl.pathname.replace(/\\/$/, '')
    requestUrl.pathname = pathname + '/index.html'
    return env.ASSETS.fetch(new Request(requestUrl, request))
  },
}
`

await mkdir(serverDirectory, { recursive: true })
await writeFile(workerPath, workerSource, 'utf8')
