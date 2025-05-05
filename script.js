// Event Handling: Button Click, Hover, Double-Click
const magicButton = document.getElementById('magicButton');
const secretMessage = document.getElementById('secretMessage');
let isToggled = false;

magicButton.addEventListener('click', () => {
    isToggled = !isToggled;
    magicButton.textContent = isToggled ? 'Wow, Magic!' : 'Click Me!';
    magicButton.style.backgroundColor = isToggled ? '#e91e63' : '#007bff';
});

// Double-click secret action
magicButton.addEventListener('dblclick', () => {
    secretMessage.classList.toggle('hidden');
    secretMessage.classList.toggle('show');
    setTimeout(() => {
        secretMessage.classList.add('hidden');
        secretMessage.classList.remove('show');
    }, 3000); // Hide after 3 seconds
});

// Keypress Detection
const keyInput = document.getElementById('keyInput');
const keyOutput = document.getElementById('keyOutput');

keyInput.addEventListener('keypress', (e) => {
    keyOutput.textContent = `Pressed key: ${e.key}`;
});

// Slideshow
const slideImage = document.getElementById('slideImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const images = [
    'https://placehold.co/400x200?text=Image+1',
    'https://placehold.co/400x200?text=Image+2',
    'https://placehold.co/400x200?text=Image+3'
];
let currentImage = 0;

function updateSlide() {
    slideImage.style.opacity = 0;
    setTimeout(() => {
        slideImage.src = images[currentImage];
        slideImage.style.opacity = 1;
    }, 500);
}

prevBtn.addEventListener('click', () => {
    currentImage = (currentImage - 1 + images.length) % images.length;
    updateSlide();
});

nextBtn.addEventListener('click', () => {
    currentImage = (currentImage + 1) % images.length;
    updateSlide();
});

// Pause slideshow on hover
slideImage.addEventListener('mouseenter', () => {
    slideImage.style.cursor = 'pointer';
});
slideImage.addEventListener('mouseleave', () => {
    slideImage.style.cursor = 'default';
});

// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Hide all tab contents
        tabContents.forEach(content => content.classList.add('hidden'));
        // Add active class to clicked button
        button.classList.add('active');
        // Show corresponding tab content
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.remove('hidden');
    });
});

// Form Validation
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add('invalid');
}

function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove('invalid');
}

// Real-time validation
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, 'Name is required');
    } else {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener('input', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Enter a valid email');
    } else {
        clearError(emailInput, emailError);
    }
});

passwordInput.addEventListener('input', () => {
    if (!validatePassword(passwordInput.value)) {
        showError(passwordInput, passwordError, 'Password must be 8+ characters with a letter and number');
    } else {
        clearError(passwordInput, passwordError);
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, 'Name is required');
        isValid = false;
    } else {
        clearError(nameInput, nameError);
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Enter a valid email');
        isValid = false;
    } else {
        clearError(emailInput, emailError);
    }

    if (!validatePassword(passwordInput.value)) {
        showError(passwordInput, passwordError, 'Password must be 8+ characters with a letter and number');
        isValid = false;
    } else {
        clearError(passwordInput, passwordError);
    }

    if (isValid) {
        alert('Form submitted successfully! 🎉');
        form.reset();
    }
});