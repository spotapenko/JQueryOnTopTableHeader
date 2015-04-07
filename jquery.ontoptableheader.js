/*

Developed by potapenko.stanislav@gmail.com

use smth like in you html:

 (function( $ ) {
     $('.infinite-scroll').onTopTableHeader({
         'class': 'infinite-scroll',
         'addButtonAfter': '.navigation',
         'addButtonHtml': '<a href="#" class="move_to_top" onclick="window.scrollTo(0,0);">top</a>',
         'marginTop': 101,
         'fixedBoxId' : 'fixedBox',
         'fixedBoxAddClass' : 'table-header-fixed'
     });
 })(jQuery);

 styles smth like


 .table-header-fixed {
     border-color: #fff;
     border-style: solid;
     border-width: 8px 0 0;
     display: none;
     position: fixed;
     top: 80px;
     width: 1240px !important;
     z-index: 1;
 }

 .move_to_top {
     background: url("../images/narrow_up.png") no-repeat scroll 0 0 rgba(0, 0, 0, 0);
     bottom: 82px;
     display: block;
     float: right;
     font-size: 0;
     height: 29px;
     margin-left: 10px;
     margin-right: 10px;
     margin-top: 10px;
     position: fixed;
     right: 4px;
     width: 29px;
 }

 */


(function( $ ) {
    $.fn.onTopTableHeader = function(options) {

        var settings = $.extend( {
            'wrapperClass': 'tableClass',
            'addButtonAfter': '.divClass',
            'addButtonHtml': '<a href="#" style="display:none;" class="move_to_top" onclick="window.scrollTo(0,0);">top</a>',
            'marginTop': 200,
            'fixedBoxId' : 'fixedBox',
            'fixedBoxAddClass' : 'table-header-fixed'
        }, options);

        return this.each(function() {

            var $this = $(this);
            var content = $this.html();

            $('.move_to_top').hide();

            if($this.length) {

                var classList = $this.attr('class').split(/\s+/);
                var newClassListStr = "";
                $.each( classList, function(index, item){
                    if (item !== settings.wrapperClass) {
                        newClassListStr = newClassListStr+' '+item;
                    }
                });

                var newdiv = $('<table id="'+settings.fixedBoxId+'" class="'+newClassListStr+' '+settings.fixedBoxAddClass+'">');
                newdiv.html(content);
                newdiv.find('tbody').empty();
                $this.before(newdiv);
                $(settings.addButtonAfter).after(settings.addButtonHtml);

                function getScrollTop() {
                    var scrOfY = 0;
                    if( typeof( window.pageYOffset ) == "number" ) {
                        //Netscape compliant
                        scrOfY = window.pageYOffset;
                    } else if( document.body
                        && ( document.body.scrollLeft
                        || document.body.scrollTop ) ) {
                        //DOM compliant
                        scrOfY = document.body.scrollTop;
                    } else if( document.documentElement
                        && ( document.documentElement.scrollLeft
                        || document.documentElement.scrollTop ) ) {
                        //IE6 Strict
                        scrOfY = document.documentElement.scrollTop;
                    }
                    return scrOfY;
                }

                jQuery(window).scroll(function() {
                    fixPaneRefresh();
                });

                function fixPaneRefresh(){
                    if (jQuery("#"+settings.fixedBoxId+"").length) {
                        var top  = getScrollTop();
                        if(top > settings.marginTop) {
                            $('.'+settings.wrapperClass+' thead tr').css('visibility','hidden');
                            $('.'+settings.fixedBoxAddClass).show();
                            $('.move_to_top').show();
                        } else {
                            $('.'+settings.wrapperClass+' thead tr').css('visibility','visible');
                            $('.'+settings.fixedBoxAddClass).hide();
                            $('.move_to_top').hide();
                        }
                    }
                }
            }
        });
    };
})(jQuery);
