// nadefinujeme globální proměnné
// ty jsou pak použitelné kdekoliv v programu
let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
let mince, minceX, minceY, minceSirka, minceVyska;
let score, pocetMinci;

// tato funkce se spustí při načtení stránky
// tj. ve chvíli, kdy je načtené komplet HTML, CSS a všechny obrázky a zvuky
function priNacteniStranky() {

	// do globálních proměnných si uložíme odkaz na objekty panáčka, mince a score,
	// abychom je nemuseli při každém použití znovu na stránce hledat pomocí document.querySelector
	panacek = document.querySelector('#panacek');
	mince = document.querySelector('#mince');
	score = document.querySelector('#score');

	// nastavíme výchozí hodnotu pro score
	pocetMinci = 0;

	// zjistíme šířku a výšku panáčka
	panacekSirka = panacek.width;
	panacekVyska = panacek.height;
	// a umístíme panáčka do středu okna
	panacekX = Math.round(window.innerWidth / 2 - panacekSirka / 2);
	panacekY = Math.round(window.innerHeight / 2 - panacekVyska / 2);
	// umístíme panáčka na startovní pozici
	umistiPanacka();

	// zjistíme šířku a výšku mince
	minceSirka = mince.width;
	minceVyska = mince.height;
	// a vygenerujeme první minci na náhodné pozici
	novaMince();

}

// funkce, která umístí panáčka na jeho souřadnice
// tj. nastaví jeho style.left a style.top na hodnoty panacekX, panacekY
function umistiPanacka() {
	panacek.style.left = panacekX + 'px';
	panacek.style.top = panacekY + 'px';
}

// funkce pro nahodné vygenerování nové pozice mince
// a umístění mince na tyto souřadnice
function novaMince() {
	minceX = Math.round(Math.random() * (window.innerWidth - minceSirka));
	minceY = Math.round(Math.random() * (window.innerHeight - minceVyska));
	mince.style.left = minceX + 'px';
	mince.style.top = minceY + 'px';
}

// tato funkce se zavolá při stisku klávesy
// do proměnné "udalost" se vloží objekt s parametry události¨
// kde lze najít např. i vlastnost "key",
// která obsahuje znak stisknuté klávesy
function priStiskuKlavesy(udalost) {

	// šipka vlevo
	if (udalost.key === 'ArrowLeft') {
		panacekX -= 10;
		if (panacekX < 0) {
			panacekX = 0;
		}
		panacek.src = 'obrazky/panacek-vlevo.png';
	}

	// šipka vpravo
	if (udalost.key === 'ArrowRight') {
		panacekX += 10;
		if (panacekX + panacekSirka > window.innerWidth) {
			panacekX = window.innerWidth - panacekSirka;
		}
		panacek.src = 'obrazky/panacek-vpravo.png';
	}

	// šipka nahoru
	if (udalost.key === 'ArrowUp') {
		panacekY -= 10;
		if (panacekY < 0) {
			panacekY = 0;
		}
		panacek.src = 'obrazky/panacek-nahoru.png';
	}

	// šipka dolů
	if (udalost.key === 'ArrowDown') {
		panacekY += 10;
		if (panacekY + panacekVyska > window.innerHeight) {
			panacekY = window.innerHeight - panacekVyska;
		}
		panacek.src = 'obrazky/panacek.png';
	}

	// panáčka umistíme na nově vypočítanou pozici
	umistiPanacka();

	// otestujeme kolizi panáčka s mincí
	otestujKolizi();

}

// fuknce pro otestování kolize panáčka s mincí
function otestujKolizi() {
	// otestujeme, zda nedošlo ke kolizi s mincí
	// toto je nejjednodušší a nejrychlejší test
	// na průnik dvou obdélníků
	if (!(panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
		// obdélníky se překrývají, mimozemšťan našel minci

		// zvýšíme skóre
		zvysScore();

		// posuneme minci na novou náhodnou pozici
		novaMince();
	}
}

// funkce pro zvýšení skóre
function zvysScore() {

	// zvýšíme skóre o 1
	pocetMinci++;

	// vypíšeme skóre do textu na obrazovce
	score.innerText = pocetMinci;

	// otestujeme, zda už hráč nemá 5 bodů
	if (pocetMinci === 5) {
		// zobrazíme vítěznou hlášku
		alert('Vyhrála jsi tuhle super hru!');
	}
}