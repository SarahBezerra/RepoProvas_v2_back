import { Request, Response } from "express";
import teacherService from "../services/teacherService.js";

async function findMany(req: Request, res: Response) {
  const { discipline } = req.params;
  if(!discipline) return res.sendStatus(400);

  const teacherId = await teacherService.findMany(discipline);
  const teachers = teacherId.map(teacher => {
    return teacher.teacher
  })

  res.send({ teachers });
}

export default {
  findMany,
};
