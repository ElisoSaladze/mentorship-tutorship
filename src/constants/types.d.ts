// types.d.ts
declare namespace TYPES {
  type programScheme = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    userProgramRoleToUserMap: {
      tutor: string[];
      mentor: string[];
      seeker: string[];
    };
  };
  type user = {
    id: string;
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
    programRoles: string[];
    confirmed: boolean;
  };
}
