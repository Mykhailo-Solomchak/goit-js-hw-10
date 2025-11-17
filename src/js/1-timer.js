// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("[data-start]");
const spanDays = document.querySelector("[data-days]");
const spanHours = document.querySelector("[data-hours]");
const spanMinutes = document.querySelector("[data-minutes]");
const spanSeconds = document.querySelector("[data-seconds]");


btn.addEventListener("click",startTimer);


let timerId = null;
let userSelectedDate = null;

btn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if(selectedDates[0]<=new Date()){
            iziToast.error({ position: "topRight", message: "Please choose a date in the future" })
            btn.disabled = true;
        }else{
            userSelectedDate = selectedDates[0];
            btn.disabled = false;
        }
    },
};

flatpickr(input, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
function startTimer(){
    btn.disabled = true;
    input.disabled = true;
    timerId = setInterval(()=>{
        const diff = userSelectedDate-new Date();
        if (diff <= 0){
            clearInterval(timerId);
            input.disabled = false;
        }else{
            updateTimer(diff)
        }
    },1000)
}
function updateTimer(time){
    const { days, hours, minutes, seconds } = convertMs(time);
    spanDays.textContent = addLeadingZero(days);
    spanHours.textContent = addLeadingZero(hours);
    spanMinutes.textContent = addLeadingZero(minutes);
    spanSeconds.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value){
    return String(value).padStart(2, "0");
}
