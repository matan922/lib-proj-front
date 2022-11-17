/////////////////// BOOKS //////////////
const display_books = async () => {
    let res = await axios.get("https://serverbackend.onrender.com/books/")
    booksList.innerHTML = res.data.map((i, ind) =>
        `<div> <h3 style="color: red"> Book name: ${i['book_name']} </h3> 
    <img src='https://picsum.photos/20${ind}'> 
    <h3> id: ${i['id']} <br> author: ${i['author']} <br> publish date: ${i['publish_date']}<br> loan type: ${i['type_of_loan']} </h3>
    <button onclick="delBook(${i['id']})">Delete</button></div>`).join('')
}
display_books()

const delBook = async (id) => {
    await fetch(`https://serverbackend.onrender.com/books/books_del/${id}`, { method: 'GET' })
    display_books()
}

const addBook = async () => {
    if (fieldsAreInvalid()) return;
    await fetch('https://serverbackend.onrender.com/books/add_book', {
        method: 'POST',
        body: JSON.stringify({
            bookname: bookName.value,
            author: author.value,
            publishdate: publishDate.value,
            typeofloan: typeOfLoan.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    display_books()
}

const fieldsAreInvalid = () => {
    const bookName = document.getElementById("bookName")
    const author = document.getElementById("author")
    const publishDate = document.getElementById("publishDate")
    const typeOfLoan = document.getElementById("typeOfLoan")
    if (bookName.value == "" || bookName.value == null, author.value == null || author.value == "", publishDate.value == null || publishDate.value == "", typeOfLoan.value == null || typeOfLoan.value == "") {
        document.getElementById("validity").innerHTML = "Fill all the fields";
        setTimeout(clearValidity, 3000)
        return true;
    }
    document.getElementById("validity").innerHTML = "Success! :D";
    setTimeout(clearValidity, 3000)
    return false;
}

const clearValidity = () => {
    document.getElementById("validity").innerHTML = ""
}


