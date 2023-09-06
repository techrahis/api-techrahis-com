const sdk = require("node-appwrite");
require("dotenv").config();

const API_KEY = process.env.APPWRITE_API_KEY;

async function getResume() {
    const client = new sdk.Client();

    const storage = new sdk.Storage(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('rajarshisamaddar-com') // Your project ID
        .setKey(API_KEY) // Your secret API key
        ;

    const promise = await storage.getFileDownload('64ed8dec807920adad54', 'resume');

    return promise
}

module.exports = { getResume };
