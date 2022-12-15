export interface Workout {
  id?: string;
  title?: string;
  date?: Date;
  exercises?: Exercise[];
}

export interface Exercise {
  exercise_title?: string;
  sets?: number;
  reps?: number;
  weight?: number;
}
