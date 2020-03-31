window.addEventListener('load', function () {
    let bar = document.getElementById('bar');
    window.addEventListener('scroll', function () {
        let scrollTop = document.body.scrollTop;
        if (scrollTop < 600) {
            bar.className = 'd-none d-md-block col-4 ';
        }
        if (scrollTop > 600) {
            bar.className = 'd-none d-md-block col-4 bar-fixed';
        }
    });
});
// Sticy menu
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

//funionalidad para crear y mostrar post//
fetchPosts()
function fetchPosts() {
    $.ajax({
        url: "https://javascript-ajax-d0ce6.firebaseio.com/team-xmm/posts/.json",
        method: "GET",
        success: (response) => {
            console.log('RES from GET', response)
            printPost(response)

        }
    })
}

var postArray = [] //herramienta que pronto vamos a ocupar
function printPost(object) {
    $("#recent-post").empty()
    let hash
    for (hash in object) {
        let post = object[hash]
        postArray.push(post)// nos va a servir para hacer la filtracion
        let postTopic = post.topic
        let postTitle = post.title
        let postDescription = post.description
        let postAuthor = post.author
        let postDate = post.date
        let postImgUrl = post.url_image
        let currentContent = $("#recent-post").html()
        let newContent = `  <div class="row">
        <div class="col-9">
            <small class="text-uppercase">${postTopic}</small>
            <h3>${postTitle}</h3>
            <small class="extract">${postDescription}</small>
            <p>${postAuthor}</p>
            <small>${postDate}</small>
        </div>
        <div class="col-3 d-flex align-items-center"><img
                src="${postImgUrl}"
                alt=""></div>

    </div>
        `
        $("#recent-post").html(currentContent + newContent)
    }
}
function getPostInfo() {
    let postTopic = $("#topic").val()
    let postTitle = $("#title").val()
    let postDescription = $("#text-area").val()
    let postAuthor = $("#author").val()
    let postDate = $("#date").val()
    let postImgUrl = $("#select-image").val()
    let popularPost = $("#popular-box").val()
    console.log(postTopic, postTitle, postDescription, postAuthor, postDate, postImgUrl, popularPost)
    return {
        topic: postTopic,
        title: postTitle,
        description: postDescription,
        author: postAuthor,
        date: postDate,
        url_image: postImgUrl
    }
}
function addButtonPostListener() {
    let postButton = $(".btn-post")
    postButton.click((event) => {
        let postInfo = getPostInfo()
        $.ajax({
            url: "https://javascript-ajax-d0ce6.firebaseio.com/team-xmm/posts/.json",
            method: "POST",
            data: JSON.stringify(postInfo),
            success: (response) => {
                console.log('RES from POST:', response)
                fetchPosts()
            }
        })

    })
}
addButtonPostListener()
//funionalidad para crear y mostrar post end//
//filtracion de post

function filterPosts() {
    let criterialSearch = $("#search").val().toLowerCase()//obtener lo que tengo en mi buscardor
    let filteredPosts = postArray.filter((post) => {
        let topic = post.topic.toLowerCase()
        let title = post.title.toLowerCase()
        let description = post.description.toLowerCase()
        if (topic.includes(criterialSearch)) {
            return true
        } else if (title.includes(criterialSearch)) {
            return true
        } else if (description.includes(criterialSearch)) {
            return true
        } else {
            return false
        }
    })

    $("#filtered-post-wrapper").empty()
    if (filteredPosts.length === 0) {
        let theresNothing = `<div class=row>
        <div class="col-12 d-flex align-items-center text-center">
        <h1>No se encontro lo que buscabas</h1>
        </div>
     </div>
        `
        $("#filtered-post-wrapper").html(theresNothing)
    }

    filteredPosts.forEach((post) => {
        let postTopic = post.topic
        let postTitle = post.title
        let postDescription = post.description
        let postAuthor = post.author
        let postDate = post.date
        let postImgUrl = post.url_image
        let currentContent = $("#filtered-post-wrapper").html()
        let newContent = `  <div class="row">
        <div class="col-9">
            <small class="text-uppercase">${postTopic}</small>
            <h3>${postTitle}</h3>
            <small class="extract">${postDescription}</small>
            <p>${postAuthor}</p>
            <small>${postDate}</small>
        </div>
        <div class="col-3 d-flex align-items-center"><img
                src="${postImgUrl}"
                alt=""></div>

    </div>
        `
        $("#filtered-post-wrapper").html(currentContent + newContent)

    })
}
function addSearchListener() {
    $("#search").keypress((event) => {
        if (event.which === 13) {
            filterPosts()
        }
    })
}
addSearchListener()
