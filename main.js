const parentUl = document.getElementsByTagName("ul")[0]

let addClothingButton = document.getElementById("add-clothing")
let welcome = document.querySelector("h3")
welcome.insertAdjacentElement("afterend", addClothingButton)


function getClothing(){
    //fetch always returns a promise
    fetch("http://localhost:3000/clothing")
    //want to turn response into json data we can read
    .then(function(body) {return body.json() })
    //now I have the data in correct form from dj.json file -> my clothing items
        //calling the data "clothingArray" since thats what its returning
    .then(function (clothingArray){
        clothingArray.forEach(addItem)
    })
}
getClothing()

document.body.addEventListener("click", function(event){
    if(event.target.dataset.purpose === "form"){
        let form = document.createElement("form")
        form.innerHTML=`
            <input type="text" placeholder="Name" name="name" />
            <input type="text" placeholder="Image" name="image" />
            <input type="submit"/>
        `
        addClothingButton.remove()
        welcome.insertAdjacentElement("afterend", form)
        // other option is - > this.replaceChild(form,button)
        form.addEventListener("submit", function(event){
            //grabbing inputs from form here
            event.preventDefault()
            let item = {
                name: event.target.name.value,
                image: event.target.image.value
            }
            addItem(item)
            //making form disappear, bring back button
            form.remove()
            welcome.insertAdjacentElement("afterend", addClothingButton)
        })
    }
})

function addItem(item){
    let li= document.createElement("li")
    li.className="clothing-item"
    li.innerHTML=`
    <h3>${item.name}</h3>
        <h4>Score: <span>0</span></h4>
        <img alt='' src='${item.image}' />
        <button class='up-vote' data-purpose="increase">Up Vote</button>
        <button class='down-vote' data-purpose="decrease">Down Vote</button>
        <button class='delete-item' data-purpose="delete-item">Remove</button>
    `
    parentUl.append(li)
}


function changeScore(event){
    let parentLi= event.target.parentNode
    let span = parentLi.querySelector("span")
    let score = event.target.dataset.purpose === "increase" ? parseInt(span.innerText) + 1 : parseInt(span.innerText) -1;
    span.innerText = score
}

function removeItem(event){
    let parentLi= event.target.parentNode;
    parentLi.remove()
}


parentUl.addEventListener("click", function(event){
    if (event.target.dataset.purpose === 'delete-item'){
        removeItem(event)
    } else {
        changeScore(event)
    }
})
