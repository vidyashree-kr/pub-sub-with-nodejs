// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');
const asyncHandler = require("../middleware/async");

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage();
// Makes an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}
listBuckets();
exports.checkAuth = asyncHandler(async (req, res, next) => {
  console.log('in checkAuth');
  await listBuckets();
  res.status(200).json({
    success: true,
    data: `Auth success `
  });
});
