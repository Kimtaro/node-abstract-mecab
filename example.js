var sys = require('sys'), 
    http = require('http'),
    UTF8 = 'utf8';

var mecabOutput = '';
var mecabRunning = 0;
var mecab = process.createChildProcess('mecab');
mecab.addListener('output', function(data){
  sys.puts("mecab stdout: " + data);
  if (data) {
    mecabOutput = data;
  }
});

http.createServer(function (req, res) {
  res.sendHeader(200, {'Content-Type': 'text/plain; charset=UTF8'});
  m = new process.Promise();
  
  mecab.write("日本語です\n", UTF8);
  res.sendBody('mecab: '+JSON.stringify(mecabOutput));  
  sys.puts("mecab output: "+mecabOutput);
  res.finish();
}).listen(8000);

sys.puts('Server running at http://127.0.0.1:8000/');
