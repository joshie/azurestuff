var mongoClient = require("mongodb").MongoClient;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    mongoClient.connect(
      process.env.DB_CONNECTION_STRING,
      function(err, client) {
        var db = client.db("companystuff");
        var collection = db.collection("employees");

        collection.findOne({"name": "joshie"}, function(err, result) {
          const responseMessage = result;
 
          context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
          };
        });
      }
    );   

    /*
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "NARF This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response. " + process.env.WEBSITE_CONTENTSHARE;
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
  */
}
