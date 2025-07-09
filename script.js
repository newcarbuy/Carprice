const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1Ps-g1wRp1Q1_i6lx9_u9zBaSQ61S-mvsKB5OKcZLTms/export?format=csv';

fetch(SHEET_CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split('\n').map(row => row.split(','));

    const header = rows[0];
    const data = rows.slice(1);

    const brandGroups = {};

    data.forEach(row => {
      const brand = row[2]; // assuming brand is at index 2
      if (!brandGroups[brand]) {
        brandGroups[brand] = [];
      }
      brandGroups[brand].push(row);
    });

    const container = document.getElementById('car-container');

    Object.entries(brandGroups).forEach(([brand, models]) => {
      const table = document.createElement('table');
      table.className = 'car-table';

      // Brand name row
      const brandRow = document.createElement('tr');
      const brandCell = document.createElement('td');
      brandCell.colSpan = models.length + 1;
      brandCell.className = 'brand-name';
      brandCell.textContent = brand;
      brandRow.appendChild(brandCell);
      table.appendChild(brandRow);

      // Model names
      const modelNameRow = document.createElement('tr');
      modelNameRow.innerHTML = `<td class="feature-label"></td>` + models.map(m => `<td class="model-title">${m[12]}</td>`).join('');
      table.appendChild(modelNameRow);

      // Model images row
      const imageRow = document.createElement('tr');
      imageRow.innerHTML = `<td class="feature-label">Image</td>` + models.map(m =>
        `<td>
           <div style="display: flex; flex-direction: column; align-items: center;">
             <img src="${m[1]}" alt="Model Image" style="max-width: 100%; height: auto;">
           </div>
         </td>`
      ).join('');
      table.appendChild(imageRow);

      // Feature labels
      const features = [
        { label: "Mileage", index: 2 },
        { label: "Ex-Showroom", index: 3 },
        { label: "RTO", index: 4 },
        { label: "Insurance", index: 5 },
        { label: "Editinal", index: 6 },
        { label: "Showroom Discount", index: 7 },
        { label: "Brand Discount", index: 8 },
        { label: "Additional Discount", index: 9 },
        { label: "On-Road Price", index: 10 }
      ];

      features.forEach(feature => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="feature-label">${feature.label}</td>` +
          models.map(m => `<td>${m[feature.index]}</td>`).join('');
        table.appendChild(row);
      });

      container.appendChild(table);
    });
  })
  .catch(err => {
    console.error('Failed to fetch data from Google Sheets:', err);
  });
