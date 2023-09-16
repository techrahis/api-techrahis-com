const sdk = require("node-appwrite");
require("dotenv").config();

const API_KEY = process.env.APPWRITE_API_KEY;

async function getRecentMovies() {
  const client = new sdk.Client();
  const databases = new sdk.Databases(client);
  const query = sdk.Query;

  client
    .setEndpoint("https://cloud.appwrite.io/v1") // API Endpoint
    .setProject("rajarshisamaddar-com") // project ID
    .setKey(API_KEY);

  const data = await databases.listDocuments(
    "64ecb71c4c3749b20071", // db id
    "64ecbacf54d3af9a54bd", // collection id
    [
      query.limit(10),
      query.orderAsc("status"),
      query.orderDesc("$createdAt")

    ]
  );

  return data;
}

module.exports = { getRecentMovies };
