import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { CreateMealProps, MealProps, UpdatedUserMealProps } from './interfaces'

export function getUserMeals () {
  const { data: meals, isLoading: mealsLoading, isFetching: mealsFetching } = useQuery<MealProps[]>({
    queryKey: ['meals'],
    queryFn: async () => {
      const response = await api.get('/api/meal')

      return response.data
    }
  })

  return { meals, mealsLoading, mealsFetching }
}

export function getUserMealById (mealId: string) {
  const { data: mealById, isLoading: mealIdLoading, isFetching: mealIdFetching } = useQuery<MealProps>({
    queryKey: ['mealById', mealId],
    queryFn: async () => {
     try {
      const response = await api.get(`/api/meal/${mealId}`)
      return response.data
    } catch (error) {
      console.log(error)
     }
    }
  })

  return { mealById, mealIdLoading, mealIdFetching }
}

export function deleteUserMeal(mealId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
       await api.delete(`/api/meal/${mealId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userStats']
      })

      queryClient.removeQueries({
        queryKey: ['mealById', mealId]
      })

      queryClient.setQueryData(['meals'], (meals?: MealProps[]) => {
        if(!meals) return undefined

        return meals.filter((meal) => meal.id !== mealId)
      })
    }
  })
}

export function createUserMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ date, description, isDiet, title }: CreateMealProps) => {
      console.log(date, description, isDiet, title)
      const response = await api.post('/api/meal', {
        date, description, isDiet, title
      })

      console.log(response)

      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['meals', 'userStats']
      })

      queryClient.setQueryData(['mealById', data.id], data)
    }
  })
}

export function updatedUserMeal (mealId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatedUserMealProps) => {
      const response = await api.put(`/api/meal/${mealId}`, { data })

      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['userStats']
      })

      queryClient.setQueryData(['mealById', data.id], data)
      queryClient.setQueryData(['meals'], (meals?: MealProps[]) => {
        if(!meals) return undefined

        return meals.map((meal) => {
          if (meal.id === mealId) return data
          return meal
        })
      })
    }
  })
}