
"use strict"

const submitButton = document.getElementsByClassName("submit-button")[0]
const newBookButton = document.getElementsByClassName("fixed-new-book-button")[0]
const cancelButton = document.getElementsByClassName("cancel-button")[0]
const newBookDialog = document.querySelector("dialog")
const removeBookDialog = document.getElementsByClassName("remove-book-dialog")[0]
const yesButton = document.getElementsByClassName("yes")[0]
const noButton = document.getElementsByClassName("no")[0]
const cards = document.getElementsByClassName("cards")[0]

const lotr = {
  title: "The Fellowship Of The Ring",
  author: "by J.R.R. Tolkien",
  pages: "432 pages",
  read: "📕 Not read",
  recommend: "⭐ Recommend",
  data: "pos: 0",
}

const myLibrary = [lotr];

class Book {
  constructor(title, author, pages, read, recommend, data) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.recommend = recommend
    this.data = data
  }
}

const initLibrary = function() {
  let i = 0;
  while (i < myLibrary.length) {
    bookToDom(i)
    i++;
  }
}

const bookToDom = function(i) {

  let card = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p');
  let pages = document.createElement('p');
  let read = document.createElement('p');
  let recommend = document.createElement('p');
  let data = document.createElement('p');
  let cardButtons = document.createElement('div');
  let removeButtonDom = document.createElement('button');
  let recommendButtonDom = document.createElement('button');
  let readButtonDom = document.createElement('button');

  cards.appendChild(card);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(recommend);
  card.appendChild(data);
  card.appendChild(cardButtons);
  cardButtons.appendChild(removeButtonDom);
  cardButtons.appendChild(recommendButtonDom);
  cardButtons.appendChild(readButtonDom);

  card.classList.add('card');
  card.setAttribute("data", `${i}`);
  title.classList.add('title');
  author.classList.add('author');
  pages.classList.add('pages');
  read.classList.add('read');
  recommend.classList.add('recommend');
  data.classList.add('data');
  cardButtons.classList.add('card-buttons');
  removeButtonDom.classList.add('remove-book');
  recommendButtonDom.classList.add('toggle-recommend');
  readButtonDom.classList.add('toggle-read');

  title.textContent = myLibrary[i].title;
  author.textContent = myLibrary[i].author;
  pages.textContent = myLibrary[i].pages;
  read.textContent = myLibrary[i].read;
  recommend.textContent = myLibrary[i].recommend;
  data.textContent = myLibrary[i].data;
  removeButtonDom.textContent = "❌"
  recommendButtonDom.textContent = "⭐"
  readButtonDom.textContent = "✅"

}

initLibrary()

function clearRadioButtons(){
  let ele = document.querySelectorAll("input[type=radio]");
   for(var i=0;i<ele.length;i++){
      ele[i].checked = false;
   }
}

const getAuthorInput = function() {
  let authorInput = document.getElementById("author").value
  if (!authorInput) return
  else authorInput = "by " + document.getElementById("author").value
  return authorInput
}

const getPagesInput = function() {
  let pagesInput = document.getElementById("pages").value
  if (!pagesInput) {
    return
  } else {
    pagesInput = pagesInput + " pages"
    return pagesInput
  }
}

const getReadInput = function() {
  let readInput
  if (document.getElementById("read-yes").checked) {
    return readInput = "✅ Read"
  } else if (document.getElementById("read-no").checked) {
    return readInput = "📕 Not read"
  } else {
    return readInput = ""
  }
}

const getRecommendInput = function() {
  let recommendInput
  if (document.getElementById("recommend-yes").checked) {
    return recommendInput = "⭐ Recommend"
  } else if (document.getElementById("recommend-no").checked) {
    return recommendInput = "👎 Don't Recommend"
  } else {
    return recommendInput = ""
  }
}

const submitInput = document.getElementsByClassName("submit-button")[0]

