<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
    <link rel=stylesheet type=text/css href="style.css">
    <link rel="icon" href="https://apprecs.org/ios/images/app-icons/256/29/1005014313.jpg">
    <title>HS Card Searcher</title>
</head>
<body onload="getLegendaries()">
    <div id="output">
        <section class="form">
        <input class="input" id="text" value="" placeholder="Card Name">
        <a onclick="searchForCard(document.querySelector('#text').value)" id="submit-button" class="button is-link">Search</a>
            <div v-if="error" class="notification is-danger">
              Error: Card not found!
            </div>
            <p class="is-size-7"><br>SUGGESTIONS</p>
            <div class="suggestions">
                  <button id="suggestion-0" v-on:click="updateSuggestions" v-bind:value="suggest[0].cardId" class="tag is-link">{{ suggest[0].name }}</button>
                  <button id="suggestion-1" v-on:click="updateSuggestions" v-bind:value="suggest[1].cardId" class="tag is-link">{{ suggest[1].name }}</button>
                  <button id="suggestion-2" v-on:click="updateSuggestions" v-bind:value="suggest[2].cardId" class="tag is-link">{{ suggest[2].name }}</button>
              </div>
        </section>

        <hr>

        <section class="content">
            <h3 class="title is-3">{{ name || "No Name" }}</h3>
            <span class="tag is-primary">{{ type || "No type" }}</span>
            <span class="tag is-danger">{{ rarity || "No rarity" }}</span>
            <span class="tag is-warning">{{ faction || playerClass || "No class" }}</span>
            <span class="tag is-info">{{ race || "No race" }}</span><br>
            
            <!--Images-->
            <img v-if="img" v-bind:src="img" draggable="false">
            <img v-if="imgGold" v-bind:src="imgGold" draggable="false">
            
            <img v-if="!img" src="http://hearth-static.tappedout.net/ht-cards/basic/skele11/default_I6f5Wo6.png" draggable="false">
            <img v-if="!imgGold" src="http://hearth-static.tappedout.net/ht-cards/basic/skele11/gold_YYwW1Gu.gif" draggable="false">

            <h4 class="title is-4">Flavor Text</h4>
            <p class="">{{ flavor }}</p><br>
            <h4 class="title is-4">Key Stats</h4>
            <code>Attack: {{ attack || "N/A" }}</code>
            <code>Health: {{ health || "N/A" }}</code>
            <code>Durability: {{ durability || "N/A" }}</code>
            <code>Cost: {{ cost || "N/A" }}</code>
            <code>Mechanics: <span v-if="!mechanics || !mechanics[0]">N/A</span><span v-for="(mechanic, index) in mechanics">{{ mechanic.name+(index>=mechanics.length-1 ? "" : ", ") }}</span></code>
            <br><br>
            <h4 class="title is-4">More Info</h4>
            <b>Artist:</b> {{ artist || "None" }}
            <br>
            <b>Card set:</b> {{ cardSet || "None" }}
            <br>
            <b>Collectible:</b> {{ collectible || "None" }}
            <br>
            <b>Card ID:</b>  {{ cardId || "None" }}
            <br>
            <b>Card Text:</b>  {{ text || "None" }}
            <br>
            <b>How to get:</b>  {{ howToGet || "Craft with arcane dust or open in packs" }}
            <br>
            <b>How to get golden:</b>  {{ howToGetGold || "Craft with arcane dust or open in packs" }}
            <br><br>
        </section>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.15/dist/vue.js"></script>
    <script src="script.js"></script>
</body>