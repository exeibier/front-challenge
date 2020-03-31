window.addEventListener('load', function() {
    let bar = document.getElementById('bar');
    window.addEventListener('scroll', function() {
      let scrollTop = document.body.scrollTop;
      if (scrollTop < 600) {
        bar.className = 'd-none d-md-block col-4 ';
      }
      if (scrollTop > 650) {
        bar.className = 'd-none d-md-block col-4 bar-fixed';
      }
    });
  });