# node-abstract-mecab

This module lets you use the Japanese morphological analyzer MeCab from node.js applications.

It parses MeCab's stdout into javascript objects that gives you access to the information MeCab provides, as opposed to a direct interface to the underlying C API. So far it only parses the recommended standard MeCab output format.

MeCab homepage: http://mecab.sourceforge.net/

## Usage:

	var mecab = require('./mecab');
	mecab.parse('これは日本語です', 'ipadic', function(output){
		// output is now the array below
	});
	
	[{
	    "surface": "これ",
	    "pos": "名詞",
	    "pos_detail_1": "代名詞",
	    "pos_detail_2": "一般",
	    "pos_detail_3": null,
	    "inflection": null,
	    "pattern": null,
	    "lemma": "これ",
	    "reading": "コレ",
	    "pronunciation": "コレ"
	},
	{
	    "surface": "は",
	    "pos": "助詞",
	    "pos_detail_1": "係助詞",
	    "pos_detail_2": null,
	    "pos_detail_3": null,
	    "inflection": null,
	    "pattern": null,
	    "lemma": "は",
	    "reading": "ハ",
	    "pronunciation": "ワ"
	},
	{
	    "surface": "日本語",
	    "pos": "名詞",
	    "pos_detail_1": "一般",
	    "pos_detail_2": null,
	    "pos_detail_3": null,
	    "inflection": null,
	    "pattern": null,
	    "lemma": "日本語",
	    "reading": "ニホンゴ",
	    "pronunciation": "ニホンゴ"
	},
	{
	    "surface": "です",
	    "pos": "助動詞",
	    "pos_detail_1": null,
	    "pos_detail_2": null,
	    "pos_detail_3": null,
	    "inflection": "特殊・デス",
	    "pattern": "基本形",
	    "lemma": "です",
	    "reading": "デス",
	    "pronunciation": "デス"
	}]

## Node version:

Last tested against node.js version 0.1.91

## License:

Copyright (c) 2010 Kim Ahlström <kim.ahlstrom@gmail.com>
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
