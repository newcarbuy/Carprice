const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1Ps-g1wRp1Q1_i6lx9_u9zBaSQ61S-mvsKB5OKcZLTms/export?format=csv';

fetch(SHEET_CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split('\n').map(r => r.split(','));
    const data = rows.slice(1);

    const brandGroups = {};
    data.forEach(row => {
      const brand = row[11]; // ✅ brand name from column 12
      if (!brandGroups[brand]) brandGroups[brand] = [];
      brandGroups[brand].push(row);
    });

    const container = document.getElementById('comparison-table');

    Object.entries(brandGroups).forEach(([brand, models]) => {
      const section = document.createElement('div');
      section.className = 'brand-section';

      section.innerHTML = `<h2>${brand}</h2>`;

      const table = document.createElement('table');

      // Image + model name row
      const imgRow = document.createElement('tr');
      imgRow.innerHTML = `<td class="feature-label">Image</td>` + models.map(m => `
        <td>
          <img src="${m[1]}" class="model-img">
          <div class="model-name">${m[12]}</div> <!-- ✅ model name from column 13 -->
        </td>
      `).join('');
      table.appendChild(imgRow);

      // Feature rows
      const features = [
        ['Mileage', 2],
        ['Ex-Showroom', 3],
        ['RTO', 4],
        ['Insurance', 5],
        ['Editinal', 6],
        ['Showroom Discount', 7],
        ['Brand Discount', 8],
        ['Additional Discount', 9],
        ['On-Road Price', 10],
      ];

      features.forEach(([label, index]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="feature-label">${label}</td>` + models.map(m => `<td>${m[index]}</td>`).join('');
        table.appendChild(row);
      });

      section.appendChild(table);
      container.appendChild(section);
    });
  })
  .catch(err => {
    console.error('Error fetching sheet:', err);
  });
