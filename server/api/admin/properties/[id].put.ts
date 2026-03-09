import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const idStr = getRouterParam(event, 'id')
  if (!idStr) {
    throw createError({ statusCode: 400, statusMessage: 'Property ID is required' })
  }

  const client = await serverSupabaseClient(event)
  
  const { data: { session } } = await client.auth.getSession()
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { data: roleData } = await client
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single() as any

  if (!roleData || roleData.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' })
  }

  const body = await readBody(event)
  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request: Missing body' })
  }

  // Remove immutable / relation fields that are NOT direct columns in `properties`
  const { id, created_at, agent, property_types, latitude, longitude, ...updateData } = body

  // Sanitize NOT NULL numeric fields
  if (updateData.area === null || updateData.area === '' || updateData.area === undefined) updateData.area = 0
  if (updateData.price === null || updateData.price === '' || updateData.price === undefined) updateData.price = 0
  if (updateData.year_built === '') updateData.year_built = null
  if (updateData.parking === '') updateData.parking = null
  if (updateData.beds === '') updateData.beds = 0
  if (updateData.baths === '') updateData.baths = 0

  // Strip lat/lng — only include when they have actual numeric values
  // (type="number" v-model sends "" when empty, which != null but still invalid)
  if (updateData.latitude == null || updateData.latitude === '') delete updateData.latitude
  if (updateData.longitude == null || updateData.longitude === '') delete updateData.longitude

  console.log('[PUT /api/admin/properties] body keys:', Object.keys(body))
  console.log('[PUT /api/admin/properties] updateData keys:', Object.keys(updateData))

  const { data, error } = await client
    .from('properties')
    // @ts-ignore
    .update(updateData as any)
    .eq('id', idStr)
    .select()
    .single()

  if (error) {
    console.error('[PUT] Supabase update error:', error.code, error.message, error.details)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
