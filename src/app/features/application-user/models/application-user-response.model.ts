export interface ApplicationUserResponse {
  userId: string;
  employeeId: string;
  employeeName: string;
  roleId: string;
  roleName: string;
  username: string;
  lastLogin: string | null;
  active: boolean;
}
