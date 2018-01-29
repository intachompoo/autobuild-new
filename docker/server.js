var http = require('http');
var os = require('os');

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Welcome to Kubernetes\nServing from Host: '+ os.hostname() );
};

var www = http.createServer(handleRequest);
www.listen(8080);