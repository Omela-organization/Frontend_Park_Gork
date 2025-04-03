const map = new mapgl.Map('map_container', {
  key: '00b2cd5e-b496-40fa-9ca6-a32f9b2300b5',
  center: [37.60141, 55.72844],
  zoom: 17,
  lang: 'ru'
});

let marker = null;

function addMarker(coordinates) {
  if (marker) {
    marker.destroy();
  }
  marker = new mapgl.Marker(map, {
    coordinates: coordinates,
  });
  map.setCenter(coordinates);
}

async function fetchData() {
  try {
    const response = await fetch("reports_eco_placement.json");
    const data = await response.json();

    const tableBody = document.getElementById('table_body');
    tableBody.innerHTML = '';

    data.forEach((item) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${item.date}</td>
        <td>${item.violationType}</td>
        <td class="copy-coords" data-coords="${item.coordinates}">${item.coordinates}</td>
        <td><a href="${item.photo}" target="_blank">Фото</a></td>
        <td>
          <select class="status-select" data-id="${item.id}">
            <option value="проверено" ${item.checkStatus === 'проверено' ? 'selected' : ''}>Проверено</option>
            <option value="в процессе" ${item.checkStatus === 'в процессе' ? 'selected' : ''}>В процессе</option>
            <option value="не проверено" ${item.checkStatus === 'не проверено' ? 'selected' : ''}>Не проверено</option>
          </select>
        </td>
        <td><a href="#" class="show-map" data-coords="${item.coordinates}">Показать</a></td>
      `;

      tableBody.appendChild(row);
    });

    document.querySelectorAll('.show-map').forEach(element => {
      element.addEventListener('click', function(event) {
        event.preventDefault();
        const coords = this.getAttribute('data-coords').split(',').map(Number);
        addMarker(coords);
      });
    });

    document.querySelectorAll('.copy-coords').forEach(button => {
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(button.dataset.coords)
          .then(() => {
            alert('Координаты скопированы!');
          })
          .catch(err => {
            console.error('Ошибка копирования:', err);
          });
      });
    });

    document.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', function() {
        const id = this.getAttribute('data-id');
        const newStatus = this.value;
        updateStatus(id, newStatus);
      });
    });

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

async function updateStatus(id, newStatus) {
  try {
    const response = await fetch(`http://localhost:3000/api/updateStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, checkStatus: newStatus })
    });
    if (response.ok) {
      console.log('Статус успешно обновлен');
    } else {
      console.error('Ошибка при обновлении статуса');
    }
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
  }
}

window.onload = fetchData;
