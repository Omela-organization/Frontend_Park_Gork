var tableData = [
  { date: "2023-11-03", fullName: "Иван Иванов", age: 35, violationsLastWeeks: { type1: 2, type2: 3, type3: 0 }, totalViolations: { type1: 5, type2: 5, type3: 0}, socialNetworks: "vk.com/user_ivanov" },
  { date: "2023-11-02", fullName: "Петр Петров", age: 28, violationsLastWeeks: { type1: 1, type2: 2, type3: 5 }, totalViolations: { type1: 3, type2: 5, type3: 9 }, socialNetworks: "instagram.com/petrov_peter" },
  { date: "2023-11-04", fullName: "Анна Сидорова", age: 45, violationsLastWeeks: { type1: 3, type2: 4 , type3: 2}, totalViolations: { type1: 7, type2: 8, type3: 7 }, socialNetworks: "facebook.com/sidorova_anna" },
  { date: "2023-11-05", fullName: "Елена Кузнецова", age: 30, violationsLastWeeks: { type1: 4, type2: 1, type3: 3 }, totalViolations: { type1: 8, type2: 4, type3: 6 }, socialNetworks: "twitter.com/kuznetsova_e" },
  { date: "2023-11-06", fullName: "Алексей Смирнов", age: 25, violationsLastWeeks: { type1: 2, type2: 5, type3: 1 }, totalViolations: { type1: 6, type2: 10, type3: 3 }, socialNetworks: "linkedin.com/smirnov_a" },
  { date: "2023-11-07", fullName: "Мария Федорова", age: 32, violationsLastWeeks: { type1: 1, type2: 3, type3: 4 }, totalViolations: { type1: 3, type2: 7, type3: 8 }, socialNetworks: "vk.com/fedorova_m" },
  { date: "2023-11-08", fullName: "Дмитрий Лебедев", age: 29, violationsLastWeeks: { type1: 5, type2: 2, type3: 1 }, totalViolations: { type1: 10, type2: 5, type3: 2 }, socialNetworks: "instagram.com/lebedev_d" },
  { date: "2023-11-09", fullName: "Ольга Николаева", age: 38, violationsLastWeeks: { type1: 3, type2: 4, type3: 2 }, totalViolations: { type1: 7, type2: 8, type3: 4 }, socialNetworks: "facebook.com/nikolaeva_o" },
  { date: "2023-11-10", fullName: "Сергей Кузьмин", age: 40, violationsLastWeeks: { type1: 2, type2: 3, type3: 5 }, totalViolations: { type1: 5, type2: 6, type3: 10 }, socialNetworks: "twitter.com/kuzmin_s" },
  { date: "2023-11-11", fullName: "Татьяна Павлова", age: 27, violationsLastWeeks: { type1: 4, type2: 1, type3: 3 }, totalViolations: { type1: 8, type2: 3, type3: 6 }, socialNetworks: "linkedin.com/pavlova_t" },
  { date: "2023-11-12", fullName: "Андрей Васильев", age: 33, violationsLastWeeks: { type1: 1, type2: 5, type3: 2 }, totalViolations: { type1: 3, type2: 10, type3: 4 }, socialNetworks: "vk.com/vasilev_a" },
  { date: "2023-11-13", fullName: "Юлия Соколова", age: 26, violationsLastWeeks: { type1: 3, type2: 2, type3: 4 }, totalViolations: { type1: 6, type2: 5, type3: 8 }, socialNetworks: "instagram.com/sokolova_y" },
  { date: "2023-11-14", fullName: "Игорь Морозов", age: 31, violationsLastWeeks: { type1: 2, type2: 4, type3: 1 }, totalViolations: { type1: 5, type2: 8, type3: 2 }, socialNetworks: "facebook.com/morozov_i" },
  { date: "2023-11-15", fullName: "Наталья Захарова", age: 37, violationsLastWeeks: { type1: 5, type2: 3, type3: 2 }, totalViolations: { type1: 10, type2: 6, type3: 4 }, socialNetworks: "twitter.com/zakharova_n" },
  { date: "2023-11-16", fullName: "Владимир Орлов", age: 42, violationsLastWeeks: { type1: 3, type2: 2, type3: 5 }, totalViolations: { type1: 7, type2: 5, type3: 10 }, socialNetworks: "linkedin.com/orlov_v" },
  { date: "2023-11-17", fullName: "Екатерина Волкова", age: 29, violationsLastWeeks: { type1: 4, type2: 1, type3: 3 }, totalViolations: { type1: 8, type2: 3, type3: 6 }, socialNetworks: "vk.com/volkova_e" },
  { date: "2023-11-18", fullName: "Роман Кудрявцев", age: 34, violationsLastWeeks: { type1: 2, type2: 5, type3: 1 }, totalViolations: { type1: 5, type2: 10, type3: 2 }, socialNetworks: "instagram.com/kudryavtsev_r" },
  { date: "2023-11-19", fullName: "Виктория Иванова", age: 36, violationsLastWeeks: { type1: 3, type2: 4, type3: 2 }, totalViolations: { type1: 7, type2: 8, type3: 4 }, socialNetworks: "facebook.com/ivanova_v" },
  { date: "2023-11-20", fullName: "Максим Сорокин", age: 28, violationsLastWeeks: { type1: 1, type2: 3, type3: 5 }, totalViolations: { type1: 3, type2: 6, type3: 10 }, socialNetworks: "twitter.com/sorokin_m" },
  { date: "2023-11-21", fullName: "Алиса Кузьмина", age: 30, violationsLastWeeks: { type1: 4, type2: 2, type3: 3 }, totalViolations: { type1: 8, type2: 5, type3: 6 }, socialNetworks: "linkedin.com/kuzmina_a" },
  { date: "2023-11-22", fullName: "Николай Лебедев", age: 35, violationsLastWeeks: { type1: 2, type2: 4, type3: 1 }, totalViolations: { type1: 5, type2: 8, type3: 2 }, socialNetworks: "vk.com/lebedev_n" },
  { date: "2023-11-23", fullName: "Ксения Павлова", age: 27, violationsLastWeeks: { type1: 3, type2: 1, type3: 4 }, totalViolations: { type1: 6, type2: 3, type3: 8 }, socialNetworks: "instagram.com/pavlova_k" },
  { date: "2023-11-24", fullName: "Евгений Васильев", age: 33, violationsLastWeeks: { type1: 1, type2: 5, type3: 2 }, totalViolations: { type1: 3, type2: 10, type3: 4 }, socialNetworks: "facebook.com/vasilev_e" },
  { date: "2023-11-25", fullName: "Анна Соколова", age: 26, violationsLastWeeks: { type1: 4, type2: 3, type3: 2 }, totalViolations: { type1: 8, type2: 6, type3: 4 }, socialNetworks: "twitter.com/sokolova_a" },
  { date: "2023-11-26", fullName: "Илья Морозов", age: 31, violationsLastWeeks: { type1: 2, type2: 4, type3: 3 }, totalViolations: { type1: 5, type2: 8, type3: 6 }, socialNetworks: "linkedin.com/morozov_i" },
  { date: "2023-11-27", fullName: "Мария Захарова", age: 37, violationsLastWeeks: { type1: 3, type2: 2, type3: 5 }, totalViolations: { type1: 7, type2: 5, type3: 10 }, socialNetworks: "vk.com/zakharova_m" },
  { date: "2023-11-28", fullName: "Денис Орлов", age: 42, violationsLastWeeks: { type1: 4, type2: 1, type3: 3 }, totalViolations: { type1: 8, type2: 3, type3: 6 }, socialNetworks: "instagram.com/orlov_d" },
  { date: "2023-11-29", fullName: "Елена Волкова", age: 29, violationsLastWeeks: { type1: 1, type2: 5, type3: 2 }, totalViolations: { type1: 3, type2: 10, type3: 4 }, socialNetworks: "facebook.com/volkova_e" },
  { date: "2023-11-30", fullName: "Артем Кудрявцев", age: 34, violationsLastWeeks: { type1: 3, type2: 4, type3: 1 }, totalViolations: { type1: 7, type2: 8, type3: 2 }, socialNetworks: "twitter.com/kudryavtsev_a" }
];


