export type IUser = {
  name: string;
  email: string;
  password: string;
  bloodType: string;
  location: string;
  role: string;
  isDonor: boolean;
  availability?: string;
  userImageURL?:string | undefined
};
