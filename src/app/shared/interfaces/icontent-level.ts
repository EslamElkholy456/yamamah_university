
export interface IcontentLevel {
    _id: string;
    title: string;
    code: string;
    creditHours: number;
    courseType: string;
    prerequisites: Prerequisite[];
    requirementType: string;
  }
  
  export interface Prerequisite {
    _id: string;
    title: string;
    code: string;
  }