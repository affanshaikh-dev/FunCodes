var arr = [
    {
        dp: "https://i.pinimg.com/750x/a7/6c/7c/a76c7c397254b22bbf1ad628b04ce0b9.jpg",
        story: "https://i.pinimg.com/750x/a7/6c/7c/a76c7c397254b22bbf1ad628b04ce0b9.jpg"
    },
    {
        dp: "https://i.pinimg.com/564x/b1/2c/e3/b12ce3ce66b3850c087828e66718091c.jpg",
        story: "https://i.pinimg.com/564x/b1/2c/e3/b12ce3ce66b3850c087828e66718091c.jpg"
    },
    {
        dp: "https://i.pinimg.com/564x/1e/66/ca/1e66cab4fa2bc3adeab95d040a97e744.jpg",
        story: "https://i.pinimg.com/564x/1e/66/ca/1e66cab4fa2bc3adeab95d040a97e744.jpg"
    },
    {
        dp: "https://i.pinimg.com/564x/3f/8a/4d/3f8a4d8d1ea5f661ad966c56abdd5bb6.jpg",
        story: "https://i.pinimg.com/564x/3f/8a/4d/3f8a4d8d1ea5f661ad966c56abdd5bb6.jpg"
    },
    {
        dp: "https://i.pinimg.com/564x/9a/63/06/9a6306db28f70d27f39249e0044da128.jpg",
        story: "https://i.pinimg.com/564x/86/cc/3d/86cc3d74e6cc3c5dac6b801a244e53c1.jpg"
    }
];

let clutter = "";
let story = document.querySelector(".story_container");
let fullScreen = document.querySelector(".fullScreen");
arr.forEach((elem, idx) => {
    clutter += `
    <div class="story">
        <img id="${idx}" src="${elem.dp}" alt="">
    </div>
    `;
})
story.innerHTML = clutter;

story.addEventListener('click', (dets) => {
    fullScreen.style.display = "block";
    fullScreen.style.backgroundImage = `url(${arr[dets.target.id].story})`

    setTimeout(() => {
    fullScreen.style.display = "none";
    }, 2000);
})