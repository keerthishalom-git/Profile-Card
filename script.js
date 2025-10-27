// ==========================================
// Profile Card Interactive JavaScript
// Author: Keerthi Shalom V
// Green Pinterest Theme
// ==========================================

// Configuration
const hobbies = ['Blogging', 'Cooking', 'Music'];
const hobbyIcons = {
    'Blogging': '✍️',
    'Cooking': '🍳',
    'Music': '🎵'
};

let currentHobbyIndex = -1;

// DOM Elements
const hobbyButton = document.getElementById('hobbyButton');
const hobbyText = document.getElementById('hobbyText');
const profileImage = document.getElementById('profileImage');

// ==========================================
// Core Functions
// ==========================================

/**
 * Get a random hobby different from the current one
 */
function getRandomHobby() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * hobbies.length);
    } while (newIndex === currentHobbyIndex && hobbies.length > 1);
    
    currentHobbyIndex = newIndex;
    return hobbies[newIndex];
}

/**
 * Display random hobby with smooth animation
 */
function showRandomHobby() {
    // Exit animation
    hobbyText.classList.remove('show');
    
    setTimeout(() => {
        const hobby = getRandomHobby();
        hobbyText.textContent = hobby;
        
        // Update button icon
        const iconSpan = hobbyButton.querySelector('.hobby-icon');
        iconSpan.textContent = hobbyIcons[hobby];
        
        // Entrance animation
        setTimeout(() => {
            hobbyText.classList.add('show');
        }, 50);
    }, 300);
}

/**
 * Handle profile image upload
 */
function handleImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            
            // Read and display image
            const reader = new FileReader();
            reader.onload = (event) => {
                profileImage.src = event.target.result;
                
                // Smooth transition
                profileImage.style.opacity = '0';
                setTimeout(() => {
                    profileImage.style.opacity = '1';
                }, 100);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// ==========================================
// Event Listeners
// ==========================================

// Show random hobby on button click
hobbyButton.addEventListener('click', showRandomHobby);

// Upload image on click
profileImage.addEventListener('click', handleImageUpload);

// Keyboard accessibility
hobbyButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showRandomHobby();
    }
});

// ==========================================
// Initialization
// ==========================================

window.addEventListener('load', () => {
    // Show first hobby after short delay
    setTimeout(showRandomHobby, 500);
    
    console.log('🌿 Profile Card Loaded Successfully!');
    console.log('💚 Green Pinterest Theme Active');
    console.log('✨ Click the image to upload your photo!');
});

// ==========================================
// Optional: Auto-cycle hobbies
// Uncomment to enable automatic cycling
// ==========================================

/*
setInterval(() => {
    showRandomHobby();
}, 5000); // Change hobby every 5 seconds
*/
