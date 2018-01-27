// ==UserScript==
// @name         localbitcoins filter
// @namespace    https://srchub.org
// @version      0.2
// @description  Adds some filters and sorting to localbitcoins
// @author       Nathan Adams <adamsna@datanethost.net>
// @match        https://localbitcoins.com/*
// @updateURL    https://github.com/jmontiel/localbitcoinsfilter/blob/master/localbitcoinsfilter.user.js
// @downloadURL  https://github.com/jmontiel/localbitcoinsfilter/blob/master/localbitcoinsfilter.user.js
// @grant        none
// ==/UserScript==
// License: MIT
//
// If you feel this script was useful please send BTC donations to this address: 
// 1kqfr9hYPHTwGdMev9b538sSeyLa5h4FR
//
// Mirrors: 
// https://github.com/nadams810/localbitcoinsfilter
// https://srchub.org/p/localbitcoinsfilter/

/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){

    var sort = [].sort;

    return function(comparator, getSortable) {

        getSortable = getSortable || function(){return this;};

        var placements = this.map(function(){

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function() {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });

    };

})();


$(".pagination-block").first().after('Hide non VEF <input type="checkbox" id="non-vef"> | Hide Recent <input type="checkbox" id="hideRecent"> | Hide Offline <input type="checkbox" id="hideOffline">');

$("#hideRecent").click(function(e) {
    $(".online-status-recent").closest("tr").toggle();
});

$("#hideOffline").click(function(e) {
    $(".online-status-offline").closest("tr").toggle();
});

$("#non-vef").click(function(e) {
    $(".column-price").not(":contains('VEF')").closest("tr").toggle();
});

var table = $('.table-bitcoins').first();

$('.header-price').first()
    .wrapInner('<span title="sort this column"/>')
    .each(function(){

    var th = $(this),
        thIndex = th.index(),
        inverse = false;

    th.click(function(){

        table.find('td').filter(function(){

            return $(this).index() === thIndex;

        }).sortElements(function(a, b){
            return Number(jQuery.trim($.text([a]).replace(/,/g, '') ).split(" ")[0]) > Number(jQuery.trim($.text([b]).replace(/,/g, '') ).split(" ")[0]) ?
                inverse ? -1 : 1
            : inverse ? 1 : -1;

        }, function(){

            // parentNode is the element we want to move
            return this.parentNode;

        });

        inverse = !inverse;

    });

});

$(".header-price").first().hover(function() {
    $(this).css('cursor','pointer');
}, function() {
    $(this).css('cursor','auto');
});
$('.header-price').click();
if (window.location.href.indexOf("sell") > -1) {
    $('.header-price').click();
    $('#non-vef').click();
}
