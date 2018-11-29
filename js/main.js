
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


// Küsitlus, nüüd paremini taaskasutatav
const quiz = küsimused => {
    const teeKüsimustik = () => {
        const väljund = [];
        minuKüsimused.forEach((praeguneKüsimus, i) => {
            const vastused = [];
            for (täht in praeguneKüsimus.vastused) {
                vastused.push(
                    `<label>
            <input type="radio" name="küsimus${i}" value="${täht}">
            ${täht} :
            ${praeguneKüsimus.vastused[täht]}
          </label>`
                );
            }
            väljund.push(
                `<div class="küsimus"> ${praeguneKüsimus.küsimus} </div>
        <div class="vastused"> ${vastused.join("")} </div>`
            );
        });
        küsimustikuKast.innerHTML = väljund.join("");
    }

    function vastatud() {
        const vastuseKonteinerid = küsimustikuKast.querySelectorAll(".vastused");
        let õigeid = 0;
        minuKüsimused.forEach((praeguneKüsimus, i) => {
            const vastuseKonteiner = vastuseKonteinerid[i];
            const selector = `input[name=küsimus${i}]:checked`;
            const kasutajaVastus = (vastuseKonteiner.querySelector(selector) || {}).value;
            if (kasutajaVastus === praeguneKüsimus.õigeVastus) {
                õigeid++;
                vastuseKonteinerid[i].style.color = "lightgreen";
            } else {
                vastuseKonteinerid[i].style.color = "red";
            }
        });
        tulemusteKast.innerHTML = `Õigeid vastuseid oli ${õigeid} ${minuKüsimused.length}-st.`;
    }

    const küsimustikuKast = document.getElementById("küsimustik");
    const tulemusteKast = document.getElementById("tulemused");
    const vastamiseNupp = document.getElementById("vasta");
    const minuKüsimused = küsimused

    teeKüsimustik();
    vastamiseNupp.addEventListener("click", vastatud);
}