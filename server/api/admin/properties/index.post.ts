import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  
  // Verify user is logged in
  const { data: { session } } = await client.auth.getSession()
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Verify user is admin
  const { data: roleData } = await client
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single() as any

  if (!roleData || roleData.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' })
  }

  // Read payload
  const body = await readBody(event)
  
  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request: Missing body' })
  }

  // Remove non-column fields: immutable, relation joins
  const { id, created_at, agent, property_types, ...insertData } = body

  // Sanitize NOT NULL numeric fields — convert null/empty to 0
  if (insertData.area === null || insertData.area === '' || insertData.area === undefined) {
    insertData.area = 0
  }
  if (insertData.price === null || insertData.price === '' || insertData.price === undefined) {
    insertData.price = 0
  }
  // year_built and parking are nullable — just clear empty strings
  if (insertData.year_built === '') insertData.year_built = null
  if (insertData.parking === '') insertData.parking = null
  if (insertData.beds === '') insertData.beds = 0
  if (insertData.baths === '') insertData.baths = 0
  // Sanitize lat/lng — keep null if empty
  if (insertData.latitude === '' || insertData.latitude === undefined) insertData.latitude = null
  if (insertData.longitude === '' || insertData.longitude === undefined) insertData.longitude = null

  const { data, error } = await client
    .from('properties')
    // @ts-ignore
    .insert([insertData as any])
    .select()
    .single()

  if (error) {
    console.error("Supabase insert error:", error)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
