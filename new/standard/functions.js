$(function(){                                                           
  $(".nav").load("nav.html");                                           
});

function toggleNavbar(element){
  element.parentNode.classList.toggle('opened');
  for(let child of element.parentNode.children){
    child.classList.toggle('opened');
  }
}
