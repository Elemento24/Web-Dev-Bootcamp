const request = require('request');

request('https://jsonplaceholder.typicode.com/users/1', function (error, response, body) {

    // This stops the code at this point, when we run the Code in the Terminal.
    // At this point of the code, we can access all the variables of the Code, via the Terminal.
    // We need to run "npm i -D locus" to install this Dependency
    // eval(require('locus'))

    if (!error && response.statusCode == 200) {
        const parsedData = JSON.parse(body);
        console.log(parsedData); // Print the HTML for the Google homepage.
    }
});