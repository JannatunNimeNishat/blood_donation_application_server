import prisma from "../../../shared/prisma";


const getAllUsersFromDB = async()=>{
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      mobileNumber: true,
      userImageURL: true,
      bloodType: true,
      location: true,
      role: true,
      isDonor: true,
      availability: true,
      accountType: true,
      userProfile: true, 
     
    },
  });
  return result;
}


const updateUserAccountTypeIntoDB = async (userId: string, payload: any) => {

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      accountType:payload.accountType,
    },
  });
  return result;
};

const updateUserRoleIntoDB = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role:payload.role,
    },
  });
  return result;
};

export const AdminService = {
  updateUserAccountTypeIntoDB,
  updateUserRoleIntoDB,
  getAllUsersFromDB
};