var table = new Tabulator("#example-table", {
  data: tableData,
  layout: "fitColumns",
  columns: [
      { title: "Дата", field: "date", sorter: "date" },
      { title: "ФИО", field: "fullName" },
      { title: "Возраст", field: "age", sorter: "number" },
      { title: "Сообщений за последние недели", field: "violationsLastWeeks", formatter: sumObjectValues, sorter: customSumSorter },
      { title: "Всего сообщений", field: "totalViolations", formatter: sumObjectValues, sorter: customSumSorter },
      { title: "Адреса в соцсетях", field: "socialNetworks" },
  ],
  initialSort:[
      { column: "violationsLastWeeks", dir: "desc" },
  ]
});

function showFilterPopup() {
  document.getElementById('filter-popup').style.display = 'block';
}

function closeFilterPopup() {
  document.getElementById('filter-popup').style.display = 'none';
}

function applyFilters() {
  var selectedValue = document.getElementById("violation-type").value;
  var minDate = document.getElementById("date-filter-min").value;
  var maxDate = document.getElementById("date-filter-max").value;
  var minAge = parseInt(document.getElementById("age-filter-min").value);
  var maxAge = parseInt(document.getElementById("age-filter-max").value);

  table.clearFilter(true);

  if (selectedValue !== "") {
      table.setColumns([
          { title: "Дата", field: "date", sorter: "date" },
          { title: "ФИО", field: "fullName" },
          { title: "Возраст", field: "age", sorter: "number" },
          { title: "Сообщений за последние недели", field: `violationsLastWeeks.${selectedValue}`, sorter: "number" },
          { title: "Всего сообщений", field: `totalViolations.${selectedValue}`, sorter: "number" },
          { title: "Адреса в соцсетях", field: "socialNetworks" },
      ]);
  } else {
      table.setColumns([
          { title: "Дата", field: "date", sorter: "date" },
          { title: "ФИО", field: "fullName" },
          { title: "Возраст", field: "age", sorter: "number" },
          { title: "Сообщений за последние недели", field: "violationsLastWeeks", formatter: sumObjectValues, sorter: customSumSorter },
          { title: "Всего сообщений", field: "totalViolations", formatter: sumObjectValues, sorter: customSumSorter },
          { title: "Адреса в соцсетях", field: "socialNetworks" },
      ]);
  }

  if (minDate && maxDate) {
      table.addFilter(function(data) {
          var date = new Date(data.date);
          return date >= new Date(minDate) && date <= new Date(maxDate);
      });
  } else if (minDate) {
      table.addFilter(function(data) {
          var date = new Date(data.date);
          return date >= new Date(minDate);
      });
  } else if (maxDate) {
      table.addFilter(function(data) {
          var date = new Date(data.date);
          return date <= new Date(maxDate);
      });
  }

  if (!isNaN(minAge) && !isNaN(maxAge)) {
      table.addFilter(function(data) {
          return data.age >= minAge && data.age <= maxAge;
      });
  } else if (!isNaN(minAge)) {
      table.addFilter(function(data) {
          return data.age >= minAge;
      });
  } else if (!isNaN(maxAge)) {
      table.addFilter(function(data) {
          return data.age <= maxAge;
      });
  }

  closeFilterPopup();
}

// Форматтер для суммирования значений объектов
function sumObjectValues(cell) {
  let obj = cell.getValue();
  return Object.values(obj).reduce((acc, val) => acc + val, 0);
}

// Кастомный сортировщик для суммированных значений
function customSumSorter(a, b, aRow, bRow) {
  let aVal = sumObjectValues({ getValue: () => a });
  let bVal = sumObjectValues({ getValue: () => b });
  return aVal - bVal;
}
