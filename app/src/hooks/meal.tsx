import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useAuth } from './auth'

interface MealProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  isDiet: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface GetStatisticsProps {
  total: number 
  inDiet: number
  outDiet: number
  bestSequence: number
}

interface GetMealIDProps {
  mealId: string
}

export function getMeals () {
  const { user } = useAuth()

  const { data: meals, isLoading, isFetching } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const response = await  api.get<MealProps[]>('/api/meal', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }  
      })

      // console.log('response meal', response.data)

      return response.data
    }
  })

  // console.log('meals',meals)
  return { meals, isLoading, isFetching }
}

export function getMetrics() {
  const { user } = useAuth()

  const { data: metrics, isLoading, isFetching } = useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const response = await api.get<GetStatisticsProps>('/api/metrics', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }  
      })

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

  return { metrics, isLoading }
}

export function getMealById({ mealId }: GetMealIDProps) {
  const { user } = useAuth()
  console.log('id fora da funcaoooooo', mealId)

  const { data: info, isLoading, isError  } = useQuery({
    queryKey: ['info', mealId ],
    queryFn: async () => {
      const response = await api.get<MealProps>(`/api/meal/${mealId}`)
      return response.data
    }
  })
  return { info, isLoading, isError }
}


type CreateMeal = {
  title: string;
  description: string;
  date: Date;
  isDiet: boolean;
}

export function createMeals() {
  const queryClient = useQueryClient();
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({ title, description, date, isDiet }: CreateMeal) => {
      const response  = await api.post(`/api/meal`, {
        title, description, date, isDiet
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }  
      }) 

      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          'meals', 
          'metrics'
        ],
        // refetchType: 'inactive'
      })



      console.log(data)
      // queryClient.setQueryData(['meals'], data)
      // queryClient.getQueryCache()
    },
    onError: (error) => {
      console.log(error)
    }
  })
}

type EditMeal = {
  mealId: string
  title: string;
  description: string;
  date: Date;
  isDiet: boolean;
}

export function editMeal() {
  const queryClient = useQueryClient();
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({ mealId, title, description, date, isDiet }: EditMeal) => {
      const response = await api.put(`/api/meal/${mealId}`, {
        title, description, date, isDiet
      }, {
        headers: { Authorization:  `Bearer ${user.token}`}
      })

      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['meals', 'metrics']
      })
      queryClient.setQueryData(['meals'], data)
    },
  })
}

export function deleteMeal() {
  const queryClient = useQueryClient();
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (mealId: string) => {
      const response = api.delete(`/api/meal/${mealId}`, {
        headers: { Authorization:  `Bearer ${user.token}`}
      })

      return response
    },
    onSuccess: (data) => {
    console.log(data)

      queryClient.invalidateQueries({
        queryKey: ['meals', 'metrics'],
        refetchType: 'active'
      })

      // queryClient.removeQueries({
      //   queryKey: ['meals']
      // })

      queryClient.setQueryData(['meals'], data)
    },
  })
}
