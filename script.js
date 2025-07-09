const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1Ps-g1wRp1Q1_i6lx9_u9zBaSQ61S-mvsKB5OKcZLTms/export?format=csv";

fetch(SHEET_CSV_URL)
  .then((res) => res.text())
  .then((csv) => {
    const rows = csv.trim().split("\n");
    const data = rows.slice(1).map((row) => row.split(","));

    // Group by brand
    const brandGroups = {};
    data.forEach((d) => {
      const brand = d[11]; // column L = brand
      if (!brandGroups[brand]) brandGroups[brand] = [];
      brandGroups[brand].push(d);
    });

    const html = [];
    const brandNames = Object.keys(brandGroups);

    brandNames.forEach((brand) => {
      const models = brandGroups[brand];

      html.push(`<div class="brand-section">`);
      html.push(`<h2>${brand}</h2>`);
      html.push("<table>");

      // Image row
      html.push("<tr>");
      html.push('<td class="feature-label">Image</td>');
      html.push(models.map(m => `<td>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="${m[1]}" alt="Model Image" style="width: 100%; height: auto;">
    <div class="model-name">${m[12]}</div>
  </div>
</td>
`).join(""));
      html.push("</tr>");

      // Features
      const features = [
        ["Mileage", 2],
        ["Ex-Showroom", 3],
        ["RTO", 4],
        ["Insurance", 5],
        ["Editinal", 6],
        ["Showroom Discount", 7],
        ["Brand Discount", 8],
        ["Additional Discount", 9],
        ["On-Road Price", 10]
      ];

      features.forEach(([label, index]) => {
        html.push('<tr class="feature-row">');
        html.push(`<td class="feature-label">${label}</td>`);
        html.push(models.map(m => `<td>${m[index]}</td>`).join(""));
        html.push("</tr>");
      });

      html.push("</table></div>");
    });

    document.getElementById("comparison-table").innerHTML = html.join("");
  })
  .catch((err) => console.error("Error loading sheet:", err));
