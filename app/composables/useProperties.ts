export interface Property {
  id: string
  title: string
  location: string
  price: number
  price_suffix?: string | null
  beds: number
  baths: number | string
  area: number
  image: string
  tags: string[]
  type: 'sale' | 'rent'
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
