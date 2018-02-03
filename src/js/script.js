var itemCount = 0;

$(document).ready(function () {
    $(function () {
        var numbSlides = 0;
        if ($(window).width() < 600) {
            numbSlides = 1;
        } else if ($(window).width() < 1240) {
            numbSlides = 2
        } else {
            numbSlides = 4;
        }
        window.slider = $('.bxslider').bxSlider({
            slideWidth: $(window).width() / numbSlides,
            maxSlides: numbSlides,
            controls: false,
        });
    });


    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html,body').animate({
            scrollTop: $target.offset().top - $('header').height()
        }, 600);
    });

    $('.clear').on('click',function(){
        itemCount = 0;
        $('#item-counter').text(itemCount).css('display', 'none');
    });

    $(window).resize(function () {
        $(window).trigger('load');

       
            var numbSlides = 0;
            if ($(window).width() < 600) {
                numbSlides = 1;
            } else if ($(window).width() < 1240) {
                numbSlides = 2
            } else {
                numbSlides = 4;
            }
            window.slider.reloadSlider({
                slideWidth: $(window).width() / numbSlides,
                maxSlides: numbSlides,
                controls: false,
            });

    });

    $('#email>button').on('click', validate);

});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    $('#result').text('');
    var email = $('#emailInput').val();
    if (validateEmail(email)) {
        $('#result').text('Thanks for signing up for Aloha Apparel emails!');
        $('#result').css('color", "white');
    } else {
        $('#result').text('Please re-enter your email address using the proper format.');
        $('#result').css('color', 'white');
    }
    return false;
}