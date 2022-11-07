var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash-o");
let red = document.getElementsByClassName("red fa-solid fa-car");
let black = document.getElementsByClassName("black fa-solid fa-car");
let white = document.getElementsByClassName("white fa-solid fa-car");

Array.from(trash).forEach(function(element) {
  
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const one = this.parentNode.parentNode.childNodes[1].innerText
        const two = this.parentNode.parentNode.childNodes[3].innerText
        const three = this.parentNode.parentNode.childNodes[5].innerText
        const four = this.parentNode.parentNode.childNodes[7].innerText
        const five = this.parentNode.parentNode.childNodes[9].innerText
        const img = this.parentNode.parentNode.childNodes[13].innerHTML
   console.log(img)
      
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'one': one,
            'two': two,
            'three': three,
            'four': four,
            'five': five,
            'img': img
          })
        }).then(function (response) {
           window.location.reload()
        })
      });
});

Array.from(red).forEach(function(element) {
  
  element.addEventListener('click', function(){
    const one = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText
    const two = this.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText
    const three = this.parentNode.parentNode.parentNode.parentNode.childNodes[5].innerText
    const four = this.parentNode.parentNode.parentNode.parentNode.childNodes[7].innerText
    const five = this.parentNode.parentNode.parentNode.parentNode.childNodes[9].innerText
console.log(one, two,three,four,five)
  
    fetch('messages', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            'one': one,
            'two': two,
            'three': three,
            'four': four,
            'five': five,

      })
    }).then(function (response) {
       window.location.reload()
    })
  });
});

Array.from(black).forEach(function(element) {
  
  element.addEventListener('click', function(){
    const one = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText
    const two = this.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText
    const three = this.parentNode.parentNode.parentNode.parentNode.childNodes[5].innerText
    const four = this.parentNode.parentNode.parentNode.parentNode.childNodes[7].innerText
    const five = this.parentNode.parentNode.parentNode.parentNode.childNodes[9].innerText
console.log(one, two,three,four,five)
  
    fetch('black', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            'one': one,
            'two': two,
            'three': three,
            'four': four,
            'five': five,

      })
    }).then(function (response) {
       window.location.reload()
    })
  });
});
Array.from(white).forEach(function(element) {
  
  element.addEventListener('click', function(){
    const one = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText
    const two = this.parentNode.parentNode.parentNode.parentNode.childNodes[3].innerText
    const three = this.parentNode.parentNode.parentNode.parentNode.childNodes[5].innerText
    const four = this.parentNode.parentNode.parentNode.parentNode.childNodes[7].innerText
    const five = this.parentNode.parentNode.parentNode.parentNode.childNodes[9].innerText
console.log(one, two,three,four,five)
  
    fetch('white', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            'one': one,
            'two': two,
            'three': three,
            'four': four,
            'five': five,

      })
    }).then(function (response) {
       window.location.reload()
    })
  });
});
