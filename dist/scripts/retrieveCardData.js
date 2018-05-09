const filters = ["qualities/Free","qualities/Common","qualities/Rare","qualities/Epic","qualities/Legendary"];
function getCards(filter) {
	console.log(filter);
	var legendaryList = [],
		cards = [];

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + filter, true);
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			cards = JSON.parse(this.responseText);
			for (var i = 0; i < cards.length; i++) {
				if (cards[i].cardSet != "Credits" && cards[i].flavor && cards[i].cardSet != "Tavern Brawl") {
					legendaryList.push({
						name: cards[i].name,
						cardId: cards[i].cardId,
						flavor: cards[i].flavor,
						text: cards[i].text,
						attack: cards[i].attack,
						health: cards[i].health,
						durability: cards[i].durability,
						cost: cards[i].cost
					});
				}
			}
			console.log(JSON.stringify(legendaryList))
		}
	}
	xhr.setRequestHeader("X-Mashape-Key", "cBJVQadwctmshKyEg5Y4zMulXDe2p1dTVu4jsnDrioB7ZmIXeJ"); //Not a real key
	xhr.send();
}