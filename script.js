const charDiv = $("#display-characters")
let charNumber;
let selectedAuthor = "author=Charlie%20Sheen"
let setting


function getCharacter() {
    charNumber = $("#character-query option:selected").attr("value")
    console.log(charNumber)
}



getCharacter()
$.ajax({
    url: 'https://randomuser.me/api/?results=' + charNumber,
    dataType: 'json',
    success: function (data) {
        charDiv.append('<h1 id="dramatis-personae">')
        $("#dramatis-personae").text("Dramatis Personae:")
        console.log(data)
        let response = data
        let length = response.results.length
        let randomIndex = Math.floor(Math.random() * length)
        setting = response.results[randomIndex].location.city + ' ' + response.results[randomIndex].location.country
        for (i = 0; i < length; i++) {
            let name = response.results[i].name.first;
            let age = response.results[i].dob.age
            let from = response.results[i].location.state
            let country = response.results[i].location.country
            console.log(name)
            let p = $("<p>").text(name + " aged: " + age + " from " + from + ", " + country);
            charDiv.append(p);
        }
        console.log(setting)
    }
});

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://qvoca-bestquotes-v1.p.rapidapi.com/quote?" + selectedAuthor,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "qvoca-bestquotes-v1.p.rapidapi.com",
		"x-rapidapi-key": "a5a48389a8msh27522e02e6e556fp107f17jsn2d275ad0ff18"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
