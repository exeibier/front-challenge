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

window.addEventListener('load', function () {
    let bar = document.getElementById('bar');
    window.addEventListener('scroll', function () {
        let scrollTop = document.body.scrollTop;
        if (scrollTop < 550) {
            bar.className = 'd-none d-md-block col-4 ';
        }
        if (scrollTop > 550) {
            bar.className = 'd-none d-md-block col-4 bar-fixed';
        }
    });
});

//funionalidad para crear y mostrar post//
fetchPosts()
function fetchPosts() {
    $.ajax({
        url: "https://javascript-ajax-d0ce6.firebaseio.com/team-xmm/posts/.json",
        method: "GET",
        success: (response) => {
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
        let newContent = ` 
      <div class="row border-bottom m-top-2">
        <div class="col-8  ">
            <button type="button" class="btn text-left btn-post" data-post-title="${post.title}" data-post-author="${post.author}" data-post-date="${post.date}" data-post-description="${post.description}" data-post-topic="${post.topic}" data-post-image="${post.url_image}">
                    <small class="text-uppercase">${postTopic}</small>
                    <h2 class="font-weight-bolder pa-ma  col-8 align-self-left">${postTitle} </h2>
                    <p class="text-secondarygit  extract">${postDescription}</p>
                    <p>${postAuthor}</p>
                    <p class="text-secondary">${postDate}</p>
            </button>
        </div>
        <div class="col-4 pop-img">
            <img src=${postImgUrl} style="width: 80%;"  alt="...">

        </div>  
      `
        $("#recent-post").html(currentContent + newContent)
    }
    filterByPopularity()
}
function getPostInfo() {
    let postTopic = $("#topic").val()
    let postTitle = $("#title").val()
    let postDescription = $("#text-area").val()
    let postAuthor = $("#author").val()
    let postDate = $("#date").val()
    let postImgUrl = $("#select-image").val()
    let popularPost = $("#popular-box").is(":checked")
    return {
        topic: postTopic,
        title: postTitle,
        description: postDescription,
        author: postAuthor,
        date: postDate,
        url_image: postImgUrl,
        is_popular: popularPost
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

    $("#top").empty()
    if (filteredPosts.length === 0) {
        let theresNothing = `<div class=row>
      <div class="col-12 d-flex align-items-center text-center">
      <h1>No se encontro lo que buscabas</h1>
      </div>
   </div>
      `
        $("#top").html(theresNothing)
    }

    filteredPosts.forEach((post) => {
        let postTopic = post.topic
        let postTitle = post.title
        let postDescription = post.description
        let postAuthor = post.author
        let postDate = post.date
        let postImgUrl = post.url_image
        let currentContent = $("#top").html()
        let newContent = `
        <div class="row">
            <div class="col-9">
            <button type="button" class="btn text-left btn-post" data-post-title="${post.title}" data-post-author="${post.author}" data-post-date="${post.date}" data-post-description="${post.description}" data-post-topic="${post.topic}" data-post-image="${post.url_image}">
                <small class="text-uppercase">${postTopic}</small>
                <h3>${postTitle}</h3>
                <small class="extract">${postDescription}</small>
                <p>${postAuthor}</p>
                <small>${postDate}</small>
                </button>
            </div>
            <div class="col-3 d-flex align-items-center">
                <img src="${postImgUrl}" alt="">
            </div>
        </div>
        `
        $("#top").html(currentContent + newContent)

    })
    addReadPostBtn()
}
function addSearchListener() {
    console.log($("#search"))
    $("#search").keypress((event) => {
        if (event.which === 13) {
            event.preventDefault()
            filterPosts()
        }
    })
}
addSearchListener()

function filterByPopularity() {
    let popularPost = postArray.filter((post) => {
        return post.is_popular
    })
    let topFive = popularPost.slice(0, 5)
    $("#popular-post").empty()
    topFive.forEach((post, index) => {
        let postTitle = post.title
        let postAuthor = post.author
        let postDate = post.date
        let currentContent = $("#popular-post").html()
        let newContent = `
        <div class="row">
        <div class="col-3">
            <h1 class="text-muted">0${index + 1}</h1>
        </div>
        <div class="col-8">
        <button type="button" class="btn text-left btn-post" data-post-title="${post.title}" data-post-author="${post.author}" data-post-date="${post.date}" data-post-description="${post.description}" data-post-topic="${post.topic}" data-post-image="${post.url_image}">
            <article class="bg-white ">
                <h2 class="font-weight-bolder">${postTitle}</h2>
                <p>${postAuthor}</p>
                <p>${postDate}</p>
            </article>          
        </button>
        </div>
        </div>
        `
        $("#popular-post").html(currentContent + newContent)

    })
    addReadPostBtn()
}


function addReadPostBtn() {
    $(".btn-post").click(function (event) {
        let post = $(this).data()
        let title = post.postTitle
        let date = post.postDate
        let author = post.postAuthor
        let description = post.postDescription
        let topic = post.postTopic
        let image = post.postImage

        $("#title-read-post").text(title)
        $("#date-author-read-post").text(`${author} ${date}`)
        $("#description-read-post").text(description)
        $("#topic-read-post").text(topic)
        console.log(topic)
        $("#img-read-post").attr("src", image)

        $("#read-post").modal("show")
    })
}