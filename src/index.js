const sUrl = "http://127.0.0.1:3000"; // end point
let booksCount = 0; // to show total book count on webpage
getBooksList(); // on opening first page

function getBooksList() {
  const cUrl = sUrl + "/getBooks";
  fetch(cUrl)
    .then((oResponse) => oResponse.json())
    .then((data) => {
      var booksTable = document.getElementById("books");
      data.forEach((element, index) => {
        let row = booksTable.insertRow(-1);
        let cell0 = row.insertCell(0);
        cell0.classList.add("snoClass");
        let cell1 = row.insertCell(1);
        cell1.innerHTML = element.title;
        let cell2 = row.insertCell(2);
        cell2.innerHTML = element.author;
        let cell3 = row.insertCell(3);
        cell3.innerHTML = element.country;
        let cell4 = row.insertCell(4);
        let _button = document.createElement("button");
        _button.onclick = () => deleteBook(_button);
        _button.innerHTML = `Delete`;
        cell4.appendChild(_button);
      });
      generateSerialNos();
      setBooksCount();
    });
}

function deleteBook(element) {
  const cUrl = sUrl + "/deleteBook";
  const row = element.parentElement?.parentElement;
  const bookName = row.childNodes[1].innerHTML;
  const headers = {'Content-Type': 'application/json'};
  const payload = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: bookName,
    })
  };
  fetch(cUrl, payload)
    .then((oResponse) => {
      oResponse.json();
    })
    .then((res) => {
      console(res?.status);
    });
  row.remove();
  generateSerialNos();
  booksCount--;
  setBooksCount();
}

function generateSerialNos() {
  const elements = document.querySelectorAll(`.snoClass`);
  elements.forEach((element, index) => {
    element.innerHTML = `${index + 1}`;
  });
  booksCount = elements.length
}

function setBooksCount() {
  let countElement = document.getElementById('count');
  countElement.innerHTML = `${booksCount}`
}
