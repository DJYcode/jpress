!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.toMarkdown = e()
    }
}(function () {
    return function e(t, n, r) {
        function i(a, l) {
            if (!n[a]) {
                if (!t[a]) {
                    var s = "function" == typeof require && require;
                    if (!l && s) return s(a, !0);
                    if (o) return o(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var c = n[a] = {exports: {}};
                t[a][0].call(c.exports, function (e) {
                    var n = t[a][1][e];
                    return i(n || e)
                }, c, c.exports, e, t, n, r)
            }
            return n[a].exports
        }

        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    }({
        1: [function (e, t, n) {
            "use strict";

            function r(e) {
                return -1 !== x.indexOf(e.nodeName.toLowerCase())
            }

            function i(e) {
                return -1 !== F.indexOf(e.nodeName.toLowerCase())
            }

            function o(e) {
                var t = (new v).parseFromString(e, "text/html");
                return y(t.documentElement, r), t
            }

            function a(e) {
                for (var t, n, r, i = [e], o = []; i.length > 0;) for (t = i.shift(), o.push(t), n = t.childNodes, r = 0; r < n.length; r++) 1 === n[r].nodeType && i.push(n[r]);
                return o.shift(), o
            }

            function l(e) {
                for (var t = "", n = 0; n < e.childNodes.length; n++) if (1 === e.childNodes[n].nodeType) t += e.childNodes[n]._replacement; else {
                    if (3 !== e.childNodes[n].nodeType) continue;
                    t += e.childNodes[n].data
                }
                return t
            }

            function s(e, t) {
                return e.cloneNode(!1).outerHTML.replace("><", ">" + t + "<")
            }

            function u(e, t) {
                if ("string" == typeof t) return t === e.nodeName.toLowerCase();
                if (Array.isArray(t)) return -1 !== t.indexOf(e.nodeName.toLowerCase());
                if ("function" == typeof t) return t.call(d, e);
                throw new TypeError("`filter` needs to be a string, array, or function")
            }

            function c(e, t) {
                var n, i, o;
                return "left" === e ? (n = t.previousSibling, i = / $/) : (n = t.nextSibling, i = /^ /), n && (3 === n.nodeType ? o = i.test(n.nodeValue) : 1 !== n.nodeType || r(n) || (o = i.test(n.textContent))), o
            }

            function f(e) {
                var t = "", n = "";
                if (!r(e)) {
                    var i = /^[ \r\n\t]/.test(e.innerHTML), o = /[ \r\n\t]$/.test(e.innerHTML);
                    i && !c("left", e) && (t = " "), o && !c("right", e) && (n = " ")
                }
                return {leading: t, trailing: n}
            }

            function p(e) {
                var t, n = l(e);
                if (!i(e) && !/A|TH|TD/.test(e.nodeName) && /^\s*$/i.test(n)) return void (e._replacement = "");
                for (var r = 0; r < h.length; r++) {
                    var o = h[r];
                    if (u(e, o.filter)) {
                        if ("function" != typeof o.replacement) throw new TypeError("`replacement` needs to be a function that returns a string");
                        var a = f(e);
                        (a.leading || a.trailing) && (n = n.trim()), t = a.leading + o.replacement.call(d, n, e) + a.trailing;
                        break
                    }
                }
                e._replacement = t
            }

            var d, h, m = e("./lib/md-converters"), g = e("./lib/gfm-converters"), v = e("./lib/html-parser"),
                y = e("collapse-whitespace"),
                x = ["address", "article", "aside", "audio", "blockquote", "body", "canvas", "center", "dd", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "isindex", "li", "main", "menu", "nav", "noframes", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul"],
                F = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
            d = function (e, t) {
                if (t = t || {}, "string" != typeof e) throw new TypeError(e + " is not a string");
                e = e.replace(/(>[\r\n\s]*)(\d+)\.(&nbsp;| )/g, "$1$2\\.$3");
                var n, r = o(e).body, i = a(r);
                h = m.slice(0), t.gfm && (h = g.concat(h)), t.converters && (h = t.converters.concat(h));
                for (var s = i.length - 1; s >= 0; s--) p(i[s]);
                return n = l(r), n.replace(/^[\t\r\n]+|[\t\r\n\s]+$/g, "").replace(/\n\s+\n/g, "\n\n").replace(/\n{3,}/g, "\n\n")
            }, d.isBlock = r, d.isVoid = i, d.outer = s, t.exports = d
        }, {"./lib/gfm-converters": 2, "./lib/html-parser": 3, "./lib/md-converters": 4, "collapse-whitespace": 7}],
        2: [function (e, t, n) {
            "use strict";

            function r(e, t) {
                var n = Array.prototype.indexOf.call(t.parentNode.childNodes, t), r = " ";
                return 0 === n && (r = "| "), r + e + " |"
            }

            var i = /highlight highlight-(\S+)/;
            t.exports = [{
                filter: "br", replacement: function () {
                    return "\n"
                }
            }, {
                filter: ["del", "s", "strike"], replacement: function (e) {
                    return "~~" + e + "~~"
                }
            }, {
                filter: function (e) {
                    return "checkbox" === e.type && "LI" === e.parentNode.nodeName
                }, replacement: function (e, t) {
                    return (t.checked ? "[x]" : "[ ]") + " "
                }
            }, {
                filter: ["th", "td"], replacement: function (e, t) {
                    return r(e, t)
                }
            }, {
                filter: "tr", replacement: function (e, t) {
                    var n = "", i = {left: ":--", right: "--:", center: ":-:"};
                    if ("THEAD" === t.parentNode.nodeName) for (var o = 0; o < t.childNodes.length; o++) {
                        var a = t.childNodes[o].attributes.align, l = "---";
                        a && (l = i[a.value] || l), n += r(l, t.childNodes[o])
                    }
                    return "\n" + e + (n ? "\n" + n : "")
                }
            }, {
                filter: "table", replacement: function (e) {
                    return "\n\n" + e + "\n\n"
                }
            }, {
                filter: ["thead", "tbody", "tfoot"], replacement: function (e) {
                    return e
                }
            }, {
                filter: function (e) {
                    return "PRE" === e.nodeName && e.firstChild && "CODE" === e.firstChild.nodeName
                }, replacement: function (e, t) {
                    return "\n\n```\n" + t.firstChild.textContent + "\n```\n\n"
                }
            }, {
                filter: function (e) {
                    return "PRE" === e.nodeName && "DIV" === e.parentNode.nodeName && i.test(e.parentNode.className)
                }, replacement: function (e, t) {
                    return "\n\n```" + t.parentNode.className.match(i)[1] + "\n" + t.textContent + "\n```\n\n"
                }
            }, {
                filter: function (e) {
                    return "DIV" === e.nodeName && i.test(e.className)
                }, replacement: function (e) {
                    return "\n\n" + e + "\n\n"
                }
            }]
        }, {}],
        3: [function (e, t, n) {
            function r() {
                var e = !1;
                try {
                    document.implementation.createHTMLDocument("").open()
                } catch (t) {
                    window.ActiveXObject && (e = !0)
                }
                return e
            }

            var i = "undefined" != typeof window ? window : this;
            t.exports = function () {
                var e = i.DOMParser, t = !1;
                try {
                    (new e).parseFromString("", "text/html") && (t = !0)
                } catch (e) {
                }
                return t
            }() ? i.DOMParser : function () {
                var t = function () {
                };
                if ("undefined" == typeof document) {
                    var n = e("jsdom");
                    t.prototype.parseFromString = function (e) {
                        return n.jsdom(e, {features: {FetchExternalResources: [], ProcessExternalResources: !1}})
                    }
                } else r() ? t.prototype.parseFromString = function (e) {
                    var t = new window.ActiveXObject("htmlfile");
                    return t.designMode = "on", t.open(), t.write(e), t.close(), t
                } : t.prototype.parseFromString = function (e) {
                    var t = document.implementation.createHTMLDocument("");
                    return t.open(), t.write(e), t.close(), t
                };
                return t
            }()
        }, {jsdom: 6}],
        4: [function (e, t, n) {
            "use strict";
            t.exports = [{
                filter: "p", replacement: function (e) {
                    return "\n\n" + e + "\n\n"
                }
            }, {
                filter: "br", replacement: function () {
                    return "  \n"
                }
            }, {
                filter: ["h1", "h2", "h3", "h4", "h5", "h6"], replacement: function (e, t) {
                    for (var n = t.nodeName.charAt(1), r = "", i = 0; i < n; i++) r += "#";
                    return "\n\n" + r + " " + e + "\n\n"
                }
            }, {
                filter: "hr", replacement: function () {
                    return "\n\n* * *\n\n"
                }
            }, {
                filter: ["em", "i"], replacement: function (e) {
                    return "_" + e + "_"
                }
            }, {
                filter: ["strong", "b"], replacement: function (e) {
                    return "**" + e + "**"
                }
            }, {
                filter: function (e) {
                    var t = e.previousSibling || e.nextSibling, n = "PRE" === e.parentNode.nodeName && !t;
                    return "CODE" === e.nodeName && !n
                }, replacement: function (e) {
                    return "`" + e + "`"
                }
            }, {
                filter: function (e) {
                    return "A" === e.nodeName && e.getAttribute("href")
                }, replacement: function (e, t) {
                    var n = t.title ? ' "' + t.title + '"' : "";
                    return "[" + e + "](" + t.getAttribute("href") + n + ")"
                }
            }, {
                filter: "img", replacement: function (e, t) {
                    var n = t.alt || "", r = t.getAttribute("src") || "", i = t.title || "",
                        o = i ? ' "' + i + '"' : "";
                    return r ? "![" + n + "](" + r + o + ")" : ""
                }
            }, {
                filter: function (e) {
                    return "PRE" === e.nodeName && "CODE" === e.firstChild.nodeName
                }, replacement: function (e, t) {
                    return "\n\n    " + t.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n"
                }
            }, {
                filter: "blockquote", replacement: function (e) {
                    return e = e.trim(), e = e.replace(/\n{3,}/g, "\n\n"), "\n\n" + (e = e.replace(/^/gm, "> ")) + "\n\n"
                }
            }, {
                filter: "li", replacement: function (e, t) {
                    e = e.replace(/^\s+/, "").replace(/\n/gm, "\n    ");
                    var n = t.parentNode, r = Array.prototype.indexOf.call(n.children, t) + 1;
                    return (/ol/i.test(n.nodeName) ? r + ".  " : "*   ") + e
                }
            }, {
                filter: ["ul", "ol"], replacement: function (e, t) {
                    for (var n = [], r = 0; r < t.childNodes.length; r++) n.push(t.childNodes[r]._replacement);
                    return /li/i.test(t.parentNode.nodeName) ? "\n" + n.join("\n") : "\n\n" + n.join("\n") + "\n\n"
                }
            }, {
                filter: function (e) {
                    return this.isBlock(e)
                }, replacement: function (e, t) {
                    return "\n\n" + e + "\n\n"
                }
            }, {
                filter: function () {
                    return !0
                }, replacement: function (e, t) {
                    return e
                }
            }]
        }, {}],
        5: [function (e, t, n) {
            t.exports = ["address", "article", "aside", "audio", "blockquote", "canvas", "dd", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tfoot", "ul", "video"]
        }, {}],
        6: [function (e, t, n) {
        }, {}],
        7: [function (e, t, n) {
            "use strict";

            function r(e) {
                return !(!e || !u[e.nodeName])
            }

            function i(e) {
                return !(!e || !s[e.nodeName])
            }

            function o(e, t) {
                if (e.firstChild && "PRE" !== e.nodeName) {
                    "function" != typeof t && (t = r);
                    for (var n = null, o = !1, s = null, u = l(s, e); u !== e;) {
                        if (3 === u.nodeType) {
                            var c = u.data.replace(/[ \r\n\t]+/g, " ");
                            if (n && !/ $/.test(n.data) || o || " " !== c[0] || (c = c.substr(1)), !c) {
                                u = a(u);
                                continue
                            }
                            u.data = c, n = u
                        } else {
                            if (1 !== u.nodeType) {
                                u = a(u);
                                continue
                            }
                            t(u) || "BR" === u.nodeName ? (n && (n.data = n.data.replace(/ $/, "")), n = null, o = !1) : i(u) && (n = null, o = !0)
                        }
                        var f = l(s, u);
                        s = u, u = f
                    }
                    n && (n.data = n.data.replace(/ $/, ""), n.data || a(n))
                }
            }

            function a(e) {
                var t = e.nextSibling || e.parentNode;
                return e.parentNode.removeChild(e), t
            }

            function l(e, t) {
                return e && e.parentNode === t || "PRE" === t.nodeName ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode
            }

            var s = e("void-elements");
            Object.keys(s).forEach(function (e) {
                s[e.toUpperCase()] = 1
            });
            var u = {};
            e("block-elements").forEach(function (e) {
                u[e.toUpperCase()] = 1
            }), t.exports = o
        }, {"block-elements": 5, "void-elements": 8}],
        8: [function (e, t, n) {
            t.exports = {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                menuitem: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            }
        }, {}]
    }, {}, [1])(1)
}), function (e, t) {
    "use strict";
    var n = function (e, t) {
        this.settings = n.util.merge(e, n.defaults), this.editor = t, this.filenameTag = "{filename}", this.lastValue = null
    };
    n.editors = {}, n.util = {
        merge: function () {
            for (var e = {}, t = arguments.length - 1; t >= 0; t--) {
                var n = arguments[t];
                for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r])
            }
            return e
        }, appendInItsOwnLine: function (e, t) {
            return (e + "\n\n[[D]]" + t).replace(/(\n{2,})\[\[D\]\]/, "\n\n").replace(/^(\n*)/, "")
        }, insertTextAtCursor: function (t, n) {
            var r, i = t.scrollTop, o = 0, a = !1;
            t.selectionStart || "0" === t.selectionStart ? a = "ff" : e.selection && (a = "ie"), "ie" === a ? (t.focus(), r = e.selection.createRange(), r.moveStart("character", -t.value.length), o = r.text.length) : "ff" === a && (o = t.selectionStart);
            var l = t.value.substring(0, o), s = t.value.substring(o, t.value.length);
            t.value = l + n + s, o += n.length, "ie" === a ? (t.focus(), r = e.selection.createRange(), r.moveStart("character", -t.value.length), r.moveStart("character", o), r.moveEnd("character", 0), r.select()) : "ff" === a && (t.selectionStart = o, t.selectionEnd = o, t.focus()), t.scrollTop = i
        }
    }, n.defaults = {
        uploadUrl: "upload_attachment.php",
        uploadMethod: "POST",
        uploadFieldName: "file",
        defaultExtension: "png",
        jsonFieldName: "filename",
        allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/gif"],
        progressText: "![Uploading file...]()",
        urlText: "![file]({filename})",
        errorText: "Error uploading file",
        extraParams: {},
        extraHeaders: {},
        beforeFileUpload: function () {
            return !0
        },
        onFileReceived: function () {
        },
        onFileUploadResponse: function () {
            return !0
        },
        onFileUploadError: function () {
            return !0
        },
        onFileUploaded: function () {
        }
    }, n.prototype.uploadFile = function (e) {
        var t = this, n = new FormData, r = new XMLHttpRequest, i = this.settings,
            o = i.defaultExtension || i.defualtExtension;
        if ("function" == typeof i.setupFormData && i.setupFormData(n, e), e.name) {
            var a = e.name.match(/\.(.+)$/);
            a && (o = a[1])
        }
        var l = "image-" + Date.now() + "." + o;
        if ("function" == typeof i.remoteFilename && (l = i.remoteFilename(e)), n.append(i.uploadFieldName, e, l), "object" == typeof i.extraParams) for (var s in i.extraParams) i.extraParams.hasOwnProperty(s) && n.append(s, i.extraParams[s]);
        if (r.open("POST", i.uploadUrl), "object" == typeof i.extraHeaders) for (var u in i.extraHeaders) i.extraHeaders.hasOwnProperty(u) && r.setRequestHeader(u, i.extraHeaders[u]);
        return r.onload = function () {
            200 === r.status || 201 === r.status ? t.onFileUploadResponse(r) : t.onFileUploadError(r)
        }, !1 !== i.beforeFileUpload(r) && r.send(n), r
    }, n.prototype.isFileAllowed = function (e) {
        return "string" !== e.kind && (0 === this.settings.allowedTypes.indexOf("*") || this.settings.allowedTypes.indexOf(e.type) >= 0)
    }, n.prototype.onFileUploadResponse = function (e) {
        if (!1 !== this.settings.onFileUploadResponse.call(this, e)) {
            var t = JSON.parse(e.responseText), n = t[this.settings.jsonFieldName];
            if (t && n) {
                var r;
                r = "function" == typeof this.settings.urlText ? this.settings.urlText.call(this, n, t) : this.settings.urlText.replace(this.filenameTag, n);
                var i = this.editor.getValue().replace(this.lastValue, r);
                this.editor.setValue(i), this.settings.onFileUploaded.call(this, n)
            }
        }
    }, n.prototype.onFileUploadError = function (e) {
        if (!1 !== this.settings.onFileUploadError.call(this, e)) {
            var t = this.editor.getValue().replace(this.lastValue, "");
            this.editor.setValue(t)
        }
    }, n.prototype.onFileInserted = function (e) {
        !1 !== this.settings.onFileReceived.call(this, e) && (this.lastValue = this.settings.progressText, this.editor.insertValue(this.lastValue))
    }, n.prototype.onPaste = function (e) {
        var t, n = !1, r = e.clipboardData;
        if ("object" == typeof r) {
            t = r.items || r.files || [];
            for (var i = 0; i < t.length; i++) {
                var o = t[i];
                this.isFileAllowed(o) && (n = !0, this.onFileInserted(o.getAsFile()), this.uploadFile(o.getAsFile()))
            }
        }
        return n && e.preventDefault(), n
    }, n.prototype.onDrop = function (e) {
        for (var t = !1, n = 0; n < e.dataTransfer.files.length; n++) {
            var r = e.dataTransfer.files[n];
            this.isFileAllowed(r) && (t = !0, this.onFileInserted(r), this.uploadFile(r))
        }
        return t
    }, t.inlineAttachment = n
}(document, window), function () {
    "use strict";
    inlineAttachment.editors.input = {
        Editor: function (e) {
            var t = e;
            return {
                getValue: function () {
                    return t.value
                }, insertValue: function (e) {
                    inlineAttachment.util.insertTextAtCursor(t, e)
                }, setValue: function (e) {
                    t.value = e
                }
            }
        }, attachToInput: function (e, t) {
            t = t || {};
            var n = new inlineAttachment.editors.input.Editor(e), r = new inlineAttachment(t, n);
            e.addEventListener("paste", function (e) {
                r.onPaste(e)
            }, !1), e.addEventListener("drop", function (e) {
                e.stopPropagation(), e.preventDefault(), r.onDrop(e)
            }, !1), e.addEventListener("dragenter", function (e) {
                e.stopPropagation(), e.preventDefault()
            }, !1), e.addEventListener("dragover", function (e) {
                e.stopPropagation(), e.preventDefault()
            }, !1)
        }
    }
}(), function (e, t) {
    "use strict";
    var n = function (e, t) {
        this.settings = n.util.merge(e, n.defaults), this.editor = t, this.filenameTag = "{filename}", this.lastValue = null
    };
    n.editors = {}, n.util = {
        merge: function () {
            for (var e = {}, t = arguments.length - 1; t >= 0; t--) {
                var n = arguments[t];
                for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r])
            }
            return e
        }, appendInItsOwnLine: function (e, t) {
            return (e + "\n\n[[D]]" + t).replace(/(\n{2,})\[\[D\]\]/, "\n\n").replace(/^(\n*)/, "")
        }, insertTextAtCursor: function (t, n) {
            var r, i = t.scrollTop, o = 0, a = !1;
            t.selectionStart || "0" === t.selectionStart ? a = "ff" : e.selection && (a = "ie"), "ie" === a ? (t.focus(), r = e.selection.createRange(), r.moveStart("character", -t.value.length), o = r.text.length) : "ff" === a && (o = t.selectionStart);
            var l = t.value.substring(0, o), s = t.value.substring(o, t.value.length);
            t.value = l + n + s, o += n.length, "ie" === a ? (t.focus(), r = e.selection.createRange(), r.moveStart("character", -t.value.length), r.moveStart("character", o), r.moveEnd("character", 0), r.select()) : "ff" === a && (t.selectionStart = o, t.selectionEnd = o, t.focus()), t.scrollTop = i
        }
    }, n.defaults = {
        uploadUrl: "upload_attachment.php",
        uploadMethod: "POST",
        uploadFieldName: "file",
        defaultExtension: "png",
        jsonFieldName: "filename",
        allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/gif"],
        progressText: "![Uploading file...]()",
        urlText: "![file]({filename})",
        errorText: "Error uploading file",
        extraParams: {},
        extraHeaders: {},
        beforeFileUpload: function () {
            return !0
        },
        onFileReceived: function () {
        },
        onFileUploadResponse: function () {
            return !0
        },
        onFileUploadError: function () {
            return !0
        },
        onFileUploaded: function () {
        }
    }, n.prototype.uploadFile = function (e) {
        var t = this, n = new FormData, r = new XMLHttpRequest, i = this.settings,
            o = i.defaultExtension || i.defualtExtension;
        if ("function" == typeof i.setupFormData && i.setupFormData(n, e), e.name) {
            var a = e.name.match(/\.(.+)$/);
            a && (o = a[1])
        }
        var l = "image-" + Date.now() + "." + o;
        if ("function" == typeof i.remoteFilename && (l = i.remoteFilename(e)), n.append(i.uploadFieldName, e, l), "object" == typeof i.extraParams) for (var s in i.extraParams) i.extraParams.hasOwnProperty(s) && n.append(s, i.extraParams[s]);
        if (r.open("POST", i.uploadUrl), "object" == typeof i.extraHeaders) for (var u in i.extraHeaders) i.extraHeaders.hasOwnProperty(u) && r.setRequestHeader(u, i.extraHeaders[u]);
        return r.onload = function () {
            200 === r.status || 201 === r.status ? t.onFileUploadResponse(r) : t.onFileUploadError(r)
        }, !1 !== i.beforeFileUpload(r) && r.send(n), r
    }, n.prototype.isFileAllowed = function (e) {
        return "string" !== e.kind && (0 === this.settings.allowedTypes.indexOf("*") || this.settings.allowedTypes.indexOf(e.type) >= 0)
    }, n.prototype.onFileUploadResponse = function (e) {
        if (!1 !== this.settings.onFileUploadResponse.call(this, e)) {
            var t = JSON.parse(e.responseText), n = t[this.settings.jsonFieldName];
            if (t && n) {
                var r;
                r = "function" == typeof this.settings.urlText ? this.settings.urlText.call(this, n, t) : this.settings.urlText.replace(this.filenameTag, n);
                var i = this.editor.getValue().replace(this.lastValue, r);
                this.editor.setValue(i), this.settings.onFileUploaded.call(this, n)
            }
        }
    }, n.prototype.onFileUploadError = function (e) {
        if (!1 !== this.settings.onFileUploadError.call(this, e)) {
            var t = this.editor.getValue().replace(this.lastValue, "");
            this.editor.setValue(t)
        }
    }, n.prototype.onFileInserted = function (e) {
        !1 !== this.settings.onFileReceived.call(this, e) && (this.lastValue = this.settings.progressText, this.editor.insertValue(this.lastValue))
    }, n.prototype.onPaste = function (e) {
        var t, n = !1, r = e.clipboardData;
        if ("object" == typeof r) {
            t = r.items || r.files || [];
            for (var i = 0; i < t.length; i++) {
                var o = t[i];
                this.isFileAllowed(o) && (n = !0, this.onFileInserted(o.getAsFile()), this.uploadFile(o.getAsFile()))
            }
        }
        return n && e.preventDefault(), n
    }, n.prototype.onDrop = function (e) {
        for (var t = !1, n = 0; n < e.dataTransfer.files.length; n++) {
            var r = e.dataTransfer.files[n];
            this.isFileAllowed(r) && (t = !0, this.onFileInserted(r), this.uploadFile(r))
        }
        return t
    }, t.inlineAttachment = n
}(document, window), function () {
    "use strict";
    var e = function (e) {
        if (!e.getWrapperElement) throw"Invalid CodeMirror object given";
        this.codeMirror = e
    };
    e.prototype.getValue = function () {
        return this.codeMirror.getValue()
    }, e.prototype.insertValue = function (e) {
        this.codeMirror.replaceSelection(e)
    }, e.prototype.setValue = function (e) {
        var t = this.codeMirror.getCursor();
        this.codeMirror.setValue(e), this.codeMirror.setCursor(t)
    }, e.attach = function (t, n) {
        n = n || {};
        var r = new e(t), i = new inlineAttachment(n, r);
        t.getWrapperElement().addEventListener("paste", function (e) {
            i.onPaste(e)
        }, !1), t.setOption("onDragEvent", function (e, t) {
            if ("drop" === t.type) return t.stopPropagation(), t.preventDefault(), i.onDrop(t)
        })
    };
    var t = function (t) {
        e.call(this, t)
    };
    t.attach = function (t, n) {
        n = n || {};
        var r = new e(t), i = new inlineAttachment(n, r);
        t.getWrapperElement().addEventListener("paste", function (e) {
            i.onPaste(e)
        }, !1), t.on("drop", function (e, t) {
            return !!i.onDrop(t) && (t.stopPropagation(), t.preventDefault(), !0)
        })
    }, inlineAttachment.editors.codemirror4 = t
}();