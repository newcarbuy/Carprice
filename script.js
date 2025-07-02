const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1Ps-g1wRp1Q1_i6lx9_u9zBaSQ61S-mvsKB5OKcZLTms/export?format=csv';

fetch(SHEET_CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split('\n');
    const data = rows.slice(1);
    const tbody = document.querySelector('tbody');

    data.forEach(row => {
      const cols = row.split(',');
      if (cols.length < 11) return;

      const [brandImg, modelImg, brand, model, exShow, rto, insurance, showroomDisc, brandDisc, addDisc, onRoad, mileage] = cols;

      const tr = document.createElement('tr');
      tr.innerHTML = `
  <td>
    <img src="\${brandImg}" width="40"><br>
    <img src="\${modelImg}" width="100">
  </td>
  <td>\${brand}</td>
  ...
`;

      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error('Failed to fetch Google Sheet:', err);
  });
