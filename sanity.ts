import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient ({
  projectId: '6cqvfhdc',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-03',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: string) => builder.image(source)

export default client
