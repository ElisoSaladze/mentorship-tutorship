// types.d.ts
declare namespace TYPES {
  // Spring Boot Page response
  type PageResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
  };

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

  // Program Scheme types (container for courses)
  type ProgramSchemeRequest = {
    title: string;
    description: string;
  };

  type ProgramSchemeResponse = {
    id: string;
    title: string;
    description: string;
    creatorUserData: UserData;
    data?: string[];
    file0?: string[];
  };

  type ProgramSchemeDb = {
    id: string;
    title: string;
    description: string;
  };

  type ProgramSchemeFullResponse = {
    id: string;
    title: string;
    description: string;
    creatorUserData: UserData;
    courses: CourseResponse[];
    data?: string[];
    file0?: string[];
  };

  // Course types (belongs to a program scheme)
  type CourseRequest = {
    name: string;
    maxSize: number;
    registrationDates: RegistrationDates;
    programId: string;
  };

  type CourseResponse = {
    id: string;
    name: string;
    maxSize: number;
    registrationDates: RegistrationDates;
    programId: string;
    creatorUserData: UserData;
  };

  type Course = {
    id: string;
    name: string;
    maxSize: number;
    registrationDates: RegistrationDates;
    creatorUserId: string;
    programId: string;
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
    roles: UserRole[];
    data?: string[];
    file0?: string[];
    rating?: number;
    programRoleToCourseMap?: ProgramRole;
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
    programRoleToCourseMap?: ProgramRole;
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
    rating?: number;
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

  // Public response type for mentors endpoint (limited fields)
  type UserPublicResponse = {
    id: string;
    name: string;
    surname: string;
    programRoles: ProgramRole[];
    mentoringCourseName?: string;
    courseDescription?: string;
    rating?: number;
    data?: string[];
    file0?: string[];
  };

  // News types
  type NewsRequest = {
    title: string;
    description: string;
  };

  type NewsResponse = {
    id: string;
    title: string;
    description: string;
    addDate: string;
    data?: string[];
    file0?: string[];
    [key: `file${number}`]: string[] | undefined; // Only file properties can use index signature
  };

  // Alias for backward compatibility
  type user = UserResponse;
}
