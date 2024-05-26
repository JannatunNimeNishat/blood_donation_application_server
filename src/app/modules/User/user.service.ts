import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";
import { userSearchableFields } from "./user.constant";
import { IUser } from "./user.interface";
import config from "../../../config";

const createUserIntoDB = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload?.password, 12);

  const userData: any = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    bloodType: payload.bloodType,
    location: payload.location,
    role: payload.role,
    isDonor: payload.isDonor,
    mobileNumber:payload.mobileNumber,
    userImageURL:
      payload?.userImageURL !== undefined
        ? payload?.userImageURL
        : `https://i.ibb.co/bsdYzV2/m1.jpg`,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    //    creating user
    const user = await transactionClient.user.create({
      data: userData,
    });

    //creating userProfile
    const userProfileModelData = {
      userId: user?.id,
      bio: payload.bio,
      age: payload.age,
      lastDonationDate: payload.lastDonationDate,
    };

    const userProfileCreated = await transactionClient.userProfile.create({
      data: userProfileModelData,
    });

    const { password, ...userFinalData } = user;
    return {
      ...userFinalData,
      userProfile: userProfileCreated,
    };
  });

  console.log(result);
  return result;
};

const donorListIntoDB = async (prams: any, options: any) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = prams;
  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((filed) => ({
        [filed]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // Exclude users with role="admin"
  andConditions.push({
    role: {
      not: "admin",
    },
    accountType: {
      not: "deactivate",
    },
    isDonor: {
      equals: true,
    },
  });

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },

    select: {
      id: true,
      name: true,
      email: true,
      mobileNumber: true,
      bloodType: true,
      location: true,
      availability: true,
      createdAt: true,
      updatedAt: true,
      userProfile: true,
      accountType: true,
      userImageURL: true,
    },
  });
  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDonorFromDB = async (donorId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: donorId,
      isDonor: {
        equals: true,
      },
      accountType: {
        equals: "active",
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      mobileNumber: true,
      bloodType: true,
      location: true,
      availability: true,
      createdAt: true,
      updatedAt: true,
      userProfile: true,
      accountType: true,
      userImageURL: true,
    },
  });

  return result;
};

const getMyProfileFromDB = async (userData: any) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userData.id,
      accountType: {
        equals: "active",
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      bloodType: true,
      location: true,
      availability: true,
      accountType: true,
      mobileNumber: true,
      createdAt: true,
      updatedAt: true,
      userImageURL: true,
      role: true,
      isDonor: true,
      userProfile: true,
    },
  });

  return result;
};


const updateMyProfileIntoDB = async (userData: any, payload: any) => {
  const { user, userProfile } = payload;
  console.log(userData);
  console.log(user);
  console.log(userProfile);
  const updateUserPayload: any = {};
  const updateUserProfilePayload: any = {};

  if (user) {
    if (user.name) updateUserPayload.name = user.name;
    if (user.mobileNumber) updateUserPayload.mobileNumber = user.mobileNumber;
    if (user.userImageURL) updateUserPayload.userImageURL = user.userImageURL;
    if (user.bloodType) updateUserPayload.bloodType = user.bloodType;
    if (user.location) updateUserPayload.location = user.location;
    if (user.isDonor !== undefined) updateUserPayload.isDonor = user.isDonor;
  }

  if (userProfile) {
    if (userProfile.bio) updateUserProfilePayload.bio = userProfile.bio;
    if (userProfile.age) updateUserProfilePayload.age = Number(userProfile.age);
    if (userProfile.lastDonationDate) updateUserProfilePayload.lastDonationDate = userProfile.lastDonationDate;
  }

  const result = await prisma.$transaction(async (prisma) => {
    if (Object.keys(updateUserPayload).length > 0) {
      await prisma.user.update({
        where: { id: userData.id },
        data: updateUserPayload,
      });
    }

    if (Object.keys(updateUserProfilePayload).length > 0) {
      await prisma.userProfile.update({
        where: { userId: userData.id },
        data: updateUserProfilePayload,
      });
    }

    const updatedUser = await prisma.user.findUnique({
      where: { id: userData.id },
      include: { userProfile: true },
    });

    return updatedUser;
  });

  return result;
};


/* const updateMyProfileIntoDB = async (userData: any, payload: any) => {
  const result = await prisma.userProfile.update({
    where: {
      userId: userData.id,
    },
    data: payload,
  });
  return result;
}; */
const changePasswordIntoDB = async (userData: any, payload: any) => {
  const { currentPassword, newPassword } = payload;
  //getting the user
  const userInfo = await prisma.user.findUnique({
    where: {
      id: userData.id,
    },
    select: {
      password: true,
    },
  });

  if (!userInfo) {
    throw new Error("User not found!");
  }

  //check current password
  const check = await bcrypt.compare(currentPassword, userInfo?.password);

  if (!check) {
    throw new Error("Current password is not matched!");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const result = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: { password: hashedNewPassword },
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  donorListIntoDB,
  getMyProfileFromDB,
  updateMyProfileIntoDB,
  changePasswordIntoDB,
  getSingleDonorFromDB,
};
