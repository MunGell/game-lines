(function ($, _) {
    $(document).ready(function () {
        linesGrid.init();
    });

    $('.js-next-turn').click(function () {
        linesGrid.turn()
    });

    $('.js-new-game').click(function () {
        linesGrid.init()
    });

    $('.js-toggles').click(function() {
        $(this).find('.js-toggle').each(function(){
            $(this).toggleClass('js-hidden');
        });
    });
})(jQuery, _);
