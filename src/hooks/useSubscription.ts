// hooks/useSubscription.ts
import useSWR from 'swr'

const SUBSCRIPTION_KEY = '/api/getsubscription'

const fetcher = async () => {
  const res = await fetch(SUBSCRIPTION_KEY)
  if (!res.ok) {
    throw new Error('Failed to fetch subscription data')
  }
  return res.json()
}

export function useSubscription() {
  const { data, error, isLoading, mutate } = useSWR(SUBSCRIPTION_KEY, fetcher)
  
  return {
    data,
    error,
    isLoading,
    refreshSubscription: () => mutate()
  }
}
