const sUrl = "http://127.0.0.1:3000";

function addNewBook () {
    const cUrl = sUrl + "/addBook";
    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        country: document.getElementById('country').value,
    };
    const headers = {'Content-Type': 'application/json'};
    const payload = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            book: newBook
        })
    }
    fetch(cUrl, payload)
    .then(oResponse => oResponse.json())
    .then(res => {
        if(res.status === 'Success') {
            window.location = "./index.html";
        }
    })
}