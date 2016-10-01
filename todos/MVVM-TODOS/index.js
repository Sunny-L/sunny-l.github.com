var static  = require('node-static');
var fileServer = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(8001);

console.log('server listen port 8001... ')
