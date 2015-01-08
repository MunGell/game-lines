(function ($, _) {
    $(document).ready(function () {
        linesGrid.init();
    });

    $(".js-next-turn").click(function () {
        linesGrid.turn()
    });

    $(".js-new-game").click(function () {
        linesGrid.init()
    });

    // @todo: refactor with each()
    $(".js-double-toggle").click(function() {
        $(this).find(".js-first-toggle").toggleClass("js-hidden");
        $(this).find(".js-second-toggle").toggleClass("js-hidden");
    });


})(jQuery, _);
