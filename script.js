var cardSearch = document.querySelector("#text");

var page = new Vue({
    el: "#output",
    data: {
        "legendaries": [],
        "suggest": [],
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
        "durability": 12,
        "text": "At the end of your turn, add a Dream Card to your hand.",
        "flavor": "Ysera rules the Emerald Dream.  Which is some kind of green-mirror-version of the real world, or something?",
        "artist": "Gabor Szikszai",
        "collectible": true,
        "elite": true,
        "race": "Dragon",
        "img": "http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_572.png",
        "imgGold": "http://wow.zamimg.com/images/hearthstone/cards/enus/animated/EX1_572_premium.gif",
        "locale": "enUS"
    },
    methods: {
        updateSuggestions: function(event) {
            var suggestionId = parseFloat(event.target.id.split("-")[1]);
            
            searchForCard(event.target.value);
            this.suggest[suggestionId] = page.legendaries[Math.floor(Math.random()*(page.legendaries.length-1))];
            event.target.innerHTML = this.suggest[suggestionId].name;
        }
    }
});

function searchForCard(cardName) {
    if(!cardName){
        cardName = cardSearch.value;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards/"+cardName, true);
    
    xhr.setRequestHeader("X-Mashape-Key", "cc5lyxTIb3mshFZSOgzdFR2GYcbup1MPjCRjsnYMzF7rWktlK7");
    //xhr.setRequestHeader("Accept", "application/json");
    
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            var cardInfo = JSON.parse(this.responseText)[0];
          console.log(cardInfo);
          Vue.nextTick(function(){
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
            page["duability"] = cardInfo.durability;
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
      } else if(this.status == 404 && this.readyState == 4) {
            alert("Card not found!");
        }
    };
    
    xhr.send();
}; 

function getLegendaries() {
    var legendaryList = [], cards = [];
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/Legendary", true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cards = JSON.parse(this.responseText);
        for(var i = 0; i < cards.length; i++) {
            if(cards[i].cardSet !== "Credits") {
                legendaryList.push({name: cards[i].name, cardId: cards[i].cardId});
            } 
        }
    
        Vue.nextTick(function(){
            page.legendaries = legendaryList;
            page.suggest = [page.legendaries[208],page.legendaries[165],page.legendaries[114]];
            console.log(page.legendaries);
        });
      }
    }
    xhr.setRequestHeader("X-Mashape-Key", "cc5lyxTIb3mshFZSOgzdFR2GYcbup1MPjCRjsnYMzF7rWktlK7");
    xhr.send();   
}
