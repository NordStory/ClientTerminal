// Основные элементы DOM
let buttonAnim = document.querySelector(".buttonOff");
let inputId = document.querySelector(".js-input-id");
let formId = document.querySelector(".formId");
let bg = document.querySelectorAll('.mouse-parallax');

// Кнопка отправить для input ID
function renderButton() {
    if (!inputId || !buttonAnim) return;
    
    inputId.oninput = function () {
        if (this.value.trim() === "") {
            buttonAnim.classList.remove("buttonIn");
        } else {
            buttonAnim.classList.add("buttonIn");
        }
    };
}

// Обработка отправки формы
function handleFormSubmit() {
    if (!formId) return;
    
    formId.addEventListener('submit', function(e) {
        const inventoryId = inputId.value.trim();
        
        // Валидация
        if (!inventoryId) {
            e.preventDefault();
            showMessage('Пожалуйста, введите Inventory ID', 'error');
            return;
        }
        
        // Показываем индикатор загрузки
        const submitButton = formId.querySelector('.button-success');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Скрываем сообщение об ошибке, если оно было
        hideMessage();
    });
}

// Показ сообщений пользователю
function showMessage(message, type = 'info') {
    // Удаляем существующие сообщения
    hideMessage();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message--${type}`;
    messageDiv.textContent = message;
    
    // Добавляем стили
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Цвета для разных типов сообщений
    if (type === 'error') {
        messageDiv.style.backgroundColor = '#e74c3c';
    } else if (type === 'success') {
        messageDiv.style.backgroundColor = '#27ae60';
    } else {
        messageDiv.style.backgroundColor = '#3498db';
    }
    
    document.body.appendChild(messageDiv);
    
    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
        hideMessage();
    }, 5000);
}

// Скрытие сообщений
function hideMessage() {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Параллакс эффект для сфер
function initParallax() {
    if (!bg.length) return;
    
    for (let i = 0; i < bg.length; i++) {
        window.addEventListener('mousemove', function (e) {
            let x = e.clientX / window.innerWidth;
            let y = e.clientY / window.innerHeight;
            bg[i].style.transform = 'translate(-' + x * 90 + 'px, -' + y * 90 + 'px)';
        });
    }
}

// Добавляем CSS анимации
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .message {
            transition: all 0.3s ease;
        }
        
        .button-success:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}

// Инициализация приложения
function init() {
    addAnimations();
    renderButton();
    handleFormSubmit();
    initParallax();
    
    // Фокус на поле ввода при загрузке страницы
    if (inputId) {
        inputId.focus();
    }
}

// Запуск приложения после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}