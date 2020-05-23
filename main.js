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
        <h4>Likes: <span>${item.likes}</span></h4>
        <img alt='' src='${item.image}' />
        <button class='up-vote' data-purpose="increase" data-id=${item.id} data-likes=${item.likes}>Up Vote</button>
        <button class='down-vote' data-purpose="decrease" data-id=${item.id}>Down Vote</button>
        <button class='delete-item' data-purpose="delete-item"  data-id=${item.id}>Remove</button>
    `
    parentUl.append(li)
}

//patch needs specific id
function increaseLikes(id, likes){
    console.log(id, likes)
    fetch(`http://localhost:3000/clothing/${id}`, {
        method: "PATCH",
        headers: {
            "content-type" : "application/json",
            accepts: "application/json"
        },
        body: JSON.stringify({likes: likes})
    })
    
}

function changeScore(event){
    let parentLi= event.target.parentNode
    let span = parentLi.querySelector("span")
    let score = event.target.dataset.purpose === "increase" ? parseInt(span.innerText) + 1 : parseInt(span.innerText) -1;
    event.target.dataset.likes = score
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
        increaseLikes(event.target.dataset.id, event.target.dataset.likes)
    }
})
