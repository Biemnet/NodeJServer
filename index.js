import http from "http";
import fetch from "node-fetch";

const server = http
  .createServer((req, res) => {
    const url = req.url;
    let tableData =
      "<table border = '1'><tr><th>Name</th><th>Height</th><th>Birthday</th><th>Gender</th><th>URL</th></tr>";
    if (url === "/") {
      res.write("Home Page.");
      res.end();
    } else if (url === "/list") {
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => {
          createData(data.results);
          res.write(tableData);
          res.end();
        });
    } else {
      res.write("Page Not Found.");
      res.end();
    }

    function createData(data) {
      data.forEach((element) => {
        tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td><tr>`;
      });

      tableData += `</table>`;
    }
  })
  .listen(8080, console.log(`server is listening on PORT 8080`));
