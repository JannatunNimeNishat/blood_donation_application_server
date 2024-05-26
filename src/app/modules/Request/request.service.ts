import prisma from "../../../shared/prisma";

const donationRequestIntoDB = async (payload: any, userData: any) => {
  await prisma.user.findFirstOrThrow({
    where: {
      id: payload.donorId,
    },
  });

  const requestData = {
    ...payload,
    requesterId: userData.id,
  };

  //console.log(requestData);
  const result = await prisma.request.create({
    data: requestData,
    select: {
      id: true,
      donorId: true,
      requesterId: true,
      phoneNumber: true,
      dateOfDonation: true,
      hospitalName: true,
      hospitalAddress: true,
      reason: true,
      requestStatus: true,
      createdAt: true,
      updatedAt: true,
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
          bloodType: true,
          location: true,
          availability: true,
          createdAt: true,
          updatedAt: true,
          userProfile: true,
        },
      },
    },
  });

  return result;
};

const getMyDonationRequestsFromDB = async (userData: any) => {
  const result = await prisma.request.findMany({
    where: {
      donorId: userData.id,
    },
    include: {
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
          bloodType: true,
          location: true,
          availability: true,
          mobileNumber:true
        },
      },
    },
  });

  return result;
};

const updateDonationRequestIntoDB = async (payload: any, requestId: string) => {
  const result = await prisma.request.update({
    where: {
      id: requestId,
    },
    data: {
      requestStatus: payload.status,
    },
  });
  return result;
};

const getMyAllBloodRequestsFromDB = async (userData: any) => {
  const result = await prisma.request.findMany({
    where: {
      requesterId: userData.id,
    },
    include: {
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
          mobileNumber:true,
          bloodType: true,
          location: true,
          availability: true,
        },
      },

    },
  });

  return result;
};

export const RequestService = {
  donationRequestIntoDB,
  getMyDonationRequestsFromDB,
  updateDonationRequestIntoDB,
  getMyAllBloodRequestsFromDB
};
