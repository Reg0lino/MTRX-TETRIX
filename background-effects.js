document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('matrix-rain-container');
    if (!container) return;

    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = [];
    const fallSpeed = 150; // Milliseconds per character drop, adjust for speed
    const newStreamInterval = 100; // Milliseconds between potentially starting new streams
    const charFadeDuration = 1000; // How long a char takes to fade after stopping

    // Initialize drops array
    for (let i = 0; i < columns; i++) {
        drops[i] = 1; // Start y position for each column (1 = offscreen initially)
    }

    function draw() {
        // Iterate over columns
        for (let i = 0; i < drops.length; i++) {
            // Randomly skip some updates to make streams uneven
            if (Math.random() < 0.05) {
                drops[i]++; // Move drop down even if no char is drawn this frame
                continue;
            }

            const text = characters[Math.floor(Math.random() * characters.length)];
            const charSpan = document.createElement('span');
            charSpan.classList.add('matrix-char');
            charSpan.textContent = text;
            charSpan.style.left = `${i * fontSize}px`;
            charSpan.style.top = `${drops[i] * fontSize}px`;

            container.appendChild(charSpan);

            // Move drop position down
            drops[i]++;

            // Send the drop back to the top randomly after it exits the screen
            // Add randomness to reset height to create variation
            if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0; // Reset to top
            }

             // Add fade effect and remove element after a delay
             setTimeout(() => {
                 charSpan.classList.add('fade');
                 // Remove the element after the fade transition completes
                 setTimeout(() => {
                     if (charSpan.parentNode === container) {
                         container.removeChild(charSpan);
                     }
                 }, charFadeDuration); // Match this roughly to CSS fade duration
             }, fallSpeed * (Math.random() * 10 + 5)); // Start fading after some time

        }
    }

    // Limit the number of active intervals to prevent performance issues
     let rainInterval = setInterval(draw, fallSpeed);

    // Basic cleanup function to prevent too many elements if tab is inactive
    setInterval(() => {
        const chars = container.querySelectorAll('.matrix-char');
        // Limit DOM elements - crude cleanup
        if (chars.length > 500) {
            console.log("Matrix rain cleanup triggered");
             for(let i = 0; i < 100; i++){
                if(chars[i] && chars[i].parentNode === container) {
                    container.removeChild(chars[i]);
                }
            }
        }
    }, 5000); // Check every 5 seconds

    // Adjust columns on resize (optional, basic implementation)
    window.addEventListener('resize', () => {
        // Basic reset - could be improved to dynamically adjust drops array
        // clearInterval(rainInterval);
        // container.innerHTML = ''; // Clear existing chars
        // columns = Math.floor(window.innerWidth / fontSize);
        // drops = [];
        // for (let i = 0; i < columns; i++) drops[i] = 1;
        // rainInterval = setInterval(draw, fallSpeed);
        // Simple reload might be easier for drastic resize changes
        // window.location.reload();
    });

});