/*
 * Hanna Code plugin for CKEditor
 *
 * Hanna Code plugin is intended to work as a helper for using Hanna codes
 * on your site in an RTE. It adds a context menu item "Hanna Code", which
 * opens a dialog with select menu consisting of all available Hanna codes.
 *
 * Note: this plugin is only intended for use with ProcessWire CMS/CMF with
 * Hanna Code module and additional helper module installed. Both of these
 * can be downloaded/cloned from GitHub:
 * 
 * - https://github.com/ryancramerdesign/ProcessHannaCode
 * - https://github.com/teppokoivula/HannaCodeHelper
 *
 * @author Teppo Koivula <teppo@flamingruby.com>
 * @copyright Copyright (c) 2013, Teppo Koivula
 *
 * ProcessWire 2.x 
 * Copyright (C) 2013 by Ryan Cramer 
 * Licensed under GNU/GPL v2, see LICENSE.TXT
 * 
 * http://processwire.com
 *
 */

CKEDITOR.plugins.add('hannacode', {
    lang: ['fi', 'en'],
    init: function(editor) {

        // add new dialog
        CKEDITOR.dialog.add('HannaCodeDialog', function(editor) {
            return {
                // CKEDITOR.dialog.definition
                title: editor.lang.hannacode.dialogTitle,
                minWidth: 390,
                minHeight: 130,
                contents: [
                    {
                        id: 'tags',
                        label: editor.lang.hannacode.tagsLabel,
                        title: editor.lang.hannacode.tagsTitle,
                        expand: true,
                        padding: 0,
                        elements: [
                            { type: 'html', html: editor.lang.hannacode.tagsHTML },
                            { type: 'select', id: 'tag', items: hanna_code_tags }
                        ]
                    }
                ],
                onOk: function() {
                    // "this" is now a CKEDITOR.dialog object
                    var tag = this.getValueOf('tags', 'tag');
                    editor.insertHtml(tag);
                }
            };
        });
        
        // add dialog command
        editor.addCommand(
            'HannaCodeCommand', 
            new CKEDITOR.dialogCommand('HannaCodeDialog')
        );
        
        // add context menu item
        if (editor.contextMenu) {
            editor.addMenuGroup('HannaCodeGroup', 10);
            editor.addMenuItem('HannaCodeItem', {
                label: editor.lang.hannacode.menuLabel,
                command: 'HannaCodeCommand',
                group: 'HannaCodeGroup',
                icon: this.path + 'icon.png'
            });
            editor.contextMenu.addListener(function(element) {
                return { HannaCodeItem: CKEDITOR.TRISTATE_OFF };
            });
        }
        
    }
});
