<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Users & Roles</h1>
        <p class="mt-2 text-sm text-gray-700">Manage user access and assign administrative privileges.</p>
      </div>
    </div>

    <div class="mt-4 sm:mt-8 flex items-center justify-between">
      <!-- Notifications -->
      <div v-if="notification.show" :class="[
        'rounded-md p-4 text-sm font-medium w-full mt-4 transition-all',
        notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      ]">
        {{ notification.message }}
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-8">

            <div v-if="pending" class="p-8 text-center text-gray-500">
              Loading users...
            </div>

            <table v-else-if="users && users.length > 0" class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Email
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Joined Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Current Role</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in users" :key="user.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ user.email
                    }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(user.created_at) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span :class="[
                      user.role === 'admin' ? 'bg-purple-50 text-purple-700 ring-purple-600/20' : 'bg-gray-50 text-gray-600 ring-gray-500/10',
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize'
                    ]">
                      {{ user.role || 'user' }}
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button v-if="user.id !== currentUser.id" @click="toggleRole(user)"
                      class="text-primary-600 hover:text-primary-900 disabled:opacity-50"
                      :disabled="updating === user.id">
                      <span v-if="updating === user.id">Saving...</span>
                      <span v-else>Make {{ user.role === 'admin' ? 'User' : 'Admin' }}</span>
                    </button>
                    <span v-else class="text-gray-400 italic">You</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-else class="p-8 text-center text-gray-500">
              No users found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const supabase = useSupabaseClient()
const currentUser = useSupabaseUser()

const users = ref([])
const pending = ref(true)
const updating = ref(null)
const notification = ref({ show: false, message: '', type: 'success' })

const fetchUsers = async () => {
  pending.value = true
  // Call the postgres function we created in the migration
  const { data, error } = await supabase.rpc('get_admin_users')

  if (error) {
    console.error('Error fetching users:', error)
    showNotification('Failed to fetch users. Ensure you are an admin.', 'error')
  } else {
    users.value = data
  }
  pending.value = false
}

// Initial fetch
onMounted(fetchUsers)

const toggleRole = async (user) => {
  updating.value = user.id
  const newRole = user.role === 'admin' ? 'user' : 'admin'

  const { error } = await supabase
    .from('user_roles')
    .upsert({ user_id: user.id, role: newRole })

  if (error) {
    console.error('Error updating role:', error)
    showNotification('Failed to update user role.', 'error')
  } else {
    showNotification(`User role updated to ${newRole}.`, 'success')
    // Update local state
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index].role = newRole
    }
  }
  updating.value = null
}

const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
}
</script>
