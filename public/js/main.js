$(document).ready(function () {
    var slinky = $("#slinky");
    var clicking = false;

    slinky.mousedown(function (e) {
        clicking = true
        e.stopPropagation();
        e.preventDefault();
        return false;
    })
    $(document).mouseup(function (event) {
        clicking = false
    })
    $(document).mousemove(function (event) {
        if (!clicking) return
        var left = slider.offset().left + slinky.width() / 2;
        var pos = Math.min(Math.max(event.pageX - left, sliderleft), sliderright);
        slinky.css("left", pos)
        var ippiness = Math.floor((pos / (sliderright - sliderleft)) * 8) + 1;
        var results = $('#boxfun').find('a').sort(function (a, b) {
            var v = Math.abs(parseInt($(a).attr('data-happiness')) - ippiness);
            var j = Math.abs(parseInt($(b).attr('data-happiness')) - ippiness);
            return v - j;
        });
        results.appendTo('#boxfun');
    })

    var slider = $("#sliderfun");
    var sliderleft = slinky.width() / 2 - 10;
    console.log(sliderleft);
    var sliderright = slider.width() - slinky.width() - sliderleft;
    console.log(sliderright);

    $("#boxfun li").click(function (e) {
        var e = $(this);
        if (e.hasClass('animated')) return;

        e.addClass("animated tada");
        var d = e.find('div:first');
        var t = d.text();
        d.text("ip ip, hooray!");
        setTimeout(function () {
            e.removeClass("animated tada");
            d.text(t);
        }, 1000);
        //$('#boxfun .copyme').remove()
    });

    var clipboard = new Clipboard('.copy');
    clipboard.on('success', function (e) {
        console.log(e);
    });
    clipboard.on('error', function (e) {
        console.log(e);
    });

});