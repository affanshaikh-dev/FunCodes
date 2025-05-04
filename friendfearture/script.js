let toogle_txt = document.getElementById("toogle_txt");
let toogle_btn = document.getElementById("toogle_btn");
let check = 0;

toogle_btn.addEventListener('click', () => {
    if(check == 0) {
        toogle_txt.innerHTML = "Friend";
        toogle_txt.style.color = "green";

        toogle_btn.innerHTML = "<i class='ri-user-unfollow-fill'></i> Unfriend";
        toogle_btn.style.background = "#4f5bd5";

        check = 1;
    } else {
        toogle_txt.innerHTML = "Stranger";
        toogle_txt.style.color = "#000";

        toogle_btn.innerHTML = "<i class='ri-user-add-fill'></i> Friend";
        toogle_btn.style.background = "#962fbf";
        
        check = 0;
    }
});
