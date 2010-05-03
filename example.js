// Example of using the mecab module in a node.js server
//
// Parses the path after / with mecab and shows JSON serialized output
//
// By Kim Ahlström <kim.ahlstrom@gmail.com> May 2010

var sys = require('sys'), 
    http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
		mecab = require('./mecab');

http.createServer(function (req, res) {
  res.sendHeader(200, {'Content-Type': 'text/plain; charset=utf-8'});
  req.setEncoding('utf8');
  // Need this querystring and url parsing to decode the URL encoding
  var query = querystring.parse(url.parse(req.url).query)
  var text = query.text;
    
  mecab.parse(text, 'ipadic', function(output){
    res.write('mecab: '+JSON.stringify(output));  
    res.end();
  });
  
}).listen(8000);

sys.puts('Server running at http://127.0.0.1:8000/');
