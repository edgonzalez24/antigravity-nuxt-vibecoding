export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  // Get the session directly. This is more robust on initial loads than just checking user.value
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user) {
    return navigateTo('/login')
  }

  const userId = session.user.id


  // 3. We have a guaranteed ID, now check the role securely
  const { data: roleData, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()

  // 4. Validate admin status
  const role = (roleData as { role: string } | null)?.role
  if (error || role !== 'admin') {
    console.warn('Access Denied: User is not an admin', error || 'No admin role found')
    return navigateTo('/')
  }
})
