const sUrl = "http://127.0.0.1:3000";
getBooksList();

function getBooksList() {
  const cUrl = sUrl + "/getBooks";
  fetch(cUrl)
  .then(oResponse => 
    oResponse.json()
  )
  .then((data) => {
    var booksTable = document.getElementById("books");
    data.forEach((element,index) => {
      let row = booksTable.insertRow(-1);
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      cell0.innerHTML = index+1;
      cell1.innerHTML = element.title;
      cell2.innerHTML = element.author;
      cell3.innerHTML = element.country;
    });
    console.log(data);
  });
}
