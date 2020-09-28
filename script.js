let genreName
let info;
let genreItems
const genres = $("#genre")
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added",
    "method": "GET"
}
$.ajax(settings).done(function (response) {
    console.log(response);
    info=response;
    $("#release").text(info.results[0].released)
    console.log($("#release").text);
    for (i=0; i<info.length; i++) {
        genreItems = info.results[i].genres; {
                for(j=0; j<genreItems.length; j++) {
                     genreName = genreItems[j].name}
        console.log(genreName)

    }
}});
