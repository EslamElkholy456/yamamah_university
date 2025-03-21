
export interface Itech {
lastName: any;
firstName: any;
role: any;
  message: string;
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  users: User[];
}

// export interface User {
//   _id: string;
//   role: string;
//   firstName: string;
//   lastName: string;
// }

export interface User {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
}