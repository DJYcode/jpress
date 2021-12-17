function selectElementText(t) {
    var e = document.createRange();
    e.selectNodeContents(t);
    var n = window.getSelection();
    n.removeAllRanges(), n.addRange(e)
}

function getSelectedText() {
    var t = "";
    return window.getSelection ? t = window.getSelection() : document.getSelection ? t = document.getSelection() : document.selection && (t = document.selection.createRange().text), t
}

function copyToClipboard(t) {
    if (window.clipboardData && window.clipboardData.setData) return clipboardData.setData("Text", t);
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var e = document.createElement("textarea");
        e.textContent = t, e.style.position = "fixed", document.body.appendChild(e), e.select();
        try {
            return document.execCommand("copy")
        } catch (t) {
            return console.warn("Copy to clipboard failed.", t), !1
        } finally {
            document.body.removeChild(e)
        }
    }
}

function scrollToAnchor(t) {
    var e = $("*[id='" + t + "']");
    $("html,body").animate({scrollTop: e.offset().top}, "slow")
}

function atReplyCommentsByID(t, e) {
    selector = ".reply-comment-box-" + e, atReplyComments(t, selector), $(".reply-box-" + e).show()
}

function atReplyComments(t, e) {
    replyContent = $(e), oldContent = replyContent.val(), prefix = t ? "@" + t + " " : "", newContent = "", oldContent.length > 0 ? oldContent != prefix && (newContent = oldContent + "\n" + prefix) : newContent = prefix, replyContent.val(newContent), replyContent.focus(), moveEnd($(e))
}

function replyOne(t) {
    replyContent = $("#comment-composing-box"), oldContent = replyContent.val(), prefix = "@" + t + " ", newContent = "", oldContent.length > 0 ? oldContent != prefix && (newContent = oldContent + "\n" + prefix) : newContent = prefix, replyContent.focus(), replyContent.val(newContent), moveEnd($("#comment-composing-box"))
}

