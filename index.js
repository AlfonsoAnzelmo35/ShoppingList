import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" ;
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" ;



let addBtn = document.querySelector(".shopping-list-container button") ;
let addInput = document.querySelector(".shopping-list-container input") ;
let shoppingListEL = document.querySelector(".shopping-list") ;

//connessione
const appSettings = {
    databaseURL:"https://prova-4eea1-default-rtdb.europe-west1.firebasedatabase.app/" 
}

const app = initializeApp(appSettings) ;
const database = getDatabase(app) ;
const shoppingListDB = ref(database,"shoppingList") ;

//alla prima lettura di questo file e ad ogni cambiamento dei dati nella ref di quel DB
//viene eseguita onValue(è un listener !)
onValue(shoppingListDB,(snapShot)=>{
    if(snapShot.exists()){
        pulisciShoppingList() ;
        Object.entries(snapShot.val()).forEach((item)=>{
            appendiAllaShoppingLista(item) ;
        })
    }else{
        shoppingListEL.innerHTML = "non ci sono elementi" ;
    }
}) ;

function pulisciShoppingList(){
    shoppingListEL.innerHTML = "" ;
}
function pulisciShoppingInput(){
    addInput.value = "" ;
}


function appendiAllaShoppingLista(value){
    let shoppingListItem = document.createElement("li") ;
    
    //locazione dell'item da eliminare
    let shoppingListItemLocation = ref(database,`/shoppingList/${value[0]}`) ;
    
    //aggiunge l'evento di rimozione    
    shoppingListItem.addEventListener("dblclick",(event)=> 
    rimuoviShoppingListItem(shoppingListItemLocation)) ; 

    shoppingListItem.textContent = value[1] ;
    shoppingListEL.append(shoppingListItem) ;
}

//push di un dato nel DB!
addBtn.addEventListener("click",()=>{
    let value = addInput.value ;
    if(!isNaN(value))
        console.log("errore") ;
    else{
        pulisciShoppingInput()
        push(shoppingListDB,value) ;
    }
}) ;

function rimuoviShoppingListItem(shoppingListItem){
    remove(shoppingListItem) ;
}