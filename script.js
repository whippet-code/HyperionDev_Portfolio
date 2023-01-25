
let savedArr;
let likedArr;

// getStore & setStore functions
// Check if arrays exist in storage yet (savedArr & likedArr)
// likedStore load into arr
if (sessionStorage.getItem('likedSave') == null) {
  // not exists, declare arr and save to ss
  sessionStorage.setItem('likedSave', JSON.stringify(likedArr));
} else {
  likedArr = JSON.parse(sessionStorage.getItem('likedSave'));
}
// savestore loaded to arr
if (sessionStorage.getItem('savedSave') == null) {
  // not exists, declare arr and save to ss
  sessionStorage.setItem('savedSave', JSON.stringify(savedArr));
} else {
  savedArr = JSON.parse(sessionStorage.getItem('savedSave'));
}

const getStore = () => {
  likedArr = JSON.parse(sessionStorage.getItem('likedSave'))
  savedArr = JSON.parse(sessionStorage.getItem('savedStore'))
}

// Check if arrays exist in storage yet (savedArr & likedArr)
getStore();

// Setstore func to save arrays to session storage
const setStore = () => {
  sessionStorage.setItem('likedSave', JSON.stringify(likedArr))
  sessionStorage.setItem('savedStore', JSON.stringify(savedArr))
}

setStore();

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
  })
})


// Build saved page from saved array

// position in saved page to put each saved element
const savesHere = document.querySelector('#saves');

//itterate the saved Array and forEach entry create and append the image to page
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

// Take comments save to array & acknowledge



// Acknowledge contact form submit

