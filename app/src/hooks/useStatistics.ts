import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import { GetStatisticsProps } from "./interfaces"

export function getUserStats() {
  const { data: userStats, isLoading: userStatsLoading, isFetching: userStatsFetching } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const response = await api.get<GetStatisticsProps>('/api/stats')

      const percentage =
      response.data.total === 0
        ? 0
        : (response.data.inDiet / response.data.total) * 100;

        const insideOfDiet = percentage >= 80

         return { ...response.data, 
            percentage: Number.isInteger(percentage)
              ? String(percentage)
              : percentage.toFixed(2).replace('.', ','),
              insideOfDiet
            }
    }
  })

  return { userStats, userStatsLoading, userStatsFetching }
}