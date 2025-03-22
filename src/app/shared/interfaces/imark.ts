 
export interface Imark {
title: any;
  _id: string;
  user: string;
  course: Course;
  instructor: Instructor;
  officialScore: number;
  score: number;
  creditHours: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  grade: string;
  __v: number;
}

export interface Instructor {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Course {
  _id: string;
  title: string;
  code: string;
  creditHours: number;
}