export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  type: ToastType
  message: string
  duration?: number
}

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const add = (message: string, type: ToastType = 'info', duration = 4000) => {
    const id = Date.now()
    toasts.value.push({ id, type, message, duration })
    setTimeout(() => remove(id), duration)
  }

  const remove = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (message: string) => add(message, 'success')
  const error = (message: string) => add(message, 'error')
  const info = (message: string) => add(message, 'info')
  const warning = (message: string) => add(message, 'warning')

  return { toasts, add, remove, success, error, info, warning }
}
