// types.d.ts
declare namespace TYPES {
  type ProgramRole = "TUTOR" | "MENTOR" | "SEEKER";

  type RegistrationDates = {
    start: string;
    end: string;
  };

  type UserData = {
    id: string;
    name: string;
    surname: string;
    workingPlace: string;
    workingPosition: string;
  };

  type ProgramSchemeRequest = {
    title: string;
    description: string;
    maxSize: number;
    registrationDates: RegistrationDates;
  };

  type ProgramSchemeResponse = {
    id: string;
    title: string;
    description: string;
    maxSize: number;
    registrationDates: RegistrationDates;
    creatorUserData: UserData;
  };

  type ProgramSchemeDb = {
    id: string;
    title: string;
    description: string;
    maxSize: number;
    registrationDates: RegistrationDates;
    userProgramRoleToUserMap: ProgramRole;
  };

  type ProgramSchemeFullResponse = {
    id: string;
    title: string;
    description: string;
    maxSize: number;
    registrationDates: RegistrationDates;
    creatorUserData: UserData;
    userProgramRoleToUserMap: ProgramRole;
  };

  // Alias for backward compatibility
  type programScheme = ProgramSchemeResponse;

  type UserRole = "ADMIN" | "STUDENT" | "TEACHER";

  type UserResponse = {
    id: string;
    email: string;
    year?: string;
    strengths?: string;
    motivation?: string;
    keywords?: string;
    userFeedback?: string;
    name: string;
    surname: string;
    workingPlace?: string;
    workingPosition?: string;
    experience?: string;
    mentoringCourseName?: string;
    courseDescription?: string;
    expectations?: string;
    hobbies?: string;
    username: string;
    confirmed: boolean;
    programRoles: ProgramRole[];
    roles?: UserRole[];
    data?: string[];
    file0?: string[];
  };

  type UpdateUserRequest = {
    programRoles?: ProgramRole[];
    year?: string;
    strengths?: string;
    motivation?: string;
    keywords?: string;
    userFeedback?: string;
    name?: string;
    surname?: string;
    workingPlace?: string;
    workingPosition?: string;
    experience?: string;
    mentoringCourseName?: string;
    courseDescription?: string;
    expectations?: string;
    hobbies?: string;
  };

  type UserFullResponse = UserResponse & {
    programRoleToProgramSchemeMap?: ProgramRole;
  };

  type UserRequest = {
    email: string;
    username: string;
    password: string;
    roles: UserRole[];
    programRoles: ProgramRole[];
    year?: string;
    strengths?: string;
    motivation?: string;
    keywords?: string;
    userFeedback?: string;
    name: string;
    surname: string;
    workingPlace?: string;
    workingPosition?: string;
    experience?: string;
    mentoringCourseName?: string;
    courseDescription?: string;
    expectations?: string;
    hobbies?: string;
    confirmed?: boolean;
  };

  type RegisterRequest = {
    email: string;
    username: string;
    password: string;
    userRole: UserRole;
    programRole: ProgramRole;
    year?: string;
    strengths?: string;
    motivation?: string;
    keywords?: string;
    userFeedback?: string;
    name: string;
    surname: string;
    workingPlace?: string;
    workingPosition?: string;
    experience?: string;
    mentoringCourseName?: string;
    courseDescription?: string;
    expectations?: string;
    hobbies?: string;
  };

  // Form type for registration (includes repeatPassword for validation)
  type RegisterFormData = RegisterRequest & {
    repeatPassword: string;
  };

  // Alias for backward compatibility
  type user = UserResponse;
}
