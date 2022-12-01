import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: process.env.APP_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
  token: process.env.APP_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)

export const projectId = import.meta.env.APP_PROJECT_ID
export const token = import.meta.env.APP_TOKEN
