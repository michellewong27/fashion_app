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

function increaseScore(event){
    let parentLi= event.target.parentNode
    let score = parentLi.querySelector("span").innerText
    score = parseInt(score) + 1
    parentLi.querySelector("span").innerText = score
}

let array = Array.from(document.getElementsByClassName("up-vote"));

array.forEach(addScore);

function addScore(button){
    button.addEventListener("click", increaseScore)
}