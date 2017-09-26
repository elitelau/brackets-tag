/*
 *
 * Modification according to Pedelman.surround, by Elite Liu
 *
 *
 * Copyright (c) 2012 Patrick Edelman. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, window, $, Mustache */

define(function (require, exports, module) {
    'use strict';

    var CommandManager  = brackets.getModule("command/CommandManager"),
        Menus           = brackets.getModule("command/Menus"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        editMenu        = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU),
        cases = {
            '('    :   ')',
            '{'    :   '}',
            '{{'   :  '}}',
            '<'    :   '>',
            '['    :   ']',
            '/*'   :  '*/',
            '<!--' : '-->',
            '<%'   :  '%>',
            '<%='  :  '%>'
        };

    /*
     * reserver peldeman's surround shortcut: Ctrl-Shift-J
     */
    var command_id_list = {
                        tagBook : "elitelau.tagBook", 
                        tagChapter: "elitelau.tagChapter",
                        tagText: "elitelau.tagText",
                        tagZ0: "elitelau.tagZ0",
                        tagZ1: "elitelau.tagZ1",
                        tagZ2: "elitelau.tagZ2",
                        tagS0: "elitelau.tagS0",
                        tagS1: "elitelau.tagS1",
                        tagS2: "elitelau.tagS2",
                        tagAuthor: "elitelau.tagAuthor",
                        tagExtra: "elitelau.tagExtra",
                        tagSegment: "elitelau.tagSegment"
                       }; 

    var command_shortcut_list = {
                        tagBook : "Ctrl-Shift-B",
                        tagChapter : "Ctrl-Shift-H",
                        tagText : "Ctrl-Shift-T",
                        tagZ0: "Ctrl-Shift-Z",
                        tagZ1: "Ctrl-Shift-X",
                        tagZ2: "Ctrl-Shift-C",
                        tagS0: "Ctrl-Shift-S",
                        tagS1: "Ctrl-Shift-D",
                        tagS2: "Ctrl-Shift-F",
                        tagAuthor: "Ctrl-Shift-A",
                        tagExtra: "Ctrl-Shift-L",   
                        tagSegment: "Ctrl-Shift-K"
                       };  

     var command_tag_list = {
                        tagBook     : "<book>",
                        tagChapter  : "<chapter>",
                        tagText     : "<t>",
                        tagZ0       : "<z0>",
                        tagZ1       : "<z1>",
                        tagZ2       : "<z2>",
                        tagS0       : "<s0>",
                        tagS1       : "<s1>",
                        tagS2       : "<s2>",
                        tagAuthor   : "<author>",
                        tagExtra    : "<extra>",   
                        tagSegment  : "<segment>"
                       };

    /*
     * _getSelectedText()
     * @private
     * Returns the text that has been selected in the editor window in focus     
     */
    function _getSelectedText() {
        return EditorManager.getActiveEditor().getSelectedText();
    }

    /*
     * _replaceActiveString(str)
     * @private     
     * Replaces the currently selected text with the passed string param 
     * @param {String} str
     */
    function _replaceActiveSelection(str) {
        EditorManager.getActiveEditor()._codeMirror.replaceSelection(str);
        EditorManager.getActiveEditor();
        EditorManager.focusEditor();
    }

    /*
     * _isHTML(str)
     * @private
     * Parses text to see if is opening HTML tag. Returns true if found.
     * @param {String} str
     */
    function _isHTML(str) {
        var _html_re = new RegExp("<([a-z]+)([^<]+)*(?:>)", "g");
        if (str.match(_html_re)) {
            return true;
        }
        return false;
    }

    /*
     * _closeHTML(str)
     * @private
     * Generates and returns a closing tag from passed in open tag.
     * @param {String} str
     */
    function _closeHTML(str) {
        var _tag_type = new RegExp("[a-zA-Z0-9]+", ""),
            _tag = str.match(_tag_type);
        console.log(_tag);
        if (_tag[0] === "img") {
            console.log(_tag);
            return false;
        }
        return ("</" + _tag + ">");
    }

    /*
     * surround()
     * Description
     * Adds surround text and replace the current selection
     */
    function surround2(command) {
        var _t = _getSelectedText(),
            _output = "";
        var _c = command_tag_list[command]; 
        _output = _c + _t + _closeHTML(_c);
        _replaceActiveSelection(_output);
    }

    function surround_with_tagBook() {
        surround2('tagBook');
    }
                                      
    function surround_with_tagChapter() {
        surround2('tagChapter');
    }
                                      
    function surround_with_tagText() {
        surround2('tagText');
    }
                                      
    function surround_with_tagAuthor() {
        surround2('tagAuthor');
    }
                                      
    function surround_with_tagZ0() {
        surround2('tagZ0');
    }
                                      
    function surround_with_tagZ1() {
        surround2('tagZ1');
    }
                                      
    function surround_with_tagZ2() {
        surround2('tagZ2');
    }
                                      
    function surround_with_tagS0() {
        surround2('tagS0');
    }
                                      
    function surround_with_tagS1() {
        surround2('tagS1');
    }
                                      
    function surround_with_tagS2() {
        surround2('tagS2');
    }
                                      
    function surround_with_tagExtra() {
        surround2('tagExtra');
    }
                                      
    function surround_with_tagSegment() {
        surround2('tagSegment');
    }
                                      
    CommandManager.register('tagBook', command_id_list['tagBook'], surround_with_tagBook);
    editMenu.addMenuItem('tagBook', "Ctrl-Shift-B");

    CommandManager.register('tagChapter', command_id_list['tagChapter'], surround_with_tagChapter);
    editMenu.addMenuItem('tagChapter', "Ctrl-Shift-H");

    CommandManager.register('tagText', command_id_list['tagText'], surround_with_tagText);
    editMenu.addMenuItem('tagText', "Ctrl-Shift-T");

    CommandManager.register('tagAuthor', command_id_list['tagAuthor'], surround_with_tagAuthor);
    editMenu.addMenuItem('tagAuthor', "Ctrl-Shift-A");

    CommandManager.register('tagZ0', command_id_list['tagZ0'], surround_with_tagZ0);
    editMenu.addMenuItem('tagZ0', "Ctrl-Shift-Z");

    CommandManager.register('tagZ1', command_id_list['tagZ1'], surround_with_tagZ1);
    editMenu.addMenuItem('tagZ1', "Ctrl-Shift-X");

    CommandManager.register('tagZ2', command_id_list['tagZ2'], surround_with_tagZ2);
    editMenu.addMenuItem('tagZ2', "Ctrl-Shift-C");

    CommandManager.register('tagS0', command_id_list['tagS0'], surround_with_tagS0);
    editMenu.addMenuItem('tagS0', "Ctrl-Shift-S");

    CommandManager.register('tagS1', command_id_list['tagS1'], surround_with_tagS1);
    editMenu.addMenuItem('tagS1', "Ctrl-Shift-D");

    CommandManager.register('tagS2', command_id_list['tagS2'], surround_with_tagS2);
    editMenu.addMenuItem('tagS2', "Ctrl-Shift-F");

    CommandManager.register('tagExtra', command_id_list['tagExtra'], surround_with_tagExtra);
    editMenu.addMenuItem('tagExtra', "Ctrl-Shift-L");

    CommandManager.register('tagSegment', command_id_list['tagSegment'], surround_with_tagSegment);
    editMenu.addMenuItem('tagSegment', "Ctrl-Shift-K");
});
