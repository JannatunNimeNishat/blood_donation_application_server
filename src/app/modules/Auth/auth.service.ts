import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const isUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      accountType: "active",
    },
  });

  const checkingIsPasswordCorrect: boolean = await bcrypt.compare(
    payload.password,
    isUserExists.password
  );
  if (!checkingIsPasswordCorrect) {
    throw new Error("Password incorrect!");
  }

  //generating accessToken
  const accessTokenData: any = {
    id: isUserExists.id,
    email: isUserExists.email,
    role: isUserExists.role,
  };
  if (isUserExists?.userImageURL) {
    accessTokenData["userImageURL"] = isUserExists?.userImageURL;
  }

  const accessToken = jwtHelpers.generateToken(
    accessTokenData,
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );
  return {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    token: accessToken,
  };
};

export const AuthService = {
  loginUserIntoDB,
};
