document.addEventListener('DOMContentLoaded', function() {
    const menuCheckbox = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.menu li a');
    const nav = document.querySelector('.nav');

    // Ensure the navbar is visible
    nav.style.display = 'block';

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuCheckbox.checked = false;
        });
    });

    // Update the menu opening animation
    menuCheckbox.addEventListener('change', function() {
        const menu = document.querySelector('.menu');
        if (this.checked) {
            menu.style.display = 'flex';
            menu.style.flexDirection = 'column-reverse';
            setTimeout(() => {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
            }, 10);
        } else {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            setTimeout(() => {
                menu.style.display = 'none';
            }, 300);
        }
    });
});