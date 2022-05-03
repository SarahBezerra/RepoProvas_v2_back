import testRepository from "../repositories/testRepository.js";
import userRepository from '../repositories/userRepository.js';
import { createViewTest, CreateTest } from '../repositories/testRepository.js';
import { notFoundError, conflictError } from '../utils/errorUtils.js';
import categoryRepository from "../repositories/categoryRepository.js";
import teacherRepository from "../repositories/teacherRepository.js";
import disciplineRepository from "../repositories/disciplineRepository.js";

interface Filter {
  groupBy: "disciplines" | "teachers",
  filterDiscipline: string,
  filterTeacher: string,
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    if(filter.filterDiscipline){
      return testRepository.getTestsByFilteredDiscipline(filter.filterDiscipline);
    } else {
      return testRepository.getTestsByDiscipline();
    }
  } else if (filter.groupBy === "teachers") {
    if(filter.filterTeacher){
      return testRepository.getTestsByFilteredTeachers(filter.filterTeacher);
    } else {
      return testRepository.getTestsByTeachers();
    }
  }
}

async function addView({ userId, testId }: createViewTest) {
  const user = await userRepository.findById(userId);
  if (!user) throw notFoundError("User not found");

  const test = await testRepository.findTestById(testId);
  if (!test) throw notFoundError("Test not found");

  const testAlreadyViewed = await testRepository.findTestView({userId, testId});
  if (testAlreadyViewed) throw conflictError("Test alreday viewed");
  
  await testRepository.insertTestView({userId, testId});
}

export interface Test {
  category: string,
  discipline: string,
  instructor: string,
  testPdf: string,
  testTitle: string,
}

async function createTest(test: Test) {
  const category = await categoryRepository.findByName(test.category);
  if (!category) throw notFoundError("Category not found");

  const teacher = await teacherRepository.findTeacherByName(test.instructor);
  if (!teacher) throw notFoundError("Teacher not found");

  const discipline = await disciplineRepository.findDisciplineByName(test.discipline);
  if (!discipline) throw notFoundError("Discipline not found");

  const teacherDiscipline = await teacherRepository.findTeacherDiscipline(teacher.id, discipline.id);
  if (!teacherDiscipline) throw notFoundError("TeacherDiscipline not found");

  const testData: CreateTest = {
    name: test.testTitle, 
    pdfUrl: test.testPdf, 
    categoryId: category.id, 
    teacherDisciplineId: teacherDiscipline.id     
  }

  await testRepository.createTest(testData);
}

export default {
  find,
  addView,
  createTest,
};
