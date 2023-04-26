import format from "pg-format";
import { TUserLogin } from "../../__tests__/mocks/interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { TMyUser } from "../../interfaces/users.interfaces";

const Login = async (data: TUserLogin): Promise<string> => {
  const payload = data;

  const queryString = format(
    `
    SELECT * FROM users
    WHERE email = (%L);    
    `,
    payload.email
  );

  const queryResult: QueryResult = await client.query(queryString);
  const validUser: TMyUser = queryResult.rows[0];

  if (!validUser) {
    throw new AppError("wrong email or password", 401);
  }

  const comparePassword = await compare(payload.password, validUser.password);
  if (!comparePassword) {
    throw new AppError("wrong email or password", 401);
  }

  const token: string = sign(
    {
      admin: validUser.admin,
    },
    process.env.SECRET_KEY!,
    {
      subject: String(validUser.id),
      expiresIn: process.env.EXPIRES_IN,
    }
  );
  return token;
};

export { Login };
