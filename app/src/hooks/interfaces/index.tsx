export interface CreateMeal {
  title: string
  description: string
  date: string
  isDiet: "on-diet" | "out-diet"
}

export interface MealProps {
  id: string; 
  title: string;
  description: string;
  date: Date; 
  isDiet: boolean;
  createdAt: Date;
  updated: Date;
  userId: string; 
}

export interface GetStatisticsProps {
  total: number 
  inDiet: number
  outDiet: number
  bestSequence: number
}

export interface GetMealByIdProps {
  mealId: string
}

export type CreateMealProps = {
    title: string;
    description: string;
    date: Date;
    isDiet: boolean; 
}

export type UpdatedUserMealProps = {
  mealId: string
  title: string;
  description: string;
  date: Date;
  isDiet: boolean;
}