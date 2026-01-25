import {
  getNumberOfGrades,
  getFirstGrade,
  getLastGrade,
  getAverageGrade,
} from "./stats.js";
import { Notification } from "./components/notification.js";
const gradesForm = document.querySelector("#grades-form"); // получение формы
const yourGrade = document.querySelector("#your-grade"); // получение инпута

const grades = [14, 9, 13, 15, 18];

/**
 *
 * Функция для отрисовки данных
 * @param {array} grades - массив оценок
 */
export function render(grades) {
  const tbody = document.querySelector("#stats-table tbody");

  if (tbody) {
    tbody.innerHTML = `
    <tr>
      <td>${getNumberOfGrades(grades)}</td>
      <td>${getFirstGrade(grades)}</td>
      <td>${getLastGrade(grades)}</td>
      <td>${getAverageGrade(grades)}</td>
    </tr>`;
  }
}

if (gradesForm) {
  gradesForm.addEventListener("submit", (event) => {
    // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    event.preventDefault();

    // Получаем новую оценку из поля ввода и преобразуем в число
    const newGrade = Number.parseInt(yourGrade.value, 10);
// Валидация: проверяем, что оценка — число от 1 до 20
if (Number.isNaN(newGrade) || newGrade < 1 || newGrade > 20) {
  new Notification({
    variant: "error",
    title: "Неверная оценка",
    subtitle: "Оценка должна быть от 1 до 20",
  });
  return;
}

// Сообщаем об успехе
new Notification({
  variant: "success",
  title: "Оценка добавлена",
  subtitle: `Вы добавили оценку: ${newGrade}`,
});

// Выполняем действия
grades.push(newGrade);
yourGrade.value = "";
render(grades);

  });
  
}

// Для первичной отрисовки
render(grades);
