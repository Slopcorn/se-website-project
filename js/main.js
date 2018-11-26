var modal = document.getElementById('myModal');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

function myFunc(pilt){
  var ImgSrc = pilt.src;
  var altText = pilt.alt;
  modal.style.display = "block"
  modalImg.src = ImgSrc
  captionText.innerHTML = altText

}
