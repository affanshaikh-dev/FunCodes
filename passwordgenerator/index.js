class password {
    constructor() {
        this.uppCase = "ASGGFHGFKJHDKJHFSLFHKJSGLJKSSJHF";
        this.lowCase = "askdfjklasflkasjdlkjaslfjslkjflk";
        this.num = "14725836910";
        this.sym = "!@#^&#&^#&#&*&*#"
    }

    funnypass() {
        let arr = [
            `password`,
            `email`,
            `terapasswordbata`,
            `iforget`,
            `myname`,
            `wifi`,
            `meinahibatunga`,
            `sorry`,
            `merebhaikopatahei`,
            `passwordtomerekonahipatahei`,
            `dohazarde`,
            `teriasikitesi`,
            `secert`,
            `admin`
        ]

        let pass = arr[Math.floor(Math.random() * arr.length)];
        return pass;
    }

    weakPass() {
        let arr = [this.uppCase, this.lowCase];
        let pass = "";
        for (let i = 0; i < 8; i++) {
            let pass_1 = Math.floor(Math.random() * arr.length);
            let pass_2 = Math.floor(Math.random() * arr[pass_1].length)
            pass = pass + arr[pass_1][pass_2];
        }
        return pass;
    }

    strongPass() {
        let arr = [this.uppCase, this.lowCase];
        let pass = "";
        for (let i = 0; i < 14; i++) {
            let pass_1 = Math.floor(Math.random() * arr.length);
            let pass_2 = Math.floor(Math.random() * arr[pass_1].length)
            pass = pass + arr[pass_1][pass_2];
        }
        return pass;
    }

    superStrongPass() {
        let arr = [this.uppCase, this.lowCase];
        let pass = "";
        for (let i = 0; i < 20; i++) {
            let pass_1 = Math.floor(Math.random() * arr.length);
            let pass_2 = Math.floor(Math.random() * arr[pass_1].length)
            pass = pass + arr[pass_1][pass_2];
        }
        return pass;
    }
}

let generate = document.getElementById("generate");
let radio = document.getElementsByClassName("radio-input");
let btn = document.getElementById("btn");

let generatePass = new password();

btn.addEventListener('click', () => {
    let passwd;
    if(radio[0].checked) {
        passwd = generatePass.funnypass();
    } else if(radio[1].checked) {
        passwd = generatePass.weakPass();
    } else if(radio[2].checked) {
        passwd = generatePass.strongPass();
    } else if(radio[3].checked) {
        passwd = generatePass.superStrongPass();
    }
    generate.value = passwd;    
})