const rqURL = "https://api.github.com/users/hiteshchoudhary";
const xhr = new XMLHttpRequest()
xhr.open("GET", rqURL)
xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
    if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText);
        let container = document.querySelector(".container")

        container.innerHTML += `
        <figure class="profileImage">
            <img src="${data.avatar_url}" alt="">
        </figure>
        <div class="details">
            <h3 class="pName">${(data.name)}</h3>
            <div class="subDetail">
                <p class="followers"><i class="ri-user-add-line"></i> ${data.followers}</p>
                <p class="repo"><i class="ri-github-fill"></i> ${data.public_repos}</p>
            </div>
            <button class="connect"><i class="ri-user-voice-fill"></i> Follow</button>
        </div>
        `


        let btnFollow = document.querySelector(".connect")

        btnFollow.addEventListener('click', (e) => {
            document.querySelector(".followers").innerHTML = `<i class="ri-user-add-line"></i> ${data.followers + 1}`
        })
    }
}
xhr.send()

