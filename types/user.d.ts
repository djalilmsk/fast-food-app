export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  name?: string;
  token?: string;
  isActive?: boolean;
  profilePicture?: string;
  phoneNumber?: string;
  address1?: string;
  address2?: string;
  createdAt?: string;
  updatedAt?: string;
}
