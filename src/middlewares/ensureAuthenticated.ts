import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "5d7928cc0493f10d8c46709583540e0f"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const matchingUser = await usersRepository.findById(user_id);

    if (!matchingUser) {
      throw new AppError("User does not exist!", 401);
    }

    next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }
}
