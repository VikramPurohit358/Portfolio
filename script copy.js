document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollInner = document.querySelector('.scroll-inner');
    const words = document.querySelectorAll('.scroll-inner .ing');
    const wordCount = words.length;
    const wordHeight = scrollContainer.offsetHeight;
    let currentIndex = 0;
    let locked = true;
    let animating = false;

    // Only lock scroll while in animated scroll section
    if (locked) {
        document.body.style.overflow = "hidden";
    }

    function updateScroll() {
        scrollInner.style.transform = `translateY(-${currentIndex * wordHeight}px)`;
        words.forEach((el, i) => {
            el.classList.toggle('active', i === currentIndex);
        });
    }

    updateScroll();

    window.addEventListener('wheel', function(e) {
        if (!locked || animating) return; 

        if (e.deltaY > 0) { 
            if (currentIndex < wordCount - 1) {
                e.preventDefault();
                animating = true;
                currentIndex++;
                updateScroll();
                setTimeout(() => {
                    animating = false;
                }, 1600); 
            } else if (currentIndex === wordCount - 1) {
                e.preventDefault();
                animating = true;
                locked = false;
                setTimeout(() => {
                    document.body.style.overflow = ""; // Allow scrolling again
                    animating = false;
                }, 900); 
            }
        } else if (e.deltaY < 0) { 
            if (currentIndex > 0) {
                e.preventDefault();
                animating = true;
                currentIndex--;
                updateScroll();
                setTimeout(() => {
                    animating = false;
                }, 1600); 
            }
        }
    }, { passive: false });

    const modeBtn = document.getElementById('LightModeBtn');
    let isDark = true;
    if (modeBtn) {
        modeBtn.textContent = "Light Mode";
        modeBtn.addEventListener('click', function () {
            isDark = !isDark;
            modeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
            if (!isDark) {
                window.location.href = "index copy.html"; // Light Mode
            } else {
                window.location.href = "index.html"; // Dark Mode
            }
        });
    }
});