/**
 * Created with JetBrains PhpStorm.
 * User: ralph
 * Date: 25.10.13
 * Time: 18:34
 *
 * This file contains all Drupal behaviours of the Grezan theme.
 *
 *
 */
(function ($) {

    /**
     * This behavior opens the specific accordion section defined by the given anchor in the URL.
     * @type {{}}
     */
    Drupal.behaviors.openAccordionAnchor = {
        attach: function (context) {
            var anchor = location.hash.substr(1);
            $('.views-accordion-header').has('span[id$="'+anchor+'"]').click();
        }
    }

    /**
     * Fixes the position of the menu bar at the top of the window,
     * a soon as the menu bar touches the top.
     * @type {{attach: Function}}
     */
    Drupal.behaviors.fixedMenuBar = {
        attach: function (context) {
            // set following on page load
            var menuFixed = false,
                fixedTopPos = 0,
                menuBar = $('#menu-bar'),
                menuPos = menuBar.position().top - fixedTopPos;

            $(window).scroll(function () {

                // fixed position of the menu bar, when it hits the top of the window
                var pos = $("html").scrollTop() || $("body").scrollTop(); /* Fixes Safari/Chrome scrollTop bug */

                if (pos >= menuPos && !menuFixed) {
                    // set menu to fixed position with full color (no transparency for good readability over any content)
                    var docWidth = $('#page').width();
                    menuBar.css({"position": "fixed", "top": fixedTopPos+"px", "width": docWidth, "z-index": "99", "background-color": "#fff"});

                    // prevent jump of content
                    menuBar.next().css("margin-top", "2.5em");
                    menuFixed = true;

                } else if (pos < menuPos) {
                    // reset menu to original position and color
                    menuBar.css({"position": "static", "width": "100%", "background-color": "transparent"});

                    // prevent jump of content
                    menuBar.next().css("margin-top", "0");
                    menuFixed = false;
                }
            });

        }
    }

    /**
     * Make equal region heights on several pages.
     */
    Drupal.behaviors.equalColumnHeights = {
        attach: function (context) {

            var maxHeight = 0;
            var calcMaxHeight = function () {
                    $(this).height('auto');
                    var height = $(this).height();
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                },
                makeEqualColumns = function () {
                    // equal heights in nodes
                    maxHeight = 0;
                    // produkt in full mode
                    var nodeColumns = $('.node-produkt.view-mode-full > .at-panel > .region:not(.region-conditional-stack) > .region-inner');
                    if (nodeColumns.length > 0) {
                        nodeColumns.each(calcMaxHeight);
                        nodeColumns.height(maxHeight);
                    }

                    // referenz pane kollektor in full mode
                    maxHeight = 0;
                    var referenz_pane_top_columns = $('#referenz-pane-kollektor').find('.row-1 > .region > .region-inner');
                    if (referenz_pane_top_columns.length > 0) {
                        referenz_pane_top_columns.each(calcMaxHeight);
                        referenz_pane_top_columns.height(maxHeight);
                    }
                    maxHeight = 0;
                    var referenz_pane_bottom_columns = $('#referenz-pane-kollektor').find('.row-2 > .region > .region-inner');
                    if (referenz_pane_bottom_columns.length > 0) {
                        referenz_pane_bottom_columns.each(calcMaxHeight);
                        referenz_pane_bottom_columns.height(maxHeight);
                    }

                    // referenz pane waermepumpe in full mode
                    maxHeight = 0;
                    var referenz_pane_columns = $('#referenz-pane-waermepumpe').find('.region > .region-inner');
                    if (referenz_pane_columns.length > 0) {
                        referenz_pane_columns.each(calcMaxHeight);
                        referenz_pane_columns.height(maxHeight);
                    }

                };

            $(window)
                .load(makeEqualColumns)
                .resize(makeEqualColumns);

        }
    };


})(jQuery);