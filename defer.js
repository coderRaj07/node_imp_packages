const Q = require('q');

async function anyFunc() {
    const deferred = Q.defer();
    
    try {
       //function logic
        deferred.resolve();
    } catch (err) {
        deferred.reject(err);
    }
    return deferred.promise;
}


anyFunc()
    .then(() => {
        console.log('Script Ran Successfully');
    })
    .catch((err) => {
        console.log(err);
    });



//*********************Normal Code*********************//
const connectDatabase = require('../database/db')
const User = require('../models/user')

module.exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        await connectDatabase();
        const {email} = event.pathParameters;
        userObj = await User.findOne({email});
        if (userObj) {
            return {
                statusCode: 200,
                body: JSON.stringify(userObj),
            };
        }
        else{
            return {
                statusCode: 404,
                body: JSON.stringify({
                    error: "Requested resource is not found in the database",
                }),
            };
        }
    } catch(error){
        console.log(error);
        return{
            statusCode: error.statusCode || 500,
            body: JSON.stringify({error: error.message}),
        }
    }
};


//*********************Using q.defer()*********************//
const connectDatabase = require('../database/db');
const User = require('../models/user');
const q = require('q'); // Assuming you're using the 'q' library or a similar one

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    // Create a deferred object
    const defer = q.defer();

    try {
        await connectDatabase();
        const { email } = event.pathParameters;
        userObj = await User.findOne({ email });
        
        if (userObj) {
            // Resolve the deferred object with the userObj
            defer.resolve({
                statusCode: 200,
                body: JSON.stringify(userObj),
            });
        } else {
            // Resolve the deferred object with the 404 response
            defer.resolve({
                statusCode: 404,
                body: JSON.stringify({
                    error: "Requested resource is not found in the database",
                }),
            });
        }
    } catch (error) {
        console.log(error);

        // Reject the deferred object with the error
        defer.reject({
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: error.message }),
        });
    }

    // Return the promise from the deferred object
    return defer.promise;
};


//Note: Here normal return objects are wrapped with defer.resolve (for try) and defer.reject (for catch)
//and at the end we return defer.promise



