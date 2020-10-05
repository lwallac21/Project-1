$(document).ready(function () {
    console.log("ready!");

    // const mainWord = $("#main-word")
    // const storyWord = $("#story-word")
    // const getStory = $("#story-btn")
    let country;
    // let charNumber;
    let selectedAuthor;
    // let setting;
    // let displayMainWord;
    // let displayStoryWord;
    let verb;
    let adj1
    let adj2
    let adv
    let displayQuote;
    let main;
    let side;
    function getQuote() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://qvoca-bestquotes-v1.p.rapidapi.com/quote?author=" + selectedAuthor,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "qvoca-bestquotes-v1.p.rapidapi.com",
                "x-rapidapi-key": "a5a48389a8msh27522e02e6e556fp107f17jsn2d275ad0ff18"
            }
        }
        $.ajax(settings).done(function (response) {
            console.log(response);
            displayQuote = response.message;
            console.log(displayQuote);
        })
    };

    $(".quote").on("click", function () {
        selectedAuthor = $(this).attr("data-author");
        console.log(selectedAuthor);
        getQuote();
        $("#question-one").fadeOut(1000);
        $("#question-two").delay(1000).fadeIn(1000)
    });

    $(".num").on("click", function () {
        charNumber = $(this).attr("data-number")
        getCharacter()
        $("#question-two").fadeOut(1000)
        $("#question-three").delay(1000).fadeIn(1000)
        $("story-btn").delay(1000).fadeIn(1000)
    })

    $("#story-btn").on("click", function () {
        $("#question-three").fadeOut(1000)
        $("story-btn").fadeOut(1000)
        $("#final-story").delay(1000).fadeIn(1000)
        getWords()
    })

    function getCharacter() {
        $.ajax({
            url: 'https://randomuser.me/api/?nat=AU,BR,CA,DE,DK,ES,FI,FR,GB,IE,NO,NL,NZ,TR,US&results=' + charNumber,
            dataType: 'json',
            success: function (data) {

                // charDiv.append('<h1 id="dramatis-personae">')
                // $("#dramatis-personae").text("Dramatis Personae:")

                console.log(data)

                let response = data

                let length = response.results.length
                side = response.results[length-1].name.first
                let randomIndex = Math.floor(Math.random() * (length - 1))
                main = response.results[randomIndex].name.first
                setting = response.results[randomIndex].location.city + ', ' + response.results[randomIndex].location.country

                for (i = 0; i < length; i++) {

                    let name = response.results[i].name.first;
                    let age = response.results[i].dob.age
                    let from = response.results[i].location.state
                    let country  = response.results[i].location.country
                    console.log(name)
                    let p = $("<p>").text(name + " aged: " + age + " from " + from + ", " + country);
                    $("#dramatis-personae").append(p);
                }
                console.log(setting)
            }
        })
    };

    // function getStory() {
    //     let p = $("<p>")
    //     let b = $("<br>")
    //     $("#Story-Block").append($("<h2>").text("Dramatis Personae"))
    //     $("#Story-Block").append($(b + "<hr>" + b))
    //     $("#Story-Block").append(p.text("In " + adj1 + " " + setting + ", " + main + " " + adv1 + " " + "stands."))
    //     $("#Story-Block").append(p.text(name[0].first + ": " + quote))
    //     $("#Story-Block").append(p.text("What does " + name[1] + "think? What happens next? Finish your story!"))
    // }



    function getWords() {

        $.ajax({
            url: "https://api.datamuse.com/words?rel_jjb=" + $("#main-word").val()+"&mbp=adj",
            method: "GET",
            success: function (results) {
                console.log(results)
                let random = Math.floor(Math.random() * results.length)
                adj1 = results[random].word
                console.log("adj 1: " + adj1)
            }
        });

        $.ajax({
            url: "https://api.datamuse.com/words?rel_jjb=" + $("#story-word").val(),
            method: "GET",
            success: function (results) {
                console.log(results)
                let random = Math.floor(Math.random() * results.length)
                adj2 = results[random].word
                console.log("adj 2: "+adj2)
            }
        })

        $.ajax({
            url: "https://api.datamuse.com/words?rel_syn=think&p=v",
            method: "GET",
            success: function (results) {
                console.log(results)
                let random = Math.floor(Math.random() * results.length)
                verb = results[random].word
                console.log("verb: " + verb)
            }
        })
        $.ajax({
            url: "https://api.datamuse.com/words?ml=" + $("#story-word").val()+"&mdp=adv"+"&sp=*ly",
            method: "GET",
            success: function(results) {
                console.log(results)
                console.log("story-word value: " + $("#story-word").val())
                let random = Math.floor(Math.random() * results.length)
                adv = results[random].word
                console.log("adverb: " + adv)
                storyFinal()
            }
            
        })

    }
function storyFinal() {
    let p = $("<p style='font-style:italic;'>").text("In "+ adj1+ " " + setting + ", "  + main + " " + verb + "s. " 
    + main+ " " + "is " + adv + " "+ "talking to " + side + "."
    )
    let p1 = $("<p >").text(displayQuote)
    let p2 = $("<p id='speaker'>").text(main + ": " )
    $("#scene").append(p)
    console.log(p)
    $("#opening-line").append(p1)
    $("#opening-line").prepend(p2)
    $("#speaker").css("font-weight, bold")
    $("#speaker").addClass("quoteFont")
        }
    $("#get-writing").text("What does " + side + " do next? What literary shenanigans follow? Indeed, what are the rest of the characters doing? Get writing to find out!"
    );
    $("get-writing").delay(5000).fadeIn(1000);
});
// getCharacter()
// $.ajax({
//     url: 'https://randomuser.me/api/?results=' + charNumber,
//     dataType: 'json',
//     success: function (data) {
//         charDiv.append('<h1 id="dramatis-personae">')
//         $("#dramatis-personae").text("Dramatis Personae:")
//         console.log(data)
//         let response = data
//         let length = response.results.length
//         let randomIndex = Math.floor(Math.random() * length)
//         setting = response.results[randomIndex].location.city + ' ' + response.results[randomIndex].location.country
//         for (i = 0; i < length; i++) {
//             let name = response.results[i].name.first;
//             let age = response.results[i].dob.age
//             let from = response.results[i].location.state
//             let country = response.results[i].location.country
//             console.log(name)
//             let p = $("<p>").text(name + " aged: " + age + " from " + from + ", " + country);
//             charDiv.append(p);
//         }
//         console.log(setting)
//     }
// });