const getInput = function() {
  let titleInput = document.getElementById("title").value
  if (titleInput == "") {
    alert("Need a book title.")
    return
  } 
  let authorInput = getAuthorInput()
  let pagesInput = getPagesInput()
  let readInput = getReadInput()
  let recommendInput = getRecommendInput()
  let data = "pos: " + [myLibrary.length]
  let addBookToLibrary = new Book(titleInput, authorInput, pagesInput, readInput, recommendInput, data);
  myLibrary.push(addBookToLibrary)
  let i = [myLibrary.length - 1]
  bookToDom(i)
  newBookDialog.close()
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("pages").value = ""
  clearRadioButtons()
}

submitButton.addEventListener("click", (e) => e.preventDefault());

newBookButton.addEventListener("click", function() {
  newBookDialog.showModal()
});

submitButton.addEventListener("click", function() {
  getInput()
});

cancelButton.addEventListener("click", function() {
  newBookDialog.close()
});

noButton.addEventListener("click", function() {
  removeBookDialog.close()
});

document.addEventListener("keydown", ({key}) => {
  if (key === "Escape") {
    removeBookDialog.close()
    newBookDialog.close()
    // dialog.close();
    // document.getElementById("book").reset(); 
  }
})

function toggleRead(toggleReadButton) {
  let data = toggleReadButton.parentElement.parentElement.getAttribute("data")
  let read = toggleReadButton.parentElement.parentElement.children[3]
  if (read.textContent != "✅ Read" ) {
    read.textContent = "✅ Read"
    myLibrary[data].read = "✅ Read"
  } else {
    read.textContent = "📕 Not read"
    myLibrary[data].read = "📕 Not read"
  }
}

document.addEventListener('click', (e) => {
  if (e.target.className == "toggle-read") {
    let toggleReadButton = e.target
    toggleRead(toggleReadButton)
  }
})

function toggleRecommend(toggleRecommendButton) {
  let data = toggleRecommendButton.parentElement.parentElement.getAttribute("data")
  let recommend = toggleRecommendButton.parentElement.parentElement.children[4]
  if (recommend.textContent != "⭐ Recommend" ) {
    recommend.textContent = "⭐ Recommend"
    myLibrary[data].recommend = "⭐ Recommend"
  } else {
    recommend.textContent = "👎 Don't Recommend"
    myLibrary[data].recommend = "👎 Don't Recommend"
  }
}

document.addEventListener('click', (e) => {
  if (e.target.className == "toggle-recommend") {
    let toggleRecommendButton = e.target
    toggleRecommend(toggleRecommendButton)
  }
})

let bookCache

const updateData = function() {
  let i = 0;
  while (i < myLibrary.length) {
    myLibrary[i].data = "pos: " + i;
    document.getElementsByClassName("data")[i].textContent = myLibrary[i].data
    document.getElementsByClassName("card")[i].setAttribute("data", `${i}`)
    i++;
  }
}

function removeArrayObject() {
  let i = bookCache.getElementsByClassName("data")[0].textContent.replace(/[^0-9]/g, "");
  myLibrary.splice(i, 1);
}

function removeBook() {
  removeArrayObject()
  bookCache.remove()
  updateData()
  removeBookDialog.close()
}

yesButton.addEventListener("click", function() {
  removeBook()
});

function openRemoveBookDialog(removeBookButton) {
  removeBookDialog.showModal()
  bookCache = removeBookButton.parentElement.parentElement
  return bookCache
}

document.addEventListener('click', (e) => {
  if (e.target.className == "remove-book") {
    let removeBookButton = e.target
    openRemoveBookDialog(removeBookButton)
  }
})

// window.history.pushState('popupclosed', null, null);    // initial state: closed

// let hideModal = function(event) {
//     if (event.state == 'popupclosed') {
//         closepopup();
//         newBookDialog.close()
//         removeBookDialog.close()
//     }
// };

// let showModal = function(event) {
//     if (history.state !== 'opened') {
//         window.history.pushState('opened', null, null);
//     }
//     window.addEventListener('popstate', hideModal, { once: true })
//   };   

  // dialog.addEventListener("click", e => {
//   const dialogDimensions = dialog.getBoundingClientRect()
//   if (
//     e.clientX < dialogDimensions.left ||
//     e.clientX > dialogDimensions.right ||
//     e.clientY < dialogDimensions.top ||
//     e.clientY > dialogDimensions.bottom
//   ) {
//     dialog.close()
//   }
// })
