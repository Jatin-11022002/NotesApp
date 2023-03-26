console.log("working");
showNotes();


let addNote = document.getElementById('addNoteBtn');
let saveBtn=document.getElementById("saveNoteBtn");
addNote.addEventListener('click', function () {
    let textArea = document.getElementById('textarea');
    let title = document.getElementById("title");
    let data = localStorage.getItem("data");

    if (data == null) {
        arr = [];
    } else {
        arr = JSON.parse(data);
    }
    
    var obj = {
        "title": title.value,
        "data": textArea.value,
        "fav":false,
        "pin":false
    };

    arr.push(obj);
    localStorage.setItem("data", JSON.stringify(arr));
    textArea.value = "";
    title.value = "";
    showNotes();
})

function showNotes() {
    let data = localStorage.getItem("data");
    if (data == null) {
        arr = [];
    } else {
        arr = JSON.parse(data);
    }
    let card = "";
    let list=document.getElementById("dropdown");
    let property=list.options[list.selectedIndex].value;
    console.log(property);
    if(property!="all"){
        // console.log(arr.filter(function(element){
        //     return element[property]==true;
        // }));
        arr.filter(function(element){
            return element[property]==true;
        }).forEach(function (element, index) { 
            card += `<div class="card-content"id=${index+1} >
            <h3 id=title${index+1} >${element.title} <img class="fav" onclick="fav_btn(${index})" id="fav${index+1}" src="star.png"><img  onclick="fav_btn(${index})" class="not-fav" id="notfav${index+1}" src="unfav.png"> <img class="pin" onclick="pin_btn(${index})" id="pin${index+1}" src="pin.png"> <img class="unpin" onclick="pin_btn(${index})" id="unpin${index+1}" src="unpin.png"></h3>  
            <hr>
            <p id=body>${element.data}</p>
            <hr>
            <div class="btn-group">
            <button id = ${index + 1} onClick = deleteData(this.id-1)>Delete</button>
            <button id = ${index + 1} onClick = saveEvent(this.id-1)>Edit</button>
            </div>
        </div>`;
     
        
        })
    }
    else{
        arr.forEach(function (element, index) { 
            card += `<div class="card-content"id=${index+1} >
            <h3 id=title${index+1} >${element.title} <img class="fav" onclick="fav_btn(${index})" id="fav${index+1}" src="star.png"><img  onclick="fav_btn(${index})" class="not-fav" id="notfav${index+1}" src="unfav.png"> <img class="pin" onclick="pin_btn(${index})" id="pin${index+1}" src="pin.png"> <img class="unpin" onclick="pin_btn(${index})" id="unpin${index+1}" src="unpin.png"></h3>  
            <hr>
            <p id=body>${element.data}</p>
            <hr>
            <div class="btn-group">
            <button id = ${index + 1} onClick = deleteData(this.id-1)>Delete</button>
            <button id = ${index + 1} onClick = saveEvent(this.id-1)>Edit</button>
            </div>
        </div>`;
     
        
        })
    }
        
    
    
    let elem = document.getElementById('notes-card');
    if (arr.length != 0) {
        elem.innerHTML = card;
    } else {
        elem.innerHTML = "No Available Notes";
    }
    
    arr.forEach(function (element, index) {
        let favicon=document.getElementById(`fav${index+1}`);
        let notfavicon=document.getElementById(`notfav${index+1}`);
            if(element.fav===true){
               // console.log(element);
                favicon.style.display="block";
                notfavicon.style.display="none";
            }else{
                favicon.style.display="none";

            }
        })

        arr.forEach(function (element, index) {
            let pinicon=document.getElementById(`pin${index+1}`);
            let unpinicon=document.getElementById(`unpin${index+1}`);
                if(element.pin===true){
                   // console.log(element);
                    pinicon.style.display="block";
                    unpinicon.style.display="none";
                }else{
                    pinicon.style.display="none";
    
                }
            })
}


function deleteData(index) {
    let data = localStorage.getItem("data");
    if (data == null) {
        arr = [];
    } else {
        arr = JSON.parse(data);
    }
    arr.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(arr));
    showNotes();
}
function saveEvent(index){
    addNote.style.display="none";
    saveBtn.style.display="block"
    let unique = document.getElementById("unique");
    unique.value = index;
    let textArea = document.getElementById('textarea');
    let title = document.getElementById("title");
    title.value=arr[index].title;
    textArea.value=arr[index].data;
}
saveBtn.addEventListener('click',function(){ 
    let data = localStorage.getItem("data");
    if (data == null) {
        arr = [];
    } else {
        arr = JSON.parse(data);
    }
    let unique = document.getElementById("unique");
    let textArea = document.getElementById('textarea');
    let title = document.getElementById("title");
    let uniqueValue = unique.value;
    let favvalue=arr[uniqueValue].fav;
    let pinvalue=arr[uniqueValue].pin;
    arr[uniqueValue] = {
        title : title.value,
        data: textArea.value,
        fav:favvalue,
        pin:pinvalue
    }
    unique.value ="";
    
saveBtn.style.display="none"
addNote.style.display="block";

localStorage.setItem("data", JSON.stringify(arr));
textArea.value = "";
title.value = "";
showNotes();
})

