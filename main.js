let addButton = document.getElementById('add-clothing');
addButton.addEventListener("click", addClothing);

function addClothing(){
    console.log('ADD THE CLOTHING')
    alert("Add your item")
    //brings you to form to add 
}

let removeButton = document.getElementById('remove-clothing');
removeButton.addEventListener("click", removeClothing);

function removeClothing(){
    console.log('REMOVE THE CLOTHING')
    //puts all clothing items with check box to click
}

const parentUl = document.getElementsByTagName("ul")[0]
parentUl.addEventListener("click", function(event){
    if(event.target.dataset.purpose === "increase"){
        increaseScore(event)
    }
})

// let upVoteButtons = document.getElementsByClassName("up-vote");
// let upVoteArray = Array.from(upVoteButtons)

// upVoteArray.forEach(addScore);

// function addScore(button){
//     button.addEventListener("click", increaseScore)
// }

function increaseScore(event){
    let parentLi= event.target.parentNode
    let span = parentLi.querySelector("span")
    let score = parseInt(span.innerText) + 1
    span.innerText = score
}