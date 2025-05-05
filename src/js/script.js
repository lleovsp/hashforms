document.addEventListener("DOMContentLoaded", () => {
	// tratamento do formulário
	document.querySelector("form").addEventListener("submit", (event) => {
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

			if (element.value.includes(".") || element.value.includes("-")) {
				element.value = element.value.replaceAll(".", "");
				element.value = element.value.replaceAll("-", "");
			}

			dataBoxes.forEach((element) => {
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
	const campoCPF = document.querySelector("#cpf");
	campoCPF.addEventListener("input", () => {
		let numeros = campoCPF.value.replace(/\D/g, "");
		numeros = numeros.length > 11 ? numeros.slice(0, 11) : numeros;

		if (numeros.length > 9) {
			numeros = numeros.replace(
				/(\d{3})(\d{3})(\d{3})(\d{1,2})/,
				"$1.$2.$3-$4"
			);
		} else if (numeros.length > 6) {
			numeros = numeros.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
		} else if (numeros.length > 3) {
			numeros = numeros.replace(/(\d{3})(\d{3})/, "$1.$2.");
		} else if (numeros.length > 0) {
			numeros = numeros.replace(/(\d{3})/, "$1.");
		}
		campoCPF.value = numeros;
	});
	dataBoxes.forEach((box) => {
		let contentBoxStyle = box.parentElement.parentElement.style;
		box.addEventListener("focus", () => {
			box.labels[0].style.fontWeight = "bold";
			contentBoxStyle.boxShadow =
				"3px 3px 4px #ffffff38, -3px -3px 4px #ffffff38";
			contentBoxStyle.transition = "0.3s all";
		});
		box.addEventListener("blur", () => {
			box.labels[0].style.fontWeight = "400";
			contentBoxStyle.boxShadow = "none";
		});
	});
});
