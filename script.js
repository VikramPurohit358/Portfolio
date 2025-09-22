document.addEventListener("DOMContentLoaded", function () {
    const modeBtn = document.getElementById('LightModeBtn');
    let isDark = false;
    if (modeBtn) {
        modeBtn.textContent = "Dark Mode";
        modeBtn.addEventListener('click', function () {
            isDark = !isDark;
            modeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
            if (isDark) {
                window.location.href = "index.html"; // Dark Mode
            } else {
                window.location.href = "index copy.html"; // Light Mode
            }
        });
    }
});