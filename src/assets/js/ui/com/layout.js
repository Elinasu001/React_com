$(document).ready(function(){
    /*---------------------------------------------
        ready, load, resize
    ---------------------------------------------*/
    $(document).ready(function(){
        headerPopupL.scrolling();
    });

    // $(window).on('load',function(){
    // });

    $(window).on('resize', function () {
        headerL.scrolling();
        headerPopupL.scrolling();
    });
    

    /**
     * header on클래스 추가
    **/
    var headerL = (function() {

        var scrollY = 0;

        return {
            headerAni: function() {
                if (scrollY > 0) {
                    $('.headerOn:visible, .btmWrap:visible').addClass('on');
                    
                } else {
                    $('.headerOn:visible, .btmWrap:visible').removeClass('on');
                }
            },
            // 스크롤 처리
            scrolling: function () {
                scrollY = $('.wrap .contentWrap').scrollTop();
                this.headerAni();
            }
        };
    })();

    //event
    $('.wrap .contentWrap').on('scroll', function() {
        headerL.scrolling();
    });

    /**
     * 팝업 header on 클래스 추가
     **/
    var headerPopupL = (function() {

        var scrollY = 0;

        return {
            headerAni: function() {
                var headerOn = $('.fullPopupOn:visible .pop-header, .fullPopupOn:visible .pop-btm-wrap');
                if (scrollY > 0) {
                    headerOn.addClass('on');
                } else {
                    headerOn.removeClass('on');
                }
            },
            scrolling: function () {
                scrollY = $('.fullPopupOn .pop-con-wrap').scrollTop();
                this.headerAni();
            }
        };
    })();

    // event
    $('.fullPopupOn .pop-con-wrap').on('scroll', function() {
        headerPopupL.scrolling();
    });

});