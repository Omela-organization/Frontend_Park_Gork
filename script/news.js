const openModalBtn = document.getElementById('openModal');
const newsModal = document.getElementById('newsModal');
const closeModalBtn = document.getElementById('closeModal');
const newsForm = document.getElementById('newsForm');
const newsGrid = document.getElementById('newsGrid');
const modalTitle = document.getElementById('modalTitle');

let newsList = [];
let editingIndex = null; // индекс новости, которую редактируем

// Открыть модальное окно для новой новости
openModalBtn.addEventListener('click', () => {
  editingIndex = null;
  modalTitle.textContent = 'Новая новость';
  newsForm.reset();
  newsModal.style.display = 'flex';
});

// Закрыть модальное окно
closeModalBtn.addEventListener('click', () => {
  newsModal.style.display = 'none';
});

// Закрывать модал по клику вне контента
newsModal.addEventListener('click', (e) => {
  if (e.target === newsModal) {
    newsModal.style.display = 'none';
  }
});

// Создать DOM-карточку новости
function createNewsCard(news, index) {
  const card = document.createElement('div');
  card.className = 'news-card';

  const img = document.createElement('img');
  img.className = 'news-img';
  img.src = news.imageSrc || 'https://via.placeholder.com/400x180?text=No+Image';
  card.appendChild(img);

  const title = document.createElement('h3');
  title.textContent = news.title;
  card.appendChild(title);

  const date = document.createElement('p');
  date.className = 'news-date';
  date.textContent = new Date(news.date).toLocaleDateString('ru-RU');
  card.appendChild(date);

  const text = document.createElement('p');
  text.className = 'news-text';
  text.textContent = news.text;
  card.appendChild(text);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'buttons';

  // Кнопка "Подробнее"
  const readMoreBtn = document.createElement('button');
  readMoreBtn.className = 'read-more';
  readMoreBtn.textContent = 'Подробнее';
  readMoreBtn.onclick = () => {
    alert(`Полный текст новости:\n\n${news.text}`);
  };

  // Кнопка "Редактировать"
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-news';
  editBtn.textContent = 'Редактировать';
  editBtn.onclick = () => {
    editingIndex = index;
    modalTitle.textContent = 'Редактирование новости';
    fillForm(news);
    newsModal.style.display = 'flex';
  };

  buttonsDiv.appendChild(readMoreBtn);
  buttonsDiv.appendChild(editBtn);
  card.appendChild(buttonsDiv);

  return card;
}

// Заполнить форму данными новости (для редактирования)
function fillForm(news) {
  newsForm.title.value = news.title;
  newsForm.date.value = news.date;
  newsForm.text.value = news.text;
  newsForm.image.value = ''; // очищаем input file, загрузка новой необязательна
}

// Отрисовать все новости в сетке
function renderNews() {
  newsGrid.innerHTML = '';
  newsList.forEach((news, index) => {
    const card = createNewsCard(news, index);
    newsGrid.appendChild(card);
  });
}

// Обработка загрузки файла (преобразуем в data URL)
function getImageSrc(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// Обработка отправки формы
newsForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = newsForm.title.value.trim();
  const date = newsForm.date.value;
  const text = newsForm.text.value.trim();
  const file = newsForm.image.files[0];

  const imageSrc = await getImageSrc(file);

  if (editingIndex === null) {
    // Добавляем новую новость
    newsList.push({ title, date, text, imageSrc });
  } else {
    // Обновляем существующую новость
    const oldImageSrc = newsList[editingIndex].imageSrc;
    newsList[editingIndex] = {
      title,
      date,
      text,
      imageSrc: imageSrc || oldImageSrc, // если не загружено новое фото — оставить старое
    };
  }

  renderNews();
  newsModal.style.display = 'none';
  newsForm.reset();
  editingIndex = null;
});

// Инициализация (можно добавить примеры)
renderNews();
