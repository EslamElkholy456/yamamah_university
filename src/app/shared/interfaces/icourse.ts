
export interface Icourse {
  _id: string;
  title: string;
  code: string;
  description: string;
  instructor: string;
  price: number;
  studentsEnrolled: number;
  content: Content[];
  category: string;
  reviews: any[];
  rating: number;
  isPublished: boolean;
  creditHours: number;
  courseType: string;
  prerequisites: string[];
  requirementType: string;
}

export interface Content {
  moduleTitle: string;
  videos: Video[];
  _id: string;
}

export interface Video {
  title: string;
  videoUrl: string;
  materials: (string | string | string)[];
  _id: string;
}