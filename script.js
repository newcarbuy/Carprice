fetch(SHEET_CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split('\n');
    const data = rows.slice(1);
    const container = document.getElementById('car-container');

    data.forEach(row => {
      const cols = row.split(',');
      if (cols.length < 11) return;

      const [brandImg, modelImg, mileage, exShow, rto, insurance, editinal, showroomDisc, brandDisc, addDisc, onRoad] = cols;

      const card = document.createElement('div');
      card.className = 'car-card';

      card.innerHTML = `
        <img src="${brandImg}" alt="Brand Image Not Found" width="40"><br>
        <img src="${modelImg}" alt="Model Image Not Found" width="100">
        <div class="item"><span class="label">Mileage:</span> ${mileage}</div>
        <div class="item"><span class="label">Ex-Showroom:</span> ${exShow}</div>
        <div class="item"><span class="label">RTO:</span> ${rto}</div>
        <div class="item"><span class="label">Insurance:</span> ${insurance}</div>
        <div class="item"><span class="label">Editinal:</span> ${editinal}</div>
        <div class="item"><span class="label">Showroom Discount:</span> ${showroomDisc}</div>
        <div class="item"><span class="label">Brand Discount:</span> ${brandDisc}</div>
        <div class="item"><span class="label">Additional Discount:</span> ${addDisc}</div>
        <div class="item"><span class="label">On-Road Price:</span> ${onRoad}</div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Failed to fetch Google Sheet:', err);
  });
