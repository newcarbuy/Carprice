
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1Ps-g1wRp1Q1_i6lx9_u9zBaSQ61S-mvsKB5OKcZLTms/export?format=csv";

fetch(SHEET_CSV_URL)
  .then((res) => res.text())
  .then((csv) => {
    const rows = csv.trim().split("\n");
    const data = rows.slice(1).map((row) => row.split(","));

    // Group data by brand (last column is assumed to be brand)
    const brandGroups = {};
    data.forEach((d) => {
      const brand = d[11];
      if (!brandGroups[brand]) brandGroups[brand] = [];
      brandGroups[brand].push(d);
    });

    const html = [];

    for (const brand in brandGroups) {
      const models = brandGroups[brand];

      html.push(`<h2>${brand}</h2>`);
      html.push("<table>");
      html.push("<tr><th>Feature</th>" + models.map(m => "<th>" + m[12] + "</th>").join("") + "</tr>"); // model names
      html.push("<tr><td>Image</td>" + models.map(m => "<td><img src='" + m[1] + "' class='model-img'></td>").join("") + "</tr>");
      html.push("<tr><td>Mileage</td>" + models.map(m => "<td>" + m[2] + "</td>").join("") + "</tr>");
      html.push("<tr><td>Ex-Showroom</td>" + models.map(m => "<td>" + m[3] + "</td>").join("") + "</tr>");
      html.push("<tr><td>RTO</td>" + models.map(m => "<td>" + m[4] + "</td>").join("") + "</tr>");
      html.push("<tr><td>Insurance</td>" + models.map(m => "<td>" + m[5] + "</td>").join("") + "</tr>");
      html.push("<tr><td>Editinal</td>" + models.map(m => "<td>" + m[6] + "</td>").join("") + "</tr>");
      html.push("<tr><td>Showroom Discount</td>" + models.map(m => "<td>" + m[7] + "</td>").join("") + "</tr>");
      html.push("<tr><td>Brand Discount</td>" + models.map(m => "<td>" + m[8] + "</td>").join("") + "</tr>");
      html.push("<tr><td>Additional Discount</td>" + models.map(m => "<td>" + m[9] + "</td>").join("") + "</tr>");
      html.push("<tr><td>On-Road Price</td>" + models.map(m => "<td>" + m[10] + "</td>").join("") + "</tr>");
      html.push("</table><br>");
    }

    document.getElementById("comparison-table").innerHTML = html.join("");
  })
  .catch((err) => console.error("Error loading sheet:", err));
