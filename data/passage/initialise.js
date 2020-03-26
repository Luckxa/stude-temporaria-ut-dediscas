#!/usr/loca/bin/node

const http =require("http");
const url =require("url");
const querystring =require("querystring");

/**
 */
function data(q, c, cargar) {
	this.callback =cargar,
	this.post = function(q, c, callback) {
		const postdata ={"q" : JSON.stringify(q)};
		if (c != null) 
			postdata.c =c;
		const post =querystring.stringify(postdata);
		const link =url.parse("http://localhost/ens/mydb/");
		link.method ='POST';
		link.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length' : Buffer.byteLength(post)
		};
		const req =http.request(link, (res) => {
			if (res.statusCode != 200) {
//				//console.log(`STATUS : ${res.statusCode}`);
//				//console.log(`HEADERS : ${JSON.stringify(res.headers)}`);
				callback(null, res.statusCode);
			} else {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					try {
						callback(JSON.parse(chunk), res.statusCode);
					} catch (e) {
						console.log(`Error : ${e}`);
						console.log(` BODY : ${chunk}`);
					}
				}).on('end', () => {
//					//console.log('no more data');
				});
			}
		});
		req.on('error', (e) => {
			console.log(`problema con propuesta : ${e.message}`);
		});
		req.write(post);
		req.end();
	},
	this.f =function(data, statusCode) {
		switch( statusCode) {
		case 500 :
			//console.log("error");
			this.post(q, c, this.f);
			break;
		case 200 :
			this.callback(JSON.stringify(data));
			break;
		default :
			console.log("Error : %d", statusCode);
			console.log(data);
		}
	}
	this.post(q, c, this.f);
}

function myCargar(data) {
	console.log("my cargado : "+data);
};
data("select * from event", {"user" : "luckxa", "pass" : "my", "db" : "menagerie"}, myCargar);
//myBuscar({"test" : ["boomelang0"]}, {"user" : "luckxa", "pass" : "my", "db" : "menagerie"}, myCargar);
//myBuscar({"test" : ["boomelang0"]}, {"user" : "luckxa", "pass" : "my", "db" : "menagerie"}, myCargar);

/*
http.get("http://localhost/index.php", function(res) {
    console.log("Got response: " + res.statusCode);
	res.on('data', (chunk) => {
		console.log(`BODY : ${chunk}`);
	});
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});
*/


//exports.modulatio = function() ...
/**
 */
function modulatio() {
}

