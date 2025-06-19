document.addEventListener("DOMContentLoaded", () => {
    window.showPanel = function (panelId) {
        const panels = document.querySelectorAll(".panel");
        panels.forEach(panel => panel.classList.add("hidden"));

        const activePanel = document.getElementById(`${panelId}-panel`);
        if (activePanel) activePanel.classList.remove("hidden");
    };
});
