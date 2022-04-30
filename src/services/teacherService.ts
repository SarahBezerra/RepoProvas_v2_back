import disciplineRepository from "../repositories/disciplineRepository.js";
import teacherRepository from "../repositories/teacherRepository.js";
import { notFoundError } from "../utils/errorUtils.js";

async function findMany(disciplineName: string) {
  const discipline = await disciplineRepository.findDisciplineByName(disciplineName);
  if (!discipline) throw notFoundError("Discipline not found");

  return teacherRepository.findMany(discipline.id);
}

export default {
  findMany,
};
