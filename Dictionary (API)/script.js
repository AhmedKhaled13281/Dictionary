const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var result = document.getElementById("result");
var sound = document.getElementById("sound");
var btn = document.getElementById("btn-search");

btn.addEventListener("click", function(){
    var inp = document.getElementById("inp-search").value;
    fetch(`${url}${inp}`)
        .then(function(response) {return response.json()})
        .then(function(data) {
           result.innerHTML = `
            <div class="word">
                <h3>${inp}</h3>
                <button onclick="playSound()">
                   <i class="fas fa-volume-up"></i> 
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

            sound.setAttribute("src" , `https:${data[0].phonetics[0].audio}`)

        })
        .catch(() => {
            result.innerHTML = `<h3 class="err"> Couldn't Find The Word </h3>`;
        })

});
function playSound(){
    sound.play(); 
}