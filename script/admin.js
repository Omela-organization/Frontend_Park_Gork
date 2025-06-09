// admin.js

// Роли: отображение ↔ ID из API
const roleLabelToId = {
  "admin": 2,
  "manager": 3,
  "user": 1
};

const roleIdToLabel = {
  1: "user",
  2: "admin",
  3: "manager"
};

// Токен авторизации (временно захардкожен, позже можешь хранить в localStorage)
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiZDM2MzY2ZjYtMjZhNy00Y2JiLThhODAtOWJkZTE5NjFkZjk0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ5NTAwOTM3LCJleHAiOjE3NDk1MDQ1Mzd9.rwV53w8bki8lrczRKZVNg01NO6vQsnDhWkBAk561xrE";

document.addEventListener("DOMContentLoaded", loadUsers);

async function loadUsers() {
  try {
    const res = await fetch("http://213.171.28.81:7000/api/v1/profiles/", {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

    const profiles = await res.json();

    // Для каждого профиля получаем пользователя
    const usersData = await Promise.all(
      profiles.map(async profile => {
        const userRes = await fetch(`http://213.171.28.81:7000/api/v1/users/${profile.user_id}`, {
          headers: { "Authorization": token }
        });
        if (!userRes.ok) return null;
        const user = await userRes.json();
        return {
          ...profile,
          email: user.email,
          username: user.username,
          role_id: user.role_id
        };
      })
    );

    // Отфильтровать null (если не удалось получить пользователя)
    const users = usersData.filter(Boolean);

    fillTable(users);
  } catch (e) {
    console.error("Не удалось загрузить пользователей", e);
  }
}

function fillTable(users) {
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement("tr");
    row.dataset.userId = user.user_id;
    row.dataset.profileId = user.id;
    row.dataset.username = user.username;
    row.dataset.email = user.email;

    const currentRoleLabel = roleIdToLabel[user.role_id] || "user";

    row.innerHTML = `
      <td>${user.user_id}</td>
      <td>${user.first_name || '-'}</td>
      <td>${user.last_name || '-'}</td>
      <td>${user.email || '-'}</td>
      <td class="role-display">${currentRoleLabel}</td>
      <td>
        <select class="custom-select">
          <option value="admin">admin</option>
          <option value="manager">manager</option>
          <option value="user">user</option>
        </select>
      </td>
      <td><button class="btn-primary_role">Применить изменения</button></td>
      <td><button class="btn-delete_user">Удалить пользователя</button></td>
    `;

    row.querySelector(".custom-select").value = currentRoleLabel;
    row.querySelector(".btn-primary_role").addEventListener("click", () => applyChanges(row));
    row.querySelector(".btn-delete_user").addEventListener("click", () => deleteUser(row));

    tbody.appendChild(row);
  });
}

async function applyChanges(row) {
  const userId = row.dataset.userId;
  const selectedLabel = row.querySelector(".custom-select").value;
  const role_id = roleLabelToId[selectedLabel];
  const username = row.dataset.username;
  const email = row.dataset.email;

  try {
    const res = await fetch(`http://213.171.28.81:7000/api/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role_id,
        username,
        email
      })
    });

    if (!res.ok) throw new Error(res.status);

    row.querySelector(".role-display").textContent = selectedLabel;
    console.log(`Роль обновлена до ${selectedLabel}`);
  } catch (e) {
    console.error("Ошибка при обновлении роли", e);
  }
}

async function deleteUser(row) {
  const profileId = row.dataset.profileId;
  const userId = row.dataset.userId;

  if (!confirm(`Удалить пользователя и его профиль?`)) return;

  try {
    // Удаляем профиль
    const resProfile = await fetch(`http://213.171.28.81:7000/api/v1/profiles/${profileId}`, {
      method: "DELETE",
      headers: { 'Authorization': token }
    });

    if (![200, 204, 404].includes(resProfile.status)) {
      throw new Error(`Ошибка при удалении профиля: ${resProfile.status}`);
    }

    // Удаляем пользователя
    const resUser = await fetch(`http://213.171.28.81:7000/api/v1/users/${userId}`, {
      method: "DELETE",
      headers: { 'Authorization': token }
    });

    if (resUser.status === 204) {
      row.remove();
      console.log("Пользователь и профиль удалены");
    } else {
      throw new Error(resUser.status);
    }
  } catch (e) {
    console.error("Ошибка при удалении пользователя", e);
  }
}
