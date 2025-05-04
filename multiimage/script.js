let elem = document.querySelectorAll(".elem");

elem.forEach(val => {
    val.addEventListener("mouseenter", () => {
        val.childNodes[3].style.opacity = .8;
    });

    val.addEventListener('mousemove', (dets) => {
        val.childNodes[3].style.left = dets.x + "px";
    });

    val.addEventListener('mouseleave', () => {
        val.childNodes[3].style.opacity = 0;
    })
});
