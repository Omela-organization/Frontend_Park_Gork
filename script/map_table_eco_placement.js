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
        const response = await fetch("http://213.171.28.81:7001/api/v1/eco_problems/", {
          method: "GET",
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiZDM2MzY2ZjYtMjZhNy00Y2JiLThhODAtOWJkZTE5NjFkZjk0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ2NTQ3MTUxLCJleHAiOjE3NDY1NTA3NTF9.ZHW9k-kkGj-WBPOxaNIZCSx1_H20qxbP66MrYoswVB4", // замените на актуальный
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Ошибка HTTP ${response.status}: ${text}`);
        }
    
        const data = await response.json();
    
        if (!Array.isArray(data)) {
          console.error('Ожидался массив, но получено:', data);
          return;
        }
    
        const tableBody = document.getElementById('table_body');
        tableBody.innerHTML = '';
    
        const statusMap = {
          1: 'Не начато',
          2: 'В работе',
          5: 'Завершено'
        };
    
        const typeMap = {
          1: 'Тип 1',
          2: 'Тип 2'
        };
    
        data.forEach((item) => {
          const row = document.createElement('tr');
    
          row.innerHTML = `
            <td>—</td> <!-- Дата отсутствует -->
            <td>${typeMap[item.type_incident_id] || '—'}</td>
            <td class="copy-coords" data-coords="${item.latitude || '0'},${item.longitude || '0'}">
              ${item.latitude || '—'},${item.longitude || '—'}
            </td>
            <td>—</td> <!-- Фото отсутствует -->
            <td>
              <select class="status-select" data-id="${item.id}">
                ${Object.entries(statusMap).map(([key, label]) =>
                  `<option value="${key}" ${item.status_id == key ? 'selected' : ''}>${label}</option>`
                ).join('')}
              </select>
            </td>
            <td><a href="#" class="show-map" data-coords="${item.latitude || '0'},${item.longitude || '0'}">Показать</a></td>
          `;
    
          tableBody.appendChild(row);
        });
    
        document.querySelectorAll('.show-map').forEach(element => {
          element.addEventListener('click', function (event) {
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
          select.addEventListener('change', function () {
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
  