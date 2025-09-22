document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollInner = document.querySelector('.scroll-inner');
    const words = document.querySelectorAll('.scroll-inner .ing');
    const wordCount = words.length;
    const wordHeight = scrollContainer.offsetHeight;
    let currentIndex = 0;
    let locked = true;
    let animating = false;

    // Lock scroll for the first viewport
    document.body.style.overflow = "hidden";

    function updateScroll() {
        scrollInner.style.transform = `translateY(-${currentIndex * wordHeight}px)`;
        words.forEach((el, i) => {
            el.classList.toggle('active', i === currentIndex);
        });
    }

    updateScroll();

    window.addEventListener('wheel', function(e) {
        if (!locked || animating) return; // If unlocked or animating, ignore

        if (e.deltaY > 0) { // Scroll down
            if (currentIndex < wordCount - 1) {
                e.preventDefault();
                animating = true;
                currentIndex++;
                updateScroll();
                setTimeout(() => {
                    animating = false;
                }, 1600); // 1.5s animation + 0.1s buffer
            } else if (currentIndex === wordCount - 1) {
                // At last word, unlock scroll on next scroll down
                e.preventDefault();
                animating = true;
                locked = false;
                setTimeout(() => {
                    document.body.style.overflow = "";
                    animating = false;
                }, 900); // 0.8s animation + 0.1s buffer
            }
        } else if (e.deltaY < 0) { // Scroll up
            if (currentIndex > 0) {
                e.preventDefault();
                animating = true;
                currentIndex--;
                updateScroll();
                setTimeout(() => {
                    animating = false;
                }, 1600); // 1.5s animation + 0.1s buffer
            }
        }
    }, { passive: false });

    // Dark/Light mode button toggle
    const modeBtn = document.getElementById('darkModeBtn');
    let isDark = true;
    if (modeBtn) {
        modeBtn.textContent = "Light Mode";
        modeBtn.addEventListener('click', function () {
            isDark = !isDark;
            modeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
            if (!isDark) {
                // Open dark.html in the same tab
                window.location.href = "dark.html";
            }
        });
    }
});