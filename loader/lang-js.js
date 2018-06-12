/*
    Copyright 2018 Fernando Pazos Estévez

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


PR.registerLangHandler(
	PR.createSimpleLexer(
		[
      // Whitespace is made up of spaces, tabs and newline characters.
      [PR.PR_PLAIN, /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
      [PR.PR_PLAIN, /[\;\[\]]/, null ],

      [PR.PR_STRING, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]
      ],
      [
      [PR.PR_KEYWORD,
      /^\b("abstract|async|await|constructor|debugger|enum|eval|export|from|get|import|implements|instanceof|interface|let|null|of|set|undefined|var|with|yield|Infinity|NaN|try|catch|break|continue|do|else|for|if|return|while")\b/i,
      null],
      // Eliminamos como puntuacion;,[]{}()\/ y las vocales acentuadas que no sé por qué también las marcaba
      [PR.PR_PUNCTUATION, /^[^\s\w\'\"\;\,\[\]\{\}\(\)\\\/\í\ó\á\é\ú\.]/, null , /\r\n\t\u00a0/],
      // Funciones
      [PR.PR_FUNCTION, /function/, null],
      [PR.PR_VARIABLE, /function [\_]*[A-Za-z_$@0-9]+|\w+(?:\()/, null],
      [PR.PR_FUNCTION, /(?:[\_]*[A-Za-z_$@0-9]+)(?:\()/, null],
      [PR.PR_FUNCTION, /(^\.[A-Za-z_$@0-9]+)/, null],


      [PR.PR_COMMENT, /^\/\/[^\r\n]*/, null],
      [PR.PR_COMMENT, /^\/\*[\s\S]*?(?:\*\/|$)/, null],

      [PR.PR_LITERAL,
      new RegExp(
      	'^(?:'
          // A hex number
          + '0x[a-f0-9]+'
          // or an octal or decimal number,
          + '|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
          // possibly in scientific notation
          + '(?:e[+\\-]?\\d+)?'
          + ')'
          // with an optional modifier like UL for unsigned long
          + '[a-z]*', 'i'),
      null, '0123456789'],

      [PR.PR_VARIABLE, /^(?:\$this)/i, null]
  ]),	['js', 'javascript']);
