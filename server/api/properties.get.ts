import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = Math.max(1, parseInt(String(query.page ?? '1')))
  const limit = Math.min(50, Math.max(1, parseInt(String(query.limit ?? '8'))))
  const featuredParam = query.featured
  const searchParam = query.search
  const typeParam = query.type
  const bedsParam = query.beds
  const bathsParam = query.baths
  const amenitiesParam = query.amenities

  const offset = (page - 1) * limit

  const client = await serverSupabaseClient(event)

  // Build the base query
  let dbQuery = client
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false }) // Sort by newest usually

  // Filter by featured flag if provided
  if (featuredParam === 'true') {
    dbQuery = dbQuery.eq('featured', true)
  } else if (featuredParam === 'false') {
    dbQuery = dbQuery.eq('featured', false)
  }

  if (searchParam) {
    dbQuery = dbQuery.or(`location.ilike.%${searchParam}%,title.ilike.%${searchParam}%`)
  }

  if (typeParam) {
    dbQuery = dbQuery.eq('type', typeParam)
  }

  if (bedsParam && Number(bedsParam) > 0) {
    dbQuery = dbQuery.gte('beds', Number(bedsParam))
  }

  if (bathsParam && Number(bathsParam) > 0) {
    dbQuery = dbQuery.gte('baths', Number(bathsParam))
  }

  if (amenitiesParam) {
    const amenities = String(amenitiesParam).split(',')
    // Since we don't have amenities array exactly, we simulate it via tags
    dbQuery = dbQuery.contains('tags', amenities)
  }

  // Apply pagination range
  dbQuery = dbQuery.range(offset, offset + limit - 1)

  const { data, error, count } = await dbQuery

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  const total = count ?? 0
  const totalPages = Math.ceil(total / limit)

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  }
})
