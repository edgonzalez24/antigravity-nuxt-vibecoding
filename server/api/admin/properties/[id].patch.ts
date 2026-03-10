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
  if (typeof body?.is_active !== 'boolean') {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request: is_active (boolean) is required' })
  }

  const { data, error } = await client
    .from('properties')
    // @ts-ignore
    .update({ is_active: body.is_active } as any)
    .eq('id', idStr)
    .select('id, is_active')
    .single()

  if (error) {
    console.error('[PATCH] Supabase update error:', error.code, error.message)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
