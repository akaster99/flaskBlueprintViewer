var PageTransitions = (function() {

    var $main = $('#pt-main'),
        $pages = $main.children('div.pt-page'),
        $iterate = $('#iterateEffects'),
        $iterate_prev = $('#iterateEffectsPrev'),
        animcursor = 1,
        pagesCount = $pages.length,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        // support css animations
        support = Modernizr.cssanimations,
        animations = {
            max: 67
        },
        keys = {
            BACKSPACE: 8,
            DOWN: 40,
            ENTER: 13,
            LEFT: 37,
            RIGHT: 39,
            SPACE: 32,
            PAGE_DOWN: 34,
            PAGE_UP: 33
        };

    function init() {

        $pages.each(function() {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(current).addClass('pt-page-current');

        $('#dl-menu').dlmenu({
            animationClasses: { in: 'dl-animate-in-2', out: 'dl-animate-out-2' },
            onLinkClick: function(el, ev) {
                ev.preventDefault();
                nextPage(el.data('animation'));
            }
        });

        var animcursorCheck = function() {
            if (isAnimating) {
                return false;
            }
            if (animcursor > animations.max) {
                animcursor = 1;
            } else if (animcursor < 1) {
                animcursor = animations.max
            }
            return animcursor;
        };

        $("body").keyup(function(event) {
            //var key = event.which,
            //animation = $('#dl-menu').data().dlmenu.$el.data('animation');
            //animation = 1
            var key = event.which;

            if (key == keys.RIGHT || key == keys.SPACE || key == keys.ENTER || key == keys.DOWN || key == keys.PAGE_DOWN) {
                nextPage(animcursorCheck());
                ++animcursor;
            }
            if (key == keys.LEFT || key == keys.BACKSPACE || key == keys.PAGE_UP) {
                --animcursor;
                prevPage(animcursorCheck());
            }
        });

        $iterate.on('click', function() {
            nextPage(animcursorCheck());
            ++animcursor;
        });
        $iterate_prev.on('click', function() {
            prevPage(animcursorCheck());
            ++animcursor;
        });
    }

    function nextPage(options) {
        var animation = (options.animation) ? options.animation : options;

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq(current);

        if (typeof options.showPage != 'undefined') {
            if (options.showPage < pagesCount - 1) {
                current = options.showPage;
            } else {
                current = 0;
            }
        } else {
            if (current < pagesCount - 1) {
                ++current;
            } else {
                current = 0;
            }
        }

        var $nextPage = $pages.eq(current).addClass('pt-page-current'),
            outClass = '',
            inClass = '';

        outClass = 'pt-page-moveToLeft';
        inClass = 'pt-page-moveFromRight';

        $currPage.addClass(outClass).on(animEndEventName, function() {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function() {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function prevPage(options) {
        var animation = (options.animation) ? options.animation : options;

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq(current);

        if (typeof options.showPage != 'undefined') {
            if (options.showPage < pagesCount - 1) {
                current = options.showPage;
            } else {
                current = 0;
            }
        } else {
            if (current > 0) {
                --current;
            } else {
                current = 0;
            }
        }

        var $nextPage = $pages.eq(current).addClass('pt-page-current'),
            outClass = '',
            inClass = '';

        outClass = 'pt-page-moveToRight';
        inClass = 'pt-page-moveFromLeft';

        $currPage.addClass(outClass).on(animEndEventName, function() {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function() {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
    }

    init();

    return {
        init: init,
        nextPage: nextPage
    };

})();