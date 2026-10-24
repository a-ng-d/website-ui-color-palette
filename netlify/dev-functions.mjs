/**
 * Serves the Netlify functions (netlify/functions/*) from the Astro dev
 * server, so `/api/prices` and `/api/checkout` work with `npm run dev` without
 * the Netlify CLI. Dev only: in production Netlify serves them. (`astro
 * preview` is a static server and does not run them: use `netlify dev`.)
 *
 * The routes come from each function's `config.path`. Environment variables
 * (POLAR_*) are read from .env / .env.local, like Netlify does.
 */
import { readdirSync, statSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const functionsDir = fileURLToPath(new URL('./functions/', import.meta.url))

/** Load the module again when the file changed (no restart while editing). */
const load = (file) =>
  import(`${pathToFileURL(file).href}?v=${statSync(file).mtimeMs}`)

const routes = async () => {
  const entries = []
  for (const name of readdirSync(functionsDir)) {
    if (!name.endsWith('.mjs')) continue
    const file = `${functionsDir}${name}`
    const { config } = await load(file)
    if (config?.path) entries.push([config.path, file])
  }
  return new Map(entries)
}

const toRequest = (req) =>
  new Request(new URL(req.url, `http://${req.headers.host}`), {
    method: req.method,
    headers: req.headers,
  })

const middleware = () => async (req, res, next) => {
  const path = new URL(req.url, 'http://localhost').pathname
  if (!path.startsWith('/api/')) return next()

  const file = (await routes()).get(path)
  if (!file) return next()

  try {
    const { default: handler } = await load(file)
    const response = await handler(toRequest(req), {})
    res.statusCode = response.status
    response.headers.forEach((value, key) => res.setHeader(key, value))
    res.end(Buffer.from(await response.arrayBuffer()))
  } catch (error) {
    console.error(`[dev-functions] ${path}`, error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Function failed' }))
  }
}

export default function devFunctions() {
  return {
    name: 'netlify-dev-functions',
    hooks: {
      'astro:config:setup': ({ config, command }) => {
        if (command !== 'dev') return
        // Expose .env.local to process.env (what the functions read).
        const env = loadEnv('development', fileURLToPath(config.root), '')
        for (const [key, value] of Object.entries(env))
          process.env[key] ??= value
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(middleware())
      },
    },
  }
}
