
export  interface Iprofile {
role: any;
_id: any;
lastName: any;
firstName: any;
  status: number;
  user: User;
}

export  interface User {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
}