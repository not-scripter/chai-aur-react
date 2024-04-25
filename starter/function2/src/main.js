// export default async ({ req, res, log, error }) => {
//     return res.send("Updated Function 2");
// };
import { Client, Databases, Query, Users } from "node-appwrite";

export default async ({ req, res }) => {
  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65d4d01ac41d1120ee37");

  const db = new Databases(client);
  const users = new Users(client);

  if (req.method === "GET") {
    try {
      const response = await db.listDocuments(
        "65d4d1ee5fef6fefc968",
        "65d4d3a307f81c479850",
        [Query.equal("status", "public")]
      );
      return res.json(response.documents);
    } catch (e) {
      return res.send("Error Occured");
    }
  }

  return res.send("namaste world");
};
