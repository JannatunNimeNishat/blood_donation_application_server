export const userSearchableFields = ["bloodType", "location", "name", "email"];
export const userFilterableFields = [
  "bloodType",
  "availability",
  "searchTerm",
  "location",
  "name",
  "email",
];

export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;