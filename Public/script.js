let buttonAnim = document.querySelector(".buttonOff")
let inputId = document.querySelector(".js-input-id")
let bg = document.querySelectorAll('.mouse-parallax');

// Кнопка отравить для input ID
function renderButton() {
    inputId.oninput = function () {
        if (this.value === "") return buttonAnim.classList.remove("buttonIn")
        buttonAnim.classList.add("buttonIn")
    }
}

// move Paralax sphere
for (let i = 0; i < bg.length; i++) {
    window.addEventListener('mousemove', function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        bg[i].style.transform = 'translate(-' + x * 90 + 'px, -' + y * 90 + 'px)';
    });
}

renderButton()