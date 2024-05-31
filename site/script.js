document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.querySelector('.register-button');
    const registrationPopup = document.querySelector('.registration-popup');
    const closeButton = document.querySelector('.close-button');
    const loginForm = document.getElementById('loginForm');

    registerButton.addEventListener('click', function() {
        registrationPopup.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
        registrationPopup.style.display = 'none';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const formData = new FormData(loginForm);
    
        fetch('login.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Login successful!') {
                const header = document.querySelector('header');
                const userDisplay = document.createElement('div');
                userDisplay.classList.add('user-display');
                userDisplay.textContent = `${formData.get('username')}`;
                header.appendChild(userDisplay);
                registrationPopup.style.display = 'none';

                // Сохранение имени пользователя в localStorage
                localStorage.setItem('username', formData.get('username'));
            } else {
                alert(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Отображение имени пользователя при загрузке страницы
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        const header = document.querySelector('header');
        const userDisplay = document.createElement('div');
        userDisplay.classList.add('user-display');
        userDisplay.textContent = storedUsername;
        header.appendChild(userDisplay);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const cartCounter = document.querySelector('.cart-counter');
    const cartModal = document.querySelector('.cart-modal');
    const cartTable = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Получаем данные корзины из localStorage
        cartCounter.textContent = cart.length;
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        updateCartCounter(); // Вызываем функцию при загрузке страницы
    });

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addItemToCart(item) {
        cart.push(item);
        saveCart();
        updateCartCounter();
    }

    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    const cartButton = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');

    cartButton.addEventListener('click', function() {
        cartModal.style.display = 'block';
        cartTable.innerHTML = '<tr><th>Item</th><th>Price</th></tr>';
        cart.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `<td>${item.name}</td><td>$${item.price.toFixed(2)}</td>`;
            cartTable.appendChild(newRow);
        });
        totalPriceElement.textContent = `$${calculateTotalPrice().toFixed(2)}`;
    });
    

    closeCart.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    const buyButtons = document.querySelectorAll('.product button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement;
            const itemName = product.querySelector('h3').textContent;
            const itemPrice = parseFloat(product.querySelector('p').textContent.slice(0, -1));
            addItemToCart({name: itemName, price: itemPrice});
            alert('Item added to cart!');
        });
    });

    updateCartCounter();
});

function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    cartCounter.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        cartCounter.textContent = cart.length;
    }

    updateCartCounter();

});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('themeToggle');
    const elementsToToggle = [
        document.body,
        document.querySelector('header'),
        document.querySelector('footer'),
        document.querySelector('.newsletter'),
        ...document.querySelectorAll('.product'),
        document.querySelector('.popup-content'),
        document.querySelector('.cart-content'),
        document.querySelector('.advertisement-content')
    ];

    // Функция для переключения темы
    function toggleTheme() {
        elementsToToggle.forEach(el => el.classList.toggle('dark-mode'));
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    }

    // Проверка сохраненной темы при загрузке страницы
    if (localStorage.getItem('darkMode') === 'enabled') {
        elementsToToggle.forEach(el => el.classList.add('dark-mode'));
    }

    // Событие для переключения темы
    themeToggleButton.addEventListener('click', toggleTheme);
});
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.sneaker-images img');
    const popup = document.getElementById('sneakerInfoPopup');
    const closeButton = document.querySelector('.close-button');

    images.forEach(image => {
        image.addEventListener('click', function() {
            const sneakerId = this.getAttribute('data-id');
            fetch(`get_sneaker.php?id=${sneakerId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        document.getElementById('sneakerId').textContent = data.sneaker_id;
                        document.getElementById('sneakerName').textContent = data.name;
                        document.getElementById('sneakerBrand').textContent = data.brand;
                        document.getElementById('sneakerModel').textContent = data.model;
                        document.getElementById('sneakerSize').textContent = data.size;
                        document.getElementById('sneakerColor').textContent = data.color;
                        document.getElementById('sneakerReleaseDate').textContent = data.release_date;
                        document.getElementById('sneakerRetailPrice').textContent = `$${data.retail_price}`;
                        document.getElementById('sneakerDescription').textContent = data.description;
                        document.getElementById('sneakerImage').src = data.image_url;
                        popup.style.display = 'block';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
    
});
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.sneaker-info-popup .close-button'); // Находим кнопку закрытия

    closeButton.addEventListener('click', function() { // Добавляем обработчик события клика
        const popup = document.getElementById('sneakerInfoPopup'); // Находим блок описания кроссовка
        popup.style.display = 'none'; // Закрываем блок описания кроссовка при клике на кнопку закрытия
    });
});
document.getElementById('registerButton').addEventListener('click', function () {
    window.location.href = 'login.html';
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.querySelector('.register-button');
    const userDisplay = document.querySelector('.user-display');
    const themeToggleButton = document.getElementById('themeToggle');

    // Function to display the username
    function displayUsername(username) {
        userDisplay.textContent = `${username}`;
    }

    // Event listener for the login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(loginForm);

            fetch('login.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'Login successful!') {
                    const username = formData.get('username');
                    localStorage.setItem('username', username);
                    displayUsername(username);
                    window.location.href = 'index.html';
                } else {
                    alert(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Display the username on page load if it exists in localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        displayUsername(storedUsername);
    }

    // Redirect to login page when register button is clicked
    registerButton.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
})
