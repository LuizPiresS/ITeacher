import { Schedule } from '../schedule/schedule';
import { Student } from '../student/student';
import { Subject } from '../subject/subject';
import { Teacher } from '../teacher/teacher';
import { Exercises } from './exercises';
export interface Lessons {
  id: string;
  name: string;
  description: string;
  schedule: Schedule;
  teacher: Teacher;
  student: Student;
  subject: Subject;
  exercises: Exercises;
}
