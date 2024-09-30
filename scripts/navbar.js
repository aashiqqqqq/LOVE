document.addEventListener('DOMContentLoaded', function() {
const navbarHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navigation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="../styles/navbar.css">
    <script src="../scripts/navbar.js"></script>
</head>
<body>
    <nav class="nav">
        <input id="menu" type="checkbox">
        <label for="menu">Menu</label>
        <ul class="menu">
            <li>
                <a href="/index.html">
                    <span>Home</span>
                    <i class="fas fa-home" aria-hidden="true"></i>
                </a>
            </li>
            <li>
                <a href="/pages/question.html">
                    <span>Question</span>
                    <i class="fas fa-question-circle" aria-hidden="true"></i>
                </a>
            </li>
            <li>
                <a href="/pages/photos.html">
                    <span>Photos</span>
                    <i class="fas fa-photo-video" aria-hidden="true"></i>
                </a>
            </li>
            <li>
                <a href="/pages/game.html">
                    <span>Game</span>
                    <i class="fas fa-gamepad" aria-hidden="true"></i>
                </a>
            </li>
            <li>
                <a href="/pages/apology.html">
                    <span>Apology</span>
                    <i class="fas fa-heart-broken" aria-hidden="true"></i>
                </a>
            </li>
        </ul>
    </nav>
</body>
</html>

`;
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const navElement = doc.querySelector('.nav');
            
            if (navElement) {
                // Remove any existing styles or scripts
                navElement.querySelectorAll('style, script').forEach(el => el.remove());
                
                // Create a container for the navbar
                const navContainer = document.createElement('div');
                navContainer.id = 'navbar-container';
                navContainer.style.position = 'fixed';
                navContainer.style.bottom = '20px';
                navContainer.style.left = '20px';
                navContainer.style.zIndex = '1000';
                
                // Insert the navbar into the container
                navContainer.appendChild(navElement);
                
                // Insert the container at the end of the body
                document.body.appendChild(navContainer);
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
});
