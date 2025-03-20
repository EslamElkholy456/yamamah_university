
export interface Itech {
  message: string;
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  users: User[];
}

export interface User {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
}