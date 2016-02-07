$(document).ready(function () {

    var boxclick = function (e) {
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

        // send a view
        $.post('/ippy/' + e.attr('data-id'), '', function(){});
    };
    $("#boxfun li").click(boxclick);

    // copy text
    var clipboard = new Clipboard('.copy');
    clipboard.on('success', function (e) {
        console.log(e);
    });
    clipboard.on('error', function (e) {
        console.log(e);
    });

    // toggle popup
    var $toggle = $('.toggle');
    var $popup = $('#menu');
    $toggle.click(function (event) {
        var actionClass = ($popup.hasClass('active') ? 'close' : 'open');
        if (actionClass == 'open') {
            setTimeout(function(){$('#in').focus();}, 100);
        }
        $popup.addClass(actionClass);
        setTimeout(function () {
            $popup.removeClass(actionClass);
        }, 200);

        $popup.toggleClass('active');
        $toggle.toggleClass('active');

        event.preventDefault();
        event.stopPropagation();
        return false;
    });

    // click away to hide popup
    var $toggle = $('.toggle:first');
    $(".fade").click(function(){
        $toggle.click();
    });

    $('.popup').click(function(e){
        e.stopPropagation();
    });

    // ajax forms
    $('form').submit(function(e) {
        var $this = $(this);

        // prevent multi-submit
        if ($this.data('submitted') == true) {
            e.preventDefault();
            return false;
        }

        // error validation
        var $input = $this.find('input[type="text"]:first');
        if ($input.val().length < 2) {
            $input.parent().addClass('animated shake');
            setTimeout(function(){$input.parent().removeClass('animated shake');}, 1000);
            $input.focus();
            e.preventDefault();
            return false;
        }

        $this.data('submitted', true);

        $.ajax({
            type: $this.attr('method'),
            url: $this.attr('action'),
            data: $this.serialize(),
            success: function(data) {
                $this.find('input[type="text"]').val('');
                $('.popup').addClass('animated fast fadeOutUp');
                setTimeout(function(){$('.popup').removeClass('animated fadeOutUp');}, 1000);
                setTimeout(function(){$('.toggle:first').click(); /* hide form */}, 500);
            },
            error: function() {
                $this.addClass('error');
                $this.addClass('animated shake');
                setTimeout(function(){$this.removeClass('animated shake');}, 1000);
                $this.find('input:last').val('ERROR').addClass('error').removeClass('sending');
            },
            complete: function() {
                $this.data('submitted', false);
                setTimeout(function(){
                    $this.find('input:last').val('POST').removeClass('error sending');
                }, 1000);
            }
        });

        $this.find('input:last').val('SENDING...').addClass('sending');

        // prevent normal form submit
        e.preventDefault();
        return false;
    });

    // infinite scroll
    var loading = false;
    var page = 1;
    var lead = 200;
    var $box = $('#boxfun');
    var done = false;
    var order = $('body').attr('data-page');
    $(window).scroll(function(e){
        if (done || loading || ($(window).scrollTop() < $(document).height() - $(window).height() - lead))
            return;

        page++;
        loading = true;
        $box.addClass('loading');

        $.get('/ippy?page=' + page + '&order_by=' + order).success(function(data) {
            if (data.length == 0) {
                console.log(data);
                done = true;
            } else {
                $box.append(data);
                $("#boxfun li").click(boxclick);
            }
        }).complete(function(){
            loading = false;
            $box.removeClass('loading');
        });
    });
});