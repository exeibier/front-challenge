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

                            <button type="button" class="btn text-left" data-toggle="modal" data-target="#content">
                                
                                    <p class="text-secondary">Popular on Medium</p>
                                    <small class="text-uppercase">${postTopic}</small>
                                    <h2 class="font-weight-bolder pa-ma  col-8 align-self-left">${postTitle} </h2>
                                    <p class="text-secondary extract">${postDescription}</p>
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
      event.preventDefault()
      if (event.which === 13) {
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
       <button type="button" class="btn text-left" data-toggle="modal" data-target="#content">
          <article class="bg-white ">
              <a href="">
                  <h2 class="font-weight-bolder">${postTitle}</h2>
              </a>
              <p>${postAuthor}</p>
              <p>${postDate}</p>
          </article>          
       </button>
      `
      $("#popular-post").html(currentContent + newContent)

  })
}


function blogEntry () {
  let hash
  for (hash in object) {
      let post = object[hash]
      postArray.push(post)
      let postTitle = post.title
      let postDescription = post.description
      let postAuthor = post.author
      let postDate = post.date
      let postImgUrl = post.url_image
      let newContent = ` 
      <div class="modal fade" id="content" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Entry</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="container">
                  <div class="imagen">
                      <img src=${postImgUrl} alt="blog">
          
                  </div>
                  <div class="titulo">
                      <h2>${postTitle}</h2>
                  </div>
      
                  <div class="row author">
                      <div class="col-12 col-lg-6 ">
                          <div class="img-aut">
                              <img src="img/autor.jpeg" alt="author">
                          </div>
                          <p>
                              ${postAuthor}
                              <br> ${postDate}
                          </p>
                          
                      </div>
                      <div class="col-12 col-lg-6 social">
                          <a href="#"><i class="fab fa-twitter"></i></a> 
                          <a href="#"><i class="fab fa-linkedin"></i></a> 
                          <a href="#"><i class="fab fa-facebook-square"></i></a> 
                      </div>
          
                  </div>
          
                  <article class="blog">
                      ${postDescription}
                  </article>
          
                  <div class="bottom-aut ">
                      <div class="img-bottom">
                          <img src="img/autor.jpeg" alt="author">      
                      </div>
                          <p class="text-uppercase"> written by </p>
                          <p> <b>${postAuthor}</b> </p>
                          <p>"Explainer of things, former editor-in-chief of Live Science and Space .com, author of the science thriller “5 Days to Landfall.”</p> 
                  </div>
          
                  
                  
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
      `
      newContent = addModalListener()
    }
    filterByPopularity()
  }

  function addModalListener () {
  $(document).ready(function(){
    $("#recent-post").click(function(){
      $("#content").modal();
    });
  });
}