function count(t, e) {
    var n = t;
    e = e || {}, e.stripTags && (n = n.replace(/<\/?[a-z][^>]*>/gi, "")), e.ignore && each.call(e.ignore, function (t) {
        n = n.replace(t, "")
    });
    var i = n.trim();
    return {
        paragraphs: i ? (i.match(e.hardReturns ? /\n{2,}/g : /\n+/g) || []).length + 1 : 0,
        sentences: i ? (i.match(/[.?!…]+./g) || []).length + 1 : 0,
        words: i ? (i.replace(/['";:,.?¿\-!¡]+/g, "").match(/\S+/g) || []).length : 0,
        characters: i ? decode(i.replace(/\s/g, "")).length : 0,
        all: decode(n).length
    }
}

function decode(t) {
    for (var e = [], n = 0, i = t.length; n < i;) {
        var o = t.charCodeAt(n++);
        if (o >= 55296 && o <= 56319 && n < i) {
            var a = t.charCodeAt(n++);
            56320 == (64512 & a) ? e.push(((1023 & o) << 10) + (1023 & a) + 65536) : (e.push(o), n--)
        } else e.push(o)
    }
    return e
}

function setCookie(t, e, n) {
    var i = "";
    if (n) {
        var o = new Date;
        o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + o.toUTCString()
    }
    document.cookie = t + "=" + (e || "") + i + "; path=/"
}

function getCookie(t) {
    for (var e = t + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
        for (var o = n[i]; " " == o.charAt(0);) o = o.substring(1, o.length);
        if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
    }
    return null
}

function eraseCookie(t) {
    document.cookie = t + "=; Max-Age=-99999999;"
}

function debounce(t, e, n) {
    var i;
    return function () {
        var o = this, a = arguments, c = function () {
            i = null, n || t.apply(o, a)
        }, s = n && !i;
        clearTimeout(i), i = setTimeout(c, e), s && t.apply(o, a)
    }
}

var moveEnd = function (t) {
    t.focus();
    var e = void 0 === t.value ? 0 : t.value.length;
    if (document.selection) {
        var n = t.createTextRange();
        n.moveStart("character", e), n.collapse(), n.select()
    } else "number" == typeof t.selectionStart && "number" == typeof t.selectionEnd && (t.selectionStart = t.selectionEnd = e)
};
!function (t) {
    t.tablesort = function (e, n) {
        var i = this;
        this.$table = e, this.$thead = this.$table.find("thead"), this.settings = t.extend({}, t.tablesort.defaults, n), this.$sortCells = this.$thead.length > 0 ? this.$thead.find("th:not(.no-sort)") : this.$table.find("th:not(.no-sort)"), this.$sortCells.on("click.tablesort", function () {
            i.sort(t(this))
        }), this.index = null, this.$th = null, this.direction = null
    }, t.tablesort.prototype = {
        sort: function (e, n) {
            var i = new Date, o = this, a = this.$table, c = a.find("tbody").length > 0 ? a.find("tbody") : a,
                s = c.find("tr").has("td, th"), r = s.find(":nth-child(" + (e.index() + 1) + ")").filter("td, th"),
                l = e.data().sortBy, d = [], u = r.map(function (n, i) {
                    return l ? "function" == typeof l ? l(t(e), t(i), o) : l : null != t(this).data().sortValue ? t(this).data().sortValue : t(this).text()
                });
            0 !== u.length && (this.index !== e.index() ? (this.direction = "asc", this.index = e.index()) : this.direction = "asc" !== n && "desc" !== n ? "asc" === this.direction ? "desc" : "asc" : n, n = "asc" == this.direction ? 1 : -1, o.$table.trigger("tablesort:start", [o]), o.log("Sorting by " + this.index + " " + this.direction), o.$table.css("display"), setTimeout(function () {
                o.$sortCells.removeClass(o.settings.asc + " " + o.settings.desc);
                for (var a = 0, l = u.length; a < l; a++) d.push({index: a, cell: r[a], row: s[a], value: u[a]});
                d.sort(function (t, e) {
                    return o.settings.compare(t.value, e.value) * n
                }), t.each(d, function (t, e) {
                    c.append(e.row)
                }), e.addClass(o.settings[o.direction]), o.log("Sort finished in " + ((new Date).getTime() - i.getTime()) + "ms"), o.$table.trigger("tablesort:complete", [o]), o.$table.css("display")
            }, u.length > 2e3 ? 200 : 10))
        }, log: function (e) {
            (t.tablesort.DEBUG || this.settings.debug) && console && console.log && console.log("[tablesort] " + e)
        }, destroy: function () {
            return this.$sortCells.off("click.tablesort"), this.$table.data("tablesort", null), null
        }
    }, t.tablesort.DEBUG = !1, t.tablesort.defaults = {
        debug: t.tablesort.DEBUG,
        asc: "sorted ascending",
        desc: "sorted descending",
        compare: function (t, e) {
            return t > e ? 1 : t < e ? -1 : 0
        }
    }, t.fn.tablesort = function (e) {
        var n, i;
        return this.each(function () {
            n = t(this), i = n.data("tablesort"), i && i.destroy(), n.data("tablesort", new t.tablesort(n, e))
        })
    }
}(window.Zepto || window.jQuery), function (t) {
    var e, n = document.title, i = 0, o = !1, a = !1, c = !1,
        s = "//" + Config.cdn_domain + "/assets/editor/lib/katex/katex.min", r = {js: [], css: []}, l = {
            init: function () {
                var e = this;
                t(document).pjax("#show-version-topics", ".comment-list", {
                    timeout: 3e3,
                    maxCacheLength: 1e6
                }), t(document).pjax(".book-sidemenu a", ".pusher", {
                    timeout: 3e3,
                    maxCacheLength: 1e6
                }), t(document).pjax('a:not(a[target="_blank"])', "body", {
                    timeout: 3e3,
                    maxCacheLength: 1e6
                }), t(document).on("pjax:start", function () {
                    NProgress.start(), a && t("body").addClass("loading")
                }), t(document).on("pjax:end", function () {
                    NProgress.done(), a && t("body").removeClass("loading"), e.siteBootUp(), t(".ui.toc.sticky").length && setTimeout(function () {
                        window.dispatchEvent(new Event("resize"))
                    }, 300), window.screen.width <= 991 && a && t(".ui.left.sidebar").sidebar("hide"), Config.community.favicon.length > 0 && t("link[rel='shortcut icon']").attr("href", Config.community.favicon)
                }), t(document).on("pjax:complete", function () {
                    n = document.title, NProgress.done(), a && t("body").removeClass("loading")
                }), t(document).on("pjax:click", "a", function (e) {
                    var n = t(this).attr("href"), i = new URL(n).pathname, o = window.location.href;
                    if (t(this).hasClass("no-pjax") || i.endsWith("/edit") || i.endsWith("/create") || n.indexOf("cheatsheet") > -1 || n.indexOf("/sections/") > -1 || n.indexOf("/courses/laravel-package/") > -1 || n.indexOf("/quizzes/") > -1 || o.indexOf("cheatsheet/") > -1) return !1
                }), e.siteBootUp()
            }, siteBootUp: function () {
                var t = this;
                t.initFlashMessage(), t.initExternalLink(), t.initEmoji(), t.initSematicUI(), t.initAutocompleteAtUser(), t.initScrollToTop(), t.initLocalStorage(), t.initEditorPreview(), t.initReplyOnPressKey(), t.initDeleteForm(), t.initInlineAttach(), t.initAjax(), t.initLogin(), t.replyBtnShow(), t.initFollow(), t.initLoginRequired(), t.initSubmitBtn(), t.initLightBox(), t.initLaTeX(), t.initSlider(), t.initTabs(), t.initSimpleTextarea(), t.initTextareaAutoResize(), t.initHeightLight(), t.initReport(), t.initReplyUpvote(), t.initUpvote(), t.initTweetUpvote(), t.initPatchUpvote(), t.initCollectTopic(), t.initAttendTopic(), t.initAppendTopic(), t.initReadmore(), t.initBookSideMenu(), t.initApplyTA(), t.initVideo(), t.initReview(), t.initClearImg(), t.initPostTweets(), t.initTranslation(), t.initBookSorting(), t.initComposingHelp(), t.initCommunitySubscribe(), t.initUserHasDone(), t.initArticlePagers(), t.initEmojiPicker(), t.initAnalytics(), t.initRegister(), t.initQuiz(), t.initCountDown(), t.initWhitespace(), t.initCheatSheet(), t.initPromptInfo(), t.initCopyRight(), t.destroyLocalStorage(), t.copyCode(), t.bindKeys(), t.initDocMark(), t.initTOC(), t.initAnchorific()
            }, initHeightLight: function () {
                Prism.highlightAll()
            }, initBookSideMenu: function () {
                t(".book-sidemenu a").click(function () {
                    t(".book-sidemenu a.active").removeClass("active"), t(this).addClass("active")
                })
            }, initTextareaAutoResize: function () {
                autosize(t("textarea"))
            }, initSubmitBtn: function () {
                var n = this;
                t('button.ui.button[type="submit"]:not(.no-loading)').click(function () {
                    var i = t(this).parents("form:first"), o = i.find("input,textarea,select").filter("[required]"), a = 0;
                    if (o.each(function () {
                        "" !== this.value.trim() && (a += 1)
                    }), a == o.length && (t(this).addClass("loading"), t(this).addClass("disabled"), !t(".clear-submit").length)) {
                        var c = t(this);
                        e = setTimeout(function () {
                            c.after('<a class="clear-submit ml-3 ts-small" href="javascript:;">清除加载状态</a>'), t("a.clear-submit").click(function () {
                                n.clearSubmitState()
                            })
                        }, 3e3)
                    }
                })
            }, clearSubmitState: function () {
                var n = t('button.ui.disabled.button[type="submit"]');
                n.removeClass("loading"), n.removeClass("disabled"), clearTimeout(e), t(".clear-submit").remove()
            }, initSimpleTextarea: function () {
                t(".simple-tweet-textarea").on("focus", function (e) {
                    var n = t(".advance-editor-hint");
                    n.visible || n.fadeIn()
                }), t(".simple-tweet-textarea").on("input", function (e) {
                    var n = (t(".advance-editor-hint"), t("#advance-editor-link")),
                        i = n.data("url") + "?input=" + encodeURIComponent(t(this).val());
                    n.attr("href", i)
                })
            }, initTabs: function () {
                t(".menu .item[data-tab]").tab({
                    onVisible: function () {
                        window.dispatchEvent(new Event("resize"))
                    }
                })
            }, initTOC: function () {
                t(".tocify-header").length > 0 && t(".toc-content").html(""), (t(".content-body").find("h1").length > 0 || t(".content-body").find("h2").length > 0 || t(".content-body").find("h3").length > 0 || t(".content-body").find("h4").length > 0) && t(".toc-content").tocify({
                    context: ".content-body",
                    selectors: "h1,h2,h3,h4",
                    showAndHide: !1,
                    ignoreSelector: ".hiiden-translation-item h2,.hiiden-translation-item h3"
                }), window.location.hash.length && setTimeout(function () {
                    t(".tocify-header").length > 0 && 0 === window.pageYOffset && window.dispatchEvent(new Event("load"))
                }, 500)
            }, _checkPusherStyle: function (e) {
                var n = 200 / window.innerWidth * 100, i = 100 - n + "%";
                e && window.screen.width > 767 && (t(".ui.left.sidebar").sidebar("is visible") ? window.screen.width != t(".pusher").width() || a || (t(".pusher").width(i), t(".pusher").animate({marginLeft: n + "%"}, 400)) : (t(".pusher").width(i), t(".pusher").animate({marginLeft: n + "%"}, 400))), n == getCookie("sidbar_percent") && i == getCookie("width_percent") || (setCookie("sidbar_percent", n, 1e3), setCookie("width_percent", i, 1e3))
            }, initSematicUI: function () {
                var e = this;
                t(".ui.dropdown.click-dropdown").dropdown(), t(".ui.community-nav.dropdown").dropdown({
                    onChange: function (t, e, n) {
                        window.location.href = n.attr("href")
                    }
                }), t(".ui.checkbox").checkbox(), t(".ui.accordion").accordion(), t(".ui.sortable.table").tablesort(), t(".ui.toc.sticky").sticky({
                    silent: !0,
                    debug: !1,
                    context: ".article-content"
                }), t(".ui.topic-operation.sticky").sticky({
                    silent: !0,
                    context: ".main-column"
                }), t(".ui.translate-box.sticky").sticky({silent: !0}), t(".ui.popover").popup({
                    on: "hover",
                    position: "top center"
                }), t(".message .close").click(function () {
                    t(".message-container").transition("fade")
                }), e._checkPusherStyle(), t(".ui.left.sidebar").sidebar({
                    transition: "overlay",
                    mobileTransition: "uncover",
                    observeChanges: !0,
                    closable: !1,
                    dimPage: !1,
                    onVisible: function () {
                        e._checkPusherStyle(!0)
                    },
                    onShow: function () {
                        t(".fixed.launch.button").css("left", 200), t(".fixed.launch.button").css("padding", "10px 6px"), setTimeout(function () {
                            t(".ui.toc.sticky").sticky("refresh"), t(".ui.translate-box.sticky").sticky("refresh"), window.dispatchEvent(new Event("resize"))
                        }, 500), a = !0
                    },
                    onHide: function () {
                        t(".pusher").width("100%"), t(".pusher").css("margin-left", "inherit"), t(".ui.toc.sticky").each(function () {
                            t(this).data("moduleSticky").refresh()
                        }), t(".fixed.launch.button").css("padding", "0.78571429em 1.5em 0.78571429em"), t(".fixed.launch.button").css("left", 0)
                    },
                    onHidden: function () {
                        t(".ui.toc.sticky").sticky("refresh"), t(".ui.translate-box.sticky").sticky("refresh"), a = !1, setTimeout(function () {
                            window.dispatchEvent(new Event("resize"))
                        }, 300)
                    }
                }).sidebar("attach events", ".launch.button, .chapter-title, .launch.item"), t(".ui.top.sidebar").sidebar({
                    transition: "overlay",
                    mobileTransition: "uncover"
                }).sidebar("attach events", ".item.header.right.menu"), t(".ui.progress").progress(), t(".ui.search").search({
                    type: Config.search_type,
                    minCharacters: 1,
                    cache: !1,
                    maxResults: 30,
                    apiSettings: {url: Config.routes.api_search + "/?is_docs=" + Config.is_docs + "&user_id=" + Config.search_user_id + "&bookid=" + Config.book_id + "&q={query}"}
                });
                var n = t(".sidebar.menu .article.menu div.item.active");
                if (n.length) {
                    var i = t("<a />");
                    t.each(n[0].attributes, function (t, e) {
                        i.attr(e.name, e.value)
                    }), n.replaceWith(function () {
                        return t(i).append(n.contents())
                    })
                }
                var o = t(".sidebar.menu .article.menu .item.active");
                if (Config.article_position_id) {
                    o.removeClass("active"), o = t(".sidebar.menu .article.menu .item.article-position-" + Config.article_position_id), o.addClass("active"), a = !0, t(".toc-wrapper").remove(), o.find(".title").after('<div class="toc-wrapper content active"><div class="toc-content"></div></div>'), o.parent().hasClass("accordion") || o.parent().addClass("accordion");
                    var c = t(".sidebar.menu .title.chapter-position-" + o.data("chapter-id"));
                    if (c.hasClass("active") || c.click(), o[0]) {
                        var i = t("<div />");
                        t.each(o[0].attributes, function (t, e) {
                            i.attr(e.name, e.value)
                        }), o.replaceWith(function () {
                            return t(i).append(o.contents())
                        })
                    }
                }
                var s = -1;
                t(".sidebar.menu .item .open-all").click(function () {
                    s < 0 ? (t(".ui.accordion").accordion({exclusive: !1}), t(".sidebar.menu>.item>.header.title").each(function (e) {
                        t(this).hasClass("active") ? s = e : t(this).click()
                    })) : (t(".ui.accordion").accordion(), t(".sidebar.menu>.item>.header.title").each(function (e) {
                        s !== e && t(this).click()
                    }), s = -1)
                })
            }, initAnchorific: function () {
                0 == t(".anchorific").length && t("div.markdown-body.content-body").anchorific({
                    navigation: ".anchorific",
                    speed: 200,
                    anchorClass: "anchorific",
                    anchorText: "#",
                    top: ".topx",
                    spy: !0,
                    position: "append",
                    spyOffset: 0
                }), t(".markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4").each(function () {
                    t(this).hover(function (e) {
                        t(this).find(".anchorific").css("display", "inline-block")
                    }), t(this).mouseleave(function (e) {
                        t(this).find(".anchorific").hide()
                    })
                })
            }, initFollow: function () {
                var e = function (t) {
                    "follow" == t.data("act") ? (t.data("act", "unfollow"), t.find(".state").text("已关注"), t.find(".icon").removeClass("plus"), t.find(".icon").addClass("checkmark")) : (t.data("act", "follow"), t.find(".state").text("关注"), t.find(".icon").removeClass("checkmark"), t.find(".icon").addClass("plus")), t.toggleClass("primary")
                };
                t(".follow.button").api({
                    method: "POST",
                    url: Config.url + "/users/{id}/{act}",
                    data: {_token: Config.token},
                    onSuccess: function (t) {
                    }
                }).state({
                    onActivate: function () {
                        e(t(this))
                    }, onDeactivate: function () {
                        e(t(this))
                    }
                })
            }, initExternalLink: function () {
                t('.content-body a[href^="http://"], .content-body a[href^="https://"]').each(function () {
                    new RegExp("/" + window.location.host + "/").test(this.href) || t(this).click(function (t) {
                        t.preventDefault(), t.stopPropagation(), window.open(this.href, "_blank")
                    })
                })
            }, replyBtnShow: function () {
                t(".comments-feed .comment").each(function () {
                    t(this).hover(function (e) {
                        t(this).find(".reply-btn").show()
                    }), t(this).mouseleave(function (e) {
                        t(this).find(".reply-btn").hide()
                    })
                })
            }, initEmoji: function () {
                emojify.setConfig({
                    img_dir: Config.cdnDomain + "assets/images/twemoji",
                    ignored_tags: {SCRIPT: 1, TEXTAREA: 1, PRE: 1, CODE: 1}
                }), emojify.run(), t("#comment-composing-box").textcomplete([{
                    match: /\B:([\-+\w]*)$/,
                    search: function (e, n) {
                        n(t.map(emojies, function (t) {
                            return 0 === t.indexOf(e) ? t : null
                        }))
                    },
                    template: function (t) {
                        return '<img src="' + Config.cdnDomain + "build/img/emoji/" + t + '.png"></img>' + t
                    },
                    replace: function (t) {
                        return ":" + t + ": "
                    },
                    index: 1,
                    maxCount: 5
                }]), t(".reply-comments-composing-box").textcomplete([{
                    match: /\B:([\-+\w]*)$/, search: function (e, n) {
                        n(t.map(emojies, function (t) {
                            return 0 === t.indexOf(e) ? t : null
                        }))
                    }, template: function (t) {
                        return '<img src="' + Config.cdnDomain + "build/img/emoji/" + t + '.png"></img>' + t
                    }, replace: function (t) {
                        return ":" + t + ": "
                    }, index: 1, maxCount: 5
                }])
            }, initAutocompleteAtUser: function () {
                for (var e, n = Config.following_users, i = t(".ui.comments .comment a.author"), o = 0; o < i.length; o++) e = i.eq(o).text().trim(), -1 == t.inArray(e, n) && n.push(e);
                t("textarea").textcomplete([{
                    mentions: n, match: /\B@(\S*)$/, search: function (e, n) {
                        n(t.map(this.mentions, function (t) {
                            var n = t.toUpperCase(), i = t.toLowerCase();
                            return t.indexOf(e) >= 0 || n.indexOf(e.toUpperCase()) >= 0 || i.indexOf(e.toLowerCase()) >= 0 ? t : null
                        }))
                    }, index: 1, replace: function (t) {
                        return "@" + t + " "
                    }
                }], {
                    appendTo: "body", onKeydown: function (t, e) {
                        console.log(e)
                    }
                })
            }, initScrollToTop: function () {
                void 0 !== t && Config.scroll_to_top && t.scrollUp.init()
            }, initLightBox: function () {
                t(".fluidbox-content img:not(.emoji,.no-lightbox)").each(function () {
                    t(this).parent().is("a") || t(this).wrap("<a href='" + t(this).attr("src") + "' class='fluidbox'></a>")
                }).promise().done(function () {
                    t("a.fluidbox").fluidbox()
                })
            }, initLaTeX: function () {
                var e = this, n = t(".editormd-tex");
                0 != n.length && (-1 == t.inArray(s, r.js) ? e.loadScript(s, function () {
                    e.renderKatex(n)
                }) : e.renderKatex(n))
            }, runPreview: function () {
                var e = this, n = t("#comment-composing-box"), i = n.val(), o = "yes" == n.attr("data-enable-word-count");
                if (i) {
                    var a = new marked.Renderer;
                    a.paragraph = function (t) {
                        var e = /\$\$(.*)\$\$/g.test(t), n = /^\$\$(.*)\$\$$/.test(t), i = n ? ' class="editormd-tex"' : "";
                        return t = !n && e ? t.replace(/(\$\$([^\$]*)\$\$)+/g, function (t, e) {
                            return '<span class="editormd-tex">' + e.replace(/\$/g, "") + "</span>"
                        }) : n ? t.replace(/\$/g, "") : t, "<p" + i + ">" + t + "</p>\n"
                    }, a.code = function (t, e, n) {
                        return "seq" === e || "sequence" === e ? '<div class="sequence-diagram">' + t + "</div>" : "flow" === e ? '<div class="flowchart">' + t + "</div>" : "math" === e || "latex" === e || "katex" === e ? '<p class="editormd-tex">' + t + "</p>" : marked.Renderer.prototype.code.apply(this, arguments)
                    };
                    var c = marked(i, {
                        renderer: a, highlight: function (t, e) {
                            return Prism.languages.hasOwnProperty(e) || (e = Prism.languages[e] || "php"), Prism.highlight(t, Prism.languages[e])
                        }
                    });
                    if (t('input[name="body_html"]').length && t('input[name="body_html"]').val(c), t("#preview-box").html(c), c.indexOf("editormd-tex") > -1 && (-1 == t.inArray(s, r.js) ? e.loadScript(s, function () {
                        e.renderKatex(t("#preview-box").find(".editormd-tex"))
                    }) : e.renderKatex(t("#preview-box").find(".editormd-tex"))), emojify.run(document.getElementById("preview-box")), e.initLightBox(), o) {
                        var l = count(c, {stripTags: !0}).characters;
                        t("#word-count").text(l), l > 180 ? (t("#word-count").addClass("animated pulse text-red"), t("#word-count").removeClass("text-yellow"), n.addClass("border-red"), n.removeClass("border-yellow")) : l > 160 ? (t("#word-count").addClass("animated pulse text-yellow"), t("#word-count").removeClass("text-red"), n.addClass("border-yellow"), n.removeClass("border-red")) : l < 160 && (t("#word-count").removeClass("text-yellow"), t("#word-count").removeClass("text-red"), n.removeClass("border-red"), n.removeClass("border-yellow"))
                    }
                } else t("#preview-box").html(i)
            }, renderKatex: function (e) {
                "undefined" != typeof katex && e.each(function () {
                    var e = t(this);
                    katex.render(e.text(), e[0])
                })
            }, initEditorPreview: function () {
                var e = this, n = debounce(function () {
                    e.runPreview()
                }, 250);
                t("#comment-composing-box").bind("input propertychange", n), t("#comment-composing-box").bind("focus", function () {
                    t("#preview-box").visible || t("#preview-box").fadeIn(1500), e.runPreview()
                })
            }, initReplyOnPressKey: function () {
                var e = debounce(function (e) {
                    var n = t("#comment-composing-submit");
                    if ((10 == e.keyCode || 13 == e.keyCode) && e.ctrlKey && n.is(":enabled")) return t("#comment-composing-form").submit(), !0
                }, 250);
                t(document).on("keydown", "#comment-composing-box", e)
            }, initApplyTA: function () {
                t("#apply-for-ta-btn").click(function (e) {
                    var n = "";
                    n = "yes" != t(this).attr("data-is-docs") ? "您正在申请成为本课程的『助教』，助教的任务是解答同学的提问，当新问题提交时，系统会第一时间通知您。『解答提问』可以提高你的技术能力，锻炼问题解决能力，提高影响力。" : "文档订阅成功后，当文档新问题提交时，系统会第一时间通知您。", swal({
                        title: "",
                        html: n,
                        type: "warning",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "确定"
                    }).then(function () {
                        t("#apply-for-ta-form").submit()
                    }).catch(swal.noop)
                }), t("#cancel-for-ta-btn").click(function (e) {
                    var n = "";
                    n = "yes" != t(this).attr("data-is-docs") ? "您要取消本课程『助教』的身份吗？取消后将不再接收到课程问题通知。" : "您要取消订阅本文档吗？取消后将不再接收到文档问题通知。", swal({
                        title: "",
                        html: n,
                        type: "warning",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "确定"
                    }).then(function () {
                        t("#apply-for-ta-form").submit()
                    }).catch(swal.noop)
                })
            }, initDeleteForm: function () {
                t("[data-method]").append(function () {
                    return t(this).hasClass("login_required") && 0 == Config.user_id ? "" : "\n<form action='" + t(this).attr("data-url") + "' method='POST' style='display:none'>\n   <input type='hidden' name='_method' value='" + t(this).attr("data-method").toUpperCase() + "'>\n   <input type='hidden' name='_token' value='" + Config.token + "'>\n</form>\n"
                }).css("cursor", "pointer").click(function () {
                    if (Config.user_id > 0) {
                        var e = t(this);
                        "DELETE" == e.attr("data-method").toUpperCase() && swal({
                            title: "",
                            html: t(this).attr("data-hint") ? t(this).attr("data-hint") : "你确定要删除此内容吗？",
                            type: "warning",
                            showCancelButton: !0,
                            cancelButtonText: "取消",
                            confirmButtonText: "删除"
                        }).then(function () {
                            e.find("form").submit()
                        }).catch(swal.noop), "POST" != e.attr("data-method").toUpperCase() && "GET" != e.attr("data-method").toUpperCase() || (e.attr("data-prompt") ? swal({
                            title: "",
                            html: t(this).attr("data-prompt"),
                            type: "warning",
                            showCancelButton: !0,
                            cancelButtonText: "取消",
                            confirmButtonText: "确定"
                        }).then(function () {
                            e.find("form").submit()
                        }).catch(swal.noop) : e.find("form").submit())
                    }
                })
            }, initLocalStorage: function () {
                var e = t("#comment-composing-box"), n = "comment-draft-" + e.attr("data-storage-key");
                if (e.attr("data-storage-key")) {
                    e.length > 0 && "" == e.val() && localStorage.getItem(n) && e.val(localStorage.getItem(n));
                    var i = debounce(function () {
                        localStorage.setItem(n, t(this).val())
                    }, 3e3);
                    e.keyup(i), t(".remove-localStorage-onsubmit").submit(function (t) {
                        localStorage.removeItem(n)
                    })
                }
            }, removeLocalStorage: function (t) {
                var e = "comment-draft-" + t.attr("data-storage-key");
                localStorage.removeItem(e)
            }, initInlineAttach: function () {
                var e = this;
                t("#comment-composing-box").inlineattach({
                    uploadUrl: Config.routes.upload_image,
                    extraParams: {_token: Config.token},
                    onUploadedFile: function (t) {
                        setTimeout(e.runPreview, 200)
                    }
                })
            }, initTopicReply: function () {
                t(".show-reply-box").click(function () {
                    t("." + t(this).data("reply-box-class")).toggle()
                }), t(".attend-topic-checkbox").click(function () {
                    setCookie("attend-topic", t("#attend-topic-checkbox").is(":checked") ? "yes" : "no", 1e3)
                }), t(".reply-comments").submit(function (e) {
                    e.preventDefault();
                    var n = t(this);
                    n.find(".comment-btn").addClass("loading disabled").prop("disabled", !0), t.ajax({
                        method: "POST",
                        url: n.attr("action"),
                        data: {
                            body: n.find("[name=comment-body-input]").val(),
                            attend_topic: 0,
                            reply_id: n.data("reply-id"),
                            topic_id: n.data("topic-id"),
                            _token: Config.token
                        }
                    }).done(function (e) {
                        200 == e.status && (t(".inner-comment-lists-" + n.data("reply-id")).html(t(e.html)), n.find("[name=comment-body-input]").val(""), emojify.run(), t(".reply-count").text(e.reply_count)), t(".reply.ui.message.reply-" + n.data("reply-id")).addClass(e.message_class).text(e.message).fadeIn()
                    }).fail(function (e) {
                        if (422 == e.status) {
                            var i = e.responseJSON.errors;
                            i.body && t(".reply.ui.message.reply-" + n.data("reply-id")).removeClass("green").addClass("error").text(i.body[0]).fadeIn()
                        }
                    }).always(function () {
                        n.find(".comment-btn").removeClass("loading disabled").prop("disabled", !1)
                    })
                });
                var e = this, n = t(".topic-reply-form"), i = t("#comment-composing-submit"), a = i.val(),
                    c = t("#all-comments"), s = t("#preview-box");
                n.submit(function () {
                    var n = t(this).find("textarea"), r = n.val();
                    return t(".reply.ui.message.new-reply").removeClass("error green").text("").hide(), "" === t.trim(r) || o || (i.val("提交中...").addClass("loading disabled").prop("disabled", !0), o = !0, t.ajax({
                        method: "POST",
                        url: t(this).attr("action"),
                        data: {
                            body: r,
                            body_html: t('input[name="body_html"]').length ? t('input[name="body_html"]').val() : "",
                            attend_topic: t("#attend-topic-checkbox").is(":checked") ? 1 : 0,
                            topic_id: t("[name=topic_id]").val(),
                            _token: Config.token
                        }
                    }).done(function (i) {
                        200 === i.status && (c.html(t(i.html)), t(".reply-count").text(i.reply_count),
                            t("#replies-empty-block").fadeOut(), t(".empty-block").hide(), t("#preview-box").hide(), n.val(""),
                            e.removeLocalStorage(n), s.html(""), location.href = location.href.split("#")[0] + "#reply" + i.reply_id, emojify.run(), e.siteBootUp()),
                            t(".reply.ui.message.new-reply").addClass(i.message_class).text(i.message).fadeIn()
                    }).fail(function (e) {
                        if (422 == e.status) {
                            var n = e.responseJSON.errors;
                            n.body && t(".reply.ui.message.new-reply").removeClass("green").addClass("error").text(n.body[0]).fadeIn()
                        }
                    }).always(function () {
                        i.val(a).removeClass("loading disabled").prop("disabled", !1), o = !1
                    })), !1
                })
            }, initAjax: function () {
                t.ajaxSetup({headers: {"X-CSRF-TOKEN": t('meta[name="_token"]').attr("content")}}), this.initTopicReply()
            }, initLogin: function () {
                t("#login-out").click(function (e) {
                    return swal({
                        title: "",
                        text: "将要退出登录？",
                        type: "warning",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "退出"
                    }).then(function () {
                        e.preventDefault(), t("#logout-form").submit()
                    }), !1
                }), Config.login_error && t(".ui.login.modal").modal("show")
            }, initSlider: function () {
            }, _resetTitle: function () {
                window.location.href.indexOf("notifications") > -1 && (i = 0), i > 0 ? (t("#notification-count").text(i), t("#notification-count").removeClass("basic"), t("#notification-count").hasClass("red") || t("#notification-count").addClass("red"), document.title = "(" + i + ") " + n) : (document.title = n, t("#notification-count").text(0), t("#notification-count").addClass("basic"), t("#notification-count").removeClass("red"))
            }, initNotificationsCount: function () {
                function e() {
                    var n = parseInt(localStorage.getItem(s));
                    n && Date.now() - n >= a ? (localStorage.setItem(s, Date.now()), t.get(Config.routes.notificationsCount, function (t) {
                        i = parseInt(t), o._resetTitle(), localStorage.setItem(s, Date.now()), localStorage.setItem(r, t), setTimeout(e, a)
                    })) : (i = parseInt(localStorage.getItem(r)), o._resetTitle(), setTimeout(e, a))
                }

                function n() {
                    i = parseInt(localStorage.getItem(r)), o._resetTitle(), setTimeout(n, c)
                }

                var o = this, a = Config.request_interval, c = 5e3, s = "notification_requested_at",
                    r = "notification_count";
                Config.user_id > 0 && "production" == Config.environment && (localStorage.setItem(s, Date.now()), i = Config.notification_count, o._resetTitle(), localStorage.setItem(r, Config.notification_count), setTimeout(e, a), setTimeout(n, c))
            }, initLoginRequired: function () {
                var e = this;
                t(".login_required").click(function (t) {
                    0 == Config.user_id && (t.preventDefault(), e._showLoginForm())
                })
            }, _showLoginForm: function () {
                t(".ui.login.modal").modal({blurring: !0}).modal("show"), t(".ui.form.login").find("input[name=return_back]").val("yes")
            }, initReport: function () {
                t(".report-modal").click(function (e) {
                    var n = t(this), i = n.data("typename"), o = t(".ui.report.modal");
                    o.find(".modal-title").text("举报" + i), o.find(".modal-typename").text(i), o.find("input[name=reportable_id]").val(n.data("contentid")), o.find("input[name=reportable_type]").val(n.data("contenttype")), o.modal({blurring: !0}).modal("show")
                }), t(".show-judgement-form-btn").click(function () {
                    var e = t(".ui.modal.judgement"), n = t(this);
                    e.find("input[name=report_content_id]").val(n.data("report_content_id")), e.modal({
                        blurring: !0,
                        onApprove: function () {
                            t("#judgement-form").submit()
                        }
                    }).modal("show")
                }), t(".judge.button").api({
                    method: "POST",
                    url: Config.url + "/reports/judgment_ajax",
                    data: {_token: Config.token},
                    beforeSend: function (e) {
                        return 0 == t("input[name=judgment]:checked").length ? (swal({
                            title: "请选择裁决结果",
                            type: "error"
                        }), !1) : (e.data.judgment = t("input[name=judgment]:checked").val(), e.data.report_content_id = Config.report_content_id, e)
                    },
                    onSuccess: function (e) {
                        e.message ? swal({
                            title: e.message,
                            type: "error"
                        }) : (Config.report_content_id = e.report_content_id, t(".first-time-main-content").html(e.view), t("input[name=judgment]:checked").prop("checked", !1), e.reports_unjudge_count > 0 ? t(".reports_unjudge_count").text(e.reports_unjudge_count) : (t(".reports_unjudge_count").hide(), t(".card.judgement").hide()), t("html,body").animate({scrollTop: 0}, 800))
                    }
                })
            }, initReplyUpvote: function () {
                t(".reply-upvote").api({
                    method: "POST",
                    url: Config.url + "/replies/{id}/vote",
                    data: {_token: Config.token},
                    beforeSend: function (e) {
                        return t(this).find("i.icon").removeClass("thumbs up outline").addClass("spinner loading"), e
                    },
                    onSuccess: function (e) {
                        t(this).find(".vote-count").text(e.count), t(this).find("i").removeClass("spinner loading").addClass("thumbs up outline")
                    }
                })
            }, initTweetUpvote: function () {
                var e = this;
                t(".topic-vote").api({
                    method: "POST",
                    url: Config.url + "/topics/{id}/upvote",
                    data: {_token: Config.token},
                    beforeSend: function (e) {
                        return t(this).find("i.icon").removeClass("thumbs up").addClass("spinner loading"), e
                    },
                    onSuccess: function (n) {
                        t(this).find(".vote-count").text(n.count), t(this).find("i").removeClass("spinner loading").addClass("thumbs up").toggleClass("active"), t(this).attr("data-html", ""), t(".topic-voted-users").length && (t(".topic-voted-users").replaceWith(n.html), e.initTweetUpvote())
                    }
                })
            }, initPatchUpvote: function () {
                var e = this;
                t(".patch-vote").api({
                    method: "POST",
                    url: Config.url + "/patches/{id}/upvote",
                    data: {_token: Config.token},
                    beforeSend: function (e) {
                        return t(this).find("i.icon").removeClass("thumbs up").addClass("spinner loading"), e
                    },
                    onSuccess: function (n) {
                        t(this).find(".vote-count").text(n.count), t(this).find("i").removeClass("spinner loading").addClass("thumbs up").toggleClass("active"), t(this).attr("data-html", ""), t(".patch-voted-users").length && (t(".patch-voted-users").replaceWith(n.html), e.initTweetUpvote())
                    }
                })
            }, initUpvote: function () {
                function e(t) {
                    "点赞" == t.find(".state").text() ? t.find(".state").text("已赞") : t.find(".state").text("点赞")
                }

                function n(t) {
                    "star" == t.data("act") ? (t.data("act", "unstar"), t.find(".state").text("已点赞")) : (t.data("act", "star"), t.find(".state").text("点赞"))
                }

                function i(t) {
                    "star" == t.data("act") ? (t.data("act", "unstar"), t.find(".state").text("已点赞")) : (t.data("act", "star"), t.find(".state").text("点赞"))
                }

                function o(t) {
                    "star" == t.data("act") ? t.data("act", "unstar") : t.data("act", "star"), t.find(".state").toggleClass("active")
                }

                t(".kb-star-big.button").api({
                    method: "POST",
                    url: Config.url + "/topics/{id}/upvote",
                    data: {_token: Config.token},
                    onSuccess: function (e) {
                        t(this).find("a.star_count").text(e.count)
                    }
                }).state({
                    onActivate: function () {
                        e(t(".kb-star.button")), e(t(this)), t(this).toggleClass("primary")
                    }, onDeactivate: function () {
                        e(t(".kb-star.button")), e(t(this)), t(this).toggleClass("primary")
                    }
                }), t(".kb-star.button").api({
                    method: "POST",
                    url: Config.url + "/topics/{id}/upvote",
                    data: {_token: Config.token},
                    onSuccess: function (e) {
                        t(this).find("a.star_count").text(e.count)
                    }
                }).state({
                    onActivate: function () {
                        e(t(this)), e(t(".kb-star-big.button")), o(t(".book-article-kb-star.button"))
                    }, onDeactivate: function () {
                        e(t(this)), e(t(".kb-star-big.button")), o(t(".book-article-kb-star.button"))
                    }
                }), t(".book-article-kb-star-big.button").api({
                    method: "POST",
                    url: "/courses/articles/{id}/{act}",
                    data: {_token: Config.token},
                    onSuccess: function (e) {
                        t("a.star_count").text(e.count), t(".vote-count.count").text(e.count)
                    }
                }).state({
                    onActivate: function () {
                        o(t(".book-article-star.action")), n(t(".book-article-kb-star-big.button")), i(t(".book-article-kb-star.button")), e(t(".kb-star-big.button"))
                    }, onDeactivate: function () {
                        o(t(".book-article-star.action")), n(t(".book-article-kb-star-big.button")), i(t(".book-article-kb-star.button")), e(t(".kb-star-big.button"))
                    }
                }), t(".book-article-kb-star.button").api({
                    method: "POST",
                    url: "/courses/articles/{id}/{act}",
                    data: {_token: Config.token},
                    onSuccess: function (e) {
                        t("a.star_count").text(e.count), t(".vote-count.count").text(e.count)
                    }
                }).state({
                    onActivate: function () {
                        o(t(".book-article-star.action")), n(t(".book-article-kb-star-big.button")), i(t(".book-article-kb-star.button")), e(t(".kb-star-big.button"))
                    }, onDeactivate: function () {
                        o(t(".book-article-star.action")), n(t(".book-article-kb-star-big.button")), i(t(".book-article-kb-star.button")), e(t(".kb-star-big.button"))
                    }
                }), t(".book-article-star.action").api({
                    method: "POST",
                    url: "/courses/articles/{id}/{act}",
                    data: {_token: Config.token},
                    onSuccess: function (e) {
                        t(".vote-count.count").text(e.count), t("a.star_count").text(e.count)
                    }
                }).state({
                    onActivate: function () {
                        o(t(".book-article-star.action")), n(t(".book-article-kb-star-big.button")), i(t(".book-article-kb-star.button")), e(t(".kb-star-big.button"))
                    }, onDeactivate: function () {
                        o(t(".book-article-star.action")), n(t(".book-article-kb-star-big.button")), i(t(".book-article-kb-star.button")), e(t(".kb-star-big.button"))
                    }
                })
            }, initCollectTopic: function () {
                function e(e) {
                    t.ajax({
                        url: Config.url + "/collections/collect/topics/" + Config.topic_id,
                        data: {_token: Config.token, collection_ids: e},
                        cache: !1,
                        type: "POST",
                        success: function (n) {
                            var i = e.length > 0 ? "收藏成功" : "成功取消收藏";
                            swal({
                                title: i,
                                type: "success",
                                showConfirmButton: !1,
                                timer: 2200
                            }).catch(swal.noop), e.length > 0 ? t(".heart.icon").hasClass("red") || (t(".heart.icon").addClass("red"), t(".collect-text").text("已收藏")) : t(".heart.icon").hasClass("red") && (t(".heart.icon").removeClass("red"), t(".collect-text").text("收藏")), t(".collect-count").text(n.count)
                        },
                        error: function (t) {
                            swal({title: "收藏失败", text: "请再尝试，如果继续出错，请联系管理员", type: "error"})
                        }
                    })
                }

                function n(n) {
                    var i = !1,
                        o = '<a class="ui small basic label create-collection-btn"><i class="icon paint brush"></i>新建收藏夹</a><div class="ui divider"></div><div class="ui form" style="text-align:left">';
                    t.each(n, function (t, e) {
                        i = "yes" == e.check || i;
                        var n = "yes" == e.check ? "checked" : "";
                        o += '<div class="field"><div class="ui checkbox">', o += '<input type="checkbox" ' + n + ' name="collection' + e.id + '" id="collection' + e.id + '" value="' + e.id + '">', o += '<label for="collection' + e.id + '">' + e.name + "</label>", o += '</div><span class="pull-right count">' + e.count + " 条内容</span></div>"
                    }), o += '</div><div class="ui divider"></div>', swal({
                        title: "请选择收藏夹",
                        html: o,
                        type: "",
                        customClass: "collection-model",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "保存收藏",
                        showLoaderOnConfirm: !0,
                        preConfirm: function () {
                            var n = t(".collection-model input[type=checkbox]:checked").map(function () {
                                return t(this).val()
                            }).get();
                            return new Promise(function (t, o) {
                                i ? e(n) : 0 == n.length ? o("请选择至少一个收藏夹") : e(n)
                            })
                        }
                    }).then(function () {
                    }).catch(swal.noop)
                }

                t(".action.collect").api({
                    method: "get",
                    url: Config.routes.collections_my,
                    data: {_token: Config.token, topic_id: Config.topic_id},
                    onSuccess: function (t) {
                        n(t)
                    }
                }).state({}), t("body").on("click", ".create-collection-btn", function () {
                    swal({
                        title: "新建收藏夹",
                        input: "text",
                        inputPlaceholder: "请输入收藏夹名称",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "创建",
                        showLoaderOnConfirm: !0,
                        inputValidator: function (e) {
                            return new Promise(function (i, o) {
                                if (e && e.length > 1) return new Promise(function (i) {
                                    t.ajax({
                                        url: Config.routes.collections_store,
                                        data: {_token: Config.token, name: e, topic_id: Config.topic_id},
                                        cache: !1,
                                        type: "POST",
                                        success: function (t) {
                                            n(t)
                                        },
                                        error: function (t) {
                                            swal({title: "收藏失败", text: "请再尝试，如果继续出错，请联系管理员", type: "error"})
                                        }
                                    })
                                });
                                o("请至少填入两个字符以上")
                            })
                        }
                    }).then(function (t) {
                    }).catch(swal.noop)
                })
            }, initAttendTopic: function () {
                t(".attend-topic").api({
                    method: "post",
                    url: Config.url + "/attentions/{id}",
                    data: {_token: Config.token},
                    beforeSend: function (e) {
                        return t(this).find("i.icon").removeClass("eye checkmark").addClass("spinner loading"), e
                    },
                    onSuccess: function (e) {
                        t(this).find(".icon").removeClass("spinner loading"), t(this).attr("data-html", ""), t(this).hasClass("is-sticker") ? t(this).find(".icon").addClass("eye").toggleClass("active") : "关注" == t(this).find(".state").text() ? (t(this).find(".state").text("已关注"), t(this).find(".icon").addClass("checkmark")) : (t(this).find(".state").text("关注"), t(this).find(".icon").addClass("eye"))
                    }
                }).state({})
            }, initAppendTopic: function () {
                t("#topic-append-button").click(function () {
                    swal({
                        title: "添加帖子附言",
                        input: "textarea",
                        inputPlaceholder: "请使用 Markdown",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "添加附言",
                        showLoaderOnConfirm: !0,
                        inputValidator: function (e) {
                            return new Promise(function (n, i) {
                                if (e && e.length > 2) return new Promise(function (n) {
                                    t.ajax({
                                        url: Config.url + "/topics/" + Config.topic_id + "/append",
                                        data: {_token: Config.token, content: e, topic_id: Config.topic_id},
                                        cache: !1,
                                        type: "POST",
                                        success: function (t) {
                                            location.reload()
                                        },
                                        error: function (t) {
                                            swal({title: "附言添加失败", text: "请再尝试，如果继续出错，请联系管理员", type: "error"})
                                        }
                                    })
                                });
                                i("请至少填入两个字符以上")
                            })
                        }
                    }).then(function (t) {
                    }).catch(swal.noop)
                })
            }, initReadmore: function () {
                var e = t(".readmore").attr("data-height"), n = 105;
                void 0 !== e && !1 !== e && (n = e), t(".readmore").readmore({
                    collapsedHeight: parseInt(n),
                    lessLink: "",
                    moreLink: '<a href="#" class="readmore-separator" style="display: block;text-align: center; color: #989898;border-top: 1px solid #eee;padding-top: 6px;"><i class="icon angle double down"></i> 展开</a>'
                }), t(".topics-show-page .content-body pre").readmore({
                    collapsedHeight: 900,
                    lessLink: "",
                    moreLink: '<a href="#" class="readmore-separator" style="display: block;text-align: center;color: #989898;padding-top: 0px;margin-bottom: 26px;text-decoration: underline;margin-top: -12px;font-weight: bold;" data-readmore-toggle="rmjs-1" aria-controls="rmjs-1"><i class="icon angle double down"></i> 代码已被折叠，点此展开</a>'
                }), t(".comment-body.markdown-reply pre").readmore({
                    collapsedHeight: 900,
                    lessLink: "",
                    moreLink: '<a href="#" class="readmore-separator" style="display: block;text-align: center;color: #989898;padding-top: 0px;margin-bottom: 26px;text-decoration: underline;margin-top: 6px;font-weight: bold;" data-readmore-toggle="rmjs-1" aria-controls="rmjs-1"><i class="icon angle double down"></i> 代码已被折叠，点此展开</a>'
                })
            }, initPostTweets: function () {
                var e = this;
                t("#post-tweets").click(function (n) {
                    var i = t(".recent_tweets.ui.feed"), a = t("#tweet-create-form"), c = a.find(".simple-tweet-textarea");
                    tweetContent = a.find(".simple-tweet-textarea").val(), "" === t.trim(tweetContent) || o || (t(this).addClass("loading disabled").prop("disabled", !0), o = !0, t.ajax({
                        method: "POST",
                        url: a.attr("action"),
                        data: {body: tweetContent, _token: Config.token}
                    }).done(function (n) {
                        if (200 === n.status) {
                            var o = n.html;
                            i.hide(), t("#advance-editor-link").hide(), i.html(o).fadeIn(2e3), c.val(""), emojify.run(), e.initTweetUpvote()
                        }
                    }).always(function () {
                        t("#post-tweets").removeClass("loading disabled").prop("disabled", !1), o = !1
                    }))
                })
            }, initTranslation: function () {
                t(".ui.translate-box.sticky").length && setTimeout(function () {
                    t(".ui.toc.sticky").sticky("refresh"), t(".ui.translate-box.sticky").sticky("refresh"), window.dispatchEvent(new Event("resize"))
                }, 500), t(".claim").click(function (e) {
                    var n = t(this).data("url");
                    swal({
                        title: "翻译认领",
                        input: "radio",
                        inputOptions: {20: "20 分钟", 30: "30 分钟", 40: "40 分钟"},
                        text: "翻译时间超时前，其他人将无法参与翻译本区块。请选择翻译时间：",
                        inputPlaceholder: "预计需要多少分钟完成？",
                        type: "warning",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "认领翻译",
                        inputValidator: function (e) {
                            return new Promise(function (i, o) {
                                e ? (t("#message").val(e), window.location.href = n + "?cost_time=" + e, i()) : o("请选择翻译时间！")
                            })
                        }
                    }).then(function (t) {
                    }).catch(swal.noop)
                }), t(".expand-translation").click(function () {
                    var e = t(this).closest(".translation-item").attr("index");
                    t(".translation-item").each(function () {
                        t(this).hasClass("active") || t(this).attr("index") != e || t(this).slideToggle(400, "swing", function () {
                            var e = t(this);
                            setTimeout(function () {
                                t(".ui.translate-box.sticky").sticky("refresh"), window.dispatchEvent(new Event("resize"))
                            }, 500), t("html, body").animate({scrollTop: e.offset().top}, 500)
                        })
                    })
                }), t(".section-vote").click(function () {
                    var e = t(this), n = e.find(".vote-count");
                    window.event.preventDefault(), t.post(t(this).data("url"), {_token: Config.token}, function (t) {
                        n.text(t.count)
                    })
                }), window.location.search.indexOf("verified_status") > -1 && swal({
                    type: "info",
                    confirmButtonText: "知道了",
                    html: "感谢您的参与，为了保证翻译的质量，我们需先审核您提交的内容。"
                }).then(function () {
                }).catch(swal.noop)
            }, initBookSorting: function () {
                if (t("li.item").hover(function () {
                    t(this).find(".operation").show()
                }, function () {
                    t(this).find(".operation").hide()
                }), t(".create-chapter-btn").click(function () {
                    swal({
                        title: "新建章节",
                        text: "请添加章节名称：",
                        input: "text",
                        showCancelButton: !0,
                        confirmButtonText: "创建",
                        cancelButtonText: "取消",
                        inputValidator: function (t) {
                            return new Promise(function (e, n) {
                                t ? e() : n("章节名称不能为空！")
                            })
                        }
                    }).then(function (e) {
                        swal.showLoading(), t.ajax({
                            url: "/courses/chapters",
                            type: "POST",
                            data: {_token: Config.token, name: e, chapter_id: 0, book_id: Config.book_id},
                            success: function (t) {
                                location.reload()
                            },
                            error: function () {
                                swal.hideLoading(), swal({
                                    title: "Error!",
                                    text: "有错误发生！",
                                    type: "error",
                                    confirmButtonText: "知道了"
                                })
                            }
                        })
                    }).catch(swal.noop)
                }), t(".batch-create-btn").click(function () {
                    var e = (t(this), t(this).attr("data-url"));
                    swal({
                        title: "批量创建",
                        html: '可批量创建文章和章节，使用前请先 <a href="https://learnku.com/docs/writing-docs/bulk-creation/3842" target="_blank">阅读这里</a>',
                        input: "textarea",
                        showCancelButton: !0,
                        confirmButtonText: "批量创建",
                        cancelButtonText: "取消",
                        inputValidator: function (t) {
                            return new Promise(function (e, n) {
                                if (t) try {
                                    JSON.parse(t), e()
                                } catch (t) {
                                    n("JSON 格式不正确")
                                } else n("不能为空！")
                            })
                        }
                    }).then(function (n) {
                        swal.showLoading(), t.ajax({
                            url: e,
                            type: "POST",
                            data: {_token: Config.token, json: n, book_id: Config.book_id},
                            success: function (t) {
                                location.reload()
                            },
                            error: function () {
                                swal.hideLoading(), swal({
                                    title: "Error!",
                                    text: "有错误发生！",
                                    type: "error",
                                    confirmButtonText: "知道了"
                                })
                            }
                        })
                    }).catch(swal.noop)
                }), -1 != window.location.search.indexOf("mode=reposition")) {
                    var e = function (e, n) {
                        e._token = Config.token, t.ajax({
                            url: n, type: "POST", data: e, success: function (t) {
                                t.success
                            }, error: function () {
                                console.log("Request error")
                            }
                        })
                    };
                    t("ol.sorted_table").sortable({
                        group: "nested", onDrop: function (n, i, o, a) {
                            function c(t) {
                                var i = n.data("filetype"), o = "file" == i ? "chapter" : "file";
                                console.log("$item: " + n.data("filetype")), console.log("$previous: " + s.data("filetype")), console.log("$next: " + r.data("filetype")), console.log("filetype: " + i), console.log("oppositeFiletype: " + o), console.log("chapterId: " + l), console.log("originalChapterId: " + d), s.length > 0 && s.data("filetype") == i ? (console.log("✅ 同类元素后面"), e({
                                    type: "moveAfter",
                                    positionEntityId: s.data("itemid"),
                                    chapterId: l
                                }, t)) : r.length > 0 && r.data("filetype") == i ? (console.log("✅ 同类元素前面"), e({
                                    type: "moveBefore",
                                    positionEntityId: r.data("itemid"),
                                    chapterId: l
                                }, t)) : s.data("filetype") == o || r.data("filetype") == o ? u ? (console.log("✅ 章节变更"), e({
                                    type: "moveInEmptyChapter",
                                    positionEntityId: 0,
                                    chapterId: l
                                }, t)) : (console.log("❌ 混排了"), swal({
                                    title: "",
                                    text: "不支持文件和章节混排",
                                    type: "warning",
                                    showCancelButton: !0,
                                    closeOnConfirm: !1,
                                    cancelButtonText: "取消",
                                    confirmButtonText: "知道了",
                                    animation: "slide-from-top",
                                    inputPlaceholder: ""
                                }, function (t) {
                                    location.reload()
                                })) : l > 0 ? (console.log("✅ 空章节"), e({
                                    type: "moveInEmptyChapter",
                                    positionEntityId: 0,
                                    chapterId: l
                                }, t)) : console.log("❌ 错误发生了")
                            }

                            o(n, i), n.removeClass(i.group.options.draggedClass).removeAttr("style"), t("body").removeClass(i.group.options.bodyClass);
                            var s = n.prev(), r = n.next(), l = i.el.data("chapterid"), d = n.data("chapterid"), u = l != d,
                                p = n.data("itemid");
                            "file" == n.data("filetype") ? c("/courses/articles/" + p + "/sort") : "chapter" == n.data("filetype") && c("/courses/chapters/" + p + "/sort")
                        }
                    })
                }
            }, initComposingHelp: function () {
                t(".compose-help").click(function () {
                    swal({
                        title: "",
                        html: '<ul class="ui list post-help-block" style="text-align: left;font-size: 14px;padding-bottom: 17px;border-radius: 12px;line-height: 25px;">  <li>请注意单词拼写，以及中英文排版，<a href="https://learnku.com/docs/writing-docs/typography/3957" target="_blank">参考此页</a></li>  <li>支持 Markdown 格式, 语法请见这里 <a href="https://learnku.com/docs/writing-docs/editor-guide/3958" target="_blank">Markdown 语法</a></li>  <li>支持表情，使用方法请见 <a href="http://ww1.sinaimg.cn/large/6d86d850gw1ejumyeygwbj20l808faao.jpg" target="_blank">Emoji 自动补全来咯</a>，可用的 Emoji 请见 <img title=":metal:" alt=":metal:" class="emoji" src="https://cdn.learnku.com/assets/images/twemoji/metal.png" align="absmiddle"> <img title=":point_right:" alt=":point_right:" class="emoji" src="https://cdn.learnku.com/assets/images/twemoji/point_right.png" align="absmiddle"> <a href="https://laravel-china.org/ecc/index.html" target="_blank" rel="nofollow"> Emoji 列表 </a> <img title=":star:" alt=":star:" class="emoji" src="https://cdn.learnku.com/assets/images/twemoji/star.png" align="absmiddle"> <img title=":sparkles:" alt=":sparkles:" class="emoji" src="https://cdn.learnku.com/assets/images/twemoji/sparkles.png" align="absmiddle"> </li>  <li>上传图片, 支持拖拽和剪切板黏贴上传, 格式限制 - jpg, png, gif</li>  <li>发布框已支持 localStorage</li>  <li>快捷键 Ctrl + Enter 可提交表单</li></ul>',
                        type: "warning",
                        confirmButtonText: "我知道了"
                    }).then(function () {
                    }).catch(swal.noop)
                })
            }, initCommunitySubscribe: function () {
                var e = function (t) {
                    "subscribe" == t.data("act") ? (t.data("act", "unsubscribe"), t.find(".state").text("已加入"), t.find(".icon").removeClass("plus"), t.find(".icon").addClass("checkmark")) : (t.data("act", "subscribe"), t.find(".state").text("加入社区"), t.find(".icon").removeClass("checkmark"), t.find(".icon").addClass("plus")), t.toggleClass("primary")
                };
                t(".community.subscribe.button").api({
                    method: "POST",
                    url: Config.url + "/communities/{id}/{act}",
                    data: {_token: Config.token},
                    onSuccess: function (t) {
                    }
                }).state({
                    onActivate: function () {
                        e(t(this))
                    }, onDeactivate: function () {
                        e(t(this))
                    }
                });
                var n = function (t) {
                    "subscribe" == t.data("act") ? (t.data("act", "unsubscribe"), t.find(".state").text("已订阅"), t.find(".icon").removeClass("envelope"), t.find(".icon").addClass("checkmark")) : (t.data("act", "subscribe"), t.find(".state").text("订阅周刊"), t.find(".icon").removeClass("checkmark"), t.find(".icon").addClass("envelope"))
                };
                t(".community.subscribe-weekly-email.button").api({
                    method: "POST",
                    url: Config.url + "/communities/{id}/weekly_email/{act}",
                    data: {_token: Config.token},
                    beforeSend: function (t) {
                        return 0 != Config.user_id && t
                    }
                }).state({
                    onActivate: function () {
                        n(t(this))
                    }, onDeactivate: function () {
                        n(t(this))
                    }
                })
            }, initUserHasDone: function () {
                t(".user-has-done-btn").api({
                    method: "POST",
                    url: "/courses/has_done/{act}",
                    data: {_token: Config.token}
                }), t(".clicked-hide-parent").click(function () {
                    t(this).parent().fadeOut(300, function () {
                        t(this).remove()
                    })
                }), Config.user_settings.visit_topic_patches_page && swal({
                    type: "info",
                    confirmButtonText: "知道了",
                    html: '<p style="line-height: 30px;">您现在可以对话题进行改进，<a href="https://learnku.com/docs/guide/improvement/5047" target="_blank">点击此查看</a></p>'
                }).then(function () {
                    t.post("/courses/has_done/visit-topic-patches-page", {_token: Config.token}, function (t) {
                    })
                }).catch(swal.noop)
            }, initArticlePagers: function () {
                t("a.article-pager-btn:not(.disabled)").click(function () {
                    var e = t('.book-sidemenu a[href="' + t(this).attr("href") + '"]');
                    a && e && (event.preventDefault(), e.trigger("click")), t(this).addClass("loading disabled").prop("disabled", !0)
                }), t("a.article-wiki-pager-btn:not(.disabled)").click(function () {
                    var e, n = t(this).data("id"), i = t(".article-position-" + n), o = t(this).hasClass("page-btn-left");
                    a = !0, e = o ? i.data("previous") : i.data("next");
                    var c = t("#" + e);
                    c.length ? (c.trigger("click"), t(this).addClass("loading disabled").prop("disabled", !0)) : swal({
                        title: "没有更多文章了",
                        type: "info",
                        showConfirmButton: !1,
                        timer: 2200
                    }).catch(swal.noop)
                }), Config.can.manage_wiki && t(".wiki-category-name").each(function () {
                    t(this).hover(function (e) {
                        t(this).find(".wiki-category-edit").show()
                    }), t(this).mouseleave(function (e) {
                        t(this).find(".wiki-category-edit").hide()
                    })
                })
            }, initEmojiPicker: function () {
                0 !== t("[data-emojiable=true]").length && (window.emojiPicker = new EmojiPicker({
                    emojiable_selector: "[data-emojiable=true]",
                    assetsPath: "https://cdn.learnku.com/assets/images",
                    popupButtonClasses: "icon smile",
                    wysiwyg: !1
                }), window.emojiPicker.discover())
            }, initAnalytics: function () {
                if ("local" != Config.environment && (ga("create", Config.GA_Tracking_ID, "auto"), ga("send", "pageview"), "undefined" == typeof is_private_view_only)) {
                    var t = document.createElement("script"), e = window.location.protocol.split(":")[0];
                    t.src = "https" === e ? "https://zz.bdstatic.com/linksubmit/push.js" : "http://push.zhanzhang.baidu.com/push.js";
                    var n = document.getElementsByTagName("script")[0];
                    n.parentNode.insertBefore(t, n)
                }
            }, initReview: function () {
                t("#review-pass").click(function (e) {
                    swal({
                        title: "",
                        html: '为保证译文的高品质，我们将启用『严苛』模式，请严格按照以下清单检查。 <hr><div style="text-align:left;"><h3>检查清单：</h3><ol><li>排版是否与原文一致？</li><li><strong>代码注释</strong> 是否有翻译？</li><li>是否翻译太直译，需要润色？</li><li>语句是否通顺？</li><li>翻译是否完整？</li></ol></div>',
                        type: "warning",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "确定通过"
                    }).then(function () {
                        t("#pass-form").submit()
                    }).catch(swal.noop)
                }), t("#review-reject").click(function (e) {
                    swal({
                        title: "",
                        input: "textarea",
                        inputPlaceholder: "请填写拒绝的理由，支持 Markdown ",
                        html: '是否要拒绝此译文？拒绝后系统将通知译者继续优化译文，优化完成后译者将可再次提交审核。 <hr><div style="text-align:left;"><h3>拒绝理由（不超过 250 个字）：</h3><ol><li>排版请与原文保持一致</li><li>英文专有名词首字母请大写</li><li>请翻译代码注释</li><li>语句不够通顺，请润色</li><li>翻译不完整，还有英文存留，请处理</li></ol></div>',
                        type: "warning",
                        showCancelButton: !0,
                        cancelButtonText: "取消",
                        confirmButtonText: "确定拒绝",
                        inputValidator: function (e) {
                            return new Promise(function (n, i) {
                                e.length > 0 ? (t("#message").val(e), n()) : i("请填写拒绝的理由 :)")
                            })
                        }
                    }).then(function (e) {
                        t("#reject-form").submit()
                    }).catch(swal.noop)
                })
            }, initVideo: function () {
                setTimeout(function () {
                    if (document.querySelector("#video-player") && (window.player && window.player.dispose(), "undefined" != typeof videojs && t.isFunction(videojs))) {
                        var e = window.player = videojs("video-player", {
                            controls: !0,
                            preload: "auto",
                            playbackRates: [.5, .8, 1, 1.2, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.5]
                        }), n = e.getAttribute("data-source");
                        e.ready(function () {
                            e.src({src: n, type: "video/mp4"}), e.hotkeys({
                                volumeStep: .1,
                                seekStep: 10,
                                enableModifiersForNumbers: !1
                            })
                        }), e.on("dblclick", function () {
                            e.isFullscreen() ? e.exitFullscreen() : e.requestFullscreen()
                        })
                    }
                }, 500)
            }, initRegister: function () {
                function e() {
                    t("[name=phone]").parent().parent().find(".help-block").remove(), t("[name=captcha]").parent().parent().find(".help-block").remove()
                }

                t("#phone-verify-code").click(function (n) {
                    n.preventDefault(), t.ajax({
                        method: "POST",
                        url: "/auth/verify-code",
                        data: {_token: Config.token, phone: t("[name=phone]").val(), captcha: t("[name=captcha]").val()}
                    }).done(function (n) {
                        e();
                        var i = 60;
                        c = setInterval(function () {
                            0 == i ? (i = 60, t("#phone-verify-code").html("重新获取"), t("#phone-verify-code").prop("disabled", !1), clearInterval(c)) : (t("#phone-verify-code").html(i + " 秒"), i--)
                        }, 1e3), t("#phone-verify-code").prop("disabled", !0), t("[name=code]").parent().parent().find(".help-block").remove(), t("[name=code]").parent().parent().append('<div class="help-block ui pointing green basic label"><i class="icon check green"></i>短信已发送，请查收并填入</div>')
                    }).fail(function (n) {
                        if (e(), 422 == n.status) {
                            var i = n.responseJSON.errors;
                            i.phone && (t("[name=phone]").parent().parent().find(".help-block").remove(), t("[name=phone]").parent().parent().append('<div class="help-block ui pointing red basic label">' + i.phone + "</div>")), i.captcha && (t("[name=captcha]").parent().parent().find(".help-block").remove(), t("[name=captcha]").parent().parent().append('<div class="help-block ui pointing red basic label">' + i.captcha + "</div>"), t("img.captcha").click()), t("#phone-verify-code").html("重新获取"), t("#phone-verify-code").prop("disabled", !1), c && clearInterval(c)
                        }
                    }).always(function () {
                    })
                })
            }, initQuiz: function () {
                t("#next-question").click(function () {
                    var e = t(this);
                    t(".quiz-info").fadeOut();
                    var n = [];
                    t.each(t(".answers:checkbox:checked"), function () {
                        n.push(t(this).val())
                    });
                    var i = t(".question-info").attr("data-question-id");
                    n.length > 0 ? (e.addClass("loading disabled").prop("disabled", !0), o = !0, t.ajax({
                        method: "POST",
                        url: "/quizzes/check_answer",
                        data: {question_id: i, answers: n, _token: Config.token}
                    }).done(function (e) {
                        200 === e.status ? (t(".quiz-success-text").text(e.message), t(".quiz-success").fadeIn(500, function () {
                            t("#quiz-quetion").hide(), t("#quiz-quetion").html(e.html).fadeIn(500), t(".ui.checkbox").checkbox(), t(".quiz-success").hide()
                        })) : 302 === e.status ? (t(".quiz-success-text").text(e.message), t(".quiz-success").fadeIn(), setTimeout(function () {
                            window.location.href = e.link
                        }, 2e3)) : (t(".quiz-info-text").text(e.message), t(".quiz-info").fadeIn())
                    }).error(function () {
                        t(".quiz-info-text").text("未知错误，请联系管理员 ！"), t(".quiz-info").fadeIn()
                    }).always(function () {
                        e.removeClass("loading disabled").prop("disabled", !1), o = !1
                    })) : (t(".quiz-info-text").text("请选择答案 ！"), t(".quiz-info").fadeIn())
                })
            }, showWikiClaim: function () {
                swal({
                    title: "认领 Wiki",
                    input: "radio",
                    inputOptions: {60: "一个小时", 120: "两个小时", 180: "三个小时", 240: "四个小时"},
                    text: "超时前，他人将无法修改此 Wiki。为避免冲突，请选择认领时间：",
                    inputPlaceholder: "预计需要多少分钟完成？",
                    type: "warning",
                    showCancelButton: !1,
                    allowOutsideClick: !1,
                    cancelButtonText: "取消",
                    confirmButtonText: "认领 Wiki",
                    inputValidator: function (e) {
                        return new Promise(function (n, i) {
                            e ? (t("#message").val(e), window.location.href = window.location.href + "?cost_time=" + e, n()) : i("请选择认领时间！")
                        })
                    }
                }).then(function (t) {
                }).catch(swal.noop)
            }, initCountDown: function () {
                if (0 != t(".countdown").length) var e = t(".countdown"), n = new Date(e.attr("data-time")).getTime(),
                    i = setInterval(function () {
                        var t = (new Date).getTime(), o = n - t, a = Math.floor(o % 864e5 / 36e5),
                            c = Math.floor(o % 36e5 / 6e4), s = Math.floor(o % 6e4 / 1e3);
                        a > 0 ? e.html(a + ":" + c + ":" + s) : e.html(c + ":" + s), o < 0 && (clearInterval(i), e.html("已超时"))
                    }, 1e3)
            }, initWhitespace: function () {
                pangu.spacingElementByClassName("markdown-body"), pangu.spacingElementByClassName("markdown-reply")
            }, initCheatSheet: function () {
                t(".cheatsheet-article.item").click(function (e) {
                    t(".cheatsheet-article.column").hide(), t(".cheatsheet-article-" + t(this).data("aid")).fadeIn(), t(".articles-column").addClass("single-article")
                }), t(".show-all-cheatsheet-article").click(function (e) {
                    t(".cheatsheet-article.column").fadeIn(), t(".articles-column").removeClass("single-article")
                }), t(".cheatsheet-article.column").on({
                    mouseenter: function () {
                        t(this).find(".right.corner.label").show()
                    }, mouseleave: function () {
                        t(this).find(".right.corner.label").hide()
                    }
                })
            }, initFlashMessage: function () {
                Config.overlay.length > 0 && swal({
                    title: "",
                    html: Config.overlay,
                    type: "warning",
                    confirmButtonText: "确定"
                }).catch(swal.noop)
            }, initClearImg: function () {
                t(".clear-image.close").each(function () {
                    var e = t(this);
                    e.click(function (t) {
                        e.parent().find(".payment-qrcode").remove(), e.parent().find(".image-upload-hidden").val(""), e.remove()
                    })
                })
            }, destroyLocalStorage: function () {
                Config.destroyeditor_id.body && (localStorage.removeItem(Config.destroyeditor_id.body), localStorage.removeItem(Config.destroyeditor_id.title))
            }, initPromptInfo: function () {
                t("[data-info]").click(function () {
                    swal({type: "info", confirmButtonText: "知道了", html: t(this).attr("data-info")}).then(function () {
                    }).catch(swal.noop)
                })
            }, initCopyRight: function () {
                if (Config.content.authorName && 0 == Config.is_student.length) for (var t = function (t) {
                    var e = "\n\n————————————————\n原文作者：" + Config.content.authorName + "\n转自链接：" + window.location.href + "\n",
                        n = document.getSelection();
                    Config.content.copyright ? e += Config.content.copyright : e += "版权声明：著作权归作者所有。商业转载请联系作者获得授权，非商业转载请保留以上作者信息和原文链接。", n.toString().length > 100 && (t.clipboardData.setData("text", document.getSelection() + e), t.preventDefault())
                }, e = document.getElementsByClassName("content-body"), n = 0; n < e.length; n++) e[n].addEventListener("copy", t, !1)
            }, loadScript: function (t, e, n) {
                r.js.push(t), n = n || "head", e = e || function () {
                };
                var i = null;
                i = document.createElement("script"), i.id = t.replace(/[\./]+/g, "-"), i.type = "text/javascript", i.src = t + ".js", i.onload = function () {
                    e()
                }, "head" === n ? document.getElementsByTagName("head")[0].appendChild(i) : document.body.appendChild(i)
            }, copyCode: function () {
                t("pre").each(function () {
                    var e = this;
                    t(e).wrapAll('<div style= "position: relative;"></div>');
                    var n = t("<button class='copy-code-button ui label'>Copy</button>");
                    n.css({position: "absolute", top: "20px", right: "1px", display: "none"}), setTimeout(function () {
                        0 == i.length ? (t(e).contents().filter(function () {
                            return "copy-code-button" !== this.className
                        }).wrapAll('<code style= "overflow-x: auto; padding: 0px;"></code>'), i = n.siblings("code").get(0)) : i = i.get(0)
                    }, 0), n.click(function () {
                        selectElementText(i);
                        var e = getSelectedText().toString();
                        e.startsWith("$ ") && (e = e.replace("$ ", ""), e = e.split("\n$ ").join("\n")), e.startsWith(">>> ") && (e = e.replace(">>> ", ""), e = e.split("\n>>> ").join("\n"));
                        var n = "";
                        1 == copyToClipboard(e) ? (n = "已复制", selectElementText(i)) : (n = "Unable to copy", selectElementText(i)), t(this).text(n);
                        var o = this;
                        setTimeout(function () {
                            t(o).text("Copy"), window.getSelection().removeAllRanges()
                        }, 1500)
                    }), t(this).append(n);
                    var i = n.siblings("code");
                    t("pre").hover(function () {
                        t(this).children(".copy-code-button").css("display", "block")
                    }, function () {
                        t(this).children(".copy-code-button").css("display", "none")
                    })
                })
            }, bindKeys: function () {
                setTimeout(function () {
                    t(window).one("keydown", function (e) {
                        if (t(".ui.sidebar.menu.book-sidemenu").length > 0 && t("a.page-btn:not(.disabled)").length > 0) {
                            if (37 == e.which) return t(".page-btn-left").click(), !1;
                            if (39 == e.which) return t(".page-btn-right").click(), !1
                        }
                    })
                }, 500)
            }, initDocMark: function () {
                if (!(Config.user_id <= 0 || Config.article_id <= 0 || "yes" == Config.user_settings.annotation_disabled || 0 == t(".article-content .content-body").length)) {
                    var e = [{className: "yellow"}, {className: "green"}, {className: "pink"}, {className: "blue"}],
                        n = Object.create(Annotator);
                    n.init({
                        containerElement: ".article-content .content-body",
                        annotations: Config.annotations ? Config.annotations : [],
                        colors: e
                    }), n.startListening()
                }
            }
        };
    window.PHPHub = l
}(jQuery), $(document).ready(function () {
    PHPHub.init()
});