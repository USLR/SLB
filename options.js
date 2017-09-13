function save() {

    var textBox = document.getElementById("RepositoryURL")
    var url = textBox.value
    console.log(url)
    if (url == null) {
        url = "http://cryptic-plains-11632.herokuapp.com"
    } else if (url == "") {
        url = "http://cryptic-plains-11632.herokuapp.com";
    }
    chrome.storage.sync.set({
        repository: url,
      })
    chrome.storage.sync.get(function(items) {
        //document.getElementById('color').value = items.favoriteColor;
        //document.getElementById('like').checked = items.likesColor;
        console.log("current set:" + items.repository)
    });
}

function restore() {
    chrome.storage.sync.get({
        repository: 'http://cryptic-plains-11632.herokuapp.com',
      }, function(items) {
        //document.getElementById('color').value = items.favoriteColor;
        //document.getElementById('like').checked = items.likesColor;
        document.getElementById("RepositoryURL").value = items.repository
    });

}


document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click',
    save);