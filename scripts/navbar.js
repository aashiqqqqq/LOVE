// document.addEventListener('DOMContentLoaded', function() {
//     fetch('../components/navbar.html')
//         .then(response => response.text())
//         .then(data => {
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(data, 'text/html');
//             const navElement = doc.querySelector('.nav');
            
//             if (navElement) {
//                 // Remove any existing styles or scripts
//                 navElement.querySelectorAll('style, script').forEach(el => el.remove());
                
//                 // Create a container for the navbar
//                 const navContainer = document.createElement('div');
//                 navContainer.id = 'navbar-container';
//                 navContainer.style.position = 'fixed';
//                 navContainer.style.bottom = '20px';
//                 navContainer.style.left = '20px';
//                 navContainer.style.zIndex = '1000';
                
//                 // Insert the navbar into the container
//                 navContainer.appendChild(navElement);
                
//                 // Insert the container at the end of the body
//                 document.body.appendChild(navContainer);
//             }
//         })
//         .catch(error => console.error('Error loading navbar:', error));
// });
