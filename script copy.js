document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollInner = document.querySelector('.scroll-inner');
    const words = document.querySelectorAll('.scroll-inner .ing');
    const wordCount = words.length;
    const wordHeight = scrollContainer ? scrollContainer.offsetHeight : 0;
    let currentIndex = 0;
    let locked = true;
    let animating = false;

    if (locked) {
        document.body.style.overflow = "hidden";
    }

    function updateScroll() {
        if (scrollInner) {
            scrollInner.style.transform = `translateY(-${currentIndex * wordHeight}px)`;
            words.forEach((el, i) => {
                el.classList.toggle('active', i === currentIndex);
            });
        }
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

    // Toggle switch logic for light/dark mode
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        // Set toggle state based on current page
        modeToggle.checked = window.location.pathname.includes('index copy.html');
        modeToggle.addEventListener('change', function () {
            if (modeToggle.checked) {
                window.location.href = "index copy.html"; // Light mode
            } else {
                window.location.href = "index.html"; // Dark mode
            }
        });
    }
});