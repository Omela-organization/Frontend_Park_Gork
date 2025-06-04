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

function createStatusModal() {
  if (document.getElementById('status-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'status-modal';
  modal.style = `
    display:none;position:fixed;z-index:10000;left:0;top:0;width:100vw;height:100vh;
    background:rgba(0,0,0,0.15);justify-content:center;align-items:center;
  `;
  modal.innerHTML = `
    <div id="status-modal-content" style="position:relative;max-width:400px;width:90vw;background:#fff;padding:30px 20px 20px 20px;border-radius:10px;box-shadow:0 2px 16px #000;">
      <span id="status-modal-close" style="position:absolute;top:10px;right:20px;font-size:32px;color:#333;cursor:pointer;z-index:2;">&times;</span>
      <h3 style="margin-top:0;">Изменить статус проверки</h3>
      <label for="modal-status-select">Статус:</label>
      <select id="modal-status-select" style="width:100%;margin-bottom:15px;">
        <option value="создано">Создано</option>
        <option value="в работе">В работе</option>
        <option value="закрыто">Закрыто</option>
        <option value="на рассмотрении">На рассмотрении</option>
        <option value="отклонено">Отклонено</option>
        <option value="утверждено">Утверждено</option>
      </select>
      <label for="modal-status-file">Прикрепить отчет (PDF):</label>
      <input type="file" id="modal-status-file" accept="application/pdf" style="margin-bottom:15px;width:100%;">
      <div id="modal-status-file-info" style="font-size:13px;color:#555;margin-bottom:10px;"></div>
      <button id="modal-status-save" style="width:100%;margin-top:10px;background:#7ed957;color:#fff;font-weight:bold;border:none;border-radius:6px;padding:10px 0;box-shadow:0 2px 8px rgba(126,217,87,0.08);cursor:pointer;">Сохранить</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('status-modal-close').onclick = function() {
    modal.style.display = 'none';
  };
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
}

function openStatusModal(row, currentStatus, currentFileUrl) {
  createStatusModal();
  const modal = document.getElementById('status-modal');
  const select = document.getElementById('modal-status-select');
  const fileInput = document.getElementById('modal-status-file');
  const fileInfo = document.getElementById('modal-status-file-info');
  select.value = currentStatus || "создано";
  fileInput.value = "";
  fileInfo.textContent = currentFileUrl ? `Текущий файл: <a href="${currentFileUrl}" target="_blank">PDF</a>` : "";

  modal.style.display = 'flex';

  document.getElementById('modal-status-save').onclick = function() {
    // Обновляем статус в таблице
    const newStatus = select.value;
    row.querySelector('.status-cell').textContent = newStatus;

    // Обновляем файл (только визуально, загрузка на сервер не реализована)
    let fileName = "";
    let fileUrl = "";
    if (fileInput.files && fileInput.files[0]) {
      fileName = fileInput.files[0].name;
      fileUrl = URL.createObjectURL(fileInput.files[0]);
      row.querySelector('.status-file-cell').innerHTML = `<a href="${fileUrl}" target="_blank">${fileName}</a>`;
    } else if (currentFileUrl) {
      row.querySelector('.status-file-cell').innerHTML = `<a href="${currentFileUrl}" target="_blank">PDF</a>`;
    } else {
      row.querySelector('.status-file-cell').textContent = "";
    }

    // При изменении статуса меняем "не просмотрено" на "просмотрено"
    const viewedCell = row.querySelector('.viewed-cell');
    if (viewedCell && viewedCell.textContent.trim() === 'не просмотрено') {
      viewedCell.textContent = 'просмотрено';
    }

    modal.style.display = 'none';
    // Здесь можно вызвать updateStatus(id, newStatus) и загрузку файла на сервер, если потребуется
  };

  fileInput.onchange = function() {
    if (fileInput.files && fileInput.files[0]) {
      fileInfo.textContent = `Выбран файл: ${fileInput.files[0].name}`;
    } else {
      fileInfo.textContent = "";
    }
  };
}

async function fetchData() {
  try {
    const response = await fetch("reports.json");
    const data = await response.json();

    const tableBody = document.getElementById('table_body');
    tableBody.innerHTML = '';

    data.forEach((item) => {
      const row = document.createElement('tr');

      const viewed = item.viewed === true || item.viewed === "просмотрено" ? "просмотрено" : "не просмотрено";
      // Статус всегда "создано" по умолчанию
      const status = "создано";
      // Для файла отчета
      const statusFile = "";

      row.innerHTML = `
        <td>${item.date}</td>
        <td>${item.violationType}</td>
        <td class="copy-coords" data-coords="${item.coordinates}">${item.coordinates}</td>
        <td><a href="${item.photo}" class="photo-link" data-photo="${item.photo}">Фото</a></td>
        <td class="status-cell" style="cursor:pointer;color:#337ab7;text-decoration:underline;">${status}</td>
        <td><a href="#" class="show-map" data-coords="${item.coordinates}">Показать</a></td>
        <td class="viewed-cell">${viewed}</td>
        <td class="status-file-cell"></td>
      `;

      tableBody.appendChild(row);
    });

    // Модальное окно для фото
    if (!document.getElementById('photo-modal')) {
      const modal = document.createElement('div');
      modal.id = 'photo-modal';
      modal.style = `
        display:none;position:fixed;z-index:9999;left:0;top:0;width:100vw;height:100vh;
        background:rgba(0,0,0,0.7);justify-content:center;align-items:center;
      `;
      modal.innerHTML = `
        <div id="photo-modal-content" style="position:relative;max-width:90vw;max-height:90vh;">
          <span id="photo-modal-close" style="position:absolute;top:10px;right:20px;font-size:32px;color:#fff;cursor:pointer;z-index:2;">&times;</span>
          <img id="photo-modal-img" src="" alt="Фото" style="max-width:90vw;max-height:80vh;display:block;margin:auto;border-radius:8px;box-shadow:0 2px 16px #000;">
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('photo-modal-close').onclick = function() {
        modal.style.display = 'none';
      };
      modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
      };
    }

    document.querySelectorAll('.photo-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const modal = document.getElementById('photo-modal');
        const img = document.getElementById('photo-modal-img');
        img.src = this.getAttribute('data-photo');
        modal.style.display = 'flex';
      });
    });

    // Модальное окно для изменения статуса
    document.querySelectorAll('.status-cell').forEach(cell => {
      cell.addEventListener('click', function() {
        const row = this.closest('tr');
        const currentStatus = this.textContent.trim();
        const currentFileUrl = row.querySelector('.status-file-cell a') ? row.querySelector('.status-file-cell a').href : "";
        openStatusModal(row, currentStatus, currentFileUrl);
      });
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
