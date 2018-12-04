const myFunc = pilt => {
  var ImgSrc = pilt.src;
  var altText = pilt.alt;
  modal.style.display = "block";
  modalImg.src = ImgSrc;
  captionText.innerHTML = altText;
}

const myFunction = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "menüü") {
        x.className += " responsive";
    } else {
        x.className = "menüü";
    }
}

const protsendiList = n => {
    let list = [];
    samm = 100/(n-1);
    for (var i = 0; i < n; i++) {
        list.push(Math.round(i * samm));
    }
    return list;
}
const muudaProgressi = n => {
    /* võtab protsendilise väärtuse sisse. */
    const elem = document.getElementById("riba");
    elem.style.width = n + '%';
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
                `
                <div class="slaid">
                <div class="küsimus"> ${praeguneKüsimus.küsimus} </div>
                <div class="vastused"> ${vastused.join("")} </div>
                </div>`
            );
        });
        küsimustikuKast.innerHTML = väljund.join("");
    };

    const vastatud = () => {
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
        tulemusteKast.innerHTML = `You answered ${õigeid}/${minuKüsimused.length} correctly.`;
    };

    const vahetus = küsimuseNumber => {
        // praeguse slaidi teeme mitteaktiivseks
        slaidid[praeguneSlaid].classList.remove("praegune-slaid");
        // sisendiks antud slaidi teeme aktiivseks
        slaidid[küsimuseNumber].classList.add("praegune-slaid");
        // uuendame praeguse slaidi numbrit
        praeguneSlaid = küsimuseNumber;
        // kui oleme esimese küsimuse juures, peidame eelmise küsimuse nupu
        if (praeguneSlaid === 0) {
            eelmiseNupp.style.display = "none";
        } else {
            eelmiseNupp.style.display = "inline-block";
        }
        // analoogiline - kui oleme viimasel, siis pole järgmist.
        if (praeguneSlaid === slaidid.length-1) {
            järgmiseNupp.style.display = "none";
            vastamiseNupp.style.display = "inline-block";
        } /* peidame vastamise kui pole viimane */ else {
            järgmiseNupp.style.display = "inline-block";
            vastamiseNupp.style.display = "none";
        }
        muudaProgressi(protsentideList[praeguneSlaid]);
    };

    // abifunktsioonid, need ühendame nuppudele
    const järgmine = () => {
        vahetus(praeguneSlaid + 1);
    };
    const eelmine = () => {
        vahetus(praeguneSlaid - 1);
    };


    const küsimustikuKast = document.getElementById("küsimustik");
    const tulemusteKast = document.getElementById("tulemused");
    const vastamiseNupp = document.getElementById("vasta");
    const minuKüsimused = küsimused

    teeKüsimustik();

    /* lehtede lisamine */
    const eelmiseNupp = document.getElementById("eelmine");
    const järgmiseNupp = document.getElementById("järgmine");
    const slaidid = document.querySelectorAll(".slaid");
    let praeguneSlaid = 0;

    const protsentideList = protsendiList(slaidid.length);
    // näitame kohe oma esimese slaidi ette
    vahetus(0);

    vastamiseNupp.addEventListener("click", vastatud);
    eelmiseNupp.addEventListener("click", eelmine);
    järgmiseNupp.addEventListener("click", järgmine);
};