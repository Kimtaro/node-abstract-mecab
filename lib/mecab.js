// A poor person's interface to MeCab from node.js
// Parses stdout from mecab instead of using the C interface
//
// Exports one function, parse, that does everything you could ever want
//
// Tested with node.js version 0.1.91
//
// License: MIT
// By Kim Ahlström <kim.ahlstrom@gmail.com> 2010

var spawn = require('child_process').spawn;

var MeCab = (function(){
  var mecab = spawn('mecab');
  mecab.stdout.addListener('data', function(data){
    if (data) {
      MeCab._wrapper(data);
    }
  });
  
  return({
    _mecab: mecab,
    
    // The data listener for the mecab child process uses MeCab._wrapper as the callback when it receives data.
    // So the parse function will attach its own function to this key each time it's called,
    // so we don't have to attach new listeners each time instead
    _wrapper: null,

    // Main function, the only one exported
    // text: the text you want to parse
    // format: the name of the dictionary your mecab is using, must match a key in the formats object
    // callback: your callback
    parse: function(text, format, callback){
      // Attach this function as the actual callback for the data from the mecab child process listener
      // This is so we can have a new user callback for each time parse is called without having to redefine the mecab listener
      MeCab._wrapper = function(data){
        // data is a buffer, so we need to stringify it
        var string = data.toString('utf8', 0, data.length);
        
        // This turns the mecab output into a nice object
        var parsed = MeCab.formats[format](string);
        
        // The user's callback
        callback(parsed);
      };
      
      // Sets off the parsing
      MeCab._mecab.stdin.write(text + "\n", 'utf8');
    },
    
    // These functions transform the mecab output into objects that are easy to work with
    formats: {
      ipadic: function(data) {
        var lines = data.split("\n");
        var result = [];
        
        for(line in lines) {
          if(lines[line] == 'EOS') {
            result.push({type: 'eos'})
            continue; 
          }
          else if(lines[line] == '') {
            continue;
          }
          
          var parts = lines[line].split(/\s+/);
          var surface = parts[0];
          var features = parts[1].split(/,/);

          for(feature in features) {
            if(features[feature] == '*') {
              features[feature] = null;
            }
          }

          result.push({
            type: 'token',
            surface: surface,
            pos: features[0],
            pos_detail_1: features[1],
            pos_detail_2: features[2],
            pos_detail_3: features[3],
            inflection: features[4],
            pattern: features[5],
            lemma: features[6],
            reading: features[7],
            pronunciation: features[8]
          });
        }
        
        return(result);
      }
    }
  });
})();

exports.parse = MeCab.parse;