$(document).ready(function () {
    console.log("ready!");

    let speaking;
    let selectedAuthor;
    let verb;
    let adj1
    let adv
    let displayQuote;
    let main;
    let side;
//Here we eliminate the ability of user to put in more than one word to text inputs
    $("input#story-word").on({
        keydown: function(e) {
          if (e.which === 32)
            return false;
        },
        change: function() {
          this.value = this.value.replace(/\s/g, "");
        }
      });

      $("input#main-word").on({
        keydown: function(e) {
          if (e.which === 32)
            return false;
        },
        change: function() {
          this.value = this.value.replace(/\s/g, "");
        }
      });


// on click functions
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

//define function for the first line of dialogue
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

//get character names, ages, and places
    function getCharacter() {
        $.ajax({
            url: 'https://randomuser.me/api/?nat=AU,BR,CA,DE,DK,ES,FI,FR,GB,IE,NO,NL,NZ,TR,US&results=' + charNumber,
            dataType: 'json',
            success: function (data) {

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

// get words for sentences in story details and continue
    function getWords() {

        $.ajax({
            "async": false,
            "crossDomain": true,
            url: "https://api.datamuse.com/words?ml=" + $("#story-word").val()+"&mdp=adj",
            method: "GET",
            success: function (results) {
                console.log(results)
                let random = Math.floor(Math.random() * 3)
                adj1 = results[random].word
                console.log("adj 1: " + adj1)
            }
        });

        $.ajax({
            "async": false,
            "crossDomain": true,
            url: "https://api.datamuse.com/words?rel_syn=think&mdp=v",
            method: "GET",
            success: function (results) {
                console.log(results)
                let random = Math.floor(Math.random() * results.length)
                verb = results[random].word
                console.log("verb: " + verb)
            }
        })
        $.ajax({
            "async": false,
            "crossDomain": true,
            url: "https://api.datamuse.com/words?ml=" + $("#main-word").val()+"&mdp=adv"+"&sp=*ly",
            method: "GET",
            success: function(results) {
                console.log(results)
                adv = results[0].word
                console.log("adverb: " + adv)
            }
            
        })
        $.ajax({
            "async": false,
            "crossDomain": true,
            url: "https://api.datamuse.com/words?ml=speak&sp=*ing",
            method: "GET",
            success: function (results) {
                console.log(results)
                let random = Math.floor(Math.random() * results.length)
                speaking = results[random].word
                console.log("speaking: " + speaking)
                storyFinal()
            }
        })

    }
//final function for display
function storyFinal() {
    let p = $("<p style='font-style:italic;'>").text("In "+ adj1+ " " + setting + ", "  + main + " " + verb + "s. " 
    + main+ " " + "is " + adv + " "+ speaking + " to " + side + "."
    )
    let p1 = $("<p class='quoteFont'>").text(displayQuote)
    let p2 = $("<p id='speaker' style='font-weight: bold;'>").text(main + ": " )
    $("#scene").append(p)
    console.log(p)
    $("#opening-line").append(p1)
    $("#opening-line").prepend(p2)    
    $("#get-writing").append("What does " + side + " do next? What literary shenanigans follow? Indeed, what are the rest of the characters doing? Get writing to find out!"
    );
    $("#end").delay(5000).fadeIn(1000);
}
});


// Final validation to be added on Monday Night (10/5)
    //We need to have a modal pop up if any of the word variable (adv, adj, verb, etc) are undefined
    // not sure which function to put it in, maybe storyFinal, but basically:
        //1:A modal should pop up to say "Hmmmmm, one of your words wasn't right."
        //2:On close of the modal, either reload the page or stop the function for the appendation to the final page
        //3:Ideally it would be the latter, but we just need to make sure that the word variables values will be overwritten