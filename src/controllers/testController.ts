import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy, filterDiscipline, filterTeacher } = req.query as { groupBy: string, filterDiscipline: string, filterTeacher: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }
  
  const tests = await testService.find({ groupBy, filterDiscipline, filterTeacher });
  res.send({ tests });
}

export default {
  find,
};
