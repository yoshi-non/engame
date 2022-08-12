import { createClient } from 'microcms-js-sdk'
export const client = createClient({
    serviceDomain: 'engame',
    apiKey: process.env.API_KEY || '',
})