import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async ({ firstName, lastName, email, password }) => {
  try {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
      return { data: "User already exists!", statusCode: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    return {
      data: generateJWT({ firstName, lastName, email }),
      statusCode: 200,
    };
  } catch (error) {
    return {
      data: "Something went wrong during registration.",
      statusCode: 500,
      error: error.message,
    };
  }
};

export const login = async ({ email, password }) => {
  try {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return { data: "Incorrect email or password!", statusCode: 400 };
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
      return {
        data: generateJWT({
          email,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
        }),
        statusCode: 200,
      };
    }

    return { data: "Incorrect email or password!", statusCode: 400 };
  } catch (error) {
    return {
      data: "Something went wrong during login.",
      statusCode: 500,
      error: error.message,
    };
  }
};

const generateJWT = (data) => {
  return jwt.sign(data, "%%f!~LU|Jrwgdep[.z[[OGO:[{!6x(&b");
};
