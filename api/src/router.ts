
import { Authorization } from "./middlewares/authorization";
import { SignInController } from "./controller/sign-in-controller";
import { SignUpController } from "./controller/sign-up-controller";
import { Router } from "express";
import { CreateMealController } from "./controller/create-meal-controller";
import { DeleteMealController } from "./controller/delete-meal-controller";
import { EditMealController } from "./controller/edit-meal-controller";
import { GetUserMealsController } from "./controller/get-user-meals-controller";
import { UserStatisticsController } from "./controller/user-statistics-controller";
import { GetMealByIDController } from "./controller/get-meal-by-id-controller";

export const router = Router()

router.post('/api/sign-up', new SignUpController().handler)
router.post('/api/sign-in', new SignInController().handler)

router.post('/api/meal', Authorization, new CreateMealController().handler)
router.delete('/api/meal/:mealId', Authorization, new DeleteMealController().handler)
router.put('/api/meal/:mealId', Authorization, new EditMealController().handler)
router.get('/api/meal', Authorization, new GetUserMealsController().handler)

router.get('/api/meal/:mealId', Authorization, new GetMealByIDController().handler)

router.get('/api/stats', Authorization, new UserStatisticsController().handler)
