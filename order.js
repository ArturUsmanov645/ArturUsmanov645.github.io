"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		/*
		formData.append('image', formImage.files[0]);
		*/
		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert('Ошибка');
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля *');
		}
	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')){
				if (emailTest(input)){
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}

		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция текста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	const formImage = document.getElementById('formImage');
	const formPreview = document.getElementById('formPreview');

	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Только изображения.');
			formImage.value = "";
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.');
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото"`;
		};
		reader.onerror = function (e) {
			alert("Ошибка");
		};
		reader.readAsDataURL(file);
	}
});

let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
    let x = e.clientX;
    let y = e.clientY;
    
    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
};

let links = Array.from(document.querySelectorAll("a"));

console.log(links);

links.forEach(link =>{
    link.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    link.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});

let inputs = Array.from(document.querySelectorAll("input"));

console.log(inputs);

inputs.forEach(inputs =>{
    inputs.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    inputs.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});


let buttons = Array.from(document.querySelectorAll("button"));

console.log(buttons);

buttons.forEach(button =>{
    button.addEventListener('mouseover', ()=>{
        innerCursor.classList.add("grow");
    });
    button.addEventListener('mouseleave', ()=>{
        innerCursor.classList.remove("grow");
    });
});