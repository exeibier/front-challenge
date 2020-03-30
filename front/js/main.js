$(document).ready(function () {
    var altura = $('.menu').offset().top;

    $(window).on('scroll', function () {

        if ($(window).scrollTop() > altura) {
            $('.menu').addClass('menu-fixed')
        } else {
            $('.menu').removeClass('menu-fixed')
        }
    })
})

function fetchPosts() {
    $.ajax({
        url: "https://javascript-ajax-d0ce6.firebaseio.com/team-xmm/posts/.json",
        method: "GET",
        success: (response) => {
            console.log('RES from GET', response)

        }
    })
}