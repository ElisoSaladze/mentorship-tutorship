// types.d.ts
declare namespace TYPES {
  type programScheme = {
    id: string;
    title: string;
    description: string;
    userProgramRoleToUserMap: string;
  };
  type user = {
    id?: string;
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    userRole: "ADMIN" | "STUDENT" | "TEACHER";
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
    roles: string[];
    programRole: string;
    programRoles: Array<string>;
    confirmed: boolean;
  };
}
