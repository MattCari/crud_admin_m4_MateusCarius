import { QueryResult } from "pg";
import { TMyUserResponse } from "../../interfaces/users.interfaces";
import { TUser } from "../../__tests__/mocks/interfaces";
import { client } from "../../database";


const listLogedUserService = async (): Promise<TMyUserResponse[]> => {

  const queryString: string = 
    `
    SELECT *
    FROM
    users
    WHERE "active" = 'true';
  `

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const user: TMyUserResponse[] = queryResult.rows
 
  return user;

};

export default listLogedUserService;
