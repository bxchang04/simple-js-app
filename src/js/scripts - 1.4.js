alert('Hello world');

var favoriteFood = "Philly Cheesesteak";
document.write(favoriteFood);

var repository = [
    {
    name: "Bulbasaur",
    height: 0.7,
    types: ["grass", "poison"]
    },
    {
        name: "Squirtle",
        height: 0.5,
        types: ["water"]
    },
    {
        name: "Charizard",
        height: 1.7,
        types: ["fire", "flying"]
    }
];

for(var i = 0; i < repository[i].length; i++){
    if(repository[i].height > 1.5){
        document.write("<p>" + repository[i].name + "(" + repository[i].height + ") - Wow, that's big!" + "</p>");
    }
    else {
        document.write("<p>" + repository[i].name + "(" + repository[i].height + ")" + "</p>");
    }
}

repository.forEach(function(pokemon)){
    console.log(repository[pokemon]);
}
arstarst;
