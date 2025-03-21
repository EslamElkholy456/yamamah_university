

export interface Ilevels {
  _id: string;
  name: string;
  order: number;
  prerequisiteCoursesCount: number;
  isVisible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  courses: string[];
  isPublished: boolean;
}