function fav_btn(elem){
    //console.log(arr[elem]);
    arr[elem].fav=!(arr[elem].fav);
    localStorage.setItem('data',JSON.stringify(arr));
    showNotes();
 }

 function pin_btn(elem){
    //console.log(arr[elem]);
    arr[elem].pin=!(arr[elem].pin);
    localStorage.setItem('data',JSON.stringify(arr));
    showNotes();
 }

// function fav(){
//     arr.forEach(function (element, index) {
//         let favicon=document.getElementById(`fav${index+1}`);
//                 if(element.fav===true){
//                     //console.log(`fav${index+1}`)
                    
//                     favicon.style.display="block";
//                 }else{
//                     favicon.style.display="none";
//                 }
//             })


//     let cards=document.getElementsByClassName("card-content");
//     Array.from(cards).forEach(function(card){
//         let data = localStorage.getItem("data");
//         if (data == null) {
//             arr = [];
//         } else {
//             arr = JSON.parse(data);
//         }
//             card.addEventListener('mouseenter',function(){
//                 let favbtn = document.getElementById("favbtn");
//             favbtn.value = this.id-1;
//             if(arr[favbtn.value].fav==false){
//                 let notfavicon=document.getElementById(`notfav${this.id}`);
//             notfavicon.style.display='block'
//             }
//             })
      
//             card.addEventListener('mouseleave',function(){
                
//                     let notfavicon=document.getElementById(`notfav${this.id}`);
//                     notfavicon.style.display="none";
                
//             });
        
//     });
// }

// let notfavs=document.getElementsByClassName("not-fav");
// Array.from(notfavs).forEach(function(notfav){
   
//     notfav.addEventListener('click',function(){
//         arr[favbtn.value].fav=!(arr[favbtn.value].fav);
//         localStorage.setItem("data", JSON.stringify(arr));
        
//         display(favbtn.value);
//        // console.log(unique.value);
//     })
// }) 
// let favs=document.getElementsByClassName("fav");
// Array.from(favs).forEach(function(fav){
//     fav.addEventListener('click',function(){
//         arr[favbtn.value].fav=!(arr[favbtn.value].fav);
//         localStorage.setItem("data", JSON.stringify(arr));
       
//          display(favbtn.value);
//         //console.log(this.id);
//     })
// }) 
// function display(value){
//     let notfavicon=document.getElementById(`notfav${parseInt(value)+1}`);
//     let favicon=document.getElementById(`fav${parseInt(value)+1}`);
//     if(arr[favbtn.value].fav==true){
//         favicon.style.display='block';
//         notfavicon.style.display='none'
//     }else{
//         favicon.style.display='none';
//         notfavicon.style.display='block'
//     }
// }

// function pin(){
//     arr.forEach(function (element, index) {
//         let pinicon=document.getElementById(`pin${index+1}`);
//                 if(element.pin===true){
//                     //console.log(`fav${index+1}`)
                    
//                     pinicon.style.display="block";
//                 }else{
//                     pinicon.style.display="none";
//                 }
//             })

//     let cards=document.getElementsByClassName("card-content");
//     Array.from(cards).forEach(function(card){
//         let data = localStorage.getItem("data");
//         if (data == null) {
//             arr = [];
//         } else {
//             arr = JSON.parse(data);
//         }
//             card.addEventListener('mouseenter',function(){
//                 let unpin = document.getElementById("unpin");
//             favbtn.value = this.id-1;
//             if(arr[favbtn.value].pin==false){
//                 let unpinicon=document.getElementById(`unpin${this.id}`);
//             unpinicon.style.display='block'
//             }
//             })
      
//             card.addEventListener('mouseleave',function(){
                
//                     let unpinicon=document.getElementById(`unpin${this.id}`);
//                     unpinicon.style.display="none";
                
//             });
        
//     });
// }

// let unpins=document.getElementsByClassName("unpin");
// Array.from(unpins).forEach(function(unpin){
   
//     unpin.addEventListener('click',function(){
//         arr[favbtn.value].pin=!(arr[favbtn.value].pin);
//         localStorage.setItem("data", JSON.stringify(arr));
        
//         display_pin(favbtn.value);
//        // console.log(unique.value);
//     })
// }) 
// let pins=document.getElementsByClassName("pin");
// Array.from(pins).forEach(function(pin){
//     pin.addEventListener('click',function(){
//         arr[favbtn.value].pin=!(arr[favbtn.value].pin);
//         localStorage.setItem("data", JSON.stringify(arr));
       
//          display_pin(favbtn.value);
//         //console.log(this.id);
//     })
// }) 
// function display_pin(value){
//     let unpin=document.getElementById(`unpin${parseInt(value)+1}`);
//     let pin=document.getElementById(`pin${parseInt(value)+1}`);
//     if(arr[favbtn.value].pin==true){
//         pin.style.display='block';
//         unpin.style.display='none'
//     }else{
//         pin.style.display='none';
//         unpin.style.display='block'
//     }
// }
 