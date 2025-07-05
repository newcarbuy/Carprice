const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1Ps-g1wRp1Q1_i6lx9_u9zBaSQ61S-mvsKB5OKcZLTms/export?format=csv';

fetch(SHEET_CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split('\n');
    const data = rows.slice(1);
    const container = document.getElementById('car-container');

    data.forEach(row => {
      const cols = row.split(',');
      if (cols.length < 11) return;

      const [brandImg, modelImg, mileage, exShow, rto, insurance, editinal, showroomDisc, brandDisc, addDisc, onRoad, brand, model] = cols;

      const card = document.createElement('div');
      card.className = 'car-card';

      card.innerHTML = `
        <div class="image-row">
          <div class="brand-image">
            <img src="${brandImg}" alt="Brand Image Not Found" width="100">
            <div class="brand-name">${brand}</div>
          </div>
          <div class="model-image">
            <img src="${modelImg}" alt="Model Image Not Found" width="160">
            <div class="model-name">${model}</div>
          </div>
        </div>

        <div class="model-data">
          <div class="item"><span class="label">Mileage:</span> <span class="value">${mileage}</span></div>
          <div class="item"><span class="label">Ex-Showroom:</span> <span class="value">${exShow}</span></div>
          <div class="item"><span class="label">RTO:</span> <span class="value">${rto}</span></div>
          <div class="item"><span class="label">Insurance:</span> <span class="value">${insurance}</span></div>
          <div class="item"><span class="label">Editinal:</span> <span class="value">${editinal}</span></div>
          <hr class="divider">
          <div class="item"><span class="label">Showroom Discount:</span> <span class="value">${showroomDisc}</span></div>
          <div class="item"><span class="label">Brand Discount:</span> <span class="value">${brandDisc}</span></div>
          <div class="item"><span class="label">Additional Discount:</span> <span class="value">${addDisc}</span></div>
          <hr class="divider">
          <div class="item"><span class="label">On-Road Price:</span> <span class="value">${onRoad}</span></div>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Failed to fetch Google Sheet:', err);
  });
