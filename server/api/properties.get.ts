import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = Math.max(1, parseInt(String(query.page ?? '1')))
  const limit = Math.min(50, Math.max(1, parseInt(String(query.limit ?? '8'))))
  const featuredParam = query.featured

  const offset = (page - 1) * limit

  const client = await serverSupabaseClient(event)

  // Build the base query
  let dbQuery = client
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: true })

  // Filter by featured flag if provided
  if (featuredParam === 'true') {
    dbQuery = dbQuery.eq('featured', true)
  } else if (featuredParam === 'false') {
    dbQuery = dbQuery.eq('featured', false)
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
