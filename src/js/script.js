document.addEventListener("DOMContentLoaded", () => {
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

	// tratamento do formulário
	let dataBoxes = document.querySelectorAll("input");
	document.querySelector("form").addEventListener("submit", (event) => {
		let dadosEndereco = [];
		let dadosPessoais = [];
		let controller = true;
		dataBoxes.forEach((element) => {
			if (element.value === "" || element.value === " ") {
				controller = false;
			}
		});
		if (controller === false) {
			event.preventDefault();
			alert("Preencha todos os campos para continuar");
		} else {
			console.log("Todos os dados estão corretos");
			dataBoxes.forEach((element) => {
				if (element.value.includes(".") || element.value.includes("-")) {
					element.value = element.value.replaceAll(".", "");
					element.value = element.value.replaceAll("-", "");
				}

				if (element.parentElement.parentElement.id === "dados-pessoais") {
					dadosPessoais.push(element.value);
					console.log(dadosPessoais);
				}
				if (element.parentElement.parentElement.id === "endereco") {
					dadosEndereco.push(element.value);
					console.log(dadosEndereco);
				}
				localStorage.setItem("Dados Pessoais", dadosPessoais);
				localStorage.setItem("Endereço", dadosEndereco);
			});
		}
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
