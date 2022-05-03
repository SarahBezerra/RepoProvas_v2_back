import { Request, Response } from "express";
import testService from "../services/testService.js";
import { wrongSchemaError } from "../utils/errorUtils.js";

async function find(req: Request, res: Response) {
  const { groupBy, filterDiscipline, filterTeacher } = req.query as { groupBy: string, filterDiscipline: string, filterTeacher: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }
  
  const tests = await testService.find({ groupBy, filterDiscipline, filterTeacher });
  res.send({ tests });
}

async function addView(req: Request, res: Response) {
  const { user } = res.locals;
  const { testId } = req.params;

  if(!user || !testId || +(testId) === NaN){
    return res.sendStatus(400);
  }

  await testService.addView({userId: user.id, testId: Number(testId)});
}

async function createTest(req: Request, res: Response) {
  const test = req.body;
  if (!test) throw wrongSchemaError("Invalid Test");
  await testService.createTest(test);

  res.sendStatus(201);
}

export default {
  find,
  addView,
  createTest,
};
