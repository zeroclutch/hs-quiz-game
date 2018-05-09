var page = new Vue({
	el: "#output",
	data: {
		"userText": "",
		"filter": "legendary",
		"cards": [],
		"hints": [],
		"guessHistory": [],
		"card": {
			name: "Ysera",
			cardId: "EX1_572",
			flavor: "",
			"cost": 9,
			"attack": 4,
			"health": 12,
			"durability": "",
			"text": "At the end of your turn, add a Dream Card to your hand.",
			"flavor": "***** rules the Emerald Dream.  Which is some kind of green-mirror-version of the real world, or something?",
		}
	},
	methods: {
		retrieveCards: function (filter) {
			if(!filter) filter = this.filter
			filter = filter.toLowerCase();
			const file = "dist/cards/" + filter + ".json";

			var xhr = new XMLHttpRequest(),
				cards = [];
			xhr.open("GET", file, false);
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					cards = JSON.parse(this.responseText);
				}
			}
			xhr.send();
			this.cards = cards;
			this.newCard();
		},
		guess: function (event) {
			this.guessHistory.unshift({
				correct: null,
				userAnswer: null,
				trueAnswer: null,
				hints: null
			});
			
			String.prototype.clean = function() {
				return this
					.replace(" ", "")
					.replace("the", "")
					.replace(",", "")
					.replace("'", "")
					.replace("‘", "")
					.replace("’", "")
			}
			
			var userInput = document.querySelector("#text");
			if (userInput.value.toLowerCase().clean() == this.card.name.toLowerCase().clean() && this.hints.length < 3 /*awww*/ ) {
				this.guessHistory[0].correct = "notification is-success";
			} else if (userInput.value.toLowerCase().clean() == this.card.name.toLowerCase().clean() && this.hints.length == 3) {
				this.guessHistory[0].correct = "notification is-warning";
			} else {
				this.guessHistory[0].correct = "notification is-danger";
			}

			this.guessHistory[0].userAnswer = userInput.value;
			this.guessHistory[0].trueAnswer = this.card.name;
			this.guessHistory[0].hints = this.hints.length;
			
			this.newCard();
			this.hints = [];
			userInput.value = "";
		},
		newCard: function (event) {
			this.card = this.cards[Math.floor(Math.random() * (page.cards.length - 1))];
			this.censorFlavorText()
		},
		getHint: function (event) {
			if (this.hints.length == 0) {
				this.hints.push("<b>Cost: </b>" + this.card.cost);
			} else if (this.hints.length == 1) {
				this.hints.push("<b>Stats: </b>" + (this.card.attack || "None") + "/" + (this.card.health || this.card.durability || "None"));
			} else if (this.hints.length == 2) {
				this.hints.push("<b>Card Text: </b>" + this.card.text.replace("\\n", " ")
							.replace("_", "")
							.replace("\_", "")
							.replace("[x]", ""));
			}
		},
		censorFlavorText: function () {
			//Removes name from flavor text
			if (this.card.flavor) {
				this.card.flavor = this.card.flavor.replace(this.card.name, "*".repeat(this.card.name.length));
			}
		},
		restartGame: function () {
			this.guessHistory = [];
			this.card.flavor = "Loading..."
			this.hints = [];
			this.retrieveCards();
		}
	}
});
page.retrieveCards();