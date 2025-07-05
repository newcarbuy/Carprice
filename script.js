
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1Ps-g1wRp1Q1_i6lx9_u9zBaSQ61S-mvsKB5OKcZLTms/export?format=csv";

fetch(SHEET_CSV_URL)
  .then((res) => res.text())
  .then((csv) => {
    const rows = csv.trim().split("\n");
    const data = rows.slice(1).map((row) => row.split(","));

    const html = [];
    html.push("<table>");
    html.push("<tr><th>Feature</th>" + data.map(d => "<th>" + d[12] + "</th>").join("") + "</tr>"); // Model Names
    html.push("<tr><td>Image</td>" + data.map(d => "<td><img src='" + d[1] + "' class='model-img'></td>").join("") + "</tr>");
    html.push("<tr><td>Mileage</td>" + data.map(d => "<td>" + d[2] + "</td>").join("") + "</tr>");
    html.push("<tr><td>Ex-Showroom</td>" + data.map(d => "<td>" + d[3] + "</td>").join("") + "</tr>");
    html.push("<tr><td>RTO</td>" + data.map(d => "<td>" + d[4] + "</td>").join("") + "</tr>");
    html.push("<tr><td>Insurance</td>" + data.map(d => "<td>" + d[5] + "</td>").join("") + "</tr>");
    html.push("<tr><td>Editinal</td>" + data.map(d => "<td>" + d[6] + "</td>").join("") + "</tr>");
    html.push("<tr><td>Showroom Discount</td>" + data.map(d => "<td>" + d[7] + "</td>").join("") + "</tr>");
    html.push("<tr><td>Brand Discount</td>" + data.map(d => "<td>" + d[8] + "</td>").join("") + "</tr>");
    html.push("<tr><td>Additional Discount</td>" + data.map(d => "<td>" + d[9] + "</td>").join("") + "</tr>");
    html.push("<tr><td>On-Road Price</td>" + data.map(d => "<td>" + d[10] + "</td>").join("") + "</tr>");
    html.push("</table>");

    document.getElementById("comparison-table").innerHTML = html.join("");
  })
  .catch((err) => console.error("Error loading sheet:", err));
