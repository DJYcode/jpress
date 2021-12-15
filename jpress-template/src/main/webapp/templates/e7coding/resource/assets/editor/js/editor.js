function isHeadingRow(e) {
    var t = e.parentNode;
    return "THEAD" === t.nodeName || t.firstChild === e && ("TABLE" === t.nodeName || isFirstTbody(t)) && Array.prototype.every.call(e.childNodes, function (e) {
        return "TH" === e.nodeName
    })
}

function isFirstTbody(e) {
    var t = e.previousSibling;
    return "TBODY" === e.nodeName && (!t || "THEAD" === t.nodeName && /^\s*$/i.test(t.textContent))
}

function cell(e, t) {
    var i = Array.prototype.indexOf.call(t.parentNode.childNodes, t), o = " ";
    return 0 === i && (o = "| "), e = e.replace("\n", ""), o + e + " |"
}

function merge_options(e, t) {
    var i = {};
    for (var o in e) i[o] = e[o];
    for (var o in t) i[o] = t[o];
    return i
}

!function (e) {
    "use strict";
    "function" == typeof require && "object" == typeof exports && "object" == typeof module ? module.exports = e : "function" == typeof define ? define.amd || define(["jquery"], e) : window.editormd = e()
}(function () {
    "use strict";
    var e = "undefined" != typeof jQuery ? jQuery : Zepto;
    if (void 0 !== e) {
        var t = function (e, i) {
            return new t.fn.init(e, i)
        };
        t.title = t.$name = "Editor.md", t.version = "1.5.0", t.homePage = "https://pandao.github.io/editor.md/", t.classPrefix = "editormd-", t.toolbarModes = {
            full: ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|", "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|", "help", "info"],
            simple: ["undo", "redo", "|", "bold", "del", "italic", "quote", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "list-ul", "list-ol", "hr", "|", "watch", "preview", "fullscreen", "|", "help", "info"],
            mini: ["undo", "redo", "|", "watch", "preview", "|", "help", "info"]
        }, t.defaults = {
            mode: "gfm",
            name: "",
            value: "",
            theme: "",
            editorTheme: "default",
            previewTheme: "",
            markdown: "",
            appendMarkdown: "",
            width: "100%",
            height: "100%",
            path: "../lib/",
            pluginPath: "",
            delay: 300,
            autoLoadModules: !0,
            watch: !0,
            placeholder: "Enjoy Markdown! coding now...",
            gotoLine: !0,
            codeFold: !1,
            autoHeight: !1,
            autoFocus: !0,
            autoCloseTags: !0,
            searchReplace: !1,
            syncScrolling: !0,
            readOnly: !1,
            tabSize: 4,
            indentUnit: 4,
            lineNumbers: !0,
            lineWrapping: !0,
            autoCloseBrackets: !0,
            showTrailingSpace: !0,
            matchBrackets: !0,
            indentWithTabs: !0,
            styleSelectedText: !0,
            matchWordHighlight: !0,
            styleActiveLine: !0,
            dialogLockScreen: !0,
            dialogShowMask: !0,
            dialogDraggable: !0,
            dialogMaskBgColor: "#fff",
            dialogMaskOpacity: .1,
            fontSize: "13px",
            saveHTMLToTextarea: !1,
            disabledKeyMaps: [],
            onload: function () {
            },
            onresize: function () {
            },
            onchange: function () {
            },
            onwatch: null,
            onunwatch: null,
            onpreviewing: function () {
            },
            onpreviewed: function () {
            },
            onfullscreen: function () {
            },
            onfullscreenExit: function () {
            },
            onscroll: function () {
            },
            onpreviewscroll: function () {
            },
            imageUpload: !1,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "",
            crossDomainUpload: !1,
            uploadCallbackURL: "",
            toc: !0,
            tocm: !1,
            tocTitle: "",
            tocDropdown: !1,
            tocContainer: "",
            tocStartLevel: 1,
            htmlDecode: !0,
            pageBreak: !0,
            atLink: !0,
            emailLink: !0,
            taskList: !1,
            emoji: !1,
            tex: !1,
            flowChart: !1,
            sequenceDiagram: !1,
            previewCodeHighlight: !0,
            toolbar: !0,
            toolbarAutoFixed: !0,
            toolbarIcons: "full",
            toolbarTitles: {},
            toolbarHandlers: {
                ucwords: function () {
                    return t.toolbarHandlers.ucwords
                }, lowercase: function () {
                    return t.toolbarHandlers.lowercase
                }
            },
            toolbarCustomIcons: {
                lowercase: '<a href="javascript:;" title="Lowercase" unselectable="on"><i class="fa" name="lowercase" style="font-size:24px;margin-top: -10px;">a</i></a>',
                ucwords: '<a href="javascript:;" title="ucwords" unselectable="on"><i class="fa" name="ucwords" style="font-size:20px;margin-top: -3px;">Aa</i></a>'
            },
            toolbarIconsClass: {
                undo: "fa-undo",
                redo: "fa-repeat",
                bold: "fa-bold",
                del: "fa-strikethrough",
                italic: "fa-italic",
                quote: "fa-quote-left",
                uppercase: "fa-font",
                h1: t.classPrefix + "bold",
                h2: t.classPrefix + "bold",
                h3: t.classPrefix + "bold",
                h4: t.classPrefix + "bold",
                h5: t.classPrefix + "bold",
                h6: t.classPrefix + "bold",
                "list-ul": "fa-list-ul",
                "list-ol": "fa-list-ol",
                hr: "fa-minus",
                link: "fa-link",
                "reference-link": "fa-anchor",
                image: "fa-picture-o",
                code: "fa-code",
                "preformatted-text": "fa-file-code-o",
                "code-block": "fa-file-code-o",
                table: "fa-table",
                datetime: "fa-clock-o",
                emoji: "fa-smile-o",
                "html-entities": "fa-copyright",
                pagebreak: "fa-newspaper-o",
                "goto-line": "fa-terminal",
                watch: "fa-eye-slash",
                unwatch: "fa-eye",
                preview: "fa-desktop",
                search: "fa-search",
                fullscreen: "fa-arrows-alt",
                clear: "fa-eraser",
                help: "fa-question-circle",
                info: "fa-info-circle"
            },
            toolbarIconTexts: {},
            lang: {
                name: "zh-cn",
                description: "开源在线Markdown编辑器<br/>Open source online Markdown editor.",
                tocTitle: "目录",
                toolbar: {
                    undo: "撤销（Ctrl+Z）",
                    redo: "重做（Ctrl+Y）",
                    bold: "粗体",
                    del: "删除线",
                    italic: "斜体",
                    quote: "引用",
                    ucwords: "将每个单词首字母转成大写",
                    uppercase: "将所选转换成大写",
                    lowercase: "将所选转换成小写",
                    h1: "标题1",
                    h2: "标题2",
                    h3: "标题3",
                    h4: "标题4",
                    h5: "标题5",
                    h6: "标题6",
                    "list-ul": "无序列表",
                    "list-ol": "有序列表",
                    hr: "横线",
                    link: "链接",
                    "reference-link": "引用链接",
                    image: "添加图片",
                    code: "行内代码",
                    "preformatted-text": "预格式文本 / 代码块（缩进风格）",
                    "code-block": "代码块（多语言风格）",
                    table: "添加表格",
                    datetime: "日期时间",
                    emoji: "Emoji表情",
                    "html-entities": "HTML实体字符",
                    pagebreak: "插入分页符",
                    "goto-line": "跳转到行",
                    watch: "关闭实时预览",
                    unwatch: "开启实时预览",
                    preview: "全窗口预览HTML（按 Shift + ESC还原）",
                    fullscreen: "全屏（按ESC还原）",
                    clear: "清空",
                    search: "搜索",
                    help: "使用帮助",
                    info: "关于" + t.title
                },
                buttons: {enter: "确定", cancel: "取消", close: "关闭"},
                dialog: {
                    link: {title: "添加链接", url: "链接地址", urlTitle: "链接标题", urlEmpty: "错误：请填写链接地址。"},
                    referenceLink: {
                        title: "添加引用链接",
                        name: "引用名称",
                        url: "链接地址",
                        urlId: "链接ID",
                        urlTitle: "链接标题",
                        nameEmpty: "错误：引用链接的名称不能为空。",
                        idEmpty: "错误：请填写引用链接的ID。",
                        urlEmpty: "错误：请填写引用链接的URL地址。"
                    },
                    image: {
                        title: "添加图片",
                        url: "图片地址",
                        link: "图片链接",
                        alt: "图片描述",
                        uploadButton: "本地上传",
                        imageURLEmpty: "错误：图片地址不能为空。",
                        uploadFileEmpty: "错误：上传的图片不能为空。",
                        formatNotAllowed: "错误：只允许上传图片文件，允许上传的图片文件格式有："
                    },
                    preformattedText: {title: "添加预格式文本或代码块", emptyAlert: "错误：请填写预格式文本或代码的内容。"},
                    codeBlock: {
                        title: "添加代码块",
                        selectLabel: "代码语言：",
                        selectDefaultText: "请选择代码语言",
                        otherLanguage: "其他语言",
                        unselectedLanguageAlert: "错误：请选择代码所属的语言类型。",
                        codeEmptyAlert: "错误：请填写代码内容。"
                    },
                    htmlEntities: {title: "HTML 实体字符"},
                    help: {title: "使用帮助"}
                }
            }
        }, t.classNames = {tex: t.classPrefix + "tex"}, t.dialogZindex = 99999, t.$katex = null, t.$marked = null, t.$CodeMirror = null, t.$prettyPrint = null;
        var i, o;
        t.prototype = t.fn = {
            state: {watching: !1, loaded: !1, preview: !1, fullscreen: !1}, init: function (i, o) {
                o = o || {}, "object" == typeof i && (o = i);
                var n = this.classPrefix = t.classPrefix, r = this.settings = e.extend(!0, {}, t.defaults, o);
                i = "object" == typeof i ? r.id : i;
                var a = this.editor = e("#" + i);
                this.id = i, this.lang = r.lang;
                var s = this.classNames = {textarea: {html: n + "html-textarea", markdown: n + "markdown-textarea"}};
                r.pluginPath = "" === r.pluginPath ? r.path + "../plugins/" : r.pluginPath, this.state.watching = !!r.watch, a.hasClass("editormd") || a.addClass("editormd"), a.css({
                    width: "number" == typeof r.width ? r.width + "px" : r.width,
                    height: "number" == typeof r.height ? r.height + "px" : r.height
                }), r.autoHeight && a.css("height", "auto");
                var l = this.markdownTextarea = a.children("textarea");
                l.length < 1 && (a.append("<textarea></textarea>"), l = this.markdownTextarea = a.children("textarea")), l.addClass(s.textarea.markdown).attr("placeholder", r.placeholder), void 0 !== l.attr("name") && "" !== l.attr("name") || l.attr("name", "" !== r.name ? r.name : i + "-markdown-doc");
                var c = [r.readOnly ? "" : '<a href="javascript:;" class="fa fa-close ' + n + 'preview-close-btn"></a>', r.saveHTMLToTextarea ? '<textarea class="' + s.textarea.html + '" name="' + i + '-html-code"></textarea>' : "", '<div class="' + n + 'preview"><div class="markdown-body ' + n + 'preview-container"></div></div>', '<div class="' + n + 'container-mask" style="display:block;"></div>', '<div class="' + n + 'mask"></div>'].join("\n");
                return a.append(c).addClass(n + "vertical"), "" !== r.theme && a.addClass(n + "theme-" + r.theme), this.mask = a.children("." + n + "mask"), this.containerMask = a.children("." + n + "container-mask"), "" !== r.markdown && l.val(r.markdown), "" !== r.appendMarkdown && l.val(l.val() + r.appendMarkdown), this.htmlTextarea = a.children("." + s.textarea.html), this.preview = a.children("." + n + "preview"), this.previewContainer = this.preview.children("." + n + "preview-container"), "" !== r.previewTheme && this.preview.addClass(n + "preview-theme-" + r.previewTheme), "function" == typeof define && define.amd && ("undefined" != typeof katex && (t.$katex = katex), r.searchReplace && !r.readOnly && (t.loadCSS(r.path + "codemirror/addon/dialog/dialog"), t.loadCSS(r.path + "codemirror/addon/search/matchesonscrollbar"))), "function" == typeof define && define.amd || !r.autoLoadModules ? ("undefined" != typeof CodeMirror && (t.$CodeMirror = CodeMirror), "undefined" != typeof marked && (t.$marked = marked), this.setCodeMirror().setToolbar().loadedDisplay()) : this.loadQueues(), this
            }, loadQueues: function () {
                var e = this, i = this.settings, o = i.path, n = function () {
                    if (t.isIE8) return void e.loadedDisplay();
                    i.flowChart || i.sequenceDiagram ? t.loadScript(o + "raphael.min", function () {
                        t.loadScript(o + "underscore.min", function () {
                            !i.flowChart && i.sequenceDiagram ? t.loadScript(o + "sequence-diagram.min", function () {
                                e.loadedDisplay()
                            }) : i.flowChart && !i.sequenceDiagram ? t.loadScript(o + "flowchart.min", function () {
                                t.loadScript(o + "jquery.flowchart.min", function () {
                                    e.loadedDisplay()
                                })
                            }) : i.flowChart && i.sequenceDiagram && t.loadScript(o + "flowchart.min", function () {
                                t.loadScript(o + "jquery.flowchart.min", function () {
                                    t.loadScript(o + "sequence-diagram.min", function () {
                                        e.loadedDisplay()
                                    })
                                })
                            })
                        })
                    }) : e.loadedDisplay()
                };
                return t.loadCSS(o + "codemirror/codemirror.min"), i.searchReplace && !i.readOnly && (t.loadCSS(o + "codemirror/addon/dialog/dialog"), t.loadCSS(o + "codemirror/addon/search/matchesonscrollbar")), i.codeFold && t.loadCSS(o + "codemirror/addon/fold/foldgutter"), t.loadScript(o + "codemirror/codemirror.min", function () {
                    t.$CodeMirror = CodeMirror, t.loadScript(o + "codemirror/modes.min", function () {
                        t.loadScript(o + "codemirror/addons.min", function () {
                            if (e.setCodeMirror(), "gfm" !== i.mode && "markdown" !== i.mode) return e.loadedDisplay(), !1;
                            e.setToolbar(), t.$marked = marked, n()
                        })
                    })
                }), this
            }, setTheme: function (e) {
                var t = this.editor, i = this.settings.theme, o = this.classPrefix + "theme-";
                return t.removeClass(o + i).addClass(o + e), this.settings.theme = e, this
            }, setEditorTheme: function (e) {
                var i = this.settings;
                return i.editorTheme = e, "default" !== e && t.loadCSS(i.path + "codemirror/theme/" + i.editorTheme), this.cm.setOption("theme", e), this
            }, setCodeMirrorTheme: function (e) {
                return this.setEditorTheme(e), this
            }, setPreviewTheme: function (e) {
                var t = this.preview, i = this.settings.previewTheme, o = this.classPrefix + "preview-theme-";
                return t.removeClass(o + i).addClass(o + e), this.settings.previewTheme = e, this
            }, setCodeMirror: function () {
                var e = this.settings, i = this.editor;
                "default" !== e.editorTheme && t.loadCSS(e.path + "codemirror/theme/" + e.editorTheme);
                var o = {
                    mode: e.mode,
                    theme: e.editorTheme,
                    tabSize: e.tabSize,
                    dragDrop: !0,
                    autofocus: e.autoFocus,
                    autoCloseTags: e.autoCloseTags,
                    readOnly: !!e.readOnly && "nocursor",
                    indentUnit: e.indentUnit,
                    lineNumbers: e.lineNumbers,
                    lineWrapping: e.lineWrapping,
                    extraKeys: {
                        "Cmd-Q": function (e) {
                            e.foldCode(e.getCursor())
                        }
                    },
                    foldGutter: e.codeFold,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    matchBrackets: e.matchBrackets,
                    indentWithTabs: e.indentWithTabs,
                    styleActiveLine: e.styleActiveLine,
                    styleSelectedText: e.styleSelectedText,
                    autoCloseBrackets: e.autoCloseBrackets,
                    showTrailingSpace: e.showTrailingSpace,
                    highlightSelectionMatches: !!e.matchWordHighlight && {showToken: "onselected" !== e.matchWordHighlight && /\w/}
                };
                return this.codeEditor = this.cm = t.$CodeMirror.fromTextArea(this.markdownTextarea[0], o), this.codeMirror = this.cmElement = i.children(".CodeMirror"), "" !== e.value && this.cm.setValue(e.value), this.codeMirror.css({
                    fontSize: e.fontSize,
                    width: e.watch ? "50%" : "100%"
                }), e.autoHeight && (this.codeMirror.css("height", "auto"), this.cm.setOption("viewportMargin", 1 / 0)), e.lineNumbers || this.codeMirror.find(".CodeMirror-gutters").css("border-right", "none"), this
            }, getCodeMirrorOption: function (e) {
                return this.cm.getOption(e)
            }, setCodeMirrorOption: function (e, t) {
                return this.cm.setOption(e, t), this
            }, addKeyMap: function (e, t) {
                return this.cm.addKeyMap(e, t), this
            }, removeKeyMap: function (e) {
                return this.cm.removeKeyMap(e), this
            }, gotoLine: function (t) {
                var i = this.settings;
                if (!i.gotoLine) return this;
                var o = this.cm, n = (this.editor, o.lineCount()), r = this.preview;
                if ("string" == typeof t && ("last" === t && (t = n), "first" === t && (t = 1)), "number" != typeof t) return alert("Error: The line number must be an integer."), this;
                if ((t = parseInt(t) - 1) > n) return alert("Error: The line number range 1-" + n), this;
                o.setCursor({line: t, ch: 0});
                var a = o.getScrollInfo(), s = a.clientHeight, l = o.charCoords({line: t, ch: 0}, "local");
                if (o.scrollTo(null, (l.top + l.bottom - s) / 2), i.watch) {
                    var c = this.codeMirror.find(".CodeMirror-scroll")[0], d = e(c).height(), h = c.scrollTop,
                        u = h / c.scrollHeight;
                    0 === h ? r.scrollTop(0) : h + d >= c.scrollHeight - 16 ? r.scrollTop(r[0].scrollHeight) : r.scrollTop(r[0].scrollHeight * u)
                }
                return o.focus(), this
            }, extend: function () {
                return void 0 !== arguments[1] && ("function" == typeof arguments[1] && (arguments[1] = e.proxy(arguments[1], this)), this[arguments[0]] = arguments[1]), "object" == typeof arguments[0] && void 0 === arguments[0].length && e.extend(!0, this, arguments[0]), this
            }, set: function (t, i) {
                return void 0 !== i && "function" == typeof i && (i = e.proxy(i, this)), this[t] = i, this
            }, config: function (t, i) {
                var o = this.settings;
                return "object" == typeof t && (o = e.extend(!0, o, t)), "string" == typeof t && (o[t] = i), this.settings = o, this.recreate(), this
            }, on: function (t, i) {
                var o = this.settings;
                return void 0 !== o["on" + t] && (o["on" + t] = e.proxy(i, this)), this
            }, off: function (e) {
                var t = this.settings;
                return void 0 !== t["on" + e] && (t["on" + e] = function () {
                }), this
            }, showToolbar: function (t) {
                var i = this.settings;
                return i.readOnly ? this : (i.toolbar && (this.toolbar.length < 1 || "" === this.toolbar.find("." + this.classPrefix + "menu").html()) && this.setToolbar(), i.toolbar = !0, this.toolbar.show(), this.resize(), e.proxy(t || function () {
                }, this)(), this)
            }, hideToolbar: function (t) {
                return this.settings.toolbar = !1, this.toolbar.hide(), this.resize(), e.proxy(t || function () {
                }, this)(), this
            }, setToolbarAutoFixed: function (t) {
                var i = this.state, o = this.editor, n = this.toolbar, r = this.settings;
                void 0 !== t && (r.toolbarAutoFixed = t);
                var a = function () {
                    var t = e(window), i = t.scrollTop();
                    if (!r.toolbarAutoFixed) return !1;
                    i - o.offset().top > 10 && i < o.height() ? n.css({
                        position: "fixed",
                        width: o.width() + "px",
                        left: (t.width() - o.width()) / 2 + "px"
                    }) : n.css({position: "absolute", width: "100%", left: 0})
                };
                return !i.fullscreen && !i.preview && r.toolbar && r.toolbarAutoFixed && e(window).bind("scroll", a), this
            }, setToolbar: function () {
                var i = this.settings;
                if (i.readOnly) return this;
                var o = this.editor, n = (this.preview, this.classPrefix),
                    r = this.toolbar = o.children("." + n + "toolbar");
                if (i.toolbar && r.length < 1) {
                    var a = '<div class="' + n + 'toolbar"><div class="' + n + 'toolbar-container"><ul class="' + n + 'menu"></ul></div></div>';
                    o.append(a), r = this.toolbar = o.children("." + n + "toolbar")
                }
                if (!i.toolbar) return r.hide(), this;
                r.show();
                for (var s = "function" == typeof i.toolbarIcons ? i.toolbarIcons() : "string" == typeof i.toolbarIcons ? t.toolbarModes[i.toolbarIcons] : i.toolbarIcons, l = r.find("." + this.classPrefix + "menu"), c = "", d = !1, h = 0, u = s.length; h < u; h++) {
                    var f = s[h];
                    if ("||" === f) d = !0; else if ("|" === f) c += '<li class="divider" unselectable="on">|</li>'; else {
                        var g = /h(\d)/.test(f), m = f;
                        "watch" !== f || i.watch || (m = "unwatch");
                        var p = i.lang.toolbar[m], v = i.toolbarIconTexts[m], w = i.toolbarIconsClass[m];
                        p = void 0 === p ? "" : p, v = void 0 === v ? "" : v, w = void 0 === w ? "" : w;
                        var b = d ? '<li class="pull-right">' : "<li>";
                        void 0 !== i.toolbarCustomIcons[f] && "function" != typeof i.toolbarCustomIcons[f] ? b += i.toolbarCustomIcons[f] : (b += '<a class=" ui popover " href="javascript:;" title="' + p + '" unselectable="on">', b += '<i class="fa ' + w + '" name="' + f + '" unselectable="on">' + (g ? f.toUpperCase() : "" === w ? v : "") + "</i>", b += "</a>"), b += "</li>", c = d ? b + c : c + b
                    }
                }
                return l.html(c), l.find('[title="Lowercase"]').attr("title", i.lang.toolbar.lowercase), l.find('[title="ucwords"]').attr("title", i.lang.toolbar.ucwords), this.setToolbarHandler(), this.setToolbarAutoFixed(), e(".editormd-menu .ui.popover").popup({
                    on: "hover",
                    position: "top center"
                }), this
            }, dialogLockScreen: function () {
                return e.proxy(t.dialogLockScreen, this)(), this
            }, dialogShowMask: function (i) {
                return e.proxy(t.dialogShowMask, this)(i), this
            }, getToolbarHandles: function (e) {
                var i = this.toolbarHandlers = t.toolbarHandlers;
                return e && void 0 !== toolbarIconHandlers[e] ? i[e] : i
            }, setToolbarHandler: function () {
                var i = this, o = this.settings;
                if (!o.toolbar || o.readOnly) return this;
                var n = this.toolbar, r = this.cm, a = this.classPrefix,
                    s = this.toolbarIcons = n.find("." + a + "menu > li > a"), l = this.getToolbarHandles();
                return s.bind(t.mouseOrTouch("click", "touchend"), function (t) {
                    var n = e(this).children(".fa"), a = n.attr("name"), s = r.getCursor(), c = r.getSelection();
                    if ("" !== a) return i.activeIcon = n, void 0 !== l[a] ? e.proxy(l[a], i)(r) : void 0 !== o.toolbarHandlers[a] && e.proxy(o.toolbarHandlers[a], i)(r, n, s, c), "link" !== a && "reference-link" !== a && "image" !== a && "code-block" !== a && "preformatted-text" !== a && "watch" !== a && "preview" !== a && "search" !== a && "fullscreen" !== a && "info" !== a && r.focus(), !1
                }), this
            }, createDialog: function (i) {
                return e.proxy(t.createDialog, this)(i)
            }, createInfoDialog: function () {
                var e = this, i = this.editor, o = this.classPrefix,
                    n = ['<div class="' + o + "dialog " + o + 'dialog-info" style="">', '<div class="' + o + 'dialog-container">', '<h1><i class="editormd-logo editormd-logo-lg editormd-logo-color"></i> ' + t.title + "<small>v" + t.version + "</small></h1>", "<p>" + this.lang.description + "</p>", '<p style="margin: 10px 0 20px 0;"><a href="' + t.homePage + '" target="_blank">' + t.homePage + ' <i class="fa fa-external-link"></i></a></p>', '<p style="font-size: 0.85em;">Copyright &copy; 2015 <a href="https://github.com/pandao" target="_blank" class="hover-link">Pandao</a>, The <a href="https://github.com/pandao/editor.md/blob/master/LICENSE" target="_blank" class="hover-link">MIT</a> License.</p>', "</div>", '<a href="javascript:;" class="fa fa-close ' + o + 'dialog-close"></a>', "</div>"].join("\n");
                i.append(n);
                var r = this.infoDialog = i.children("." + o + "dialog-info");
                return r.find("." + o + "dialog-close").bind(t.mouseOrTouch("click", "touchend"), function () {
                    e.hideInfoDialog()
                }), r.css("border", t.isIE8 ? "1px solid #ddd" : "").css("z-index", t.dialogZindex).show(), this.infoDialogPosition(), this
            }, infoDialogPosition: function () {
                var t = this.infoDialog, i = function () {
                    t.css({
                        top: (e(window).height() - t.height()) / 2 + "px",
                        left: (e(window).width() - t.width()) / 2 + "px"
                    })
                };
                return i(), e(window).resize(i), this
            }, showInfoDialog: function () {
                e("html,body").css("overflow-x", "hidden");
                var i = this.editor, o = this.settings,
                    n = this.infoDialog = i.children("." + this.classPrefix + "dialog-info");
                return n.length < 1 && this.createInfoDialog(), this.lockScreen(!0), this.mask.css({
                    opacity: o.dialogMaskOpacity,
                    backgroundColor: o.dialogMaskBgColor
                }).show(), n.css("z-index", t.dialogZindex).show(), this.infoDialogPosition(), this
            }, hideInfoDialog: function () {
                return e("html,body").css("overflow-x", ""), this.infoDialog.hide(), this.mask.hide(), this.lockScreen(!1), this
            }, lockScreen: function (e) {
                return t.lockScreen(e), this.resize(), this
            }, recreate: function () {
                var e = this.editor, t = this.settings;
                return this.codeMirror.remove(), this.setCodeMirror(), t.readOnly || (e.find(".editormd-dialog").length > 0 && e.find(".editormd-dialog").remove(), t.toolbar && (this.getToolbarHandles(), this.setToolbar())), this.loadedDisplay(!0), this
            }, previewCodeHighlight: function () {
                var e = this.settings, t = this.previewContainer;
                return e.previewCodeHighlight && (t.find("pre").addClass("prettyprint"), "undefined" != typeof prettyPrint && prettyPrint()), this
            }, katexRender: function () {
                return null === i ? this : (this.previewContainer.find("." + t.classNames.tex).each(function () {
                    var i = e(this);
                    t.$katex.render(i.text(), i[0])
                }), this)
            }, flowChartAndSequenceDiagramRender: function () {
                var i = this, n = this.settings, r = this.previewContainer;
                if (t.isIE8) return this;
                if (n.flowChart) {
                    if (null === o) return this;
                    r.find(".flowchart").flowChart()
                }
                n.sequenceDiagram && r.find(".sequence-diagram").sequenceDiagram({theme: "simple"});
                var a = i.preview, s = i.codeMirror, l = s.find(".CodeMirror-scroll"), c = l.height(),
                    d = l.scrollTop(), h = d / l[0].scrollHeight, u = 0;
                a.find(".markdown-toc-list").each(function () {
                    u += e(this).height()
                });
                var f = a.find(".editormd-toc-menu").height();
                return f = f || 0, 0 === d ? a.scrollTop(0) : d + c >= l[0].scrollHeight - 16 ? a.scrollTop(a[0].scrollHeight) : a.scrollTop((a[0].scrollHeight + u + f) * h), this
            }, registerKeyMaps: function (i) {
                var o = this, n = this.cm, r = this.settings, a = t.toolbarHandlers, s = r.disabledKeyMaps;
                if (i = i || null) {
                    for (var l in i) if (e.inArray(l, s) < 0) {
                        var c = {};
                        c[l] = i[l], n.addKeyMap(i)
                    }
                } else {
                    for (var d in t.keyMaps) {
                        var h = t.keyMaps[d], u = "string" == typeof h ? e.proxy(a[h], o) : e.proxy(h, o);
                        if (e.inArray(d, ["F9", "F10", "F11"]) < 0 && e.inArray(d, s) < 0) {
                            var f = {};
                            f[d] = u, n.addKeyMap(f)
                        }
                    }
                    e(window).keydown(function (t) {
                        var i = {120: "F9", 121: "F10", 122: "F11"};
                        if (e.inArray(i[t.keyCode], s) < 0) switch (t.keyCode) {
                            case 120:
                                return e.proxy(a.watch, o)(), !1;
                            case 121:
                                return e.proxy(a.preview, o)(), !1;
                            case 122:
                                return e.proxy(a.fullscreen, o)(), !1
                        }
                    })
                }
                return this
            }, bindScrollEvent: function () {
                var i = this, o = this.preview, n = this.settings, r = this.codeMirror, a = t.mouseOrTouch;
                if (!n.syncScrolling) return this;
                var s = function () {
                    r.find(".CodeMirror-scroll").bind(a("scroll", "touchmove"), function (t) {
                        var r = e(this).height(), a = e(this).scrollTop(), s = a / e(this)[0].scrollHeight, l = 0;
                        o.find(".markdown-toc-list").each(function () {
                            l += e(this).height()
                        });
                        var c = o.find(".editormd-toc-menu").height();
                        c = c || 0, 0 === a ? o.scrollTop(0) : a + r >= e(this)[0].scrollHeight - 16 ? o.scrollTop(o[0].scrollHeight) : o.scrollTop((o[0].scrollHeight + l + c) * s), e.proxy(n.onscroll, i)(t)
                    })
                }, l = function () {
                    r.find(".CodeMirror-scroll").unbind(a("scroll", "touchmove"))
                }, c = function () {
                    o.bind(a("scroll", "touchmove"), function (t) {
                        var o = e(this).height(), a = e(this).scrollTop(), s = a / e(this)[0].scrollHeight,
                            l = r.find(".CodeMirror-scroll");
                        0 === a ? l.scrollTop(0) : a + o >= e(this)[0].scrollHeight ? l.scrollTop(l[0].scrollHeight) : l.scrollTop(l[0].scrollHeight * s), e.proxy(n.onpreviewscroll, i)(t)
                    })
                }, d = function () {
                    o.unbind(a("scroll", "touchmove"))
                };
                return r.bind({
                    mouseover: s,
                    mouseout: l,
                    touchstart: s,
                    touchend: l
                }), "single" === n.syncScrolling ? this : (o.bind({
                    mouseover: c,
                    mouseout: d,
                    touchstart: c,
                    touchend: d
                }), this)
            }, bindChangeEvent: function () {
                var e = this, t = this.cm, o = this.settings;
                return o.syncScrolling ? (t.on("change", function (t, n) {
                    o.watch && e.previewContainer.css("padding", o.autoHeight ? "20px 20px 50px 40px" : "20px"), i = setTimeout(function () {
                        clearTimeout(i), e.save(), i = null
                    }, o.delay)
                }), this) : this
            }, loadedDisplay: function (t) {
                t = t || !1;
                var i = this, o = this.editor, n = this.preview, r = this.settings;
                return this.containerMask.hide(), this.save(), r.watch && n.show(), o.data("oldWidth", o.width()).data("oldHeight", o.height()), this.resize(), this.registerKeyMaps(), e(window).resize(function () {
                    i.resize()
                }), this.bindScrollEvent().bindChangeEvent(), t || e.proxy(r.onload, this)(), this.state.loaded = !0, this
            }, width: function (e) {
                return this.editor.css("width", "number" == typeof e ? e + "px" : e), this.resize(), this
            }, height: function (e) {
                return this.editor.css("height", "number" == typeof e ? e + "px" : e), this.resize(), this
            }, resize: function (t, i) {
                t = t || null, i = i || null;
                var o = this.state, n = this.editor, r = this.preview, a = this.toolbar, s = this.settings,
                    l = this.codeMirror;
                if (t && n.css("width", "number" == typeof t ? t + "px" : t), !s.autoHeight || o.fullscreen || o.preview ? (i && n.css("height", "number" == typeof i ? i + "px" : i), o.fullscreen && n.height(e(window).height()), s.toolbar && !s.readOnly ? l.css("margin-top", a.height() + 1).height(n.height() - a.height()) : l.css("margin-top", 0).height(n.height())) : (n.css("height", "auto"), l.css("height", "auto")), s.watch) if (l.width(n.width() / 2), r.width(o.preview ? n.width() : n.width() / 2), this.previewContainer.css("padding", s.autoHeight ? "20px 20px 50px 40px" : "20px"), s.toolbar && !s.readOnly ? r.css("top", a.height() + 1) : r.css("top", 0), !s.autoHeight || o.fullscreen || o.preview) {
                    var c = s.toolbar && !s.readOnly ? n.height() - a.height() : n.height();
                    r.height(c)
                } else r.height(""); else l.width(n.width()), r.hide();
                return o.loaded && e.proxy(s.onresize, this)(), this
            }, save: function () {
                var n = this, r = this.state, a = this.settings;
                if (null === i && (a.watch || !r.preview)) return this;
                var s = this.cm, l = s.getValue(), c = this.previewContainer;
                if ("gfm" !== a.mode && "markdown" !== a.mode) return this.markdownTextarea.val(l), this;
                var d = t.$marked, h = this.markdownToC = [], u = this.markedRendererOptions = {
                    toc: a.toc,
                    tocm: a.tocm,
                    tocStartLevel: a.tocStartLevel,
                    pageBreak: a.pageBreak,
                    taskList: a.taskList,
                    emoji: a.emoji,
                    tex: a.tex,
                    atLink: a.atLink,
                    emailLink: a.emailLink,
                    flowChart: a.flowChart,
                    sequenceDiagram: a.sequenceDiagram,
                    previewCodeHighlight: a.previewCodeHighlight
                }, f = this.markedOptions = {
                    renderer: t.markedRenderer(h, u),
                    gfm: !0,
                    tables: !0,
                    breaks: !0,
                    pedantic: !1,
                    sanitize: !1,
                    smartLists: !0,
                    smartypants: !0,
                    highlight: function (e, t) {
                        return Prism.languages.hasOwnProperty(t) || (t = Prism.languages[t] || "javascript"), Prism.highlight(e, Prism.languages[t])
                    }
                };
                d.setOptions(f);
                var g = t.$marked(l, f);
                if (g = t.filterHTMLTags(g, a.htmlDecode), this.markdownTextarea.text(l), s.save(), a.saveHTMLToTextarea && this.htmlTextarea.text(g), e('input[name="body_html"]').length && e('input[name="body_html"]').val(g), a.watch || !a.watch && r.preview) {
                    if (c.html(g), a.toc) {
                        var m = "" === a.tocContainer ? c : e(a.tocContainer),
                            p = m.find("." + this.classPrefix + "toc-menu");
                        m.attr("previewContainer", "" === a.tocContainer ? "true" : "false"), "" !== a.tocContainer && p.length > 0 && p.remove(), t.markdownToCRenderer(h, m, a.tocDropdown, a.tocStartLevel), (a.tocDropdown || m.find("." + this.classPrefix + "toc-menu").length > 0) && t.tocDropdownMenu(m, "" !== a.tocTitle ? a.tocTitle : this.lang.tocTitle), "" !== a.tocContainer && c.find(".markdown-toc").css("border", "none")
                    }
                    a.tex && (!t.kaTeXLoaded && a.autoLoadModules ? t.loadKaTeX(function () {
                        t.$katex = katex, t.kaTeXLoaded = !0, n.katexRender()
                    }) : (t.$katex = katex, this.katexRender())), (a.flowChart || a.sequenceDiagram) && (o = setTimeout(function () {
                        clearTimeout(o), n.flowChartAndSequenceDiagramRender(), o = null
                    }, 10)), r.loaded && e.proxy(a.onchange, this)()
                }
                return this
            }, focus: function () {
                return this.cm.focus(), this
            }, setCursor: function (e) {
                return this.cm.setCursor(e), this
            }, getCursor: function () {
                return this.cm.getCursor()
            }, setSelection: function (e, t) {
                return this.cm.setSelection(e, t), this
            }, getSelection: function () {
                return this.cm.getSelection()
            }, setSelections: function (e) {
                return this.cm.setSelections(e), this
            }, getSelections: function () {
                return this.cm.getSelections()
            }, replaceSelection: function (e) {
                return this.cm.replaceSelection(e), this
            }, insertValue: function (e) {
                return this.replaceSelection(e), this
            }, appendMarkdown: function (e) {
                var t = (this.settings, this.cm);
                return t.setValue(t.getValue() + e), this
            }, setMarkdown: function (e) {
                return this.cm.setValue(e || this.settings.markdown), this
            }, getMarkdown: function () {
                return this.cm.getValue()
            }, getValue: function () {
                return this.cm.getValue()
            }, setValue: function (e) {
                return this.cm.setValue(e), this
            }, clear: function () {
                return this.cm.setValue(""), this
            }, getHTML: function () {
                return this.settings.saveHTMLToTextarea ? this.htmlTextarea.val() : (alert("Error: settings.saveHTMLToTextarea == false"), !1)
            }, getTextareaSavedHTML: function () {
                return this.getHTML()
            }, getPreviewedHTML: function () {
                return this.settings.watch ? this.previewContainer.html() : (alert("Error: settings.watch == false"), !1)
            }, watch: function (t) {
                var o = this.settings;
                if (e.inArray(o.mode, ["gfm", "markdown"]) < 0) return this;
                if (this.state.watching = o.watch = !0, this.preview.show(), this.toolbar) {
                    var n = o.toolbarIconsClass.watch, r = o.toolbarIconsClass.unwatch,
                        a = this.toolbar.find(".fa[name=watch]");
                    a.parent().attr("title", o.lang.toolbar.watch), a.removeClass(r).addClass(n)
                }
                return this.codeMirror.css("border-right", "1px solid #ddd").width(this.editor.width() / 2), i = 0, this.save().resize(), o.onwatch || (o.onwatch = t || function () {
                }), e.proxy(o.onwatch, this)(), this
            }, unwatch: function (t) {
                var i = this.settings;
                if (this.state.watching = i.watch = !1, this.preview.hide(), this.toolbar) {
                    var o = i.toolbarIconsClass.watch, n = i.toolbarIconsClass.unwatch,
                        r = this.toolbar.find(".fa[name=watch]");
                    r.parent().attr("title", i.lang.toolbar.unwatch), r.removeClass(o).addClass(n)
                }
                return this.codeMirror.css("border-right", "none").width(this.editor.width()), this.resize(), i.onunwatch || (i.onunwatch = t || function () {
                }), e.proxy(i.onunwatch, this)(), this
            }, show: function (t) {
                t = t || function () {
                };
                var i = this;
                return this.editor.show(0, function () {
                    e.proxy(t, i)()
                }), this
            }, hide: function (t) {
                t = t || function () {
                };
                var i = this;
                return this.editor.hide(0, function () {
                    e.proxy(t, i)()
                }), this
            }, previewing: function () {
                var i = this, o = this.editor, n = this.preview, r = this.toolbar, a = this.settings,
                    s = this.codeMirror, l = this.previewContainer;
                if (e.inArray(a.mode, ["gfm", "markdown"]) < 0) return this;
                a.toolbar && r && (r.toggle(), r.find(".fa[name=preview]").toggleClass("active")), s.toggle();
                var c = function (e) {
                    e.shiftKey && 27 === e.keyCode && i.previewed()
                };
                "none" === s.css("display") ? (this.state.preview = !0, this.state.fullscreen && n.css("background", "#fff"), o.find("." + this.classPrefix + "preview-close-btn").show().bind(t.mouseOrTouch("click", "touchend"), function () {
                    i.previewed()
                }), a.watch ? l.css("padding", "") : this.save(), l.addClass(this.classPrefix + "preview-active"), n.show().css({
                    position: "",
                    top: 0,
                    width: o.width(),
                    height: a.autoHeight && !this.state.fullscreen ? "auto" : o.height()
                }), this.state.loaded && e.proxy(a.onpreviewing, this)(), e(window).bind("keyup", c)) : (e(window).unbind("keyup", c), this.previewed())
            }, previewed: function () {
                var i = this.editor, o = this.preview, n = this.toolbar, r = this.settings, a = this.previewContainer,
                    s = i.find("." + this.classPrefix + "preview-close-btn");
                return this.state.preview = !1, this.codeMirror.show(), r.toolbar && n.show(), o[r.watch ? "show" : "hide"](), s.hide().unbind(t.mouseOrTouch("click", "touchend")), a.removeClass(this.classPrefix + "preview-active"), r.watch && a.css("padding", "20px"), o.css({
                    background: null,
                    position: "absolute",
                    width: i.width() / 2,
                    height: r.autoHeight && !this.state.fullscreen ? "auto" : i.height() - n.height(),
                    top: r.toolbar ? n.height() : 0
                }), this.state.loaded && e.proxy(r.onpreviewed, this)(), this
            }, fullscreen: function () {
                var t = this, i = this.state, o = this.editor, n = (this.preview, this.toolbar), r = this.settings,
                    a = this.classPrefix + "fullscreen";
                n && n.find(".fa[name=fullscreen]").parent().toggleClass("active");
                var s = function (e) {
                    e.shiftKey || 27 !== e.keyCode || i.fullscreen && t.fullscreenExit()
                };
                return o.hasClass(a) ? (e(window).unbind("keyup", s), this.fullscreenExit()) : (i.fullscreen = !0, e("html,body").css("overflow", "hidden"), o.css({
                    width: e(window).width(),
                    height: e(window).height()
                }).addClass(a), this.resize(), e.proxy(r.onfullscreen, this)(), e(window).bind("keyup", s)), this
            }, fullscreenExit: function () {
                var t = this.editor, i = this.settings, o = this.toolbar, n = this.classPrefix + "fullscreen";
                return this.state.fullscreen = !1, o && o.find(".fa[name=fullscreen]").parent().removeClass("active"), e("html,body").css("overflow", ""), t.css({
                    width: t.data("oldWidth"),
                    height: t.data("oldHeight")
                }).removeClass(n), this.resize(), e.proxy(i.onfullscreenExit, this)(), this
            }, executePlugin: function (i, o) {
                var n = this, r = this.cm;
                return o = this.settings.pluginPath + o, "function" == typeof define ? void 0 === this[i] ? (alert("Error: " + i + " plugin is not found, you are not load this plugin."), this) : (this[i](r), this) : (e.inArray(o, t.loadFiles.plugin) < 0 ? t.loadPlugin(o, function () {
                    t.loadPlugins[i] = n[i], n[i](r)
                }) : e.proxy(t.loadPlugins[i], this)(r), this)
            }, search: function (e) {
                var t = this.settings;
                return t.searchReplace ? (t.readOnly || this.cm.execCommand(e || "find"), this) : (alert("Error: settings.searchReplace == false"), this)
            }, searchReplace: function () {
                return this.search("replace"), this
            }, searchReplaceAll: function () {
                return this.search("replaceAll"), this
            }
        }, t.fn.init.prototype = t.fn, t.dialogLockScreen = function () {
            (this.settings || {dialogLockScreen: !0}).dialogLockScreen && (e("html,body").css("overflow", "hidden"), this.resize())
        }, t.dialogShowMask = function (t) {
            var i = this.editor, o = this.settings || {dialogShowMask: !0};
            t.css({
                top: (e(window).height() - t.height()) / 2 + "px",
                left: (e(window).width() - t.width()) / 2 + "px"
            }), o.dialogShowMask && i.children("." + this.classPrefix + "mask").css("z-index", parseInt(t.css("z-index")) - 1).show()
        }, t.toolbarHandlers = {
            undo: function () {
                this.cm.undo()
            }, redo: function () {
                this.cm.redo()
            }, bold: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                e.replaceSelection("**" + i + "**"), "" === i && e.setCursor(t.line, t.ch + 2)
            }, del: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                e.replaceSelection("~~" + i + "~~"), "" === i && e.setCursor(t.line, t.ch + 2)
            }, italic: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                e.replaceSelection("*" + i + "*"), "" === i && e.setCursor(t.line, t.ch + 1)
            }, quote: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                0 !== t.ch ? (e.setCursor(t.line, 0), e.replaceSelection("> " + i), e.setCursor(t.line, t.ch + 2)) : e.replaceSelection("> " + i)
            }, ucfirst: function () {
                var e = this.cm, i = e.getSelection(), o = e.listSelections();
                e.replaceSelection(t.firstUpperCase(i)), e.setSelections(o)
            }, ucwords: function () {
                var e = this.cm, i = e.getSelection(), o = e.listSelections();
                e.replaceSelection(t.wordsFirstUpperCase(i)), e.setSelections(o)
            }, uppercase: function () {
                var e = this.cm, t = e.getSelection(), i = e.listSelections();
                e.replaceSelection(t.toUpperCase()), e.setSelections(i)
            }, lowercase: function () {
                var e = this.cm, t = (e.getCursor(), e.getSelection()), i = e.listSelections();
                e.replaceSelection(t.toLowerCase()), e.setSelections(i)
            }, h1: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                0 !== t.ch ? (e.setCursor(t.line, 0), e.replaceSelection("# " + i), e.setCursor(t.line, t.ch + 2)) : e.replaceSelection("# " + i)
            }, h2: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                0 !== t.ch ? (e.setCursor(t.line, 0), e.replaceSelection("## " + i), e.setCursor(t.line, t.ch + 3)) : e.replaceSelection("## " + i)
            }, h3: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                0 !== t.ch ? (e.setCursor(t.line, 0), e.replaceSelection("### " + i), e.setCursor(t.line, t.ch + 4)) : e.replaceSelection("### " + i)
            }, h4: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                0 !== t.ch ? (e.setCursor(t.line, 0), e.replaceSelection("#### " + i), e.setCursor(t.line, t.ch + 5)) : e.replaceSelection("#### " + i)
            }, h5: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                0 !== t.ch ? (e.setCursor(t.line, 0), e.replaceSelection("##### " + i), e.setCursor(t.line, t.ch + 6)) : e.replaceSelection("##### " + i)
            }, h6: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                0 !== t.ch ? (e.setCursor(t.line, 0), e.replaceSelection("###### " + i), e.setCursor(t.line, t.ch + 7)) : e.replaceSelection("###### " + i)
            }, "list-ul": function () {
                var e = this.cm, t = (e.getCursor(), e.getSelection());
                if ("" === t) e.replaceSelection("- " + t); else {
                    for (var i = t.split("\n"), o = 0, n = i.length; o < n; o++) i[o] = "" === i[o] ? "" : "- " + i[o];
                    e.replaceSelection(i.join("\n"))
                }
            }, "list-ol": function () {
                var e = this.cm, t = (e.getCursor(), e.getSelection());
                if ("" === t) e.replaceSelection("1. " + t); else {
                    for (var i = t.split("\n"), o = 0, n = i.length; o < n; o++) i[o] = "" === i[o] ? "" : o + 1 + ". " + i[o];
                    e.replaceSelection(i.join("\n"))
                }
            }, hr: function () {
                var e = this.cm, t = e.getCursor();
                e.getSelection();
                e.replaceSelection((0 !== t.ch ? "\n\n" : "\n") + "------------\n\n")
            }, tex: function () {
                if (!this.settings.tex) return alert("settings.tex === false"), this;
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                e.replaceSelection("$$" + i + "$$"), "" === i && e.setCursor(t.line, t.ch + 2)
            }, link: function () {
                this.executePlugin("linkDialog", "link-dialog/link-dialog")
            }, "reference-link": function () {
                this.executePlugin("referenceLinkDialog", "reference-link-dialog/reference-link-dialog")
            }, pagebreak: function () {
                if (!this.settings.pageBreak) return alert("settings.pageBreak === false"), this;
                var e = this.cm;
                e.getSelection();
                e.replaceSelection("\r\n[========]\r\n")
            }, image: function () {
                this.executePlugin("imageDialog", "image-dialog/image-dialog")
            }, code: function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                e.replaceSelection("`" + i + "`"), "" === i && e.setCursor(t.line, t.ch + 1)
            }, "code-block": function () {
                this.executePlugin("codeBlockDialog", "code-block-dialog/code-block-dialog")
            }, "preformatted-text": function () {
                this.executePlugin("preformattedTextDialog", "preformatted-text-dialog/preformatted-text-dialog")
            }, table: function () {
                this.executePlugin("tableDialog", "table-dialog/table-dialog")
            }, datetime: function () {
                var e = this.cm, i = (e.getSelection(), new Date, this.settings.lang.name),
                    o = t.dateFormat() + " " + t.dateFormat("zh-cn" === i || "zh-tw" === i ? "cn-week-day" : "week-day");
                e.replaceSelection(o)
            }, emoji: function () {
                this.executePlugin("emojiDialog", "emoji-dialog/emoji-dialog")
            }, "html-entities": function () {
                this.executePlugin("htmlEntitiesDialog", "html-entities-dialog/html-entities-dialog")
            }, "goto-line": function () {
                this.executePlugin("gotoLineDialog", "goto-line-dialog/goto-line-dialog")
            }, watch: function () {
                this[this.settings.watch ? "unwatch" : "watch"]()
            }, preview: function () {
                this.previewing()
            }, fullscreen: function () {
                this.fullscreen()
            }, clear: function () {
                this.clear()
            }, search: function () {
                this.search()
            }, help: function () {
                this.executePlugin("helpDialog", "help-dialog/help-dialog")
            }, info: function () {
                this.showInfoDialog()
            }
        }, t.keyMaps = {
            "Cmd-1": "h1",
            "Cmd-2": "h2",
            "Cmd-3": "h3",
            "Cmd-4": "h4",
            "Cmd-5": "h5",
            "Cmd-6": "h6",
            "Cmd-B": "bold",
            "Cmd-D": "datetime",
            "Cmd-E": function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                if (!this.settings.emoji) return void alert("Error: settings.emoji == false");
                e.replaceSelection(":" + i + ":"), "" === i && e.setCursor(t.line, t.ch + 1)
            },
            "Cmd-Alt-G": "goto-line",
            "Cmd-H": "hr",
            "Cmd-I": "italic",
            "Cmd-K": "code",
            "Cmd-L": function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection(), o = "" === i ? "" : ' "' + i + '"';
                e.replaceSelection("[" + i + "](" + o + ")"), "" === i && e.setCursor(t.line, t.ch + 1)
            },
            "Cmd-U": "list-ul",
            "Shift-Cmd-A": function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                if (!this.settings.atLink) return void alert("Error: settings.atLink == false");
                e.replaceSelection("@" + i), "" === i && e.setCursor(t.line, t.ch + 1)
            },
            "Shift-Alt-C": "code",
            "Shift-Cmd-Q": "quote",
            "Shift-Cmd-S": "del",
            "Shift-Cmd-K": "tex",
            "Shift-Cmd-C": function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection();
                e.replaceSelection(["```", i, "```"].join("\n")), "" === i && e.setCursor(t.line + 1, 0)
            },
            "Shift-Cmd-Alt-C": "code-block",
            "Shift-Cmd-H": "html-entities",
            "Shift-Alt-H": "help",
            "Shift-Cmd-E": "emoji",
            "Shift-Cmd-U": "uppercase",
            "Shift-Alt-U": "ucwords",
            "Shift-Cmd-Alt-U": "ucfirst",
            "Shift-Alt-L": "lowercase",
            "Shift-Cmd-I": function () {
                var e = this.cm, t = e.getCursor(), i = e.getSelection(), o = "" === i ? "" : ' "' + i + '"';
                e.replaceSelection("![" + i + "](" + o + ")"), "" === i && e.setCursor(t.line, t.ch + 4)
            },
            "Shift-Cmd-Alt-I": "image",
            "Shift-Cmd-L": "link",
            "Shift-Cmd-O": "list-ol",
            "Shift-Cmd-P": "preformatted-text",
            "Shift-Cmd-T": "table",
            "Shift-Alt-P": "pagebreak",
            F9: "watch",
            F10: "preview",
            F11: "fullscreen"
        };
        var n = function (e) {
            return String.prototype.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        };
        t.trim = n;
        var r = function (e) {
            return e.toLowerCase().replace(/\b(\w)|\s(\w)/g, function (e) {
                return e.toUpperCase()
            })
        };
        t.ucwords = t.wordsFirstUpperCase = r;
        var a = function (e) {
            return e.toLowerCase().replace(/\b(\w)/, function (e) {
                return e.toUpperCase()
            })
        };
        return t.firstUpperCase = t.ucfirst = a, t.urls = {atLinkBase: "https://github.com/"}, t.regexs = {
            atLink: /@(\w+)/g,
            email: /(\w+)@(\w+)\.(\w+)\.?(\w+)?/g,
            emailLink: /(mailto:)?([\w\.\_]+)@(\w+)\.(\w+)\.?(\w+)?/g,
            emoji: /:([\w\+-]+):/g,
            emojiDatetime: /(\d{2}:\d{2}:\d{2})/g,
            twemoji: /:(tw-([\w]+)-?(\w+)?):/g,
            fontAwesome: /:(fa-([\w]+)(-(\w+)){0,}):/g,
            editormdLogo: /:(editormd-logo-?(\w+)?):/g,
            pageBreak: /^\[[=]{8,}\]$/
        }, t.emoji = {
            path: "https://cdn.learnku.com/assets/images/emoji/",
            ext: ".png"
        }, t.twemoji = {path: "http://twemoji.maxcdn.com/36x36/", ext: ".png"}, t.markedRenderer = function (i, o) {
            var r = {
                toc: !0,
                tocm: !1,
                tocStartLevel: 1,
                pageBreak: !0,
                atLink: !0,
                emailLink: !0,
                taskList: !1,
                emoji: !1,
                tex: !1,
                flowChart: !1,
                sequenceDiagram: !1
            }, a = e.extend(r, o || {}), s = t.$marked, l = new s.Renderer;
            i = i || [];
            var c = t.regexs, d = c.atLink, h = c.emoji, u = c.email, f = c.emailLink, g = c.twemoji, m = c.fontAwesome,
                p = c.editormdLogo, v = c.pageBreak;
            return l.emoji = function (e) {
                e = e.replace(t.regexs.emojiDatetime, function (e) {
                    return e.replace(/:/g, "&#58;")
                });
                var i = e.match(h);
                if (!i || !a.emoji) return e;
                for (var o = 0, n = i.length; o < n; o++) ":+1:" === i[o] && (i[o] = ":\\+1:"), e = e.replace(new RegExp(i[o]), function (e, i) {
                    var o = e.match(m), n = e.replace(/:/g, "");
                    if (o) for (var r = 0, a = o.length; r < a; r++) {
                        var s = o[r].replace(/:/g, "");
                        return '<i class="fa ' + s + ' fa-emoji" title="' + s.replace("fa-", "") + '"></i>'
                    } else {
                        var l = e.match(p), c = e.match(g);
                        if (l) for (var d = 0, h = l.length; d < h; d++) {
                            var u = l[d].replace(/:/g, "");
                            return '<i class="' + u + '" title="Editor.md logo (' + u + ')"></i>'
                        } else {
                            if (!c) {
                                var f = "+1" === n ? "plus1" : n;
                                return f = "black_large_square" === f ? "black_square" : f, f = "moon" === f ? "waxing_gibbous_moon" : f, '<img src="' + t.emoji.path + f + t.emoji.ext + '" class="emoji" title="&#58;' + n + '&#58;" alt="&#58;' + n + '&#58;" />'
                            }
                            for (var v = 0, w = c.length; v < w; v++) {
                                var b = c[v].replace(/:/g, "").replace("tw-", "");
                                return '<img src="' + t.twemoji.path + b + t.twemoji.ext + '" title="twemoji-' + b + '" alt="twemoji-' + b + '" class="emoji twemoji" />'
                            }
                        }
                    }
                });
                return e
            }, l.atLink = function (i) {
                return d.test(i) ? (a.atLink && (i = i.replace(u, function (e, t, i, o) {
                    return e.replace(/@/g, "_#_&#64;_#_")
                }), i = i.replace(d, function (e, i) {
                    return '<a href="' + t.urls.atLinkBase + i + '" title="&#64;' + i + '" class="at-link">' + e + "</a>"
                }).replace(/_#_&#64;_#_/g, "@")), a.emailLink && (i = i.replace(f, function (t, i, o, n, r) {
                    return !i && e.inArray(r, "jpg|jpeg|png|gif|webp|ico|icon|pdf".split("|")) < 0 ? '<a href="mailto:' + t + '">' + t + "</a>" : t
                })), i) : i
            }, l.link = function (e, t, i) {
                var o = '<a href="' + e + '"';
                return d.test(t) || d.test(i) ? (t && (o += ' title="' + t.replace(/@/g, "&#64;")), o + '">' + i.replace(/@/g, "&#64;") + "</a>") : (t && (o += ' title="' + t + '"'), o += ">" + i + "</a>")
            }, l.heading = function (e, t, o) {
                var r = e, a = /\s*\<a\s*href\=\"(.*)\"\s*([^\>]*)\>(.*)\<\/a\>\s*/;
                if (a.test(e)) {
                    var s = [];
                    e = e.split(/\<a\s*([^\>]+)\>([^\>]*)\<\/a\>/);
                    for (var l = 0, c = e.length; l < c; l++) s.push(e[l].replace(/\s*href\=\"(.*)\"\s*/g, ""));
                    e = s.join(" ")
                }
                e = n(e);
                var d = e.toLowerCase().replace(/[^\w]+/g, "-"), h = {text: e, level: t, slug: d},
                    u = /^[\u4e00-\u9fa5]+$/.test(e),
                    f = u ? escape(e).replace(/\%/g, "") : e.toLowerCase().replace(/[^\w]+/g, "-");
                i.push(h);
                var g = "<h" + t + ' id="h' + t + "-" + this.options.headerPrefix + f + '">';
                return g += '<a name="' + e + '" class="reference-link"></a>', g += '<span class="header-link octicon octicon-link"></span>', g += a ? this.atLink(this.emoji(r)) : this.atLink(this.emoji(e)), g += "</h" + t + ">"
            }, l.pageBreak = function (e) {
                return v.test(e) && a.pageBreak && (e = '<hr style="page-break-after:always;" class="page-break editormd-page-break" />'), e
            }, l.paragraph = function (e) {
                var i = /\$\$(.*)\$\$/g.test(e), o = /^\$\$(.*)\$\$$/.test(e),
                    n = o ? ' class="' + t.classNames.tex + '"' : "",
                    r = a.tocm ? /^(\[TOC\]|\[TOCM\])$/.test(e) : /^\[TOC\]$/.test(e), s = /^\[TOCM\]$/.test(e);
                e = !o && i ? e.replace(/(\$\$([^\$]*)\$\$)+/g, function (e, i) {
                    return '<span class="' + t.classNames.tex + '">' + i.replace(/\$/g, "") + "</span>"
                }) : o ? e.replace(/\$/g, "") : e;
                var l = '<div class="markdown-toc editormd-markdown-toc">' + e + "</div>";
                return r ? s ? '<div class="editormd-toc-menu">' + l + "</div><br/>" : l : v.test(e) ? this.pageBreak(e) : "<p" + n + ">" + this.atLink(this.emoji(e)) + "</p>\n"
            }, l.code = function (e, i, o) {
                return "seq" === i || "sequence" === i ? '<div class="sequence-diagram">' + e + "</div>" : "flow" === i ? '<div class="flowchart">' + e + "</div>" : "math" === i || "latex" === i || "katex" === i ? '<p class="' + t.classNames.tex + '">' + e + "</p>" : s.Renderer.prototype.code.apply(this, arguments)
            }, l.tablecell = function (e, t) {
                var i = t.header ? "th" : "td";
                return (t.align ? "<" + i + ' style="text-align:' + t.align + '">' : "<" + i + ">") + this.atLink(this.emoji(e)) + "</" + i + ">\n"
            }, l.table = function (e, t) {
                return t && (t = "<tbody>" + t + "</tbody>"), '<div class="table-wrapper"><table>\n<thead>\n' + e + "</thead>\n" + t + "</table></div>\n"
            }, l.listitem = function (e, t, i) {
                return a.taskList && t ? (e = e.split('<input checked="" disabled="" type="checkbox">').join('<i class="icon checkmark box"></i>'), e = e.split('<input disabled="" type="checkbox">').join('<i class="icon square outline"></i>'), '<li class="editor-task-list">' + this.atLink(this.emoji(e)) + "</li>") : "<li>" + this.atLink(this.emoji(e)) + "</li>"
            }, l
        }, t.markdownToCRenderer = function (e, t, i, o) {
            var n = "", r = 0, a = this.classPrefix;
            o = o || 1;
            for (var s = 0, l = e.length; s < l; s++) {
                var c = e[s].text, d = e[s].level;
                d < o || (n += d > r ? "" : d < r ? new Array(r - d + 2).join("</ul></li>") : "</ul></li>", n += '<li><a class="toc-level-' + d + '" href="#' + c + '" level="' + d + '">' + c + "</a><ul>", r = d)
            }
            var h = t.find(".markdown-toc");
            if (h.length < 1 && "false" === t.attr("previewContainer")) {
                var u = '<div class="markdown-toc ' + a + 'markdown-toc"></div>';
                u = i ? '<div class="' + a + 'toc-menu">' + u + "</div>" : u, t.html(u), h = t.find(".markdown-toc")
            }
            return i && h.wrap('<div class="' + a + 'toc-menu"></div><br/>'), h.html('<ul class="markdown-toc-list"></ul>').children(".markdown-toc-list").html(n.replace(/\r?\n?\<ul\>\<\/ul\>/g, "")), h
        }, t.tocDropdownMenu = function (t, i) {
            i = i || "Table of Contents";
            var o = 400, n = t.find("." + this.classPrefix + "toc-menu");
            return n.each(function () {
                var t = e(this), n = t.children(".markdown-toc"), r = '<i class="fa fa-angle-down"></i>',
                    a = '<a href="javascript:;" class="toc-menu-btn">' + r + i + "</a>", s = n.children("ul"),
                    l = s.find("li");
                n.append(a), l.first().before("<li><h1>" + i + " " + r + "</h1></li>"), t.mouseover(function () {
                    s.show(), l.each(function () {
                        var t = e(this), i = t.children("ul");
                        if ("" === i.html() && i.remove(), i.length > 0 && "" !== i.html()) {
                            var n = t.children("a").first();
                            n.children(".fa").length < 1 && n.append(e(r).css({float: "right", paddingTop: "4px"}))
                        }
                        t.mouseover(function () {
                            i.css("z-index", o).show(), o += 1
                        }).mouseleave(function () {
                            i.hide()
                        })
                    })
                }).mouseleave(function () {
                    s.hide()
                })
            }), n
        }, t.filterHTMLTags = function (t, i) {
            if ("string" != typeof t && (t = new String(t)), "string" != typeof i) return t;
            for (var o = i.split("|"), n = o[0].split(","), r = o[1], a = 0, s = n.length; a < s; a++) {
                var l = n[a];
                t = t.replace(new RegExp("<s*" + l + "s*([^>]*)>([^>]*)<s*/" + l + "s*>", "igm"), "")
            }
            if (void 0 !== r) {
                var c = /\<(\w+)\s*([^\>]*)\>([^\>]*)\<\/(\w+)\>/gi;
                t = "*" === r ? t.replace(c, function (e, t, i, o, n) {
                    return "<" + t + ">" + o + "</" + n + ">"
                }) : "on*" === r ? t.replace(c, function (t, i, o, n, r) {
                    var a = e("<" + i + ">" + n + "</" + r + ">"), s = e(t)[0].attributes, l = {};
                    e.each(s, function (e, t) {
                        '"' !== t.nodeName && (l[t.nodeName] = t.nodeValue)
                    }), e.each(l, function (e) {
                        0 === e.indexOf("on") && delete l[e]
                    }), a.attr(l);
                    var c = void 0 !== a[1] ? e(a[1]).text() : "";
                    return a[0].outerHTML + c
                }) : t.replace(c, function (t, i, o, n) {
                    var a = r.split(","), s = e(t);
                    return s.html(n), e.each(a, function (e) {
                        s.attr(a[e], null)
                    }), s[0].outerHTML
                })
            }
            return t
        }, t.markdownToHTML = function (i, o) {
            var n = {
                gfm: !0,
                toc: !0,
                tocm: !1,
                tocStartLevel: 1,
                tocTitle: "目录",
                tocDropdown: !1,
                tocContainer: "",
                markdown: "",
                markdownSourceCode: !1,
                htmlDecode: !0,
                autoLoadKaTeX: !0,
                pageBreak: !0,
                atLink: !0,
                emailLink: !0,
                tex: !1,
                taskList: !1,
                emoji: !1,
                flowChart: !1,
                sequenceDiagram: !1,
                previewCodeHighlight: !0
            };
            t.$marked = marked;
            var r = e("#" + i), a = r.settings = e.extend(!0, n, o || {}), s = r.find("textarea");
            s.length < 1 && (r.append("<textarea></textarea>"), s = r.find("textarea"));
            var l = "" === a.markdown ? s.val() : a.markdown, c = [], d = {
                toc: a.toc,
                tocm: a.tocm,
                tocStartLevel: a.tocStartLevel,
                taskList: a.taskList,
                emoji: a.emoji,
                tex: a.tex,
                pageBreak: a.pageBreak,
                atLink: a.atLink,
                emailLink: a.emailLink,
                flowChart: a.flowChart,
                sequenceDiagram: a.sequenceDiagram,
                previewCodeHighlight: a.previewCodeHighlight
            }, h = {
                renderer: t.markedRenderer(c, d),
                gfm: a.gfm,
                tables: !0,
                breaks: !0,
                pedantic: !1,
                sanitize: !1,
                smartLists: !0,
                smartypants: !0,
                highlight: function (e, t) {
                    return Prism.languages.hasOwnProperty(t) || (t = Prism.languages[t] || "javascript"), Prism.highlight(e, Prism.languages[t])
                }
            }, u = marked(l, h);
            u = t.filterHTMLTags(u, a.htmlDecode), e('input[name="body_html"]').length && e('input[name="body_html"]').val(newMarkdownDoc), a.markdownSourceCode ? s.text(l) : s.remove(), r.addClass("markdown-body " + this.classPrefix + "html-preview").append(u);
            var f = "" !== a.tocContainer ? e(a.tocContainer) : r;
            if ("" !== a.tocContainer && f.attr("previewContainer", !1), a.tex) {
                var g = function () {
                    r.find("." + t.classNames.tex).each(function () {
                        var t = e(this);
                        katex.render(t.html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"), t[0])
                    })
                };
                !a.autoLoadKaTeX || t.$katex || t.kaTeXLoaded ? g() : this.loadKaTeX(function () {
                    t.$katex = katex, t.kaTeXLoaded = !0, g()
                })
            }
            return r.getMarkdown = function () {
                return s.val()
            }, r
        }, t.themes = ["default", "dark"], t.previewThemes = ["default", "dark"], t.editorThemes = ["default", "3024-day", "3024-night", "ambiance", "ambiance-mobile", "base16-dark", "base16-light", "blackboard", "cobalt", "eclipse", "elegant", "erlang-dark", "lesser-dark", "mbo", "mdn-like", "midnight", "monokai", "neat", "neo", "night", "paraiso-dark", "paraiso-light", "pastel-on-dark", "rubyblue", "solarized", "the-matrix", "tomorrow-night-eighties", "twilight", "vibrant-ink", "xq-dark", "xq-light"], t.loadPlugins = {}, t.loadFiles = {
            js: [],
            css: [],
            plugin: []
        }, t.loadPlugin = function (e, i, o) {
            i = i || function () {
            }, this.loadScript(e, function () {
                t.loadFiles.plugin.push(e), i()
            }, o)
        }, t.loadCSS = function (e, i, o) {
            o = o || "head", i = i || function () {
            };
            var n = document.createElement("link");
            n.type = "text/css", n.rel = "stylesheet", n.onload = n.onreadystatechange = function () {
                t.loadFiles.css.push(e), i()
            }, n.href = e + ".css", "head" === o ? document.getElementsByTagName("head")[0].appendChild(n) : document.body.appendChild(n)
        }, t.isIE = "Microsoft Internet Explorer" == navigator.appName, t.isIE8 = t.isIE && "8." == navigator.appVersion.match(/8./i), t.loadScript = function (e, i, o) {
            o = o || "head", i = i || function () {
            };
            var n = null;
            n = document.createElement("script"), n.id = e.replace(/[\./]+/g, "-"), n.type = "text/javascript", n.src = e + ".js", t.isIE8 ? n.onreadystatechange = function () {
                n.readyState && ("loaded" !== n.readyState && "complete" !== n.readyState || (n.onreadystatechange = null, t.loadFiles.js.push(e), i()))
            } : n.onload = function () {
                t.loadFiles.js.push(e), i()
            }, "head" === o ? document.getElementsByTagName("head")[0].appendChild(n) : document.body.appendChild(n)
        }, t.katexURL = {js: "//" + Config.cdn_domain + "/static/components/editor/lib/katex/katex.min"}, t.kaTeXLoaded = !1, t.loadKaTeX = function (e) {
            t.loadScript(t.katexURL.js, e || function () {
            })
        }, t.lockScreen = function (t) {
            e("html,body").css("overflow", t ? "hidden" : "")
        }, t.createDialog = function (i) {
            var o = {
                name: "",
                width: 420,
                height: 240,
                title: "",
                drag: !0,
                closed: !0,
                content: "",
                mask: !0,
                maskStyle: {backgroundColor: "#fff", opacity: .1},
                lockScreen: !0,
                footer: !0,
                buttons: !1
            };
            i = e.extend(!0, o, i);
            var n = this, r = this.editor, a = t.classPrefix, s = (new Date).getTime(),
                l = "" === i.name ? a + "dialog-" + s : i.name, c = t.mouseOrTouch,
                d = '<div class="' + a + "dialog " + l + '">';
            "" !== i.title && (d += '<div class="' + a + 'dialog-header"' + (i.drag ? ' style="cursor: move;"' : "") + ">", d += '<strong class="' + a + 'dialog-title">' + i.title + "</strong>", d += "</div>"), i.closed && (d += '<a href="javascript:;" class="fa fa-close ' + a + 'dialog-close"></a>'), d += '<div class="' + a + 'dialog-container">' + i.content, (i.footer || "string" == typeof i.footer) && (d += '<div class="' + a + 'dialog-footer">' + ("boolean" == typeof i.footer ? "" : i.footer) + "</div>"), d += "</div>", d += '<div class="' + a + "dialog-mask " + a + 'dialog-mask-bg"></div>', d += '<div class="' + a + "dialog-mask " + a + 'dialog-mask-con"></div>', d += "</div>", r.append(d);
            var h = r.find("." + l);
            h.lockScreen = function (t) {
                return i.lockScreen && (e("html,body").css("overflow", t ? "hidden" : ""), n.resize()), h
            }, h.showMask = function () {
                return i.mask && r.find("." + a + "mask").css(i.maskStyle).css("z-index", t.dialogZindex - 1).show(), h
            }, h.hideMask = function () {
                return i.mask && r.find("." + a + "mask").hide(), h
            }, h.loading = function (e) {
                return h.find("." + a + "dialog-mask")[e ? "show" : "hide"](), h
            }, h.lockScreen(!0).showMask(), h.show().css({
                zIndex: t.dialogZindex,
                border: t.isIE8 ? "1px solid #ddd" : "",
                width: "number" == typeof i.width ? i.width + "px" : i.width,
                height: "number" == typeof i.height ? i.height + "px" : i.height
            });
            var u = function () {
                h.css({
                    top: (e(window).height() - h.height()) / 2 + "px",
                    left: (e(window).width() - h.width()) / 2 + "px"
                })
            };
            if (u(), e(window).resize(u), h.children("." + a + "dialog-close").bind(c("click", "touchend"), function () {
                h.hide().lockScreen(!1).hideMask()
            }), "object" == typeof i.buttons) {
                var f = h.footer = h.find("." + a + "dialog-footer");
                for (var g in i.buttons) {
                    var m = i.buttons[g], p = a + g + "-btn";
                    f.append('<button class="' + a + "btn " + p + '">' + m[0] + "</button>"), m[1] = e.proxy(m[1], h), f.children("." + p).bind(c("click", "touchend"), m[1])
                }
            }
            if ("" !== i.title && i.drag) {
                var v, w, b = h.children("." + a + "dialog-header");
                i.mask || b.bind(c("click", "touchend"), function () {
                    t.dialogZindex += 2, h.css("z-index", t.dialogZindex)
                }), b.mousedown(function (e) {
                    e = e || window.event, v = e.clientX - parseInt(h[0].style.left), w = e.clientY - parseInt(h[0].style.top), document.onmousemove = y
                });
                var k = function (e) {
                    e.removeClass(a + "user-unselect").off("selectstart")
                }, x = function (e) {
                    e.addClass(a + "user-unselect").on("selectstart", function (e) {
                        return !1
                    })
                }, y = function (t) {
                    t = t || window.event;
                    var i, o, n = parseInt(h[0].style.left), r = parseInt(h[0].style.top);
                    n >= 0 ? n + h.width() <= e(window).width() ? i = t.clientX - v : (i = e(window).width() - h.width(), document.onmousemove = null) : (i = 0, document.onmousemove = null), r >= 0 ? o = t.clientY - w : (o = 0, document.onmousemove = null), document.onselectstart = function () {
                        return !1
                    }, x(e("body")), x(h), h[0].style.left = i + "px", h[0].style.top = o + "px"
                };
                document.onmouseup = function () {
                    k(e("body")), k(h), document.onselectstart = null, document.onmousemove = null
                }, b.touchDraggable = function () {
                    var t = null, i = function (i) {
                        var o = i.originalEvent, n = e(this).parent().position();
                        t = {x: o.changedTouches[0].pageX - n.left, y: o.changedTouches[0].pageY - n.top}
                    }, o = function (i) {
                        i.preventDefault();
                        var o = i.originalEvent;
                        e(this).parent().css({
                            top: o.changedTouches[0].pageY - t.y,
                            left: o.changedTouches[0].pageX - t.x
                        })
                    };
                    this.bind("touchstart", i).bind("touchmove", o)
                }, b.touchDraggable()
            }
            return t.dialogZindex += 2, h
        }, t.mouseOrTouch = function (e, t) {
            e = e || "click", t = t || "touchend";
            var i = e;
            try {
                document.createEvent("TouchEvent"), i = t
            } catch (e) {
            }
            return i
        }, t.dateFormat = function (e) {
            e = e || "";
            var t = function (e) {
                    return e < 10 ? "0" + e : e
                }, i = new Date, o = i.getFullYear(), n = o.toString().slice(2, 4), r = t(i.getMonth() + 1),
                a = t(i.getDate()), s = i.getDay(), l = t(i.getHours()), c = t(i.getMinutes()), d = t(i.getSeconds()),
                h = t(i.getMilliseconds()), u = "", f = n + "-" + r + "-" + a, g = o + "-" + r + "-" + a,
                m = l + ":" + c + ":" + d;
            switch (e) {
                case"UNIX Time":
                    u = i.getTime();
                    break;
                case"UTC":
                    u = i.toUTCString();
                    break;
                case"yy":
                    u = n;
                    break;
                case"year":
                case"yyyy":
                    u = o;
                    break;
                case"month":
                case"mm":
                    u = r;
                    break;
                case"cn-week-day":
                case"cn-wd":
                    u = "星期" + ["日", "一", "二", "三", "四", "五", "六"][s];
                    break;
                case"week-day":
                case"wd":
                    u = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][s];
                    break;
                case"day":
                case"dd":
                    u = a;
                    break;
                case"hour":
                case"hh":
                    u = l;
                    break;
                case"min":
                case"ii":
                    u = c;
                    break;
                case"second":
                case"ss":
                    u = d;
                    break;
                case"ms":
                    u = h;
                    break;
                case"yy-mm-dd":
                    u = f;
                    break;
                case"yyyy-mm-dd":
                    u = g;
                    break;
                case"yyyy-mm-dd h:i:s ms":
                case"full + ms":
                    u = g + " " + m + " " + h;
                    break;
                case"full":
                case"yyyy-mm-dd h:i:s":
                default:
                    u = g + " " + m
            }
            return u
        }, t
    }
}), function (e) {
    var t = null, i = [], o = [], n = [], r = {}, a = 0, s = !1, l = {
        init: function () {
            var i = this;
            i.initEditor(), i.initSelectTags(), window.lkeditor = t, setTimeout(function () {
                i.postInit()
            }, 1e3), window.onbeforeunload = function () {
                if (s) return "您有未保存的内容，是否要继续离开此页面？"
            }, e('button.ui.button[type="submit"]:not(.no-loading)').click(function () {
                s = !1
            }), e(".submit-btn:not(.no-loading)").click(function () {
                s = !1
            })
        }, postInit: function () {
            this.retryDownloadImage(), this.initAutoSave(), this.initPasteHTMLToMarkdown(), this.initUploadImage()
        }, initEditor: function () {
            var i = this, o = {
                previewTheme: "lk",
                placeholder: "请使用 Markdown 语法",
                styleActiveLine: !1,
                toolbarIcons: ["h2", "h3", "quote", "|", "list-ul", "list-ol", "|", "link", "image", "code-block", "table", "emoji", "|", "watch", "fullscreen", "help"],
                lineNumbers: !1,
                path: "http://localhost:8888/static/components/editor/lib/",
                imageUpload: !0,
                imageUploadURL: Config.routes.upload_image,
                emoji: !0,
                tex: !0,
                taskList: !0,
                atLink: !1
            };
            Config.editor.withoutPreview && (o.toolbarIcons = ["quote", "hr", "h2", "|", "list-ul", "list-ol", "link", "image", "|", "fullscreen", "watch", "help"], o.watch = !1), Config.editor.autoHeight && (o.autoHeight = !0), Config.editor.needTranslatorSeperator && (o.toolbarIcons.push("translation_seperator"), o.toolbarIconsClass = {translation_seperator: "hashtag"}, o.lang = {toolbar: {translation_seperator: "翻译分隔符"}}, o.toolbarHandlers = {
                translation_seperator: function (e, t, o, n) {
                    i._insertText("\n[//]: # (Section Separator)\n")
                }
            }), t = editormd("editormd", o), Config.editor.unique_id && e('input[name="editor_unique_id"]').length > 0 && e('input[name="editor_unique_id"]').val(Config.editor.unique_id)
        }, initAutoSave: function () {
            var i = Config.editor.unique_id;
            e("#editormd").find("textarea");
            localStorage.getItem(i) && t.cm.setValue(localStorage.getItem(i)), setInterval(function () {
                var e = t.cm.getDoc().getValue(), o = e.length;
                e.length > 0 && o != a && (localStorage.setItem(i, e), a = o)
            }, 5e3);
            var o = i + "_title", n = e('input[name="title"]');
            localStorage.getItem(o) && n.val(localStorage.getItem(o)), n.on("input", function () {
                localStorage.setItem(o, e(this).val())
            })
        }, initSelectTags: function () {
            e(".tags.ui.dropdown").dropdown({
                allowAdditions: !0,
                apiSettings: {url: Config.tags_url, data: {_token: Config.token}}
            }), e(".selection.ui.dropdown").dropdown()
        }, retryDownloadImage: function () {
            var e = this;
            n = [], o = [], i = [], e._fetchRemoteImage()
        }, initUploadImage: function () {
            var i = this;
            e("body").on("click", ".retry-download-image", function () {
                e(this).remove(), i.retryDownloadImage()
            }), inlineAttachment.editors.codemirror4.attach(t.cm, {
                uploadUrl: Config.routes.upload_image,
                extraParams: {_token: Config.token},
                progressText: "\n![文件上传中...]()",
                onFileUploadResponse: function (i) {
                    var o = JSON.parse(i.responseText), n = o[this.settings.jsonFieldName],
                        r = e("#title-field").length && e("#title-field").val() ? e("#title-field").val() : Config.community.name ? Config.community.name : "图片";
                    if (o && n) {
                        var a = "\n![" + r + "](" + n + ")\n", s = this.editor.getValue().replace(this.lastValue, a);
                        this.editor.setValue(s), this.settings.onFileUploaded.call(this, n);
                        var l = t.cm, c = l.getCursor("start");
                        c.ch += n.length, c.line += 2, l.setCursor(c), l.focus()
                    }
                    return !1
                }
            })
        }, initPasteHTMLToMarkdown: function () {
            for (var e = this, i = document.querySelector("#pastebin"), o = [{
                filter: "h1",
                replacement: function (e, t) {
                    return "\n\n\n# " + e + "\n\n\n"
                }
            }, {
                filter: "h2", replacement: function (e, t) {
                    return "\n\n\n## " + e + "\n\n\n"
                }
            }, {
                filter: ["thead", "tbody", "tfoot"], replacement: function (e) {
                    return e
                }
            }, {
                filter: function (e) {
                    return "TABLE" === e.nodeName && isHeadingRow(e.rows[0])
                }, replacement: function (e) {
                    return "\n\n" + e
                }
            }, {
                filter: ["th", "td"], replacement: function (e, t) {
                    return e = e.replace(/(?:\r\n|\r|\n)/g, ""), cell(e, t)
                }
            }, {
                filter: "tr", replacement: function (e, t) {
                    var i = "", o = {left: ":--", right: "--:", center: ":-:"};
                    if (isHeadingRow(t)) for (var n = 0; n < t.childNodes.length; n++) {
                        var r = "---", a = (t.childNodes[n].getAttribute("align") || "").toLowerCase();
                        a && (r = o[a] || r), i += cell(r, t.childNodes[n])
                    }
                    return "\n" + e + (i ? "\n" + i : "")
                }
            }, {
                filter: "table", replacement: function (e, t) {
                    return "\n\n" + e
                }
            }, {
                filter: "caption", replacement: function (e, t) {
                    return "**" + e + "**\n\n"
                }
            }, {
                filter: "sup", replacement: function (e) {
                    return "^" + e + "^"
                }
            }, {
                filter: "sub", replacement: function (e) {
                    return "~" + e + "~"
                }
            }, {
                filter: "br", replacement: function () {
                    return "\n"
                }
            }, {
                filter: "hr", replacement: function () {
                    return "\n\n* * * * *\n\n"
                }
            }, {
                filter: ["em", "i", "cite", "var"], replacement: function (e) {
                    return "*" + e + "*"
                }
            }, {
                filter: function (e) {
                    var t = e.previousSibling || e.nextSibling, i = "PRE" === e.parentNode.nodeName && !t;
                    return ("CODE" === e.nodeName || "KBD" === e.nodeName || "SAMP" === e.nodeName || "TT" === e.nodeName) && !i
                }, replacement: function (e) {
                    return "`" + e + "`"
                }
            }, {
                filter: function (e) {
                    return "A" === e.nodeName && e.getAttribute("href")
                }, replacement: function (e, t) {
                    var i = t.getAttribute("href"), o = t.title ? ' "' + t.title + '"' : "";
                    return e === i ? "<" + i + ">" : i === "mailto:" + e ? "<" + e + ">" : "[" + e + "](" + i + o + ")"
                }
            }, {
                filter: "li", replacement: function (e, t) {
                    e = e.replace(/^\s+/, "").replace(/\n/gm, "\n    ");
                    var i = "-   ", o = t.parentNode;
                    if (/ol/i.test(o.nodeName)) {
                        var n = Array.prototype.indexOf.call(o.children, t) + 1;
                        for (i = n + ". "; i.length < 4;) i += " "
                    }
                    return i + e
                }
            }], n = function (e) {
                return e.replace(/\s*\\\n/g, "\n")
            }, r = function (e) {
                return n(toMarkdown(e, {converters: o, gfm: !0}))
            }, a = function (o) {
                var n = t.cm;
                if (n.hasFocus()) {
                    i.innerHTML = o.clipboardData.getData("text/html");
                    var a = o.clipboardData.getData("text/plain"), s = n.getDoc(), l = s.getCursor(),
                        c = s.getLine(l.line), d = s.getLine(l.line - 1), h = s.getLine(l.line + 1);
                    !i.innerHTML.length || void 0 !== d && d.includes("```") && h.includes("```") || 0 == c.trim().length && a.length && (o.preventDefault(), setTimeout(function () {
                        var t = i.innerHTML, o = r(t);
                        e._insertText(o), e._fetchRemoteImage()
                    }, 100))
                }
                n.focus()
            }, l = document.getElementsByClassName("CodeMirror"), c = 0; c < l.length; c++) l[c].addEventListener("paste", a, !1);
            var d = debounce(function (t, i) {
                e.retryDownloadImage()
            }, 5e3);
            t.cm.on("change", d), t.cm.on("change", function (e, t) {
                s = !0
            })
        }, updateFetchingImageStatus: function () {
            0 != i.length && (0 == e(".image-upload-status").length && e('<li class="pull-right image-upload-status text green ui fw-bold" style="line-height: 30px;"><span class="download_hint"></span></li>').appendTo("ul.editormd-menu"), i.length == o.length ? (e(".image-upload-status").removeClass("red").removeClass("orange").addClass("green"), e(".image-upload-status .download_hint").text("√ 图片转存成功！"), e(".retry-download-image").remove()) : n.length > 0 ? (e(".image-upload-status").removeClass("green").removeClass("orange").addClass("red"), e(".image-upload-status .download_hint").text("图片转存中..." + o.length + "/" + i.length + "（失败 " + n.length + "）"), 0 == e(".retry-download-image").length && e(".image-upload-status .download_hint").after('<button class="ui label red retry-download-image" type="button">重试</button>')) : (e(".image-upload-status").removeClass("red").removeClass("green").addClass("orange"), e(".image-upload-status .download_hint").text("图片转存中..." + o.length + "/" + i.length), e(".retry-download-image").remove()))
        }, _fetchRemoteImage: function () {
            var a = this;
            setTimeout(function () {
                var s = t.cm.getDoc().getValue();
                marked(s, function (s, l) {
                    e(l).find("img").each(function () {
                        var e = new RegExp("/" + Config.cdn_domain + "/"), t = new RegExp("/" + Config.domain + "/"),
                            o = this.src;
                        e.test(this.src) || t.test(this.src) || "http:" == this.src || -1 === i.indexOf(o) && (i.push(o), a.updateFetchingImageStatus())
                    }), 0 != i.length && (void 0 !== r[MD5(JSON.stringify(i))] ? r[MD5(JSON.stringify(i))] = r[MD5(JSON.stringify(i))] + 1 : r[MD5(JSON.stringify(i))] = 1, console.log(r), e.ajax({
                        method: "POST",
                        url: "/fetch_image",
                        data: {remote_urls: i, _token: Config.token}
                    }).done(function (e) {
                        if (e.fetched.length) {
                            var s;
                            for (s = 0; s < e.fetched.length; ++s) {
                                for (var l = e.fetched[s], c = t.cm.getSearchCursor(l.remote_url); c.findNext();) c.replace(l.cdn_link);
                                if (-1 === o.indexOf(l.remote_url) && o.push(l.remote_url), n.length > 0) {
                                    var d = n.indexOf(l.remote_url);
                                    d > -1 && n.splice(d, 1)
                                }
                            }
                        }
                        if (e.fetching.length) {
                            var s;
                            for (s = 0; s < e.fetching.length; ++s) {
                                var l = e.fetching[s];
                                -1 === n.indexOf(l.remote_url) && n.push(l.remote_url)
                            }
                            1 == r[MD5(JSON.stringify(i))] ? setTimeout(function () {
                                a._fetchRemoteImage()
                            }, 3e3) : r[MD5(JSON.stringify(i))] < 10 && setTimeout(function () {
                                a._fetchRemoteImage()
                            }, 5e3)
                        }
                        a.updateFetchingImageStatus()
                    }).always(function () {
                    }))
                })
            }, 200)
        }, _insertText: function (e) {
            var i = t.cm, o = i.getDoc(), n = o.getCursor(), r = (o.getLine(n.line), i.getCursor("start")),
                a = (i.getCursor("end"), {line: n.line, ch: n.ch}), s = e.split("\n"), l = s[s.length - 1];
            o.getSelection().length > 0 ? o.replaceSelection(e) : o.replaceRange(e, a), s.length > 1 ? r.ch = l.length : r.ch += l.length, r.line += s.length - 1, i.setCursor(r), i.focus()
        }, initStickyToolbar: function (t) {
            var i = setInterval(function () {
                e(".editor-toolbar").length > 0 && (e(".editor-toolbar").addClass("ui sticky"), e(".editor-toolbar").sticky(), clearInterval(i))
            }, 1e3)
        }, initAccordion: function (t) {
            e(".ui.accordion").accordion({selector: {trigger: ".title"}})
        }
    };
    window.E7CodingEditor = l
}(jQuery), $(document).ready(function () {
    E7CodingEditor.init()
});