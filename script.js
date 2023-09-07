
const lotr = {
  title: "The Fellowship Of The Ring",
  author: "by J.R.R. Tolkien",
  pages: "432 pages",
  read: "📕 Not read",
  recommend: "⭐ Recommend"
}

const myLibrary = [lotr];

const initLibrary = function() {
  i=0;
  while (i < myLibrary.length) {
    console.log(myLibrary[i]);
    bookToDom(i)
    i++;
  }
}

const cards = document.getElementsByClassName("cards")[0]

const bookToDom = function(i) {

  let card = document.createElement('div');
  card.classList.add('card');
  cards.appendChild(card);

  let title = document.createElement('p');
  title.classList.add('title');
  title.textContent = myLibrary[i].title;
  card.appendChild(title);

  let author = document.createElement('p');
  author.classList.add('author');
  author.textContent = myLibrary[i].author;
  card.appendChild(author);

  let pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = myLibrary[i].pages;
  card.appendChild(pages);

  let read = document.createElement('p');
  read.classList.add('read');
  read.textContent = myLibrary[i].read;
  card.appendChild(read);

  let recommend = document.createElement('p');
  recommend.classList.add('recommend');
  recommend.textContent = myLibrary[i].recommend;
  card.appendChild(recommend);

  let cardButtons = document.createElement('div');
  cardButtons.classList.add('card-buttons');
  card.appendChild(cardButtons);

  let readButtonDom = document.createElement('button');
  readButtonDom.classList.add('toggle-read');
  readButtonDom.textContent = "📕✅"
  cardButtons.appendChild(readButtonDom);

  let recommendButtonDom = document.createElement('button');
  recommendButtonDom.classList.add('toggle-recommend');
  recommendButtonDom.textContent = "⭐👎"
  cardButtons.appendChild(recommendButtonDom);

  let removeButtonDom = document.createElement('button');
  removeButtonDom.classList.add('remove-book');
  removeButtonDom.textContent = "❌"
  cardButtons.appendChild(removeButtonDom);
}

initLibrary()

function clearRadioButtons(){
  let ele = document.querySelectorAll("input[type=radio]");
   for(var i=0;i<ele.length;i++){
      ele[i].checked = false;
   }
}

class Book {
  constructor(title, author, pages, read, recommend) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.recommend = recommend
  }
}

const getAuthorInput = function() {
  authorInput = document.getElementById("author").value
  if (!authorInput) return
  else authorInput = "by " + document.getElementById("author").value
  return authorInput
}

const getPagesInput = function() {
  pagesInput = document.getElementById("pages").value
  if (!pagesInput) {
    return
  } else {
    pagesInput = pagesInput + " pages"
    return pagesInput
  }
}

const getReadInput = function() {
  if (document.getElementById("read-yes").checked) {
    return readInput = "✅ Read"
  } else if (document.getElementById("read-no").checked) {
    return readInput = "📕 Not read"
  } else {
    return readInput = ""
  }
}

const getRecommendInput = function() {
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
  } else {
  let authorInput
  authorInput = getAuthorInput(authorInput)
  let pagesInput
  pagesInput = getPagesInput(pagesInput)
  let readInput
  readInput = getReadInput(readInput)
  let recommendInput
  recommendInput = getRecommendInput(recommendInput)
  
  let addBookToLibrary = new Book(titleInput, authorInput, pagesInput, readInput, recommendInput);
  myLibrary.push(addBookToLibrary)
  let i = [myLibrary.length - 1]
  bookToDom(i)
  newBookDialog.close()
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("pages").value = ""
  clearRadioButtons()
  }
}

const submitButton = document.getElementsByClassName("submit-button")[0]
const newBookButton = document.getElementsByClassName("new-book-button")[0]
const cancelButton = document.getElementsByClassName("cancel-button")[0]
const newBookDialog = document.querySelector("dialog")
const removeBookDialog = document.getElementsByClassName("remove-book-dialog")[0]
const yesButton = document.getElementsByClassName("yes")[0]
const noButton = document.getElementsByClassName("no")[0]

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
    dialog.close();
    document.getElementById("book").reset(); 
  }
})

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

function toggleRead(toggleReadButton) {
  let read = toggleReadButton.parentElement.parentElement.children[3]
  if (read.textContent != "✅ Read" ) {
    read.textContent = "✅ Read"
  } else read.textContent = "📕 Not read"
}

document.addEventListener('click', (e) => {
  if (e.target.className == "toggle-read") {
    let toggleReadButton = e.target
    toggleRead(toggleReadButton)
  }
})

function toggleRecommend(toggleRecommendButton) {
  let read = toggleRecommendButton.parentElement.parentElement.children[4]
  if (read.textContent != "⭐ Recommend" ) {
    read.textContent = "⭐ Recommend"
  } else read.textContent = "👎 Don't Recommend"
}

document.addEventListener('click', (e) => {
  if (e.target.className == "toggle-recommend") {
    let toggleRecommendButton = e.target
    toggleRecommend(toggleRecommendButton)
  }
})

function removeBook() {
  bookCache.remove()
  removeBookDialog.close()
}

let bookCache

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
