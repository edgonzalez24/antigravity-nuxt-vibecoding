<template>
  <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12 space-y-4 pt-8">
    <!-- Header -->
    <header class="w-full pb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-nordic dark:text-white">User Directory</h1>
          <p class="text-nordic/60 dark:text-gray-400 mt-1 text-sm">Manage user access and roles for your properties.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div class="relative group w-full md:w-80">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-icons text-nordic/40 group-focus-within:text-primary text-xl">search</span>
            </div>
            <input
              class="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white dark:bg-gray-800 text-nordic dark:text-white shadow-soft placeholder-nordic/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
              placeholder="Search by name, email..." type="text" />
          </div>
          <button
            class="inline-flex items-center justify-center px-4 py-2.5 border border-primary text-sm font-medium rounded-lg text-primary bg-transparent hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors whitespace-nowrap">
            <span class="material-icons text-lg mr-2">add</span>
            Add User
          </button>
        </div>
      </div>
      <div v-if="notification.show" :class="[
        'mt-4 rounded-md p-4 text-sm font-medium w-full transition-all',
        notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      ]">
        {{ notification.message }}
      </div>
      <div class="mt-8 flex gap-6 border-b border-nordic/10 overflow-x-auto">
        <button class="pb-3 text-sm font-semibold text-primary border-b-2 border-primary">All Users</button>
      </div>
    </header>

    <main>
      <div v-if="pending" class="p-8 text-center text-gray-500">
        Loading users...
      </div>

      <div v-else-if="users && users.length > 0" class="space-y-4">
        <div
          class="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic/50 mb-2">
          <div class="col-span-4">User Details</div>
          <div class="col-span-3">Role & Status</div>
          <div class="col-span-3">Joined</div>
          <div class="col-span-2 text-right">Actions</div>
        </div>

        <div v-for="user in users" :key="user.id" :class="[
          'user-card group relative rounded-xl p-5 shadow-sm border border-transparent hover:shadow-soft flex flex-col md:grid md:grid-cols-12 gap-4 items-center',
          user.role === 'admin' ? 'bg-active-green dark:bg-primary/20' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-active-green/50 dark:hover:bg-primary/10'
        ]">

          <div class="col-span-12 md:col-span-4 flex items-center w-full">
            <div class="relative flex-shrink-0">
              <div v-if="user.raw_user_meta_data?.avatar_url"
                class="h-12 w-12 rounded-full overflow-hidden border-2 border-white dark:border-primary">
                <img :src="user.raw_user_meta_data.avatar_url" alt="User avatar" class="h-full w-full object-cover"
                  referrerpolicy="no-referrer" />
              </div>
              <div v-else
                class="h-12 w-12 rounded-full flex items-center justify-center font-bold text-white text-lg border-2 border-white dark:border-primary"
                :class="user.role === 'admin' ? 'bg-primary' : 'bg-gray-400'">
                {{ getInitials(user.email) }}
              </div>
              <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
            </div>
            <div class="ml-4 overflow-hidden">
              <div class="text-sm font-bold text-nordic dark:text-white truncate">{{ user.raw_user_meta_data?.full_name
                || user.email.split('@')[0] }}</div>
              <div class="text-xs text-nordic/70 dark:text-gray-300 truncate">{{ user.email }}</div>
              <div class="mt-1 text-[10px] px-2 py-0.5 inline-block bg-black/5 dark:bg-white/10 rounded text-nordic/60">
                ID: #{{ user.id.substring(0, 8) }}</div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
            <span :class="[
              'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize',
              user.role === 'admin' ? 'bg-primary/10 text-primary dark:text-primary dark:bg-primary/20' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            ]">
              {{ user.role || 'User' }}
            </span>
            <div class="flex items-center text-xs text-nordic/60 dark:text-gray-400">
              <span class="material-icons text-[14px] mr-1 text-primary">check_circle</span>
              Active
            </div>
          </div>

          <div
            class="col-span-12 md:col-span-3 w-full flex items-center text-sm font-semibold text-nordic dark:text-white">
            {{ formatDate(user.created_at) }}
          </div>

          <div class="col-span-12 md:col-span-2 w-full flex justify-end relative">
            <button v-if="user.id !== currentUser.id" @click="toggleRole(user)" :disabled="updating === user.id" :class="[
              'inline-flex items-center px-4 py-2 border shadow-sm text-xs font-medium rounded-lg focus:outline-none transition-colors w-full md:w-auto justify-center',
              user.role === 'admin' ? 'border-nordic/10 bg-white dark:bg-gray-800 text-nordic hover:bg-nordic hover:text-white' : 'border-gray-200 dark:border-gray-600 bg-transparent text-nordic/70 dark:text-gray-300 hover:border-nordic hover:text-nordic dark:hover:text-white dark:hover:border-gray-400 group-hover:bg-white group-hover:shadow-sm'
            ]">
              <span v-if="updating === user.id">Saving...</span>
              <template v-else>
                Make {{ user.role === 'admin' ? 'User' : 'Admin' }}
                <span class="material-icons text-[16px] ml-2">swap_horiz</span>
              </template>
            </button>
            <span v-else class="text-gray-400 text-sm italic inline-flex items-center justify-center px-4 py-2">Current
              User
              (You)</span>
          </div>
        </div>
      </div>

      <div v-else class="p-8 text-center text-gray-500">
        No users found.
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'User Directory | LuxeEstate'
})

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
  const { data, error } = await supabase.rpc('get_admin_users')

  if (error) {
    console.error('Error fetching users:', error)
    showNotification('Failed to fetch users. Ensure you are an admin.', 'error')
  } else {
    users.value = data
  }
  pending.value = false
}

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

const getInitials = (email) => {
  if (!email) return '?'
  return email.charAt(0).toUpperCase()
}
</script>
