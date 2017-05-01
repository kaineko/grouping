var port = process.env.PORT || 8080,
	http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

http.createServer(function(request,response){
	if (request.url ==='/'){
		request.url = '/3d.html';
	}
	var x = url.parse(request.url,true);
	var fullpath = path.resolve(__dirname,'.'+x.pathname);
	if (fs.existsSync(fullpath)){
		var ext = path.extname(fullpath).toLowerCase();
		if(ext.match(/\.(png|jpg|jpeg|gif|html|css|js|ico)$/)){
		   response.writeHead(200,{'Content-type':'text/plain'});
		   var strm = fs.createReadStream(fullpath);
			strm.pipe(response);
		} else {
			response.writeHead(404,{'Content-type':'text/plain'});
			response.end('404 not found');
		}
	} else {
			response.writeHead(404,{'Content-type':'text/plain'});
			response.end('404 not found');		
	}
}).listen(port);
console.log('start server');
