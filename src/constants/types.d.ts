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
}
