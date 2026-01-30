//index.js
import "../css/style.css";
import "../components/notification.js";
import {
  getNumberOfGrades,
  getFirstGrade,
  getLastGrade,
  getAverageGrade,
} from "./stats.js";
import { Notification } from "../components/notification.js";
const gradesForm = document.querySelector("#grades-form"); // получение формы
const yourGrade = document.querySelector("#your-grade"); // получение инпута
const gradesList = document.querySelector("#grade-list")// получение истории
const sortSelect = document.querySelector("#sort")//получение селекта (сортировка)

const grades = [14, 9, 13, 15, 18];

/**
 * Добавляет слушатель события изменения сортировки.
 * @param {number[]} grades - Массив оценок.
 */
export function addSortEventListener(grades) {
if(sortSelect){
  /**
     * Функция, вызываемая при изменении значения в select.
     * Сортирует массив оценок в соответствии с выбранным значением.
     */
    sortSelect.addEventListener("change", ()=>{
      const selectedValue = sortSelect.value
      if(selectedValue==="asc"){
        grades.sort((a,b)=>a-b)
      }else if( selectedValue==="desc"){
        grades.sort((a,b)=>b-a)
      }
       
// Обновляет историю оценок после сортировки.
 updateGradesHistory(grades);
      
    })
   }
}


addSortEventListener(grades);

/**
 *
 * Функция для отрисовки истории оценок
 * @param {array} grades - массив оценок
 */
export function updateGradesHistory(grades) {
  if (gradesList) {
    gradesList.innerHTML = ""
    grades.forEach(function (grade, index) {
      const listItemHTML = `<li>
      <span class="grade">${grade}</span>
      <button class="btn-icon" data-btn-action="edit" data-index=${index}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1 13H15V14H1V13ZM12.7 4.5C13.1 4.1 13.1 3.5 12.7 3.1L10.9 1.3C10.5 0.9 9.9 0.9 9.5 1.3L2 8.8V12H5.2L12.7 4.5ZM10.2 2L12 3.8L10.5 5.3L8.7 3.5L10.2 2ZM3 11V9.2L8 4.2L9.8 6L4.8 11H3Z" fill="#161616"/>
              </svg>
      </button>
      <button class="btn-icon" data-btn-action="delete" data-index=${index}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1H6V2H10V1ZM2 3V4H3V14C3 14.6 3.4 15 4 15H12C12.6 15 13 14.6 13 14V4H14V3H2ZM4 14V4H12V14H4ZM6 6H7V12H6V6ZM10 6H9V12H10V6Z" fill="#161616"/>
              </svg>
      </button>
      </li>`

      gradesList.insertAdjacentHTML("beforeend", listItemHTML)// вставка шаблона в историю оценок

      const editButtons = document.querySelectorAll('[ data-btn-action="edit"]') // получение всех кнопок редактирования
      const deleteButtons = document.querySelectorAll('[ data-btn-action="delete"]')// получение всех кнопок удаления

      editButtons.forEach((button) => {
        button.addEventListener("click", handleEditClick)
      })

      deleteButtons.forEach(button => button.addEventListener("click", handleDeleteClick))
    })
  }
}
/**
 * Обработчик клика на кнопку редактирования оценки.
 * @param {Event} event - Событие клика.
 */
function handleEditClick(event){
  // Получаем индекс оценки из атрибута data-index кнопки, на которую кликнули
  const index = event.currentTarget.dataset.index
   // Запрашиваем у пользователя новую оценку
   const newGrade = prompt("Введите новую оценку")
   // Проверяем, была ли введена новая оценка
   if( newGrade!==null && newGrade!==""){
     // Если введена не пустая строка и не отмена, обновляем оценку в массиве
     grades[index]= Number.parseInt(newGrade,10)
     updateGradesHistory(grades)

    

   }
}
/**
 * Обработчик клика на кнопку удаления оценки.
 * @param {Event} event - Событие клика.
 */
function handleDeleteClick(event){
  // Получаем индекс оценки из атрибута data-index кнопки, на которую кликнули
  const index = event.currentTarget.dataset.index
  const confirmationMessage = "Вы действительно хотите удалить оценку?"
 const isConfirmed = confirm(confirmationMessage)
 if(isConfirmed){
  grades.splice(index,1)// удаляем оценку по индексу в кол-ве 1 оценки

    // Обновляем историю оценок
    updateGradesHistory(grades)

     // Отображаем уведомление об удалении оценки
 new Notification({
  variant:"warning",
  title:"Сообщение предупреждение",
  subtitle:"Описание действий",
  
})
      
 }
}
/**
 *
 * Функция для отрисовки данных
 * @param {array} grades - массив оценок
 */
function render(grades) {
  const tbody = document.querySelector("#stats-table tbody");

  if (tbody) {
    tbody.innerHTML = `
    <tr>
      <td>${getNumberOfGrades(grades)}</td>
      <td>${getFirstGrade(grades)}</td>
      <td>${getLastGrade(grades)}</td>
      <td>${getAverageGrade(grades)}</td>
    </tr>`;
    updateGradesHistory(grades);
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
