var cardSearch = document.querySelector("#text");

var page = new Vue({
    el: "#output",
    data: {
        "legendaries": [],
        "hints": [],
        "guessHistory": [],
        "currentCard": {
            name: "Ysera",
            cardId: "EX1_572"
        },
        "cardId": "EX1_572",
        "name": "Ysera",
        "error": false,
        "cardSet": "Classic",
        "type": "Minion",
        "faction": "Neutral",
        "rarity": "Legendary",
        "mechanics": [],
        "cost": 9,
        "attack": 4,
        "health": 12,
        "durability": "",
        "text": "At the end of your turn, add a Dream Card to your hand.",
        "flavor": "Ysera rules the Emerald Dream.  Which is some kind of green-mirror-version of the real world, or something?",
        "artist": "Gabor Szikszai",
        "collectible": true,
        "elite": true,
        "race": "Dragon",
        "howToGet": "",
        "howToGetGold": "",
        "img": "http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_572.png",
        "imgGold": "http://wow.zamimg.com/images/hearthstone/cards/enus/animated/EX1_572_premium.gif",
        "locale": "enUS"
    },
    methods: {
        guess: function (event) {
            this.guessHistory.unshift({
                correct: null,
                userAnswer: null,
                trueAnswer: null,
                hints: null
            });

            var userInput = document.querySelector("#text");
            if (userInput.value.toLowerCase() == this.currentCard.name.toLowerCase()) {
                this.guessHistory[0].correct = "notification is-success";
            } else {
                this.guessHistory[0].correct = "notification is-danger";
            }

            this.guessHistory[0].userAnswer = userInput.value;
            this.guessHistory[0].trueAnswer = this.currentCard.name;
            this.guessHistory[0].hints = this.hints.length;

            console.log(userInput.value.toLowerCase() + " vs " + this.currentCard.name.toLowerCase())
            this.newCard();
            this.hints = [];
        },
        newCard: function (event) {
            this.currentCard = page.legendaries[Math.floor(Math.random() * (page.legendaries.length - 1))];
            searchForCard(this.currentCard.cardId);
        },
        getHint: function (event) {
            if (this.hints.length == 0) {
                this.hints.push("Attack: " + this.attack);
            } else if (this.hints.length == 1) {
                this.hints.push("Cost: " + this.cost);
            } else if (this.hints.length == 2) {
                this.hints.push("Card Text: " + this.text);
            }
        }
    }
});

function searchForCard(cardName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + cardName, true);

    //Public Mashape API key, but you should just get your own, dude.
    xhr.setRequestHeader("X-Mashape-Key", "CWKtZuPQTgmsh67nhgCICDrm33Hqp1DiamDjsnRJFtoAyyiZBV");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cardInfo = JSON.parse(this.responseText)[0];
            console.log(cardInfo);
            Vue.nextTick(function () {
                page["cardId"] = cardInfo.cardId;
                page["name"] = cardInfo.name;
                page["cardSet"] = cardInfo.cardSet;
                page["type"] = cardInfo.type;
                page["faction"] = cardInfo.faction;
                page["rarity"] = cardInfo.rarity;
                page["mechanics"] = cardInfo.mechanics;
                page["playerClass"] = cardInfo.playerClass;
                page["race"] = cardInfo.race;
                page["cost"] = cardInfo.cost;
                page["attack"] = cardInfo.attack;
                page["health"] = cardInfo.health;
                page["durability"] = cardInfo.durability;
                page["text"] = cardInfo.text;
                page["flavor"] = cardInfo.flavor;
                page["artist"] = cardInfo.artist;
                page["collectible"] = cardInfo.collectible;
                page["elite"] = cardInfo.elite;
                page["race"] = cardInfo.race;
                page["howToGet"] = cardInfo.howToGet;
                page["howToGetGold"] = cardInfo.howToGetGold;
                page["img"] = cardInfo.img;
                page["imgGold"] = cardInfo.imgGold;
                page["locale"] = cardInfo.locale;
                console.log(page.data);
            });
        } else if (this.status == 404 && this.readyState == 4) {
            alert("Card not found!");
        }
    };

    xhr.send();
};

function getLegendaries() {
    var legendaryList = [],
        cards = [];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/Legendary", true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cards = JSON.parse(this.responseText);
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].cardSet != "Credits" && cards[i].flavor != "" && cards[i].cardSet != "Tavern Brawl") {
                    legendaryList.push({
                        name: cards[i].name,
                        cardId: cards[i].cardId
                    });
                }
            }

            Vue.nextTick(function () {
                page.legendaries = legendaryList;
                page.currentCard = page.legendaries[Math.floor(Math.random() * (page.legendaries.length - 1))]
                searchForCard(page.currentCard.cardId);
                console.log(page.legendaries);
            });
        }
    }
    xhr.setRequestHeader("X-Mashape-Key", "cc5lyxTIb3mshFZSOgzdFR2GYcbup1MPjCRjsnYMzF7rWktlK7");
    xhr.send();
}
