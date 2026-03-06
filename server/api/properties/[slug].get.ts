import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Property slug is required',
    })
  }

  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('properties')
    .select('*, property_types(name)')
    .eq('slug', slug)
    .single()

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Property not found',
    })
  }

  return data
})
