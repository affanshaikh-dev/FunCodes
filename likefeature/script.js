let container_box = document.getElementById("container_box");
let icon_heart = document.getElementById("icon_heart");

container_box.addEventListener("dblclick", () => {
    icon_heart.style.transform = "translate(-50%, -50%) scale(1)";
    icon_heart.style.opacity = ".8";

    setTimeout(() => {
        icon_heart.style.opacity = "0";
    }, 1000)
})