import { MealProps } from "../components/meal-item";

interface FeedbackProps {
  isDiet: boolean
}

export interface MealNavigationProps {
  mealId: string
}

type NavigationType = {
  Home: undefined;
  Statistics: undefined;
  Meal: { mealId: string };
  MealCreate: undefined;
  MealEdit: { mealId: string };
  Feedback: FeedbackProps;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationType {}
  }
}