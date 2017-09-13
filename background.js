
chrome.runtime.onMessage.addListener(
	function (request, sender, sendFunc){
        chrome.storage.sync.get({
            repository: 'http://cryptic-plains-11632.herokuapp.com',
          }, function(items) {
            var link = items.repository
            console.log(link)
            console.log(request.game_id)
            var req = new XMLHttpRequest();
            console.log("req= " + link)
            req.open("GET", link + "/filteredgetallservers?game_id=" + request.game_id)
            req.addEventListener("load", function(e) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, req.responseText, function(response) {});  
                });
            }, false)
            req.send()
        });
    }
)
