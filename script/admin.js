document.addEventListener("DOMContentLoaded", function () {
    const users = [
        { id: 1, firstName: "Иван", lastName: "Иванов", email: "ivan@gmail.com", role: "Админ" },
        { id: 2, firstName: "Мария", lastName: "Иванова", email: "maria@gmail.com", role: "Пользователь" },
        { id: 3, firstName: "Алексей", lastName: "Сидоров", email: "alex@gmail.com", role: "Модератор" }
    ];

  const tableBody = document.querySelector("#usersTable tbody");

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td class="role-display">${user.role}</td>
            <td>
                <select class="custom-select">
                    <option value="Админ" ${user.role === "Админ" ? "selected" : ""}>Админ</option>
                     <option value="Модератор" ${user.role === "Модератор" ? "selected" : ""}>Модератор</option>
                    <option value="Пользователь" ${user.role === "Пользователь" ? "selected" : ""}>Пользователь</option>
                </select>
            </td>
            <td><button onclick="applyChanges(this)" class="btn-primary_role">Применить изменения</button></td>
            <td><button onclick="deleteUser(this)" class="btn-delete_user">Удалить пользователя</button></td>
        `;
        tableBody.appendChild(row);
    });
});

function applyChanges(button) {
    const row = button.closest("tr");
    const select = row.querySelector(".role-select");
    const roleDisplay = row.querySelector(".role-display");
    const newRole = select.value;
    roleDisplay.textContent = newRole;
    console.log("Роль пользователя обновлена до:", newRole);
}

function deleteUser(button) {
    const row = button.closest("tr");
    row.remove();
    console.log("Пользователь удален");
}
