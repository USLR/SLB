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
    for (var index = 0; index < json.length; index++) {
      var element = json[index];
      console.log(element)
      var parent = document.getElementsByClassName("game-stat-footer")
      var button = document.createElement("button")
      button.setAttribute("OnClick", "Roblox.GameLauncher.joinGameInstance(" + element.placeId + ", \"" + element.serverId + "\")")
      var text = document.createTextNode(element.serverId)
      button.appendChild(text)
      parent[0].appendChild(button)
    }
})