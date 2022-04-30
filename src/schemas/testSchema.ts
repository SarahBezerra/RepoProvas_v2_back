import { Test } from "../services/testService.js";
import Joi from "joi";

export const testSchema = Joi.object<Test>({
  category: Joi.string().required(),
  discipline: Joi.string().required(),
  instructor: Joi.string().required(),
  testPdf: Joi.string().uri().required(),
  testTitle: Joi.string().required(),
});
