/* Väga näiteline küsimustik hetkeks. Seda annab surmani muuta veel. */

(function() { // Niimoodi käivitatakse funktsioon kohe, kui see sisse lugeda.
    function teeKüsimustik() {
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
    const minuKüsimused = [{
        küsimus: "Kes on Trump?",
        vastused: {
            a: "Eesti peaminister",
            b: "Ameerika president",
            c: "Meemide müügimees"
        },
        õigeVastus: "b"
    }, {
        küsimus: "Kui palju on Trump väärt?",
        vastused: {
            a: "9 miljardit",
            b: "3 miljardit",
            c: "1 miljard"
        },
        õigeVastus: "b"
    }];
    teeKüsimustik();
    vastamiseNupp.addEventListener("click", vastatud);
})();