export function syncProjectTooltips() {
    document.querySelectorAll(".project-p").forEach(p => {
        p.title = p.textContent;
    });
}
