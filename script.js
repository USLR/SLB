if (document.URL.includes("games/")) {
  console.log("game page detected")
  var headerParse = document.URL.split("/")
  //console.warn(headerParse)
  var gid = headerParse[4]
  console.log("gid: " + gid)
  var req = new XMLHttpRequest();
  if (gid != null) {
    chrome.runtime.sendMessage({game_id: gid}, null, function(response) {})
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendFunc){
    // filtered servers
    console.log(request)
    var json = JSON.parse(request)
    // we have servers
    // add buttons
    var parent = document.getElementsByClassName("game-stat-footer")  
    var titleNode = document.createElement("H1")
    var titleText = document.createTextNode("SLS Server List")
    titleNode.appendChild(titleText)
    var titlebreak1 = document.createElement("br")
    var titlebreak2 = document.createElement("br")
    parent[0].appendChild(titlebreak1)
    parent[0].appendChild(titleNode)
    parent[0].appendChild(titlebreak2)
    for (var index = 0; index < json.length; index++) {
      var element = json[index];
      console.log(element)
      var button = document.createElement("button")
      button.setAttribute("OnClick", "Roblox.GameLauncher.joinGameInstance(" + element.placeId + ", \"" + element.serverId + "\")")
      var linebreak = document.createElement("br")
      var text = document.createTextNode("Press to join server! (amount of players: " + element.registeredPlayerCount + ")")
      button.appendChild(text)
      parent[0].appendChild(button)
      parent[0].appendChild(linebreak)      
    }
})