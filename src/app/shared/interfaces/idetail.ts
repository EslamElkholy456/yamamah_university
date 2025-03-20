
export interface Idetail {
  moduleTitle: string;
  videos: Video[];
  _id: string;
}

export interface Video {
  title: string;
  videoUrl: string;
  materials: string[];
  _id: string;
}