const sUrl = "http://127.0.0.1:3000";

async function addNewBook () {
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
    const response = await fetch(cUrl, payload);
    const status = response.status;
    const res = await response.json();
    if(status === 200) {
        alert('Book Added Successfully')
        window.location = "./index.html";
    }
    else if (status >= 400) {
        let errorMsg = res.message;
        alert(errorMsg);
        window.location = "./index.html";
    }
    // fetch(cUrl, payload)
    // .then(oResponse => oResponse.json())
    // .then(res => {
    //     if(res.status === 'Success') {
    //         window.location = "./index.html";
    //     }
    // })
}