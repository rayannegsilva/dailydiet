import { MealProps } from "../components/meal-item";

type NavigationType = {
  Home: undefined;
  Statistics: undefined;
  Meal: { meal: MealProps }
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationType {}
  }
}