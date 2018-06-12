// Copyright (C) 2009 Google Inc.
// Copyright (C) 2010 Kyo Nagashima <kyo@hail2u.net>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



/**
 * @fileoverview
 * Registers a language handler for CSS.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-css"></pre>
 *
 *
 * http://www.w3.org/TR/CSS21/grammar.html Section G2 defines the lexical
 * grammar.  This scheme does not recognize keywords containing escapes.
 *
 * @author mikesamuel@gmail.com
 * @author kyo@hail2u.net
 */

 /*
    Copyright 2018 Fernando Pazos Estévez

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    */
    
PR.registerLangHandler(
    PR.createSimpleLexer(
        [
            // The space production <s>
            [PR.PR_PLAIN,
                /^[ \t\r\n\f;\[\]\{\}\(\)]+/, null, ' \t\r\n\f\;\[\]\{\}\(\)'],            [PR.PR_FUNCTION, /(?:[_]*[A-Z]*[a-z][A-Za-z_$@0-9]*|\w+)(?:\()/, null],
        ],
        [
            // Quoted strings.  <string1> and <string2>
            [PR.PR_STRING,
                /^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/, null],

            [PR.PR_STRING,
                /^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/, null],
            ['lang-css-str', /^url\(([^\)\"\']+)\)/i],
            [PR.PR_KEYWORD,
                /^(?:a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1 to h6|head|header|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|@media)(?=[^\-\w]|$)/i, null],
      		[PR.PR_VARIABLE, /^\.[\w0-9\_]+/, null],
      		[PR.PR_FUNCTION, /^(?:url|rgba?|hsla?|local|\!important|@import|@page|@charset|@font-face|inherit)(?=[^\-\w]|$)/i, null],
            // A property name -- an identifier followed by a colon o también punto y coma.
            [PR.PR_FUNCTION, /^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*(?= [;:]|$)/i],
            // A C style block comment.  The <comment> production.
      		[PR.PR_COMMENT, /^\/\/[^\r\n]*/, null],
            [PR.PR_COMMENT, /^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
      		//[PR.PR_PUNCTUATION, /^[^\s\w\'\"\;\,\[\]\{\}\(\)\\\/\í\ó\á\é\ú\#]/, null , /\r\n\t\u00a0/],
            // Escaping text spans
            [PR.PR_COMMENT, /^(?:<!--|-->)/],
            // A number possibly containing a suffix.
            [PR.PR_LITERAL, /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
            // A hex color
            [PR.PR_LITERAL, /^#(?:[0-9a-f]{3}){1,2}\b/i],
            // An identifier
            [PR.PR_PLAIN,
                /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],
            // A run of punctuation
            //[PR.PR_PUNCTUATION, /^[^\s\w\'\"]+/, null, /[^;\[\]\{\}\(\)]/]
        ]
    ),
    ['css']
);
PR.registerLangHandler(
    PR.createSimpleLexer(
        [],
        [
            [PR.PR_KEYWORD, /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]
        ]
    ),
    ['css-kw']
);
PR.registerLangHandler(
    PR.createSimpleLexer(
        [],
        [
            [PR.PR_STRING, /^[^\)\"\']+/]
        ]
    ),
    ['css-str']
);