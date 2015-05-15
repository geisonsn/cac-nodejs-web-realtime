var http = require("http");
var fs = require("fs");
var url = require("url");

var diretorio = function(arquivo) {
	return __dirname + "/" + arquivo;
}

var rotear = function(pathname) {
	console.log("dirname ... ", __dirname);
	console.log("Pathname...", pathname);

	if (pathname && pathname != "/") {
		var arquivo = diretorio(pathname + ".html");
		var existe = fs.existsSync(arquivo);
		if (existe) {
			return arquivo;
		}
		return diretorio("erro.html");
	}
	return diretorio("artigos.html");
}

var server = http.createServer(function(request, response) {

	var pathname = url.parse(request.url).pathname;

	var pagina = rotear(pathname);

	fs.readFile(pagina, function(erro, html) { 
		response.writeHead(200, {"Content-type" : "text/html"});
		response.end(html);
	});

});

server.listen(3000, function() {
	console.log("Servidor no ar");
});
