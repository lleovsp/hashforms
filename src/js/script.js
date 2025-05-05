document.addEventListener("DOMContentLoaded", () => {
    const campoCPF = document.querySelector("#cpf");
    const regex = /^\d+$/;
    campoCPF.addEventListener("input", () => {
        if (!regex.test(campoCPF.value.slice(-1))) {
            campoCPF.value = campoCPF.value.slice(0, -1);
        }

        if (campoCPF.value === 3) {
            console.log("if do ponto")
            campoCPF.value += "."
        }
    });

    // tratamento do formulário
    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        let dadosEndereco = [];
        let dadosPessoais = [];
        let controller = true;
        let dataBoxes = document.querySelectorAll("input");
        for (let i = 0; i < dataBoxes.length; i++) {
            let element = dataBoxes[i];
            if (element.value.trim() === "") {
                alert("Preencha todos os campos para continuar");
                event.preventDefault();
                controller = false;
                break;
            }
        }
        if (controller === true) {
            console.log("Todos os dados estão corretos");
            dataBoxes.forEach(element => {
                if (element.parentElement.parentElement.id === "dados-pessoais") {
                    dadosPessoais.push(element.value);
                    console.log(dadosPessoais);
                }
                if (element.parentElement.parentElement.id === "endereco") {
                    dadosEndereco.push(element.value);
                    console.log(dadosEndereco);
                }
            });
            localStorage.setItem("Dados Pessoais", dadosPessoais);
            localStorage.setItem("Endereço", dadosEndereco);
        }
    });
});