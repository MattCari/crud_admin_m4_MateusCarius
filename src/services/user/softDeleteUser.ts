import format from "pg-format";
import { client } from "../../database";

const inactivateUser = async (userId: number): Promise<void> => {
  const queryString = format(`
        UPDATE users
        SET "active" = 'false'
        WHERE
        id = $1;
        `);
  const queryConfig = {
    text: queryString,
    values: [userId],
  };
  await client.query(queryConfig);
};

export { inactivateUser };
