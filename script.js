let likedArr = [];
let savedArr = [];


// Check if arrays exist in storage yet (savedArr & likedArr)
// if not, declare arrays and store
if (sessionStorage.getItem('alreadyLoaded') === null) {
  // not exists, declare arr and save to ss
  sessionStorage.setItem('likedSave', JSON.stringify(likedArr));

  sessionStorage.setItem('savedSave', JSON.stringify(savedArr));

  // set 'alreadyLoaded' to true
  sessionStorage.setItem('alreadyLoaded', true);
} else {
  // else load the arrays from session storage
  likedArr = JSON.parse(sessionStorage.getItem('likedSave'));
  savedArr = JSON.parse(sessionStorage.getItem('savedSave'));
}

// getStore func to retrieve stored arrays
const getStore = () => {
  likedArr = JSON.parse(sessionStorage.getItem('likedSave'))
  savedArr = JSON.parse(sessionStorage.getItem('savedSave'))
}


// Setstore func to save arrays to session storage
const setStore = () => {
  sessionStorage.setItem('likedSave', JSON.stringify(likedArr))
  sessionStorage.setItem('savedSave', JSON.stringify(savedArr))
}


// object containing all the image urls (for later ref)
const images = {
  finance: "./images/finance.png",
  periodic: "./images/periodic.png",
  crud: "./images/CRUD.png",
  bigClock: "./images/BigClock.png",
  bookCat: "./images/BookCatalogue.png"
}


// Add heart func & Save hearted

// heart clicked
// create arr of all hearts 
const likes = document.querySelectorAll('.heart')
//add eventlistener for every heart element
likes.forEach(like => {
  // when clicked toggle classes
  like.addEventListener("click", (e) => {
    e.target.classList.toggle("noLike");
    e.target.classList.toggle("yesLike");
    getStore();
    // if now liked add to liked array
    if(e.target.classList.contains("yesLike")) {
      //push element
      likedArr.push(e.target)
      
    }
    // else remove from liked array
    else {
      let index = likedArr.findIndex((element) => element == e.target)
      likedArr.splice(index, 1)
    }
    // save to storage
    setStore();
  })
})


// Add save func & Save saved

const saves = document.querySelectorAll('.save')
//add eventlistener for every save element
saves.forEach(save => {
  // when clicked toggle classes
  save.addEventListener("click", (e) => {
    e.target.classList.toggle("noSave");
    e.target.classList.toggle("yesSave");
    // load array from store
    getStore()
    // if not saved - add to saved array
    if(e.target.classList.contains("yesSave")) {    
      savedArr.push(e.target.parentElement.id)     
    }
    // else remove from saved array
    else {
      let index = savedArr.findIndex((element) => element == e.target)
      savedArr.splice(index, 1)
    }
    // Save arr to storeage
    setStore()
    alert(`You now have ${savedArr.length} items saved.`)
  })
})


// Build saved page from saved array

// position in saved page to put each saved element
const savesHere = document.querySelector('#saves');

// func to itterate the saved Array and forEach entry create and append the image to page
const buildSaved = () => {
  savedArr.forEach(save => {
    let saveHolder = document.createElement('div')
    saveHolder.classList = ("saveHolder")
    let saveImg = document.createElement('img');
    // set the img src to url from images object at the key of this saves value
    saveImg.src = images[save];
    saveImg.classList.toggle("savedImage") 
    saveHolder.appendChild(saveImg)
    savesHere.appendChild(saveHolder)
  })
}

// Take comments save to array & acknowledge
const confirmComments = () => {
  let comment = document.querySelector('#comments').value;
  alert(`Many thanks for your words - ${comment}`)
}


// Acknowledge contact form submit
// Built into html



// Re-build portfolio page likes upon revisit
// onload -> itterate the savedArr and add "saved" class to saved projects.

function resetSaves() {
  getStore();
  savedArr.forEach(save => {
    // toggle class noSave to yesSave
    let el = document.querySelector(`#${save} :nth-child(2)`)
    el.classList.toggle("noSave");
    el.classList.toggle("yesSave");
    })
}