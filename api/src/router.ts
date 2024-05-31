
import { Router } from "express";
import multer, { MulterError } from "multer";
import path from 'node:path';

import { Authorization } from "./middlewares/authorization";
import { SignInController } from "./controller/sign-in-controller";
import { SignUpController } from "./controller/sign-up-controller";
import { CreateMealController } from "./controller/create-meal-controller";
import { DeleteMealController } from "./controller/delete-meal-controller";
import { EditMealController } from "./controller/edit-meal-controller";
import { GetUserMealsController } from "./controller/get-user-meals-controller";
import { UserStatisticsController } from "./controller/user-statistics-controller";
import { GetMealByIDController } from "./controller/get-meal-by-id-controller";
import { BadRequestError } from "./helpers/api-error";
import { UpdatedUserController } from "./controller/updated-user-controller";
import { GetUserController } from "./controller/get-user-controller";

export const router = Router()


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uplodads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  fileFilter(req, file, callback) {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const fileSizeLimit = 5 * 1024 * 1024;

    if(allowedMimeTypes.includes(file.mimetype) && file.size <= fileSizeLimit) {
      callback(null, true);
    } else {
      callback(null, false)
      return new BadRequestError('Erro no upload')
    }
  },
})

router.post('/api/sign-up', new SignUpController().handler)
router.post('/api/sign-in', new SignInController().handler)

router.post('/api/meal', Authorization, new CreateMealController().handler)
router.delete('/api/meal/:mealId', Authorization, new DeleteMealController().handler)
router.put('/api/meal/:mealId', Authorization, new EditMealController().handler)
router.get('/api/meal', Authorization, new GetUserMealsController().handler)

router.get('/api/meal/:mealId', Authorization, new GetMealByIDController().handler)

router.get('/api/stats', Authorization, new UserStatisticsController().handler)

router.put('/api/user', Authorization, new UpdatedUserController().handler)
router.get('/api/user', Authorization, new GetUserController().handler)
