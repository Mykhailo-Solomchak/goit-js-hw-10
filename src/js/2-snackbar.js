// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event){
    event.preventDefault()
    const { delay,state}=event.target.elements;

createPromise(+delay.value,state.value).then(value =>{
    iziToast.success({
        position: "topRight", message: `✅ Fulfilled promise in ${value}ms`
})
}).catch(value =>{
    iziToast.error({
        position: "topRight", message: `❌ Rejected promise in ${value}ms`

    })
})
form.reset();
}


function createPromise(delay,shouldResolve){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve ==="fulfilled") {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay);
    });
}