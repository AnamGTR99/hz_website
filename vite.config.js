import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const normalizeClientSlug = (name) => {
  if (!name) return ''
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  const overrides = {
    omneeworld: 'omnee_world',
  }
  return overrides[base] || base
}

const formatDate = (dateValue) => {
  if (!dateValue) return ''
  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase()
    .replace(/ /g, ' ')
}

const formatIdDate = (dateValue) => {
  if (!dateValue) return ''
  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toISOString().slice(0, 10)
}

const cleanString = (value) => (typeof value === 'string' ? value.trim() : '')

const slugify = (value) => cleanString(value)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const adminApiPlugin = () => ({
  name: 'admin-api-plugin',
  configureServer(server) {
    server.middlewares.use('/api/admin', (request, response) => {
      if (request.method !== 'POST') {
        response.statusCode = 405
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify({ error: 'Method not allowed.' }))
        return
      }

      let body = ''
      request.on('data', (chunk) => {
        body += chunk.toString()
      })

      request.on('end', () => {
        try {
          const {
            mediaType,
            title,
            date,
            client,
            description,
            shareLink,
            embedLink,
            tags,
          } = JSON.parse(body || '{}')

          const cleanedTags = Array.isArray(tags)
            ? [...new Set(tags.map((tag) => cleanString(tag)).filter(Boolean))]
            : []

          const cleanedMediaType = cleanString(mediaType)
          const cleanedTitle = cleanString(title)
          const cleanedDate = formatDate(date)
          const idDate = formatIdDate(date)
          const entry = {
            id: [cleanedMediaType, slugify(cleanedTitle), idDate].filter(Boolean).join('-'),
            mediaType: cleanedMediaType,
            title: cleanedTitle,
            date: cleanedDate,
            clientName: cleanString(client),
            client: normalizeClientSlug(cleanString(client)),
            description: cleanString(description),
            shareLink: cleanString(shareLink),
            embedLink: cleanString(embedLink),
            tags: cleanedTags,
            createdAt: new Date().toISOString(),
          }

          Object.keys(entry).forEach((key) => {
            if (entry[key] === '' || entry[key] == null) {
              delete entry[key]
            }
          })

          const outputPath = path.join(process.cwd(), 'src', 'data', 'admin-submissions.json')
          const existing = fs.existsSync(outputPath)
            ? JSON.parse(fs.readFileSync(outputPath, 'utf-8') || '[]')
            : []
          const updated = Array.isArray(existing) ? [...existing, entry] : [entry]
          fs.writeFileSync(outputPath, JSON.stringify(updated, null, 2))

          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ ok: true }))
        } catch (error) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: error.message || 'Failed to save entry.' }))
        }
      })
    })
  },
})

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
})
