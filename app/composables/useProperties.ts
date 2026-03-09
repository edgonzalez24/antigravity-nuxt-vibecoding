export interface Property {
  id: string
  title: string
  slug: string
  location: string
  price: number
  price_suffix?: string | null
  beds: number
  baths: number | string
  area: number
  images?: string[]
  description?: string
  amenities?: string[]
  latitude?: number | null
  longitude?: number | null
  agent?: {
    name: string
    avatar: string
    title: string
    phone: string
    email: string
  }
  tags: string[]
  property_types?: { name: string }
  status: 'sale' | 'rent'
  featured?: boolean
  created_at?: string
}

export const useProperties = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  return {
    formatPrice
  }
}
