function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        else if (linkHref === 'index.html' && (currentPage === '' || currentPage === 'index.html')) {
            link.classList.add('active');
        }
        else if (linkHref === 'diplom.html' && currentPage === 'diplom.html') {
            link.classList.add('active');
        }
    });
  
    const contactForm = document.querySelector('.contact-form');
    const currentPath = window.location.pathname;
    

    if (contactForm && (currentPage === 'diplom.html' || currentPage === '' || currentPage === 'index.html')) {

        const requiredLabels = contactForm.querySelectorAll('label[for="name"], label[for="email"], label[for="message"]');
        requiredLabels.forEach(label => {
            label.innerHTML += ' <span class="required-star">*</span>';
        });
        

        const style = document.createElement('style');
        style.textContent = `
            .required-star {
                color: #9c0000;
                font-size: 16px;
            }
            .error-message {
                color: #9c0000;
                font-size: 12px;
                margin-top: 4px;
                display: none;
            }
            .error-field {
                border-color: #9c0000 !important;
            }
        `;
        document.head.appendChild(style);
        
        const fields = [
            { id: 'name', name: 'Имя' },
            { id: 'email', name: 'Email' },
            { id: 'message', name: 'Сообщение' }
        ];
        
        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.id = `${field.id}-error`;
            errorMsg.textContent = `Пожалуйста, заполните поле "${field.name}"`;
            input.parentNode.appendChild(errorMsg);
        });
        
        function showError(fieldId, message) {
            const input = document.getElementById(fieldId);
            const errorMsg = document.getElementById(`${fieldId}-error`);
            
            input.classList.add('error-field');
            errorMsg.textContent = message;
            errorMsg.style.display = 'block';
        }

        function hideError(fieldId) {
            const input = document.getElementById(fieldId);
            const errorMsg = document.getElementById(`${fieldId}-error`);
            
            input.classList.remove('error-field');
            errorMsg.style.display = 'none';
        }
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Функция проверки email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim()) {
                hideError('name');
            }
        });
        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim() && isValidEmail(emailInput.value)) {
                hideError('email');
            }
        });
        messageInput.addEventListener('input', () => {
            if (messageInput.value.trim()) {
                hideError('message');
            }
        });
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            if (!nameInput.value.trim()) {
                showError('name', 'Пожалуйста, введите ваше имя');
                isValid = false;
            } else {
                hideError('name');
            }
            if (!emailInput.value.trim()) {
                showError('email', 'Пожалуйста, введите ваш email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError('email', 'Пожалуйста, введите корректный email адрес');
                isValid = false;
            } else {
                hideError('email');
            }
            if (!messageInput.value.trim()) {
                showError('message', 'Пожалуйста, введите ваше сообщение');
                isValid = false;
            } else {
                hideError('message');
            }
            
            if (!isValid) {
                const firstError = contactForm.querySelector('.error-field');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Отправляется...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                fields.forEach(field => {
                    hideError(field.id);
                });
            }, 1500);
        });
    }
});