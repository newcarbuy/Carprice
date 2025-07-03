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

      const [brandImg, modelImg, brand, model, exShow, rto, insurance, showroomDisc, brandDisc, addDisc, onRoad, mileage] = cols;

      const card = document.createElement('div');
      card.className = 'car-card';

      card.innerHTML = `
        <img src="${brandImg}" alt="Brand Logo" width="40">
        <img src="${modelImg}" alt="Model Image" width="120">
        <div class="item"><span class="label">Brand:</span> ${brand}</div>
        <div class="item"><span class="label">Model:</span> ${model}</div>
        <div class="item"><span class="label">Ex-Showroom:</span> ${exShow}</div>
        <div class="item"><span class="label">RTO:</span> ${rto}</div>
        <div class="item"><span class="label">Insurance:</span> ${insurance}</div>
        <div class="item"><span class="label">Showroom Discount:</span> ${showroomDisc}</div>
        <div class="item"><span class="label">Brand Discount:</span> ${brandDisc}</div>
        <div class="item"><span class="label">Additional Discount:</span> ${addDisc}</div>
        <div class="item"><span class="label">On-Road Price:</span> ${onRoad}</div>
        <div class="item"><span class="label">Mileage:</span> ${mileage}</div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Failed to fetch Google Sheet:', err);
  });
