import { Lessons } from '../lessons/lessons';
import { Archive } from '../storage/archive';

export interface Exercicies {
  id: string;
  name: string;
  description: string;
  file: Archive;
  lesson: Lessons; // A qual lição pertence
}
