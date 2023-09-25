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