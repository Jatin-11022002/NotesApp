showNotes();

function showNotes() {
    let data = localStorage.getItem("data");
    if (data == null) {
        arr = [];
    } else {
        arr = JSON.parse(data);
    }

    let card = "";
    arr.forEach(function (element, index) {
        if(element.fav===true){
            card += `<div class="card-content"id=${index+1} >
        <h3 id=title${index+1} >${element.title} <img  class="fav" id="fav${index+1}" src="star.png"></h3>  
        <hr>
        <p id=body>${element.data}</p>
        <hr>
        <div class="btn-group">
        <button id = ${index + 1} onClick = deleteData(this.id-1)>Delete</button>
        <button id = ${index + 1} onClick = saveEvent(this.id-1)>Edit</button>
        </div>
    </div>`;
        }
        
    })
    let elem = document.getElementById('notes-card');
    if (arr.length != 0) {
        elem.innerHTML = card;
    } else {
        elem.innerHTML = "No Available Notes";
    }
    display();
    showFav();
}
function display(){
    arr.forEach(function (element, index) {
        if(element.fav===true){
            //console.log(`fav${index+1}`)
            let favicon=document.getElementById(`fav${index+1}`);
            favicon.style.display="block";
        }
    })
}

function showFav(){
    let cards=document.getElementsByClassName("card-content");
    Array.from(cards).forEach(function(card){
            card.addEventListener('mouseenter',function(){
                let favbtn = document.getElementById("favbtn");
            favbtn.value = this.id-1;
           // console.log(favbtn.value);
            //console.log(favbtn.value);
            })
        })        
     let favs=document.getElementsByClassName("fav");
     Array.from(favs).forEach(function(fav){
        fav.addEventListener('click',function(){
           // console.log(favbtn.value);
            arr[favbtn.value].fav=!(arr[favbtn.value].fav);
            localStorage.setItem("data", JSON.stringify(arr));   
            showNotes();
            //console.log(this.id);
        })
    }) 
    
}