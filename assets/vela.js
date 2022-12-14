function replaceUrlParam(a, b, c) {
    var d = new RegExp("(" + b + "=).*?(&|$)"),
        e = a;
    return a.search(d) >= 0 ? a.replace(d, "$1" + c + "$2") : e + (e.indexOf("?") > 0 ? "&" : "?") + b + "=" + c;
}
function hasTouch() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
if (
    ((window.vela = window.vela || {}),
    "undefined" == typeof Shopify && (Shopify = {}),
    Shopify.formatMoney ||
        (Shopify.formatMoney = function (a, f) {
            var b = "",
                d = /\{\{\s*(\w+)\s*\}\}/,
                e = f || this.money_format;
            function g(a, b) {
                return void 0 === a ? b : a;
            }
            function c(a, b, c, d) {
                if (((b = g(b, 2)), (c = g(c, ",")), (d = g(d, ".")), isNaN(a) || null == a)) return 0;
                var e = (a = (a / 100).toFixed(b)).split("."),
                    f = e[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + c),
                    h = e[1] ? d + e[1] : "";
                return f + h;
            }
            switch (("string" == typeof a && (a = a.replace(".", "")), e.match(d)[1])) {
                case "amount":
                    b = c(a, 2);
                    break;
                case "amount_no_decimals":
                    b = c(a, 0);
                    break;
                case "amount_with_comma_separator":
                    b = c(a, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    b = c(a, 0, ".", ",");
            }
            return e.replace(d, b);
        }),
    (Shopify.optionsMap = {}),
    (Shopify.updateOptionsInSelector = function (e) {
        switch (e) {
            case 0:
                var b = "root",
                    a = jQuery(".single-option-selector:eq(0)");
                break;
            case 1:
                var b = jQuery(".single-option-selector:eq(0)").val(),
                    a = jQuery(".single-option-selector:eq(1)");
                break;
            case 2:
                var b = jQuery(".single-option-selector:eq(0)").val();
                b += " / " + jQuery(".single-option-selector:eq(1)").val();
                var a = jQuery(".single-option-selector:eq(2)");
        }
        var f = a.val();
        a.empty();
        for (var c = Shopify.optionsMap[b], d = 0; d < c.length; d++) {
            var g = c[d],
                h = jQuery("<option></option>").val(g).html(g);
            a.append(h);
        }
        jQuery('.swatch[data-option-index="' + e + '"] .swatch-element').each(function () {
            -1 !== jQuery.inArray($(this).attr("data-value"), c)
                ? $(this).removeClass("soldout").show().find(":radio").removeAttr("disabled", "disabled").removeAttr("checked")
                : !0 == window.swatch_show_unvailable
                ? $(this).addClass("soldout").find(":radio").removeAttr("checked").attr("disabled", "disabled")
                : $(this).addClass("soldout").hide().find(":radio").removeAttr("checked").attr("disabled", "disabled");
        }),
            -1 !== jQuery.inArray(f, c) && a.val(f),
            a.trigger("change");
    }),
    (Shopify.linkOptionSelectors = function (c) {
        for (var d = 0; d < c.variants.length; d++) {
            var b = c.variants[d];
            if (b.available) {
                if (((Shopify.optionsMap.root = Shopify.optionsMap.root || []), Shopify.optionsMap.root.push(b.option1), (Shopify.optionsMap.root = Shopify.uniq(Shopify.optionsMap.root)), c.options.length > 1)) {
                    var a = b.option1;
                    (Shopify.optionsMap[a] = Shopify.optionsMap[a] || []), Shopify.optionsMap[a].push(b.option2), (Shopify.optionsMap[a] = Shopify.uniq(Shopify.optionsMap[a]));
                }
                if (3 === c.options.length) {
                    var a = b.option1 + " / " + b.option2;
                    (Shopify.optionsMap[a] = Shopify.optionsMap[a] || []), Shopify.optionsMap[a].push(b.option3), (Shopify.optionsMap[a] = Shopify.uniq(Shopify.optionsMap[a]));
                }
            }
        }
        Shopify.updateOptionsInSelector(0),
            c.options.length > 1 && Shopify.updateOptionsInSelector(1),
            3 === c.options.length && Shopify.updateOptionsInSelector(2),
            jQuery(".single-option-selector:eq(0)").change(function () {
                return console.log("dsf"), Shopify.updateOptionsInSelector(1), console.log(c), 3 === c.options.length && Shopify.updateOptionsInSelector(2), !0;
            }),
            jQuery(".single-option-selector:eq(1)").change(function () {
                return (
                    console.log(c),
                    setTimeout(function () {
                        var b = "",
                            e = $("#productSelect").find("option:selected").val(),
                            a = 0;
                        $(c.variants).each(function (c, a) {
                            if (e == a.id) return (b = a.option2), !1;
                        }),
                            $(c.media).each(function (c, d) {
                                if (d.alt == b) return (a = c), !1;
                            }),
                            console.log(a);
                        var d = jQuery(".velaProductGallerySlider .slide img"),
                            f = $("#productSelect").find("option:selected")[0].innerHTML.split(" / ")[0].replace(" ", "");
                        d.map(function (b, a) {
                            a.getAttribute("data-imgSrc").indexOf(f) >= 0 && a.getAttribute("data-imgSrc").indexOf("prod_lf") >= 0 && jQuery('.pdpImagePanel[data-slidefor="small"] .slideOne img').attr("src", a.getAttribute("data-imgSrc")),
                                a.getAttribute("data-imgSrc").indexOf(f) >= 0 &&
                                    a.getAttribute("data-imgSrc").indexOf("model_sd") >= 0 &&
                                    jQuery('.pdpImagePanel[data-slidefor="small"] .slideTwo img').attr("src", a.getAttribute("data-imgSrc"));
                        }),
                            $(".tpo_slider").trigger("to.owl.carousel", a),
                            console.log(b);
                    }),
                    3 === c.options.length && Shopify.updateOptionsInSelector(2),
                    !0
                );
            });
    }),
    (vela.preLoading = function () {
        var b = 0,
            a = $("#velaPreLoading"),
            c = $("#velaPreLoading > span"),
            d = new Array();
        function e(a) {
            $(new Image())
                .on("load", function () {
                    f();
                })
                .on("error", function () {
                    f();
                })
                .attr("src", a);
        }
        function f() {
            var e = Math.round((++b / d.length) * 100);
            $(c)
                .stop()
                .animate({ width: e + "%" }, 500, "linear"),
                b >= d.length &&
                    ((b = d.length),
                    $(c)
                        .stop()
                        .animate({ width: "100%" }, 500, "linear", function () {
                            $(a).fadeOut(200, function () {
                                $(a).remove();
                            });
                        }));
        }
        a.css({ position: "fixed", top: 0, left: 0, zIndex: 99999, width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 1)" }),
            $("body").removeClass("bodyPreLoading"),
            (function (a) {
                $(a)
                    .find("*:not(script)")
                    .each(function () {
                        var a = "";
                        -1 == $(this).css("background-image").indexOf("none") && -1 == $(this).css("background-image").indexOf("-gradient")
                            ? -1 != (a = $(this).css("background-image")).indexOf("url") && (a = a.match(/url\((.*?)\)/)[1].replace(/\"/g, ""))
                            : "img" == $(this).get(0).nodeName.toLowerCase() && void 0 !== $(this).attr("src") && (a = $(this).attr("src")),
                            a.length > 0 && d.push(a);
                    });
            })($("body")),
            (function () {
                for (var a = 0; a < d.length; a++) e(d[a]);
            })(),
            jQuery("body").hasClass("template-") && a.fadeOut();
    }),
    (vela.startTheme = function () {
        $(".swatch :radio").change(function () {
            var a = $(this).closest(".swatch").attr("data-option-index"),
                b = $(this).val();
            $(this).closest("form").find(".single-option-selector").eq(a).val(b).trigger("change");
        }),
            $(".headerCartModal .overlayCart, .headerCartModal .closeCartModal").on("click", function () {
                $(".headerCartModal").removeClass("active");
            }),
            $("body").on("click", ".velaCartModal", function () {
                $(this).parent().toggleClass("active");
            }),
            $("body").click(function (a) {
                0 === $(a.target).parents(".velaCartTop").length && $(".velaCartTop").removeClass("active");
            }),
            jQuery().tooltip && $('[data-toggle="tooltip"]').tooltip(),
            $(".googleOverPlay").on("click", function () {
                $(this).fadeOut();
            }),
            $(".velaGoogleMap").on("mouseleave", function () {
                $(this).find(".googleOverPlay").fadeIn();
            }),
            $("body").on("click", "#internationalToggleBtn", function () {
                console.log("trigger international popup"), $(".bfx-cc-collapsed").trigger("click");
            }),
            $("body").on("click", ".goBtn", function (a) {
                console.log("trigger goClick ev"),
                    window.ga("send", "event", { eventCategory: a.target.getAttribute("data-gobtntype"), eventLabel: a.target.getAttribute("data-gobtnlabel"), eventAction: a.target.getAttribute("data-gobtnaction"), eventValue: "" });
            });
    }),
    (vela.drawersInit = function () {
        var a = ajaxCart ? ajaxCart.load : window.ajaxCart.load;
        vela.RightDrawer = new vela.Drawers("cartDrawer", "Right", !0, { onDrawerOpen: function() {
            jQuery('body').css('overflowY', 'hidden');
            a.call();
          }
        });
    }),
    (vela.swatchProduct = function () {
        $("body").on("mouseover", ".velaSwatchProduct > li", function () {
            var a = $(this).find(".hidden a").attr("href");
            return "#" != a && $(this).parents(".velaProBlock").find(".proFeaturedImage > img").attr({ src: a }).css({ position: "relative", "z-index": "2" }), !1;
        }),
            $("body").on("mouseout", ".velaProBlock", function () {
                $(this).find(".proFeaturedImage > img").removeAttr("style");
            });
    }),
    (vela.productThumbImage = function () {
        $("#productThumbs").length > 0 &&
            $("#productThumbs .owl-carousel").each(function () {
                var b = $(this),
                    a = b.data("item");
                (void 0 === a || null == a) && (a = 5), b.owlCarousel({ items: a, dots: !1, mouseDrag: !1, nav: !0, responsive: { 0: { items: a }, 480: { items: a }, 768: { items: a }, 992: { items: a }, 1200: { items: a } } });
            });
    }),
    hasTouch())
)
    try {
        for (var c in document.styleSheets) {
            var a = document.styleSheets[c];
            if (a.rules) for (var b = a.rules.length - 1; b >= 0; b--) a.rules[b].selectorText && a.rules[b].selectorText.match(":hover") && a.deleteRule(b);
        }
    } catch (d) {}
(vela.ajaxSearch = function () {
    var a = null;
    $('form[action="/search"]').each(function () {
        var b = $(this).find('input[name="q"]'),
            c = $(this).find('input[name="type"]');
        b.position().top,
            b.innerHeight(),
            $('<ul class="velaAjaxSearch"></ul>').appendTo($(this)).hide(),
            "product" == c.val() &&
                b.attr("autocomplete", "off").bind("keyup change", function () {
                    var b = $(this).val(),
                        c = $(this).closest("form"),
                        d = "/search?type=product&q=" + b,
                        e = c.find(".velaAjaxSearch");
                    b.length > 1 &&
                        b != $(this).attr("data-old-term") &&
                        ($(this).attr("data-old-term", b),
                        null != a && a.abort(),
                        (a = $.getJSON(d + "&view=json", function (a) {
                            e.empty(),
                                0 == a.results_count
                                    ? e.hide()
                                    : ($.each(a.results, function (c, b) {
                                          var a = $("<a></a>").attr("href", b.url);
                                          a.append('<span class="searchProductImage"><img src="' + b.thumbnail + '" /></span>'), a.append('<span class="searchProductTitle">' + b.title + "</span>"), a.wrap("<li></li>"), e.append(a.parent());
                                      }),
                                      a.results_count > 10 && e.append('<li><a class="searchViewAll" href="' + d + '">See all results (' + a.results_count + ")</a></li>"),
                                      e.fadeIn(200));
                        })));
                });
    }),
        $("body").bind("click", function () {
            $(".velaAjaxSearch").hide();
        }),
        $(".searchBoxTop").hover(function () {
            $(".velaSearchbox .velaSearch").focus();
        }),
        vela.cache.$body.on("click", ".velaSearchIcon", function () {
            $(".searchBoxTop").toggleClass("active"), $(".searchClose").toggleClass("active"), $(".searchOverLayer").toggleClass("active");
        }),
        vela.cache.$body.on("click", ".searchClose, .searchOverLayer", function () {
            $(this).hasClass("active") && ($(".searchBoxTop").removeClass("active"), $(".searchClose").removeClass("active"), $(".searchOverLayer").removeClass("active"));
        });
}),
    (vela.ajaxFilter = function () {
        var a = $(".filterTagFullwidthButton"),
            b = $(".filterTagFullwidthContent");
        vela.cache.$body.on("click", ".filterTagFullwidthButton", function () {
            b.hasClass("active")
                ? (a.removeClass("active"),
                  b.removeClass("active"),
                  $(".filterTagFullwidthOverlay").each(function () {
                      $(this).remove();
                  }))
                : ($('<div class="filterTagFullwidthOverlay"></div>').css("display", "none").insertAfter(b), $(".filterTagFullwidthOverlay").fadeIn(300), a.addClass("active"), b.addClass("active"));
        }),
            vela.cache.$body.on("click", ".filterTagFullwidthOverlay, .filterTagFullwidthClose", function () {
                $(".filterTagFullwidthOverlay").each(function () {
                    $(this).remove();
                }),
                    a.removeClass("active"),
                    b.removeClass("active");
            });
        var c = !1;
        $(".template-collection") &&
            History.Adapter.bind(window, "statechange", function () {
                History.getState(), c || (ajaxFilterParams(), ajaxFilterGetContent(ajaxFilterCreateUrl()), reActivateSidebar()), (vela.isSidebarAjaxClick = !1);
            }),
            (ajaxFilterParams = function () {
                if (((Shopify.queryParams = {}), location.search.length))
                    for (var a, b = 0, c = location.search.substr(1).split("&"); b < c.length; b++) (a = c[b].split("=")).length > 1 && (Shopify.queryParams[decodeURIComponent(a[0])] = decodeURIComponent(a[1]));
            }),
            (ajaxFilterCreateUrl = function (a) {
                var b = $.param(Shopify.queryParams).replace(/%2B/g, "+");
                return a ? ("" != b ? a + "?" + b : a) : location.pathname + "?" + b;
            }),
            (ajaxFilterClick = function (b) {
                delete Shopify.queryParams.page;
                var a = ajaxFilterCreateUrl(b);
                (c = !0), History.pushState({ param: Shopify.queryParams }, a, a), ajaxFilterGetContent(a);
            }),
            (ajaxFilterSortby = function () {
                if (Shopify.queryParams.sort_by) {
                    var a = Shopify.queryParams.sort_by;
                    $("#SortBy").val(a);
                }
                vela.cache.$body.on("change", "#SortBy", function (a) {
                    (Shopify.queryParams.sort_by = $(this).val()), ajaxFilterClick();
                });
            }),
            (ajaxFilterView = function () {
                vela.cache.$body.on("click", ".changeView", function (a) {
                    a.preventDefault(), $(this).hasClass("changeViewActive") || ((Shopify.queryParams.view = $(this).data("view")), $(".changeView").removeClass("changeViewActive"), $(this).addClass("changeViewActive"), ajaxFilterClick());
                });
            }),
            (ajaxFilterTags = function () {
                vela.cache.$body.on("click", ".ajaxFilter li > a", function (f) {
                    f.preventDefault();
                    var a = [];
                    if ((Shopify.queryParams.constraint && (a = Shopify.queryParams.constraint.split("+")), !window.sidebar_multichoise && !$(this).parent().hasClass("active"))) {
                        var d = $(this).parents(".listFilter").find("li.active");
                        if (d.length > 0) {
                            var e = d.data("filter");
                            if (e) {
                                var b = a.indexOf(e);
                                b >= 0 && a.splice(b, 1);
                            }
                        }
                    }
                    var c = $(this).parent().data("filter");
                    if (c) {
                        var b = a.indexOf(c);
                        b >= 0 ? a.splice(b, 1) : a.push(c);
                    }
                    a.length ? (Shopify.queryParams.constraint = a.join("+")) : delete Shopify.queryParams.constraint, ajaxFilterClick();
                });
            }),
            (ajaxFilterPaging = function () {
                vela.cache.$body.on("click", "#collPagination .pagination a", function (d) {
                    d.preventDefault();
                    var b = $(this)
                        .attr("href")
                        .match(/page=\d+/g);
                    if (b && ((Shopify.queryParams.page = parseInt(b[0].match(/\d+/g))), Shopify.queryParams.page)) {
                        var a = ajaxFilterCreateUrl();
                        (c = !0), History.pushState({ param: Shopify.queryParams }, a, a), ajaxFilterGetContent(a), $("body,html").animate({ scrollTop: 300 }, 600);
                    }
                });
            }),
            (ajaxFilterReview = function () {
                if (window.review && $(".shopify-product-reviews-badge").length > 0) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
            }),
            (ajaxFilterClear = function () {
                $(".ajaxFilter").each(function () {
                    var a = $(this);
                    a.find(".listFilter > li.active").length > 0 &&
                        a
                            .find(".velaClear")
                            .show()
                            .click(function (c) {
                                var b = [];
                                Shopify.queryParams.constraint && (b = Shopify.queryParams.constraint.split("+")),
                                    a.find(".listFilter > li.active").each(function () {
                                        var a = $(this).data("filter");
                                        if (a) {
                                            var c = b.indexOf(a);
                                            c >= 0 && b.splice(c, 1);
                                        }
                                    }),
                                    b.length ? (Shopify.queryParams.constraint = b.join("+")) : delete Shopify.queryParams.constraint,
                                    ajaxFilterClick(),
                                    c.preventDefault();
                            });
                });
            }),
            (ajaxFilterClearAll = function () {
                vela.cache.$body.on("click", "a.velaClearAll", function (a) {
                    delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, ajaxFilterClick(), a.preventDefault();
                });
            }),
            (ajaxFilterAddToCart = function () {}),
            (ajaxAccordionMobile = function () {
                $(".velaSidebar").hasClass("accordion") &&
                    $("#sidebarAjaxFilter .titleSidebar").on("click", function (a) {
                        $(this).toggleClass("active").parent().find(".velaContent").stop().slideToggle("medium"), a.preventDefault();
                    });
            }),
            (ajaxFilterData = function (a) {
                var b = $("#proListCollection .proList"),
                    c = $(a).find("#proListCollection .proList");
                b.replaceWith(c), $("#collPagination").length > 0 ? $("#collPagination").replaceWith($(a).find("#collPagination")) : $("#shopify-section-vela-template-collection").append($(a).find("#collPagination"));
                var d = $("#sidebarAjaxFilter"),
                    e = $(a).find("#sidebarAjaxFilter");
                d.replaceWith(e);
            }),
            (ajaxFilterGetContent = function (a) {
                $.ajax({
                    type: "get",
                    url: a,
                    beforeSend: function () {
                        vela.cache.$velaLoading.show();
                    },
                    success: function (a) {
                        var b = $(a).filter("title").text();
                        (document.title = b), ajaxFilterData(a), ajaxFilterSortby(), ajaxFilterReview(), ajaxFilterClear(), ajaxFilterAddToCart(), ajaxAccordionMobile(), vela.cache.$velaLoading.hide();
                    },
                    error: function (a, b) {
                        vela.cache.$velaLoading.hide();
                    },
                });
            }),
            ajaxFilterParams(),
            ajaxFilterSortby(),
            ajaxFilterView(),
            ajaxFilterTags(),
            ajaxFilterPaging(),
            ajaxFilterClear(),
            ajaxFilterClearAll();
    }),
    (vela.accordion = function () {
        function a() {
            767 >= $(window).width()
                ? $(".velaBlogSidebar").hasClass("accordion") ||
                  ($(".velaBlogSidebar .titleSidebar").on("click", function (a) {
                      $(this).toggleClass("active").parent().find(".velaContent").stop().slideToggle("medium"), a.preventDefault();
                  }),
                  $(".velaBlogSidebar").addClass("accordion").find(".velaContent").slideUp("fast"))
                : ($(".velaBlogSidebar .titleSidebar").removeClass("active").off().parent().find(".velaContent").removeAttr("style").slideDown("fast"), $(".velaBlogSidebar").removeClass("accordion"));
        }
        function b() {
            767 >= $(window).width()
                ? $(".velaFooterMenu").hasClass("accordion") ||
                  ($(".velaFooterMenu .velaFooterTitle").on("click", function (a) {
                      $(this).toggleClass("active").parent().find(".velaContent").stop().slideToggle("medium"), a.preventDefault();
                  }),
                  $(".velaFooterMenu").addClass("accordion").find(".velaContent").slideUp("fast"))
                : ($(".velaFooterMenu .velaFooterTitle").removeClass("active").off().parent().find(".velaContent").removeAttr("style").slideDown("fast"), $(".velaFooterMenu").removeClass("accordion"));
        }
        a(), b(), $(window).resize(a), $(window).resize(b);
    }),
    (vela.floatHeader = function () {
        function b(a) {
            if (a) {
                $("#velaHeader").addClass("headerFixed");
                var b = $("#velaHeader").height() + 120,
                    c = $(window).scrollTop();
                c >= b ? $(".headerMenu").addClass("velaHeaderFixed") : $(".headerMenu").removeClass("velaHeaderFixed");
            } else $("#velaHeader").removeClass("headerFixed"), $(".headerMenu").removeClass("velaHeaderFixed");
        }
        function a() {
            window.float_header && ($(window).width() >= 992 ? b(!0) : 991 >= $(window).width() && b(!1));
        }
        a(),
            $(window).resize(a),
            $(window).scroll(function () {
                if (window.float_header) {
                    if ($(window).width() >= 992) {
                        var a = $("#velaHeader").height() + 120,
                            b = $(window).scrollTop();
                        b >= a ? $(".headerMenu").addClass("velaHeaderFixed") : $(".headerMenu").removeClass("velaHeaderFixed");
                    } else 991 >= $(window).width() && $("#velaMegamenu").removeClass("velaHeaderFixed");
                }
            });
    }),
    (vela.menuMobile = function () {
        vela.cache.$body.on("click", "#btnMenuMobile", function (a) {
            a.preventDefault(), $("body").toggleClass("menuMobileActive");
        }),
            vela.cache.$body.on("click", ".btnMenuClose, .menuMobileOverlay", function (a) {
                a.preventDefault(), $("body").removeClass("menuMobileActive");
            });
    }),
    (vela.productCountdown = function () {
        $("[data-countdown]").each(function () {
            var a = $(this),
                b = $(this).data("countdown");
            a.countdown(b, function (b) {
                a.html(b.strftime(window.countdown_format));
            });
        });
    }),
    (vela.owlOneCarousel = function () {
        $(".owlCarouselPlay .owl-carousel").each(function () {
            var a = $(this),
                j = a.data("nav"),
                d = a.data("navText"),
                e = a.data("dots"),
                h = a.data("autoplay"),
                k = a.data("autoplaytimeout"),
                c = a.data("loop"),
                f = a.data("margin"),
                g = a.data("center"),
                i = a.data("columnone"),
                l = a.data("columntwo"),
                m = a.data("columnthree"),
                n = a.data("columnfour"),
                o = a.data("columnfive");
            (void 0 === f || null == f) && (f = 30);
            var b = { margin: f, nav: j, responsive: { 0: { items: o }, 480: { items: n }, 768: { items: m }, 992: { items: l }, 1200: { items: i } } };
            void 0 === e || null == e || e.length <= 0 || !0 != e ? (b.dots = !1) : (b.dots = !0),
                void 0 === d || null == d || d.length <= 0 || (b.navText = d),
                void 0 === c || null == c || c.length <= 0 || (b.loop = c),
                void 0 === g || null == g || c.center <= 0 || (b.center = g),
                h && ((b.autoplay = h), (b.autoplayTimeout = k), (b.autoplayHoverPause = !1)),
                void 0 != i && a.owlCarousel(b);
        });
    }),
    (vela.lookbook = function () {
        vela.cache.$body.on("click", ".lookbItemButton", function () {
            var a = $(this).parents(".velaBoxLookbook"),
                c = a.find(".lookbItem"),
                b = a.find(".lookbItemContent");
            a.hasClass("active")
                ? (a.removeClass("active"), $(".velaBoxLookbookOverlay").remove(), $(".velaBoxLookbookClose").remove())
                : (a.addClass("active"), c.prepend('<div class="velaBoxLookbookOverlay"></div>'), b.prepend('<div class="velaBoxLookbookClose"></div>'), b.fadeIn(500));
        }),
            vela.cache.$body.on("click", ".velaBoxLookbookOverlay, .velaBoxLookbookClose", function () {
                $(".velaBoxLookbook").removeClass("active"), $(".velaBoxLookbookOverlay").remove(), $(".velaBoxLookbookClose").remove(), $(".lookbItemContent").fadeOut(500);
            });
    }),
    (vela.quickview = function () {
        (Shopify.doNotTriggerClickOnThumb = !1),
            (selectCallbackQuickView = function (b, f) {
                var a = jQuery(".jsQuickview .proBoxInfo"),
                    c = a.find(".btnAddToCart"),
                    e = a.find(".proQuantity"),
                    g = a.find(".pricePrimary"),
                    h = a.find(".priceCompare");

                if (b) {
                    a.find(".quickViewSKU").html("<label>SKU</label>" + b.sku);
                    let d = this.product.id;
                    jQuery.ajax({
                        url: "https://inventorylocations.checkmyapp.net/inventory/products/eby-by-sofia-vergara.myshopify.com/[" + d + "]",
                        type: "get",
                        async: !1,
                        success: function (j) {
                            console.log(":: stock inventory return ::", j);
                            var m = j[d].product.variants;
                            if (
                                (Object.keys(m).map(function (b, c) {
                                    console.log("::prodVarId quickview output::", b);
                                    let a = m[b];

                                    if (a.inventoryItem.locations[0].available <= 1) {
                                      console.log("::varData quickview OOS flag for - " + d + " \u2022 " + a.title + "::");
                                      jQuery(".productQuickAdd #product-actions-" + d + " .swatch-element." + a.title).addClass("soldout").removeClass('available');
                                    }
                                }),
                                b.available
                                    ? (c.removeClass("disabled").removeAttr("disabled"),
                                      c.html("Add to Cart"),
                                      e.show(),
                                      a.find(".proBoxInfo .quickviewAvailability").removeClass("outstock").addClass("instock"),
                                      a.find(".proBoxInfo .quickviewAvailability").append("<label>Availability</label>In stock"))
                                    : (c.addClass("disabled").attr("disabled", "disabled"),
                                      c.html("Sold Out"),
                                      e.hide(),
                                      a.find(".proBoxInfo .quickviewAvailability").removeClass("instock").addClass("outstock"),
                                      a.find(".proBoxInfo .quickviewAvailability").append("<label>Availability</label>Unavailable")),
                                g.html(Shopify.formatMoney(b.price, window.money)),
                                b.compare_at_price > b.price ? h.html(Shopify.formatMoney(b.compare_at_price, window.money)).show() : h.hide(),
                                window.swatch_enable)
                            ) {
                                a.find(".selector-wrapper").addClass("hiddenVariant");
                                for (var k = jQuery("#" + f.domIdPrefix).closest("form"), i = 0, n = b.options.length; i < n; i++) {
                                    var l = k.find('.swatch[data-option-index="' + i + '"] :radio[value="' + b.options[i] + '"]');
                                    l.length > 0 && ((l.get(0).checked = !0), k.find('.swatch[data-option-index="' + i + '"] .js-swatch-display').text(b.options[i]));
                                }
                            }
                            if (b && b.featured_image) {
                                var o = $(".proImageQuickview"),
                                    p = b.featured_image,
                                    q = o[0];
                                Shopify.Image.switchImage(p, q, function (a, b, c) {
                                    $(".proThumbnails img").each(function () {
                                        $(this).parent();
                                        var b = $(this).parent().data("image");
                                        if (a.includes(b)) return $(this).parent().trigger("click"), !1;
                                    });
                                });
                            }
                            window.currencies && Currency.convertAll(window.currency, Currency.cookie.read());
                        },
                    }),
                        b.name.indexOf("3-Pack") >= 0
                            ? (jQuery(".formAddToCart.formQuickview").addClass("mysteryPackQuickAddForm"), jQuery(".formAddToCart.formQuickview").attr("data-prdid", d))
                            : (jQuery(".formAddToCart.formQuickview").removeClass("mysteryPackQuickAddForm"), jQuery(".formAddToCart.formQuickview").attr("data-prdid", ""));
                } else c.addClass("disabled").attr("disabled", "disabled"), c.html("Unavailable"), e.hide();
            }),
            (changeImageQuickView = function (b, c) {
                var a = $(b).attr("src");
                (a = a.replace("_compact", "")), $(c).attr("src", a);
            }),
            (velaUpdateOptionsInSelector = function (e) {
                switch (e) {
                    case 0:
                        var b = "root",
                            a = $(".jsQuickview .single-option-selector:eq(0)");
                        break;
                    case 1:
                        var b = $(".jsQuickview .single-option-selector:eq(0)").val(),
                            a = $(".jsQuickview .single-option-selector:eq(1)");
                        break;
                    case 2:
                        var b = $(".jsQuickview .single-option-selector:eq(0)").val();
                        b += " / " + $(".jsQuickview .single-option-selector:eq(1)").val();
                        var a = $(".jsQuickview .single-option-selector:eq(2)");
                }
                var f = a.val();
                a.empty();
                var c = Shopify.optionsMapQuickview[b];
                if (void 0 !== c)
                    for (var d = 0; d < c.length; d++) {
                        var g = c[d],
                            h = $("<option></option>").val(g).html(g);
                        a.append(h);
                    }
                $('.jsQuickview .swatch[data-option-index="' + e + '"] .swatch-element').each(function () {
                    -1 !== $.inArray($(this).attr("data-value"), c)
                        ? $(this).removeClass("soldout").show().find(":radio").removeAttr("disabled", "disabled")
                        : !0 == window.swatch_show_unvailable
                        ? $(this).addClass("soldout").find(":radio").removeAttr("checked").attr("disabled", "disabled")
                        : $(this).addClass("soldout").hide().find(":radio").removeAttr("checked").attr("disabled", "disabled");
                }),
                    -1 !== $.inArray(f, c) && a.val(f),
                    a.trigger("change");
            }),
            (velaLinkOptionSelectors = function (c) {
                for (var d = 0; d < c.variants.length; d++) {
                    var b = c.variants[d];
                    if (b.available) {
                        if (
                            ((Shopify.optionsMapQuickview.root = Shopify.optionsMapQuickview.root || []),
                            Shopify.optionsMapQuickview.root.push(b.option1),
                            (Shopify.optionsMapQuickview.root = Shopify.uniq(Shopify.optionsMapQuickview.root)),
                            c.options.length > 1)
                        ) {
                            var a = b.option1;
                            (Shopify.optionsMapQuickview[a] = Shopify.optionsMapQuickview[a] || []), Shopify.optionsMapQuickview[a].push(b.option2), (Shopify.optionsMapQuickview[a] = Shopify.uniq(Shopify.optionsMapQuickview[a]));
                        }
                        if (3 === c.options.length) {
                            var a = b.option1 + " / " + b.option2;
                            (Shopify.optionsMapQuickview[a] = Shopify.optionsMapQuickview[a] || []), Shopify.optionsMapQuickview[a].push(b.option3), (Shopify.optionsMapQuickview[a] = Shopify.uniq(Shopify.optionsMapQuickview[a]));
                        }
                    }
                }
                velaUpdateOptionsInSelector(0),
                    c.options.length > 1 && velaUpdateOptionsInSelector(1),
                    3 === c.options.length && velaUpdateOptionsInSelector(2),
                    $("#productSelectQuickview-option-0").change(function () {
                        return velaUpdateOptionsInSelector(1), 3 === c.options.length && velaUpdateOptionsInSelector(2), !0;
                    }),
                    $("#productSelectQuickview-option-1").change(function () {
                        return 3 === c.options.length && velaUpdateOptionsInSelector(2), !0;
                    });
            }),
            (loadQuickViewSlider = function (a, c) {
                var d = $(".loadingImage");
                if ((Shopify.resizeImage(a.featured_image, "grande"), d.hide(), a.images.length > 0)) {
                    var b = c.find(".proThumbnailsQuickview .owl-carousel");
                    for (i in a.images) {
                        var e = Shopify.resizeImage(a.images[i], "grande"),
                            f = Shopify.resizeImage(a.images[i], "compact"),
                            g = '<div class="thumbItem"><a href="javascript:void(0)" data-imageid="' + a.id + '" data-image="' + a.images[i] + '" data-zoom-image="' + e + '" ><img src="' + f + '" alt="Produc Image" /></a></div>';
                        b.append(g);
                    }
                    b.find("a").click(function () {
                        var a = c.find(".proImageQuickview");
                        a.attr("src") != $(this).attr("data-image") &&
                            (a.attr("src", $(this).attr("data-image")),
                            d.show(),
                            a.load(function (a) {
                                $(this).unbind("load"), d.hide();
                            }));
                    }),
                        b.owlCarousel({ items: 4, nav: !0, mouseDrag: !1, dots: !1 }).css("visibility", "visible");
                } else c.find(".jsQuickview .proThumbnailsQuickview").remove();
            }),
            (convertToSlug = function (a) {
                return a
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
            }),
            (addCheckedSwatch = function () {
                vela.cache.$body.on("click", ".swatch .color label", function () {
                    $(".swatch .color").each(function () {
                        $(this).find("label").removeClass("checkedBox");
                    }),
                        $(this).addClass("checkedBox");
                });
            }),
            (quickViewVariants = function (a, f) {
                console.log(a);
                let k = a,
                    s = k.price.toLocaleString("en-US", { style: "currency", currency: "USD" });
                var n = n || [],
                    g = { Name: k.title, ProductID: k.id, Categories: [], ImageURL: k.media[0].src, URL: window.location.origin + k.url, Brand: "EBY", Price: s, CompareAtPrice: "" };
                if (
                    (n.push(["track", "Viewed Product", g]),
                    n.push(["trackViewedItem", { Title: g.Name, ItemId: g.ProductID, Categories: g.Categories, ImageUrl: g.ImageURL, Url: g.URL, Metadata: { Brand: g.Brand, Price: g.Price, CompareAtPrice: g.CompareAtPrice } }]),
                    a.variants.length > 1)
                ) {
                    for (var b = 0; b < a.variants.length; b++) {
                        var d = a.variants[b],
                            t = '<option value="' + d.id + '">' + d.title + "</option>";
                        f.find("form.formQuickview .proVariantsQuickview > select").append(t);
                    }
                    if (
                        (new Shopify.OptionSelectors("productSelectQuickview-" + a.id, { product: a, onVariantSelected: selectCallbackQuickView }),
                        1 == a.options.length && $("form.formQuickview .selector-wrapper:eq(0)").prepend("<label>" + a.options[0].name + "</label>"),
                        f.find("form.formQuickview .selector-wrapper label").each(function (b, c) {
                            $(this).html(a.options[b].name);
                        }),
                        window.swatch_enable)
                    ) {
                        var u = window.file_url.substring(0, window.file_url.lastIndexOf("?")),
                            v = window.asset_url.substring(0, window.asset_url.lastIndexOf("?")),
                            c = "";
                        if ($(f).data("sizeGuid")) var e = $(f).data("sizeGuid");
                        else if (a.type.indexOf("Underwear") >= 0) var e = "pantyChart";
                        else if (a.type == "Tank") var e = "tankChart";
                        else if (a.type == "Silk Tank") var e = "silktankChart";
                        else if (a.type == "Silk Shorts") var e = "silkshortsChart";
                        else if (a.type == "Silk Blouse") var e = "silkblouseChart";
                        else if (a.type == "Silk Dress") var e = "silkdressChart";
                        else if (a.type.indexOf("Bralette") >= 0) var e = "braletteChart";
                        else if (a.type.indexOf("Bodysuit") >= 0) var e = "bodysuitChart";
                        var p = !1;
                        (!0 == e.includes("pantyChart") || !0 == e.includes("braletteChart") || !0 == e.includes("tankChart") || !0 == e.includes("silkdressChart") || !0 == e.includes("silkblouseChart") || !0 == e.includes("silktankChart") || !0 == e.includes("silkshortsChart") || !0 == e.includes("wrapTopChart") || !0 == e.includes("bodysuitChart")) && (p = !0);
                        for (var b = 0; b < a.options.length; b++) {
                            (c += '<div class="swatch clearfix" data-option-index="' + b + '">'),
                                (c += '<div class="header"><span class="js-swatch-display text">&nbsp;</span><span class="swatch-text">&nbsp;</span>'),
                                !0 == p && (c += '<a class="siz_guid size_guid_plp ' + e + '" href="#">Size Guide</a>'),
                                (c += "</div>");
                            var l = !1;
                            /Color|Colour/i.test(a.options[b].name) && (l = !0);
                            for (var q = new Array(), m = 0; m < a.variants.length; m++) {
                                var i,
                                    d = a.variants[m],
                                    h = d.options[b];
                                switch (h) {
                                    case "xs":
                                        i = "Extra Small";
                                        break;
                                    case "sm":
                                        i = "Small";
                                        break;
                                    case "md":
                                        i = "Medium";
                                        break;
                                    case "lg":
                                        i = "Large";
                                        break;
                                    case "xl":
                                        i = "Extra Large";
                                        break;
                                    default:
                                        i = h.toUpperCase();
                                }
                                var j = this.convertToSlug(h),
                                    o = "quickview-swatch-" + d.id + "-" + b + "-" + j;
                                if (0 > q.indexOf(h)) {
                                    var r = u + j + ".png";
                                    d.featured_image && (r = d.featured_image.src),
                                        (c += '<div data-value="' + h + '" data-value-name="' + i + '" class="swatch-element ' + (l ? "color " : "") + j + (d.availableAtStockLocation ? " available " : " soldout ") + '">'),
                                        l && (c += '<div class="tooltip">' + h + "</div>"),
                                        (c += '<input id="' + o + '" type="radio" name="option-' + b + '" value="' + h + '" ' + (0 == m ? " checked " : "") + (d.availableAtStockLocation ? "" : " disabled") + " />"),
                                        l
                                            ? (c += '<label class="' + j + '" for="' + o + '" style="background-color: ' + j + "; background-image: url(" + r + ')"><img class="crossed-out" src="' + v + 'soldout_new.png" /><i></i></label>')
                                            : (c += '<label class="' + j + '" for="' + o + '">' + h + "</label>"),
                                        (c += "</div>"),
                                        d.availableAtStockLocation &&
                                            $('.jsQuickview .swatch[data-option-index="' + b + '"] .' + j)
                                                .removeClass("soldout")
                                                .addClass("available")
                                                .find(":radio")
                                                .removeAttr("disabled"),
                                        q.push(h);
                                }
                            }
                            c += "</div>";
                        }
                        f.find("form.formQuickview .proVariantsQuickview > select").after(c),
                            f.find(".swatch :radio").click(function () {
                                var a = $(this).closest(".swatch").attr("data-option-index"),
                                    b = $(this).val();
                                $(this).parents("form").find(".single-option-selector").eq(a).val(b).trigger("change"),
                                    $(document).width() > 768 &&
                                        ($(this).parents(".productQuickAdd").removeClass("active"),
                                        $(this).parents(".formAddToCart").find(".btnAddToCart").trigger("click"),
                                        console.log(ajaxCart),
                                        $(this).parents(".selection-wrapper").html(""));
                            }),
                            f.find(".btnAddToCart").click(function (e) {
                              var addToButton = jQuery(f).find(".btnAddToCart");

                              if (addToButton.hasClass("quickAddDisabled")) {
                                //alert("Please select your size!");
                                if ($(document).width() < 769) {
                                  M.toast({html: 'Please select your size!', classes: 'ebyAtcAlert error', displayLength: 1250});
                                }

                                e.preventDefault();
                                e.stopImmediatePropagation();
                                e.stopPropagation();

                                return false;
                              }

                              $(".pop_size_qa.pop_productQuickAdd").fadeOut();
                            }),
                            addCheckedSwatch();
                    }
                    a.available && ((Shopify.optionsMapQuickview = {}), window.swatch_show_unvailable ? window.swatch_enable && velaLinkOptionSelectors(a) : velaLinkOptionSelectors(a));
                } else {
                    f.find("form.formQuickview .proVariantsQuickview > select").remove();
                    var w = '<input type="hidden" name="id" value="' + a.variants[0].id + '">';
                    f.find("form.formQuickview").append(w);
                }
            }),
            (validateQty = function (a) {
                return (parseFloat(a) != parseInt(a) || isNaN(a)) && (a = 1), a;
            }),
            (qvAddToCart = function () {
                "page" != window.ajaxcart_type &&
                    ajaxCart.init({ formSelector: ".formQuickview", cartContainer: "#cartContainer", addToCartSelector: ".btnAddToCart", cartCountSelector: "#CartCount", cartCostSelector: "#CartCost", moneyFormat: null });
            }),
            (processQuickView = function (a, b, c) {
                $(b.variants).each(function (d, e) {
                    if ((b.title, void 0 != c[b.id] && void 0 != c[b.id].product)) {
                        var a = c[b.id].product.variants[e.id].inventoryItem.locations;
                        void 0 != a[0] && "Ecommerce WH" == a[0].name && a[0].available > 0
                            ? ((b.variants[d].stockAvailable = a[0].available), (b.variants[d].stockLocation = a[0].name), (b.variants[d].availableAtStockLocation = !0))
                            : ((b.variants[d].stockAvailable = a[0].available), (b.variants[d].stockLocation = a[0].name), (b.variants[d].availableAtStockLocation = !1));
                    }
                }),
                    a.find(".formQuickview").attr("id", "product-actions-" + b.id),
                    a.find(".formQuickview select").attr("id", "productSelectQuickview-" + b.id),
                    b.available ? quickViewVariants(b, a) : (a.find("select, input").hide(), a.find(".btnAddToCart").html("Sold Out").addClass("disabled").attr("disabled", "disabled"), a.find(".proQuantity").hide()),
                    vela.cache.$velaLoading.hide(),
                    qvAddToCart();
            }),
            $(document).on("click", ".proThumbnailsQuickview li", function () {
                changeImageQuickView($(this).find("img:first-child"), ".proImageQuickview");
            }),
            $(document).on("click", ".quickviewClose, .quickviewOverlay", function (a) {
                $("#velaQuickView").fadeOut(0), $(".jsQuickview").html(""), $(".jsQuickview").removeClass("velaFadeOut");
            }),
            $(document).on("click", ".swatch-view-item div", function (a) {
                $(this).parents(".item").find(".productQuickAdd").removeClass("active");
            }),
            $(document).on("mouseenter", ".velaProBlock.quickadd", function (f) {
                let c = !1;
                768 >= $(document).width() && (c = !0);
                var a = $(this).find(".btnProductQuickAdd"),
                    g = a.parent(".productQuickAdd");
                if (!1 == c) var d = $(a.attr("data-href"));
                else var d = $(".pop_productQuickAdd .ebyGuideChartWrapper");
                d.data("sizeGuid", a.closest(".velaProBlock").data("sizeGuid"));
                var e = $(this).find(".proFeaturedImage").attr("href").split("?variant=")[0];
                console.log(e);
                var b = e.split("/")[2],
                    h = $("#velaQuickAdd").html();
                void 0 == Shopify.Products && (Shopify.Products = []),
                    void 0 == Shopify.Products[b]
                        ? (a.data("searching", !0),
                          Shopify.getProduct(b, function (j) {
                              (Shopify.Products[b] = j), void 0 == Shopify.ProductsStock && (Shopify.ProductsStock = []);
                              let f = Shopify.Products[b],
                                  k = f.price.toLocaleString("en-US", { style: "currency", currency: "USD" });
                              var i = i || [],
                                  e = { Name: f.title, ProductID: f.id, Categories: [], ImageURL: f.media[0].src, URL: window.location.origin + f.url, Brand: "EBY", Price: k, CompareAtPrice: "" };
                              i.push(["track", "Viewed Product", e]),
                                  i.push([
                                      "trackViewedItem",
                                      { Title: e.Name, ItemId: e.ProductID, Categories: e.Categories, ImageUrl: e.ImageURL, Url: e.URL, Metadata: { Brand: e.Brand, Price: e.Price, CompareAtPrice: e.CompareAtPrice } },
                                  ]),
                                  void 0 == Shopify.ProductsStock[b] &&
                                      $.get("https://inventorylocations.checkmyapp.net/inventory/products/eby-by-sofia-vergara.myshopify.com/[" + j.id + "]", function (e, f, i) {
                                          "success" == f
                                              ? ((Shopify.ProductsStock[b] = e),
                                                a.data("searching", !1),
                                                !0 == a.data("hover") &&
                                                    ($(".productQuickAdd").removeClass("active"), !1 == c ? g.addClass("active") : $(".pop_size_qa.pop_productQuickAdd").fadeIn(), d.html(h), processQuickView(d, Shopify.Products[b], e)))
                                              : (a.data("searching", !1), a.data("hover", !0));
                                      });
                          }))
                        : (void 0 == Shopify.ProductsStock && (Shopify.ProductsStock = []),
                          void 0 == Shopify.ProductsStock[b] &&
                              (a.data("searching", !0),
                              $.get("https://inventorylocations.checkmyapp.net/inventory/products/eby-by-sofia-vergara.myshopify.com/[" + Shopify.Products[b].id + "]", function (e, f, i) {
                                  "success" == f
                                      ? ((Shopify.ProductsStock[b] = e),
                                        a.data("searching", !1),
                                        !0 == a.data("hover") &&
                                            ($(".productQuickAdd").removeClass("active"), !1 == c ? g.addClass("active") : $(".pop_size_qa.pop_productQuickAdd").fadeIn(), d.html(h), processQuickView(d, Shopify.Products[b], e)))
                                      : (a.data("searching", !1), a.data("hover", !0));
                              })));
            }),
            $(document).on("mouseenter click", ".btnProductQuickAdd", function (g) {
                let c = !1;
                768 >= $(document).width() && (c = !0), vela.cache.$velaLoading.show(), $(".productQuickAdd").removeClass("active");
                var e = $(this).parent(".productQuickAdd");
                if (!1 == c) var b = $($(this).attr("data-href"));
                else var b = $(".pop_productQuickAdd .ebyGuideChartWrapper");
                b.data("sizeGuid", $(this).closest(".velaProBlock").data("sizeGuid"));
                var f = $("#velaQuickAdd").html(),
                    a = $(this).data("handle");
                if ($(this).parents(".shg-product")) var d = "/products/" + $(this).attr("data-handle");
                else var d = $(this).parents(".velaProBlockInner").find(".proFeaturedImage").attr("href").split("?variant=")[0];
                var a = d.split("/")[2];
                return (
                    void 0 == Shopify.Products && (Shopify.Products = []),
                    void 0 != Shopify.Products[a]
                        ? (void 0 == Shopify.ProductsStock && (Shopify.ProductsStock = []),
                          void 0 != Shopify.ProductsStock[a]
                              ? ($(".productQuickAdd").removeClass("active"), !1 == c ? e.addClass("active") : $(".pop_size_qa.pop_productQuickAdd").fadeIn(), b.html(f), processQuickView(b, Shopify.Products[a], Shopify.ProductsStock[a]))
                              : !0 != $(this).data("searching")
                              ? $.get("https://inventorylocations.checkmyapp.net/inventory/products/eby-by-sofia-vergara.myshopify.com/[" + Shopify.Products[a].id + "]", function (d, g, h) {
                                    "success" == g
                                        ? ((Shopify.ProductsStock[a] = d),
                                          $(".productQuickAdd").removeClass("active"),
                                          !1 == c ? e.addClass("active") : $(".pop_size_qa.pop_productQuickAdd").fadeIn(),
                                          b.html(f),
                                          processQuickView(b, Shopify.Products[a], d))
                                        : delete Shopify.ProductsStock[a];
                                })
                              : $(this).data("hover", !0))
                        : !0 != $(this).data("searching")
                        ? Shopify.getProduct(a, function (d) {
                              void 0 == Shopify.Products && (Shopify.Products = []),
                                  (Shopify.Products[a] = d),
                                  void 0 == Shopify.ProductsStock && (Shopify.ProductsStock = []),
                                  void 0 != Shopify.ProductsStock[a]
                                      ? ($(".productQuickAdd").removeClass("active"),
                                        !1 == c ? e.addClass("active") : $(".pop_size_qa.pop_productQuickAdd").fadeIn(),
                                        b.html(f),
                                        processQuickView(b, Shopify.Products[a], Shopify.ProductsStock[a]))
                                      : $.get("https://inventorylocations.checkmyapp.net/inventory/products/eby-by-sofia-vergara.myshopify.com/[" + d.id + "]", function (d, g, h) {
                                            "success" == g
                                                ? ((Shopify.ProductsStock[a] = d),
                                                  $(".productQuickAdd").removeClass("active"),
                                                  !1 == c ? e.addClass("active") : $(".pop_size_qa.pop_productQuickAdd").fadeIn(),
                                                  b.html(f),
                                                  processQuickView(b, Shopify.Products[a], d))
                                                : delete Shopify.ProductsStock[a];
                                        });
                          })
                        : $(this).data("hover", !0),
                    !1
                );
            }),
            $(document).on("mouseenter click", ".swatch .swatch-element", function (b) {
                // console.log(window.innerWidth);
                // console.log(b.type);

//                if (window.innerWidth <= 769 && b.type === "mouseenter") {
  //                return;
    //            }

      //          if (b.target.tagName === "INPUT") {
        //          return;
          //      }

                var a = $(this).data("valueName");

                console.log("A", a);

                if (typeof a !== "undefined") {
                  var $this = jQuery(this);

                  var container = $this.parents(".selection-wrapper");
                  var addToCartButton = jQuery(container).find(".btnAddToCart");

                  if ($this.hasClass("available")) {
                    addToCartButton.removeClass("quickAddDisabled");
                  } else if (!addToCartButton.hasClass("quickAddDisabled")) {
                    addToCartButton.addClass("quickAddDisabled");
                  }

                  $this.parent(".swatch").find(".swatch-text").text(a);
                  jQuery(".swatch-element.selectedSwatch").removeClass("selectedSwatch");

                  if (b.target.className.length > 0) {
                    jQuery(".swatch-element." + b.target.className).addClass("selectedSwatch");
                  }
                }
            }),
            (!0 == $("body").hasClass("template-collection") ||
                !0 == $("body").hasClass("template-index") ||
                !0 == $("body").hasClass("template-list-collections") ||
                $("body").hasClass("premium_news") ||
                $("body").hasClass("template-page-special") ||
                $("body").hasClass("shg-page")) &&
                $(document).on("click", ".siz_guid.size_guid_plp", function () {
                    return (
                        $(".pop_size.size_guid_plp").is(":visible")
                            ? $(".pop_size.size_guid_plp").fadeOut()
                            : ($(this).hasClass("pantyChart") ? $(".pop_size.size_guid_plp .ebyPantyGuide").show() : $(".pop_size.size_guid_plp .ebyPantyGuide").hide(),
                              $(this).hasClass("braletteChart") ? $(".pop_size.size_guid_plp .ebyBraletteGuide").show() : $(".pop_size.size_guid_plp .ebyBraletteGuide").hide(),
                              $(this).hasClass("tankChart") ? $(".pop_size.size_guid_plp .ebyTankGuide").show() : $(".pop_size.size_guid_plp .ebyTankGuide").hide(),
                              $(this).hasClass("silktankChart") ? $(".pop_size.size_guid_plp .ebySilktankGuide").show() : $(".pop_size.size_guid_plp .ebySilktankGuide").hide(),
                              $(this).hasClass("silkdressChart") ? $(".pop_size.size_guid_plp .ebySilkdressGuide").show() : $(".pop_size.size_guid_plp .ebySilkdressGuide").hide(),
                              $(this).hasClass("silkblouseChart") ? $(".pop_size.size_guid_plp .ebySilkblouseGuide").show() : $(".pop_size.size_guid_plp .ebySilkblouseGuide").hide(),
                              $(this).hasClass("silkshortsChart") ? $(".pop_size.size_guid_plp .ebySilkshortsGuide").show() : $(".pop_size.size_guid_plp .ebySilkshortsGuide").hide(),
                              $(this).hasClass("silkpantsChart") ? $(".pop_size.size_guid_plp .ebySilkpantsGuide").show() : $(".pop_size.size_guid_plp .ebySilkpantsGuide").hide(),
                              $(this).hasClass("wrapTopChart") ? $(".pop_size.size_guid_plp .ebyWrapGuide").show() : $(".pop_size.size_guid_plp .ebyWrapGuide").hide(),
                              $(this).hasClass("bodysuitChart") ? $(".pop_size.size_guid_plp .ebyBodysuitGuide").show() : $(".pop_size.size_guid_plp .ebyBodysuitGuide").hide(),
                              $(".pop_size.size_guid_plp").fadeIn(),
                              $(".pop_size.size_guid_plp .pop_wrap").scrollTop(0)),
                        !1
                    );
                }),
            $(document).on("click", ".btnProductQuickview", function (b) {
                vela.cache.$velaLoading.show();
                var a = $(this).data("handle");
                return (
                    Shopify.getProduct(a, function (b) {
                        var d = $("#quickviewModal").html();
                        $(".jsQuickview").html(d);
                        var a = $(".jsQuickview"),
                            e = b.description.replace(/(<([^>]+)>)/gi, ""),
                            c = "",
                            f = b.featured_image;
                        -1 != b.description.indexOf("[SHORTDESCRIPTION]")
                            ? ((c = b.description.split("[SHORTDESCRIPTION]")[0]), a.find(".proShortDescription").html(c))
                            : ((c = e.split(" ").splice(0, 30).join(" ") + "..."), a.find(".proShortDescription").text(c)),
                            a.find(".proImageQuickview").attr("src", f),
                            a.find(".proImage").attr("href", b.url),
                            a.find(".pricePrimary").html(Shopify.formatMoney(b.price, window.money)),
                            a.find(".proBoxInfo").attr("id", "product-" + b.id),
                            a.find(".formQuickview").attr("id", "product-actions-" + b.id),
                            a.find(".formQuickview select").attr("id", "productSelectQuickview"),
                            a.find(".proBoxInfo .quickviewName").html("<a href='" + b.url + "'>" + b.title + "</a>"),
                            a.find(".proBoxInfo .quickViewVendor").append("<label>Vendor:</label> " + b.vendor),
                            a.find(".proBoxInfo .quickViewSKU").append("<label>SKU:</label> " + b.variants[0].sku),
                            b.available
                                ? (a.find(".proBoxInfo .quickviewAvailability").removeClass("outstock").addClass("instock"), a.find(".proBoxInfo .quickviewAvailability").append("<label>Availability:</label> In stock"))
                                : (a.find(".proBoxInfo .quickviewAvailability").removeClass("instock").addClass("outstock"), a.find(".proBoxInfo .quickviewAvailability").append("<label>Availability:</label> Unavailable")),
                            b.compare_at_price > b.price ? (a.find(".priceCompare").html(Shopify.formatMoney(b.compare_at_price_max, window.money)).show(), a.find(".pricePrimary").addClass("priceSale")) : a.find(".priceCompare").html(""),
                            b.available ? quickViewVariants(b, a) : (a.find("select, input").hide(), a.find(".btnAddToCart").html("Sold Out").addClass("disabled").attr("disabled", "disabled"), a.find(".proQuantity").hide()),
                            loadQuickViewSlider(b, a),
                            $("#velaQuickView").fadeIn(0),
                            $(".jsQuickview").addClass("velaFadeOut"),
                            vela.cache.$velaLoading.hide(),
                            qvAddToCart(),
                            window.currencies && Currency.convertAll(window.currency, Currency.cookie.read());
                    }),
                    !1
                );
            });
    }),
    (vela.goToTop = function () {
        $(window).scroll(function () {
            $(window).scrollTop() >= 200 ? $("#goToTop").fadeIn() : $("#goToTop").fadeOut();
        }),
            $("#goToTop").click(function () {
                return $("body,html").animate({ scrollTop: 0 }, "normal"), $("#pageContainer").animate({ scrollTop: 0 }, "normal"), !1;
            });
    }),
    (vela.productLoadMore = function () {
        function a() {
            $(".productLoadMore .btnLoadMore").click(function (b) {
                var d, c;
                return $(this).hasClass("disableLoadMore")
                    ? (b.stopPropagation(), !1)
                    : ((d = $(".productLoadMore .btnLoadMore")),
                      (c = $(".productLoadMore .btnLoadMore").attr("href")),
                      $.ajax({
                          type: "GET",
                          url: c,
                          beforeSend: function () {
                              vela.cache.$velaLoading.show();
                          },
                          success: function (b) {
                              d.remove(), vela.cache.$velaLoading.hide(), $(b).find(".producsLoadMore").insertBefore($(".proLoadMoreBottom")), a();
                          },
                          dataType: "html",
                      }),
                      b.stopPropagation(),
                      !1);
            });
        }
        a();
    }),
    (vela.velaAccountPage = function () {
        let a = vela.getHash() || window.location.href,
            b = "";
        a.indexOf("#") >= 0 && (b = a.slice(a.indexOf("#"), a.length)),
            $("body").on("click", ".velaRecoverPassword", function (a) {
                $("#RecoverPasswordForm").removeClass("hidden recoverMode"), $("#CustomerLoginForm").addClass("hidden recoverMode"), "#" == a.target.getAttribute("href") && $(".loginHeading").addClass("reactivate");
            }),
            $("body").on("click", ".velaHideRecoverPasswordLink", function (a) {
                $("#RecoverPasswordForm").addClass("hidden recoverMode"), $("#CustomerLoginForm").removeClass("hidden recoverMode"), $(".loginHeading").removeClass("reactivate");
            }),
            "#recover" == b && ($("#RecoverPasswordForm").removeClass("hidden recoverMode"), $("#CustomerLoginForm").addClass("hidden recoverMode")),
            "#" == b && $(".loginHeading").addClass("reactivate"),
            $("body").on("click", ".velaShowPassword", function (c) {
                var a = $(this),
                    b = a.prev("input");
                "password" == b.attr("type") ? (b.attr("type", "text"), a.text("Hide")) : (b.attr("type", "password"), a.text("Show"));
            });
    }),
    (vela.Drawers = (function () {
        var a = function (b, a, c, d) {
            if (
                ((this.$nodes = { parent: $("body, html"), page: $("#pageContainer"), moved: $(".isMoved") }),
                (this.config = $.extend({ close: ".jsDrawerClose", open: ".jsDrawerOpen" + a, openClass: "jsDrawerOpen", dirOpenClass: "jsDrawerOpen" + a }, d)),
                (this.position = a),
                (this.iscart = c),
                (this.$drawer = $("#" + b)),
                !this.$drawer.length)
            )
                return !1;
            (this.drawerIsOpen = !1), this.init();
        };
        return (
            (a.prototype.init = function () {
                $(this.config.open).on("click", $.proxy(this.open, this)), this.$drawer.find(this.config.close).on("click", $.proxy(this.close, this));
            }),
            (a.prototype.open = function (a) {
                if ("modal" == window.ajaxcart_type && this.iscart) {
                    var b = !1;
                    this.$drawer.modal(),
                        a ? a.preventDefault() : (b = !0),
                        a && a.stopPropagation && (a.stopPropagation(), (this.$activeSource = $(a.currentTarget))),
                        this.config.onDrawerOpen && "function" == typeof this.config.onDrawerOpen && (b || this.config.onDrawerOpen());
                } else {
                    var b = !1;
                    if ((a ? a.preventDefault() : (b = !0), a && a.stopPropagation && (a.stopPropagation(), (this.$activeSource = $(a.currentTarget))), this.drawerIsOpen && !b)) return this.close();
                    this.$nodes.moved.addClass("is-transitioning"),
                        "0" == $("#CartCount").text() ? ($("#cartDrawer").removeClass("not_empty_cart"), $("#cartDrawer").addClass("empty_cart")) : ($("#cartDrawer").removeClass("empty_cart"), $("#cartDrawer").addClass("not_empty_cart")),
                        this.$drawer.prepareTransition(),
                        this.$nodes.parent.addClass(this.config.openClass + " " + this.config.dirOpenClass),
                        (this.drawerIsOpen = !0),
                        this.trapFocus(this.$drawer, "drawer_focus"),
                        this.config.onDrawerOpen && "function" == typeof this.config.onDrawerOpen && (b || this.config.onDrawerOpen()),
                        this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "true"),
                        this.$nodes.page.on("touchmove.drawer", function () {
                            return !1;
                        }),
                        this.$nodes.page.on(
                            "click.drawer",
                            $.proxy(function () {
                                return this.close(), !1;
                            }, this)
                        );
                }
            }),
            (a.prototype.close = function () {
                this.drawerIsOpen &&
                    ($(document.activeElement).trigger("blur"),
                    this.$nodes.moved.prepareTransition({ disableExisting: !0 }),
                    this.$drawer.prepareTransition({ disableExisting: !0 }),
                    this.$nodes.parent.removeClass(this.config.dirOpenClass + " " + this.config.openClass),
                    (this.drawerIsOpen = !1),
                    this.removeTrapFocus(this.$drawer, "drawer_focus"),
                    $('body').css('overflowY', 'auto'),
                    this.$nodes.page.off(".drawer"));
            }),
            (a.prototype.trapFocus = function (a, b) {
                a.attr("tabindex", "-1"),
                    a.focus(),
                    $(document).on(b ? "focusin." + b : "focusin", function (b) {
                        a[0] === b.target || a.has(b.target).length || a.focus();
                    });
            }),
            (a.prototype.removeTrapFocus = function (b, a) {
                b.removeAttr("tabindex"), $(document).off(a ? "focusin." + a : "focusin");
            }),
            a
        );
    })()),
    (window.velatheme = window.velatheme || {}),
    (vela.velaBannerTop = function () {
        var a = new Date();
        a.setTime(a.getTime() + 3e5),
            "function" == typeof $.cookie &&
                ("closed" == $.cookie("velaBannerTop") ? $("#bannerTop").removeClass("active") : $("#bannerTop").addClass("active"),
                $("#bannerTop .btn-bannerTop").click(function () {
                    $("#bannerTop").hasClass("active") ? ($.cookie("velaBannerTop", "closed", a), $("#bannerTop").removeClass("active")) : ($.cookie("velaBannerTop", "opened", a), $("#bannerTop").addClass("active"));
                }));
    }),
    setTimeout(function () {
        $(vela.init);
        var b = document.querySelectorAll(".sitemap_modal");
        if (
            (M.Modal.init(b),
            jQuery(document).on("click", ".size_guide", function (a) {
                a.preventDefault(),
                    "Core Bralette" == jQuery(this).data("product-type")
                        ? (jQuery(".ebyPantyGuide").hide(), jQuery(".ebyBraletteGuide").show(), jQuery(".ebyTankGuide").hide())
                        : "Tank" == jQuery(this).data("product-type")
                        ? (jQuery(".ebyBraletteGuide").hide(), jQuery(".ebyPantyGuide").hide(), jQuery(".ebyTankGuide").show())
                        : (jQuery(".ebyBraletteGuide").hide(), jQuery(".ebyPantyGuide").show(), jQuery(".ebyTankGuide").hide()),
                    jQuery(".template-collection .pop_size").is(":visible") ? jQuery(".template-collection .pop_size").fadeOut() : jQuery(".template-collection .pop_size").fadeIn();
            }),
            jQuery(".pop_wrapper_backing").click(function () {
                jQuery(".pop_size").fadeOut();
            }),
            jQuery("span.colz_pop").click(function () {
                jQuery(".pop_size").fadeOut();
            }),
            jQuery("span.colz_pop_qa").click(function () {
                jQuery(".pop_size_qa").fadeOut();
            }),
            setTimeout(function () {
                var privy_embedded_form_1716982 = document.querySelector(".privy-embedded-form-1716982");
                if(privy_embedded_form_1716982 != null) {
                    var a = document.querySelector(".privy-embedded-form-1716982").contentWindow;
                    window.addEventListener("message", function (b) {
                        b.source === a && "eby access granted." === b.data && (window.document.querySelector(".ebyModalModuleWrapper").style.display = "none");
                    });
                }
            }),
            document.addEventListener("rebuy.add", function (a) {
                console.log(":: upsell ADDtoCART event ::", a.detail.product.selected_variant),
                    a.detail.product.selected_variant &&
                        ((window.liQ = window.liQ || []),
                        window.liQ.push({
                            event: "addToCart",
                            email: window.customer_email,
                            items: [{ id: a.detail.product.selected_variant.id.toString(), price: a.detail.product.selected_variant.price, quantity: a.detail.product.qty, currency: "USD" }],
                        })),
                    window.location.href.indexOf("/build-your-box") >= 0
                        ? M.toast({ html: "Success! Added " + a.detail.product.title + " to your first box.", classes: 'ebyAtcAlert success', displayLength: 1250 })
                        : (M.toast({ html: "Success! Added " + a.detail.product.title + " to your cart.", classes: 'ebyAtcAlert success', displayLength: 1250 }),
                          (window.location.href.indexOf("/products") >= 0 || window.location.href.indexOf("/pages") >= 0) && jQuery(".jsDrawerOpenRight").trigger("click")),
                    console.log(a.detail.widget.data.cart.total_price),
                    $(".motivator-bar").length > 0 && a.detail.widget.data.cart.total_price && checkMotivatorBanner(a.detail.widget.data.cart.total_price / 100),
                    setTimeout(function () {
                        if (document.querySelector(".skips-btn")) {
                            let a = document.querySelector(".skips-btn");
                            if (a.fireEvent) a.fireEvent("onclick");
                            else {
                                var b = document.createEvent("Events");
                                b.initEvent("click", !0, !1), a.dispatchEvent(b);
                            }
                        }
                    }, 300);
                let e = document.querySelector(".jsDrawerOpenRight #rebuy-widget-" + a.detail.widget.id + " .rebuy-product-actions"),
                    c = document.querySelector(".ebyQuizApp #rebuy-widget-" + a.detail.widget.id + " .rebuy-product-actions");
                e && $(".ebyMinicart").trigger("click"),
                    c && (c.style.display = "none"),
                    $("body").hasClass("template-holidayLanding") &&
                        ($(".header-minicart-wrapper").removeClass("shop").addClass("checkout"),
                        $(".header-checkoutbtn-wrapper").removeClass("shop").addClass("checkout"),
                        $(".ebyHeaderCtaWrapper").removeClass("join").addClass("buy"),
                        $(".velaCartTop").removeClass("empty").addClass("avail"),
                        $(".cartIndicator").addClass("ebyMinicartHasCount"));
                let b = a.detail.product;
                if ("Surprise Panty Pack" === b.product_type) {
                    var d, f;
                    console.log("::pack about to be added::", b),
                        (d = b.tags
                            .split(", ")
                            .filter(function (a, b) {
                                return a.indexOf("collection:") >= 0 ? a : "";
                            })[0]
                            .replace("collection:", "")),
                        (f = b),
                        console.log("triggered"),
                        $.ajax({ url: window.location.origin + "/collections/" + d, type: "GET" })
                            .done(function (a) {
                                if (a) {
                                    var b = $.parseJSON(a).reduce(
                                        function (b, c) {
                                            let a = c.tags.filter(function (a, b) {
                                                    return a.indexOf(f.id + "::S&DSIZE") >= 0 ? a : "";
                                                }),
                                                d = f.option1;
                                            if (a.length > 1) {
                                                let e = a.filter(function (a, b) {
                                                    return a.indexOf("S&DSIZE:" + d) >= 0 ? a.split(":") : "";
                                                });
                                                e.length > 0 && d === e[0].split("::")[1].replace("S&DSIZE:", "") && b.push(c);
                                            }
                                            return 1 == a.length && d === a[0].split("::")[1].replace("S&DSIZE:", "") && b.push(c), b;
                                        },
                                        [],
                                        f
                                    );
                                    console.log("products to add to the pack", b);
                                    let c = b.reduce(function (a, b) {
                                            let c = b.variants.filter(function (a, b) {
                                                return a.option1 === f.option1 ? a : "";
                                            });
                                            return a.push({ id: c[0].id, quantity: 1, properties: { "Shipping Option": "Ecommerce WH", product_type: "Sub Subscription", included_in_pack: !0 } }), a;
                                        }, []),
                                        d = c.map(function (a, b) {
                                            return a.id;
                                        });
                                    $.ajax({
                                        type: "POST",
                                        url: "/cart/add.js",
                                        data: { items: c },
                                        async: !1,
                                        dataType: "json",
                                        beforeSend: function () {},
                                        success: function (a) {
                                            console.log("successful add to cart"),
                                                jQuery.getJSON("/cart.js", function (e, g) {
                                                    let b = e.items,
                                                        c = b.reduce(function (a, b, c) {
                                                            return +b.id == +f.selected_variant_id && a.push(c), a;
                                                        }, []),
                                                        a = b[c[0]].properties;
                                                    (a.product_type = "Main Subscription"),
                                                        (a.pack_parent = !0),
                                                        (a.subscription_ids = d.join(", ")),
                                                        $.ajax({ type: "POST", url: "/cart/change.js", data: { line: c[0] + 1, properties: a }, async: !1, dataType: "json", success: function (a) {} });
                                                });
                                        },
                                    });
                                }
                            })
                            .fail(function (a) {
                                console.log("esapi-error", a);
                            });
                }
            }),
            $("body").on("click", ".gorgias-web-messenger-container-button", function (a) {
                $("#gorgias-web-messenger-container").fadeIn(), Smooch.open(), gtag("event", "btn_click__open_gorgias_chat", { link_text: a.target.innerText, link_url: a.target.href, link_id: a.target.id, link_title: a.target.title });
            }),
            document.addEventListener("rebuy.ready", function (a) {
                console.log("rebuy.ready event", a.detail);
                let b = document.querySelector("#rebuy-widget-" + a.detail.widget.id + " .rebuy-product-title"),
                    c = document.querySelector("#rebuy-widget-" + a.detail.widget.id + " .rebuy-product-image");
                b &&
                    c &&
                    (b.addEventListener("click", function (a) {
                        return a.stopPropagation(), a.preventDefault(), !1;
                    }),
                    b.setAttribute("href", "javascript:void(0);"),
                    c.addEventListener("click", function (a) {
                        return a.stopPropagation(), a.preventDefault(), !1;
                    }),
                    c.setAttribute("href", "javascript:void(0);")),
                    (-1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod")) && $(".rebuy-select option[value='34449596448812']").attr("disabled", !0).remove();
            }),
            jQuery("body").on("click", ".eby-header-nav-container .mega-nav-column .nav-column-header", function (a) {
                if ((console.log(":x:", a), a.target.href.indexOf("#navlink-") >= 0)) {
                    let b = a.target.href.slice(a.target.href.indexOf("#navlink-"), a.target.href.length);
                    console.log(":: default modal popup ::", b.replace("#navlink-", "")), vela.addEbyMembershipBox("cms", { styleGroup: b.replace("#navlink-", ""), colorGroup: null, sizeGroup: null, planGroup: null });
                }
                gtag("event", "link_click__nav_link", { link_text: a.target.innerText, link_url: a.target.href, link_id: a.target.id, link_title: a.target.title });
            }),
            jQuery("body").on("click", "a.getMembershipGlobalLink", function (a) {
                if (a.target.href.indexOf("#navlink-") >= 0) {
                    let b = a.target.href.slice(a.target.href.indexOf("#navlink-"), a.target.href.length);
                    console.log(":: default modal popup ::", b.replace("#navlink-", "")), vela.addEbyMembershipBox("cms", { styleGroup: b.replace("#navlink-", ""), colorGroup: null, sizeGroup: null, planGroup: null });
                }
                gtag("event", "btn_click__open_sub_funnel_general_cta", { link_text: a.target.innerText, box_pref: snippet.replace("#navlink-", "") });
            }),
            document.getElementById("learnAboutMembership") &&
                null != document.querySelector(".membershipInfoPopup") &&
                document.querySelector(".membershipInfoPopup").addEventListener("click", (a) => {
                    console.log(":: membership info popup init ::"), $.fancybox.open(jQuery("#learnAboutMembership"));
                }),
            jQuery("body").on("mouseenter", ".snize-ac-results", function (a) {
                console.log("update header"), jQuery(".ebyGlobalSearchbar.desktopVer").closest(".mega-nav").siblings("a").addClass("hoverTemp");
            }),
            jQuery("body").on("mouseleave", ".snize-ac-results", function (a) {
                console.log("update header"), jQuery(".ebyGlobalSearchbar.desktopVer").closest(".mega-nav").siblings("a").removeClass("hoverTemp");
            }),
            window.location.href.indexOf("#navlink-") >= 0)
        ) {
            let a = window.location.href.slice(window.location.href.indexOf("#navlink-"), window.location.href.length).replace("#navlink-", "");
            console.log(":: default modal popup ::", a),
                "default" === a
                    ? vela.addEbyMembershipBox("default", { styleGroup: null, colorGroup: null, sizeGroup: null, planGroup: null })
                    : vela.addEbyMembershipBox("cms", { styleGroup: a, colorGroup: null, sizeGroup: null, planGroup: null });
        }
        jQuery("body").on("click", ".ebyMicroBtn.joinNow", function (a) {
            if ((console.log("data-subscribe", a.target), a.target.getAttribute("data-subscribe"))) {
                let b = a.target.getAttribute("data-subscribe");
                vela.addEbyMembershipBox(b, { styleGroup: null, colorGroup: null, sizeGroup: null, planGroup: null, prodsOfInterest: [] });
            }
        }),
            jQuery("body").on("click", ".quickAddMembershipBtn", function (a) {
                if ((console.log("data-subscribe", a.target), a.target.getAttribute("data-subscribe"))) {
                    let b = a.target.getAttribute("data-subscribe");
                    vela.addEbyMembershipBox(b, { styleGroup: a.target.getAttribute("data-sg"), colorGroup: a.target.getAttribute("data-cg"), sizeGroup: null, planGroup: a.target.getAttribute("data-pg"), prodsOfInterest: [] });
                }
            }),
            jQuery("body").on("click", "#clearFiltersBtn", function (a) {
                console.log(":: clear all ::", a.target);
            }),
            jQuery("body").on("click", "#closeMobViewBtn", function (a) {
                console.log(":: close filters modal ::", a.target), jQuery("#collFiltersModule").removeClass("mobViewActive");
            }),
            jQuery("body").on("click", "#openMobViewFilters", function (a) {
                console.log(":: close filters modal ::", a.target), jQuery("#collFiltersModule").addClass("mobViewActive");
            }),
            $(".ebyBtnTracker").on("click", function (a) {
                console.log("::ebytest:: click");
                var b = a.target.getAttribute("data-ebyval").replace("$", "");
                window.ga("send", "event", { eventCategory: a.target.getAttribute("data-ebycat"), eventLabel: a.target.getAttribute("data-ebylab"), eventAction: a.target.getAttribute("data-ebyact"), eventValue: Math.floor(b) });
            }),
            jQuery("body").on("click", ".prodTitleQuickViewBtn", function (a) {
                console.log(":: toggle productTitleQuickInfo ::", a.target), jQuery(a.target).closest(".velaProBlock").find(".prodSecondaryTileface").toggleClass("active");
            }),
            jQuery().collapsible &&
                (jQuery(".collapsible.expandable").length > 0 &&
                    (window.innerWidth > 770 ||
                        (jQuery(".ebyBannerSummaryHeader.mobileVer").length > 0 &&
                            (window.location.pathname.indexOf("invisible-cotton") >= 0 ||
                                window.location.pathname.indexOf("thong-panties") >= 0 ||
                                window.location.pathname.indexOf("feels-like-this") >= 0 ||
                                window.location.pathname.indexOf("seamless-tank-top") >= 0) &&
                            jQuery(".ebyBannerSummaryHeader.mobileVer").addClass("active")),
                    jQuery(".collapsible.expandable").collapsible({ accordion: !1 })),
                jQuery(".collapsible.accordion").length > 0 && jQuery(".collapsible.accordion").collapsible(),
                jQuery(".collapsible.cmsAccordion").length > 0 && jQuery(".collapsible.cmsAccordion").collapsible());
        let c = document.querySelectorAll('a[href^="#"]');
        for (let d of c)
            d.addEventListener("click", (c) => {
                let a = d.getAttribute("href");
                if ("#" !== a) {
                    let b = document.querySelector(a);
                    b && (b.scrollIntoView({ behavior: "smooth", block: "start" }), history.pushState(null, null, a), c.preventDefault());
                }
            });
        jQuery("#goToTop").on("click", function (a) {
            console.log("clicked scroll to top");
            var b = jQuery(a.target);
            b.addClass("rotate"),
                setTimeout(function () {
                    b.removeClass("rotate");
                }, 1e3);
        }),
            jQuery("body").on("click", ".ebyChatLink", function (a) {
                window.GorgiasChat && window.GorgiasChat.open();
            }),
            "/pages/faq" === window.location.pathname && document.referrer.indexOf("/products/") >= 0
                ? (jQuery("html, body").animate({ scrollTop: 450 }, "slow"),
                  jQuery(".ebyReturnsFaqWrapper h3").trigger("click"),
                  setTimeout(function () {
                      jQuery(".ebyReturnsFaqWrapper .autoOpen h3").trigger("click");
                  }, 100))
                : "/pages/faq" === window.location.pathname && "#contact-us" === window.location.hash && jQuery(".ebyContactFaqWrapper h3").trigger("click"),
            jQuery("body").on("click", "#makeMyCustomBoxBtn", function () {
                var a = window.location.pathname.indexOf("/products") >= 0 ? "pdp" : "other";
                gtag("event", "makeMyCustomBoxClick", { event_category: "startingPoint-" + window.location.pathname, event_label: "lastViewing-" + a, event_value: "" });
            }),
            $("body").on("ajaxCart.afterCartLoad", function (b, a) {
                "drawer" == window.ajaxcart_type &&
                    (console.log(":: cmd :: open cart", a),
                    jQuery(".cartIconWrapper").addClass("animate__bounce"),
                    setTimeout(function () {
                        jQuery(".cartIconWrapper").removeClass("animate__bounce");
                    }, 300));
            }),
            $("#collections .velaSwatchProduct li").click(function () {
                if (($("#collections .velaSwatchProduct li").css({ background: "transparent" }), $("#collections .velaSwatchProduct li").removeClass("active"), -1 == (color = $(this).children("label").css("background-color")).indexOf("a")))
                    var a = color.replace(")", ", 0.5)").replace("rgb", "rgba");
                $(this).addClass("active"), $(this).css({ background: a });
            }),
            $(".template-product .proBoxInfo .swatch-element").click(function () {
                $(".template-product .proBoxInfo .swatch-element label").parent().css({ background: "transparent" }), $(".template-product .proBoxInfo .swatch-element label").removeClass("active");
                var a = "rgba(128, 128, 128, 0.5)";
                if (-1 == (color = $(this).children("label").css("background-color")).indexOf("a")) var a = color.replace(")", ", 0.5)").replace("rgb", "rgba");
                $(this).addClass("active"), $(this).css({ background: a });
            }),
            jQuery().owlCarousel && jQuery(".proList .owl-carousel").owlCarousel({ margin: 0, responsiveClass: !0, responsive: { 0: { items: 1, nav: !0 }, 600: { items: 2, nav: !1 }, 1e3: { items: 3, nav: !0, loop: !1 } } }),
            $(".modelSizeSelection a").on("click", function () {
                $(".modelSizeSelection a").removeClass("active"), $(this).addClass("active"), "large" == $(this).data("size") ? console.log("change to lview") : console.log("change to sview");
            }),
            window.location.href.indexOf("reviews") >= 0 &&
                setTimeout(function () {
                    $("body").on("click", "a.stamped-review-title.stamped-style-color-link", function (a) {
                        console.log("stamped link click"), a.preventDefault();
                    });
                }, 1e3);
    }),
    $(document).ready(function () {
        $(".btnAddToCart").on("click", function () {
            console.log("button-click");
        }),
            jQuery("body").on("click", ".r-btn", function (a) {
                a.preventDefault(),
                    (a.target.disabled = !0),
                    jQuery.getJSON("/cart.js", function (b, c) {
                        jQuery.ajax({
                            type: "POST",
                            crossDomain: !0,
                            url: window.APIDomain + window.otherAPI + "index.php",
                            data: { data: b },
                            dataType: "json",
                            success: function (g) {
                                var b,
                                    e,
                                    c,
                                    f,
                                    d = "https://checkout.rechargeapps.com/r/checkout/" + g.checkout.token;
                                (d = ((b = d), (c = (e = $(".subscription-offer")).data("enabled")), (f = e.data("coupon")), void 0 === c || void 0 === f || !0 !== c ? b : `${b}`)), (location.href = d), (a.target.disabled = !1);
                            },
                        });
                    });
            }),
            $("body").on("click", ".acc_title", function () {
                $(this).parent().hasClass("active")
                    ? ($(this).parent().removeClass("active"), $(this).find(".ebyicon-close-thin:before").css("content", "e836"), $(this).parent().find(".acc_content").slideUp(300))
                    : ($(this).parent().addClass("active"), $(this).find(".ebyicon-close-thin:before").css("content", ""), $(this).parent().find(".acc_content").slideDown(300));
            }),
            $("body").on("click", ".motivator-bar__wrapper__fixedLink", function (a) {
                let c = a.target.getAttribute("data-ribbon-mode"),
                    b = "dest-" + a.target.getAttribute("data-ribbon-url");
                gtag("event", b, { event_category: "clicks_of_interest", event_label: "clicked-" + c, event_value: "" }),
                    gtag("event", "select_promotion__ribbon", { creative_name: "header_ribbon", promotion_name: a.target.innerText, url_sent_to: b }),
                    console.log(":: ClcEv ::", { ribbonMode: c, ribbonUrl: b });
            }),
            $("body").on("click", ".atcNoteAvatar", function (a) {
                jQuery(".eby-header").removeClass("ehHide ehHidden"), vela.RightDrawer.open();
                $('body').css('overflowY', 'hidden');
            }),
            $("body").on("click", ".btn.loopBtnFinish", function (a) {
                gtag("event", "tutorial_complete__return_exchange");
            }),
            $("body").on("click", ".item.epcWrapper", function (c) {
                let a = jQuery(c.target).closest(".epcWrapper"),
                    b = jQuery(a).closest(".velaCollections");
                gtag("event", "select_item", {
                    item_list_id: b.data("coll_handle"),
                    item_list_name: b.data("coll_title"),
                    items: [
                        {
                            item_id: a[0].getAttribute("data-prodsku"),
                            item_name: a[0].getAttribute("data-prodtitle"),
                            item_category: a[0].getAttribute("data-prodtype"),
                            price: Shopify.formatMoney(a[0].getAttribute("data-prodprice")).replace("$", ""),
                            quantity: 1,
                        },
                    ],
                });
            }),
            $("body").on("submit", "#join-the-movement", function (a) {
                a.preventDefault(), console.log(":: form submit attempt ::", a.target), a.target;
                var b = { email: jQuery("#k_jtm_id_email").val(), creative_id: "footer_signup" };
                geq.suppress();
                jQuery.ajax({
                    type: "POST",
                    crossDomain: !0,
                    url: window.APIDomain + window.otherAPI + "newsletter-signup.php",
                    data: { data: b },
                    dataType: "json",
                    success: function (a) {
                        console.log("::eby signup success::", a),
                            a && console.log("check data", a),
                            jQuery("#k_jtm_id_email").val(""),
                            gtag("event", "sign_up__attentive_footer_form", { copy_context: jQuery("#join-the-movement .helper-text").text() }),
                            M.toast({ html: '<span class="atcNoteAvatar"><header><p class="bold">SIGNED UP</p><p>Woot! Look our for our emails moving forward.</p></header></span>', classes: "ebyAtcAlert newsletterSignupMsg success" });
                    },
                    error: function (a, b) {
                        console.log("::eby signup failure::", { text: b, xhr: a }),
                            jQuery("#k_jtm_id_email").val(""),
                            a.responseText.indexOf("has already been taken") > 0 &&
                                M.toast({ html: '<span class="atcNoteAvatar"><header><p class="bold">OOPS!</p><p>Something went wrong. Please try again.</p></header></span>', classes: "ebyAtcAlert newsletterSignupMsg error" });
                    },
                });
            }),
            jQuery(".pcsWrapper").each(function (c, a) {
                var b = $("." + a.className.split(" ")[a.classList.length - 1]).find("a"),
                    d = !1;
                (a.scrollTop = 0), (a.scrollLeft = 0);
                let e = { top: 0, left: 0, x: 0, y: 0 };
                var f = function (b) {
                        let c = b.clientX - e.x,
                            f = b.clientY - e.y;
                        0 !== c && (d = !0), (a.scrollTop = e.top - f), (a.scrollLeft = e.left - c);
                    },
                    g = function (b) {
                        a.removeEventListener("mousemove", f), a.removeEventListener("mouseup", g), (a.style.cursor = "grab"), a.style.removeProperty("user-select"), b.clientX - e.x == 0 && (d = !1);
                    };
                a.addEventListener("mousedown", function (b) {
                    (a.style.cursor = "grabbing"), (a.style.userSelect = "none"), (e = { left: a.scrollLeft, top: a.scrollTop, x: b.clientX, y: b.clientY }), a.addEventListener("mousemove", f), a.addEventListener("mouseup", g);
                }),
                    b.each(function (b, a) {
                        a.addEventListener("click", function (a) {
                            !0 === d && a.preventDefault();
                        });
                    });
            }),
            setInterval(function () {
                jQuery(".motivator-bar.ribbonOne").toggleClass("active"), jQuery(".motivator-bar.ribbonTwo").toggleClass("active");
            }, 5e3);
    });

vela.productPage = function (options) {
    var moneyFormat = options.money_format,
        variant = options.variant,
        selector = options.selector;
    var $addToCart = $('#AddToCart'),
        $productPrice = $('#ProductPrice'),
        $comparePrice = $('#ComparePrice'),
        $quantityElements = $('.qtySelector, .qtySelector + .velaQty'),
        $addToCartText = $('#AddToCartText');

  	// stock check on all swatch options avaibable
  	var variantProducts = options.selector.product.variants;

    //update swatch selectors
    //$('.swatch-view-item[orig-value="'+ title +'"]');


    if (variant) {
      //console.log(variant);
      var stock;
      //console.log(window.productInfo);
      if(window.productInfo != undefined){
        var variantInfo = window.productInfo;
        stock = variantInfo.variants[variant.id].inventoryItem.locations[0].available;
      }
      console.log(":: stock qty I ::", {
        stock:stock,
        variant: variant
      });
      if ((variant.available && stock === undefined) || (variant.available && stock > 1)) {
          if (!!document.querySelector('#purchase_type_autodeliver_subs')) {
            if (!document.querySelector('#purchase_type_autodeliver_subs').checked) {
            	document.querySelector(".payment_terms").classList.add("show-shoppay");
            }
          }

          var variantTitle = variant.public_title;
          var grp = '';
          var smallGrp = ['xs','sm','md','lg','xl'];
      	  var isBralette = variantTitle.indexOf('Bralette') >= 0;

          if(variantTitle.includes('/')){
            var sizes = variantTitle.split(' / ');
            var small = 0;
            var large = 0;
            $(sizes).each(function(k,v){
              if(smallGrp.includes(v)){
                small = small+1;
              }else{
                large = large+1;
              }
            });
            if(small == 2){grp = 'small';}
            if(large == 2){grp = 'large';}
          }else{
            if(smallGrp.includes(variantTitle)){
              grp = 'small';
            }else{
              grp = 'large';
            }
          }

        if(grp != ''){
            $('.modelSizeSelection .size-btn').removeClass('active');
            if(grp == 'small'){
                $('.tpo_slider').addClass('hide');
                $('#currentSizeSelection').html("Model wearing size small");
                $('.modelSizeSelection #smallSizeSelection').addClass('active');
                $('.tpo_slider[data-slidefor=small]').removeClass('hide');
                $('.tpo_slider[data-slidefor=small]').trigger('refresh.owl.carousel');
            }else{
                if (isBralette) {
                  	$('#currentSizeSelection').html("Model wearing size large-plus");
                } else {
                  	$('#currentSizeSelection').html("Model wearing size 1X");
                }
                $('.tpo_slider').addClass('hide');
                $('.modelSizeSelection #largeSizeSelection').addClass('active');
                $('.tpo_slider[data-slidefor=large]').removeClass('hide');
                $('.tpo_slider[data-slidefor=large]').trigger('refresh.owl.carousel');
            }
        }else{
            $('.tpo_slider').addClass('hide');
            $('.modelSizeSelection #smallSizeSelection').addClass('active');
            $('.tpo_slider[data-slidefor=small]').removeClass('hide');
            $('.tpo_slider[data-slidefor=small]').trigger('refresh.owl.carousel');
        }

        $('#smallSizeSelection').click(() => {
            $('.tpo_slider').addClass('hide');
            $('.modelSizeSelection #smallSizeSelection').addClass('active hide');
            $('.modelSizeSelection #largeSizeSelection').removeClass('hide');
            $('.tpo_slider[data-slidefor=small]').removeClass('hide');
            $('.tpo_slider[data-slidefor=large]').addClass('hide');
            $('.tpo_slider[data-slidefor=small]').trigger('refresh.owl.carousel');
        });
        $('#largeSizeSelection').click(() => {
            $('.tpo_slider').addClass('hide');
      		if (isBralette) {
      			$('#currentSizeSelection').html("Model wearing size large-plus");
            } else {
            	$('#currentSizeSelection').html("Model wearing size 1X");
            }
            $('.modelSizeSelection #largeSizeSelection').addClass('hide active');
            $('.modelSizeSelection #smallSizeSelection').removeClass('hide');
            $('.tpo_slider[data-slidefor=large]').removeClass('hide');
            $('.tpo_slider[data-slidefor=small]').addClass('hide');
            $('.tpo_slider[data-slidefor=large]').trigger('refresh.owl.carousel');
        });

        if($('.AddBundleProduct').length > 0){
          //console.log(window.packProductIds);
          window.subProductDetails;
          var isAvailable = true;
          var stocks = [];
          var subProductsIDs = [];
          var subProducts = [];
            $('.bundle-products .single-product').each(function(key,value){
              var val = $(value).find('select option').filter(function () { return $(this).html() == variant.public_title; }).val();
              var p = $(value).data('product');
              subProductsIDs.push(p);
              subProducts[p] = val;
              //console.log(val);

              var isAvailableAllOption = true;
              if(window.packProductIds != undefined){
                tomitProductInventoryInfo.getProductsInventoryInformation([p]).then(function(e){
                  console.log(e);
                  var s = e[p].product.variants[val].inventoryItem.locations[0].available;
                  stocks.push(s);
                  console.log('::stock check final::', s);
                  if(s <= 1){
                    isAvailableAllOption = false;
                  }
                });
              }
              //console.log(isAvailableAllOption);
              if(val == undefined || isAvailableAllOption == false){
                isAvailable = false;
              }else{
                $(value).find('select').val(val).change();
              }
            });

          	//console.log(subProductsIDs);
          //console.log(subProducts);
          //console.log(window.subProductDetails);
          if(window.subProductDetails == undefined){
            //console.log('hasStock');
            $.ajax({
              url:'https://inventorylocations.checkmyapp.net/inventory/products/eby-by-sofia-vergara.myshopify.com/['+subProductsIDs.join(',')+']',
              type:'get',
              async:false,
              success:function (data) {
                //console.log(data);
                window.subProductDetails = data;
                $(subProductsIDs).each(function(k,v){
                  var variantID = subProducts[v];

                  if (!!variantID) {
                  	var subProductStock = data[v].product.variants[variantID].inventoryItem.locations[0].available;
                    //console.log(v +" == "+subProductStock);
                    stocks[variantID] = subProductStock;
                    if(subProductStock > 1){

                    }else{
                      isAvailable = false;
                    }
                  } else {
                  	// if any one of the products is not available
                    isAvailable = false;
                  }

                });
              }
            });
          }else{
            var data = window.subProductDetails;
            $(subProductsIDs).each(function(k,v){
              var variantID = subProducts[v];

              if (!!variantID) {
              	var subProductStock = data[v].product.variants[variantID].inventoryItem.locations[0].available;
                //console.log(v +" == "+subProductStock);
                stocks[variantID] = subProductStock;
                if(subProductStock > 0){
                  //stocks.push(subProductStock);
                }else{
                  isAvailable = false;
                }
              } else {
              	isAvailable = false;
              }

            });
          }


          //console.log(isAvailable);
          //console.log(stocks);
          if(isAvailable == false || stock <= 1){
            //console.log('new');
            $addToCart.addClass('disabled').prop('disabled', true);
            $addToCartText.html("Sold Out");
            $quantityElements.hide();
          }else{
            //console.log('asd');
            $addToCart.removeClass('disabled').prop('disabled', false);
            $addToCartText.html("Add to Cart");
            $quantityElements.show();
          }
        }else{

          let coreColors = ("black,grey,nude,cadet,beveled glass,poppy red,keepsake lilac,fuchsia festival,provincial blue,castor grey,rose dust,rose clay,castle wall,umber,mauvewood,fjord blue,blue topaz,blue opal,fallen rock,white,strawberry ice,laurel green,coral pink,raindrop,roseata fleur,caribbean sea,lime punch,puritan grey,ocean depths,sunkissed,blue iris,lime punch,hyper pink,espresso").split(',');
          let haveCore = false,
              haveLimited = false;

          console.log(':: core colors ::', coreColors);

          if(stock != undefined){
            if(stock <= 1){

              if($addToCartText.attr('data-need-color') == undefined || $addToCartText.attr('data-need-color') != 'true') {
                $addToCart.addClass('disabled').prop('disabled', true);
                $addToCartText.html("Sold Out");
              } else {
                $addToCartText.attr('data-text','Sold Out');

              }
              $quantityElements.hide();

              if ($('.swatch-variant-name').length > 0) {
                var oosText = $('.swatch-variant-name').html().replace(' - only a few left','');
                if (coreColors.indexOf(jQuery('.swatch-view-item.swatch-active').getAttribute('orig-value').toLowerCase()) >= 0) {
                	$('.radioTypeColors-tab[for="colorCore"] .swatch-variant-name').html(oosText);
                } else {
                	$('.radioTypeColors-tab[for="colorLimited"] .swatch-variant-name').html(oosText);
                }
              }

            }else{

              console.log("::stock checked::", options);
              if($addToCartText.attr('data-need-color') == undefined || $addToCartText.attr('data-need-color') != 'true') {
                $addToCart.removeClass('disabled').prop('disabled', false);

                if (options.selector.product.type === "Core Underwear") {
                  $addToCartText.html("Add to Cart");
                } else {
                  $addToCartText.html("Add to Cart");
                }
              } else {
                if (options.selector.product.type === "Core Underwear") {
                  $addToCartText.attr('data-text','Add to Cart');
                } else {
                  $addToCartText.attr('data-text','Add to Cart');
                }
              }
              if ($('.swatch-variant-name').length > 0 && $('.swatch-variant-name').html().indexOf(' - only a few left') < 0) {
                console.log(':swatchCheck:');
                var oosText = $('.swatch-variant-name').html();
                //$('.swatch-variant-name').html(oosText);
              }
              $quantityElements.show();
            }
          }
        }

  		$('.back_in_stock').removeClass('false');
      } else {

        if (!!document.querySelector(".payment_terms")) {
        	document.querySelector(".payment_terms").classList.remove("show-shoppay");
        }

        var variantTitle = variant.public_title;
        var grp = '';
        var smallGrp = ['xs','sm','md','lg','xl'];
        var isBralette = variantTitle.indexOf('Bralette') >= 0;

        if(variantTitle.includes('/')){
          var sizes = variantTitle.split(' / ');
          var small = 0;
          var large = 0;
          $(sizes).each(function(k,v){
            if(smallGrp.includes(v)){
              small = small+1;
            }else{
              large = large+1;
            }
          });
          if(small == 2){grp = 'small';}
          if(large == 2){grp = 'large';}
        }else{
          if(smallGrp.includes(variantTitle)){
            grp = 'small';
          }else{
            grp = 'large';
          }
        }

        if(grp != ''){
            $('.modelSizeSelection .size-btn').removeClass('active');
            if(grp == 'small'){
                $('.tpo_slider').addClass('hide');
                $('#currentSizeSelection').html("Model wearing size small");
                $('.modelSizeSelection #smallSizeSelection').addClass('active');
                $('.tpo_slider[data-slidefor=small]').removeClass('hide');
                $('.tpo_slider[data-slidefor=small]').trigger('refresh.owl.carousel');
            }else{
                if (isBralette) {
                  	$('#currentSizeSelection').html("Model wearing size large-plus");
                } else {
                  	$('#currentSizeSelection').html("Model wearing size 1X");
                }
                $('.tpo_slider').addClass('hide');
                $('.modelSizeSelection #largeSizeSelection').addClass('active');
                $('.tpo_slider[data-slidefor=large]').removeClass('hide');
                $('.tpo_slider[data-slidefor=large]').trigger('refresh.owl.carousel');
            }
        }else{
            $('.tpo_slider').addClass('hide');
            $('.modelSizeSelection #smallSizeSelection').addClass('active');
            $('.tpo_slider[data-slidefor=small]').removeClass('hide');
            $('.tpo_slider[data-slidefor=small]').trigger('refresh.owl.carousel');
        }

        $('#smallSizeSelection').click(() => {
            $('.tpo_slider').addClass('hide');
            $('.modelSizeSelection #smallSizeSelection').addClass('active hide');
            $('.modelSizeSelection #largeSizeSelection').removeClass('hide');
            $('.tpo_slider[data-slidefor=small]').removeClass('hide');
            $('.tpo_slider[data-slidefor=large]').addClass('hide');
            $('.tpo_slider[data-slidefor=small]').trigger('refresh.owl.carousel');
        });
        $('#largeSizeSelection').click(() => {
            $('.tpo_slider').addClass('hide');
      		if (isBralette) {
      			$('#currentSizeSelection').html("Model wearing size large-plus");
            } else {
            	$('#currentSizeSelection').html("Model wearing size 1X");
            }
            $('.modelSizeSelection #largeSizeSelection').addClass('hide active');
            $('.modelSizeSelection #smallSizeSelection').removeClass('hide');
            $('.tpo_slider[data-slidefor=large]').removeClass('hide');
            $('.tpo_slider[data-slidefor=small]').addClass('hide');
            $('.tpo_slider[data-slidefor=large]').trigger('refresh.owl.carousel');
        });

        $addToCart.addClass('disabled').prop('disabled', true);
        $addToCartText.html("Sold Out");
        $quantityElements.hide();
		$('.back_in_stock').addClass('false');
		//$('#klaviyo-bis-iframe').contents().find('#klaviyo-bis-modal #variants option').innerText = variant.id;
		//$('#klaviyo-bis-iframe').contents().find('#klaviyo-bis-modal #variants option').value = variant.title;

      }
      $productPrice.html( Shopify.formatMoney(variant.price, moneyFormat) );
      if (variant.compare_at_price > variant.price) {
        $comparePrice
        .html(Shopify.formatMoney(variant.compare_at_price, moneyFormat))
        .show();
      } else {
        $comparePrice.hide();
      }
      if (window.swatch_enable) {
        var form = $('#' + selector.domIdPrefix).closest('form');
        for (var i=0,length=variant.options.length; i<length; i++) {
          var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
          if (radioButton.length > 0) {
            radioButton.get(0).checked = true;
            var headerValue = form.find('.swatch[data-option-index="' + i + '"] .js-swatch-display');
            headerValue.text(variant.options[i]);
          }
        }
      }
      $('.productSKU')
      .html('<label>' + "SKU" + ':</label> ' + variant.sku);
      if (variant.available) {
        $('.productAvailability').removeClass('outstock');
        $('.productAvailability').addClass('instock');
        $('.productAvailability')
        .html('<label>' + "Availability" + ':</label> ' + "In stock");
      } else{
        $('.productAvailability').removeClass('instock');
        $('.productAvailability').addClass('outstock');
        $('.productAvailability').html('<label>' + "Availability" + ':</label> ' + "Unavailable");
      }
      if (window.currencies) {
        Currency.convertAll(window.currency, $('.jsvela-currency__item.active').data('value'), 'span.money', 'money_format');
      }
    } else {
        $addToCart.addClass('disabled').prop('disabled', true);
        $addToCartText.html("Unavailable");
        $quantityElements.hide();
    }
    if (variant && variant.featured_image) {
        var originalImage = $(".proFeaturedImage img");
        var newImage = variant.featured_image;
        var element = originalImage[0];
        Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {
            $('#productThumbs img').each(function() {
                var parentThumbImg = $(this).parent();
                var idProductImage = $(this).parent().data("imageid");
                if (idProductImage == newImage.id) {
                    $(this).parent().trigger('click');
                    return false;
                }
            });
        });
    }

	// ajax swatch click
    jQuery('body').on('click', '.swatch-element label', function (ev) {
      	console.log(":: swatch fire ::", ev.target);

	    let colorNeeded = ev.target.getAttribute("for").length > 0 ? ev.target.getAttribute("for").split('-')[1] : false;
      	if (!colorNeeded) {
      		// no swatch found
          	console.log(':: swatch click event error ::', ev.target);
        } else {
        	let prodInColorReq = window.pdpRelProducts[colorNeeded];
          	console.log(':: swatch product requested ::', prodInColorReq);
        }

    });

};