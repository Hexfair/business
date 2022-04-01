("use strict");
function testWebP(callback) {
	var webP = new Image();

	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};

	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector("body").classList.add("webp");
	}
});

/* Функция для работы бургера */
function burger() {
	var iconMenu = document.querySelector(".header-menu__burger");

	if (iconMenu != null) {
		var delay = 500;
		var body = document.querySelector("body");
		var menuBody = document.querySelector(".header-menu");
		iconMenu.addEventListener("click", function (e) {
			if (!body.classList.contains("_wait")) {
				body_lock(delay);
				iconMenu.classList.toggle("_active");
				menuBody.classList.toggle("_active");
			}
		});
	}

	function menu_close() {
		var iconMenu = document.querySelector(".header-menu__burger");
		var menuBody = document.querySelector(".header-menu");
		iconMenu.classList.remove("_active");
		menuBody.classList.remove("_active");
	} //=================
	//BodyLock

	function body_lock(delay) {
		var body = document.querySelector("body");

		if (body.classList.contains("_lock")) {
			body_lock_remove(delay);
		} else {
			body_lock_add(delay);
		}
	}

	function body_lock_remove(delay) {
		var body = document.querySelector("body");

		if (!body.classList.contains("_wait")) {
			var lock_padding = document.querySelectorAll("._lp");
			setTimeout(function () {
				for (var index = 0; index < lock_padding.length; index++) {
					var el = lock_padding[index];
					el.style.paddingRight = "0px";
				}

				body.style.paddingRight = "0px";
				body.classList.remove("_lock");
			}, delay);
			body.classList.add("_wait");
			setTimeout(function () {
				body.classList.remove("_wait");
			}, delay);
		}
	}

	function body_lock_add(delay) {
		var body = document.querySelector("body");

		if (!body.classList.contains("_wait")) {
			var lock_padding = document.querySelectorAll("._lp");

			for (var index = 0; index < lock_padding.length; index++) {
				var el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			}

			body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			body.classList.add("_lock");
			body.classList.add("_wait");
			setTimeout(function () {
				body.classList.remove("_wait");
			}, delay);
		}
	} //=================

	var link = document.querySelectorAll("._goto-block");

	if (link) {
		var blocks = [];

		var _loop7 = function _loop7(_index28) {
			var el = link[_index28];
			var block_name = el.getAttribute("href").replace("#", "");

			if (block_name != "" && !~blocks.indexOf(block_name)) {
				blocks.push(block_name);
			}

			el.addEventListener("click", function (e) {
				if (document.querySelector(".header-menu._active")) {
					menu_close();
					body_lock_remove(500);
				}

				var target_block_class = el.getAttribute("href").replace("#", "");
				var target_block = document.querySelector("." + target_block_class);

				_goto(target_block, 300);

				e.preventDefault();
			});
		};

		for (var _index28 = 0; _index28 < link.length; _index28++) {
			_loop7(_index28);
		}

		window.addEventListener("scroll", function (el) {
			var old_current_link = document.querySelectorAll("._goto-block._active");

			if (old_current_link) {
				for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
					var _el13 = old_current_link[_index29];

					_el13.classList.remove("_active");
				}
			}

			for (var _index30 = 0; _index30 < blocks.length; _index30++) {
				var block = blocks[_index30];
				var block_item = document.querySelector("." + block);

				if (block_item) {
					var block_offset = offset(block_item).top;
					var block_height = block_item.offsetHeight;

					if (scrollY > block_offset - window.innerHeight / 3 && scrollY < block_offset + block_height - window.innerHeight / 3) {
						var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

						for (var _index31 = 0; _index31 < current_links.length; _index31++) {
							var current_link = current_links[_index31];
							current_link.classList.add("_active");
						}
					}
				}
			}
		});
	} //ScrollOnClick (Simple)

	var goto_links = document.querySelectorAll("._goto");

	if (goto_links) {
		var _loop8 = function _loop8(_index32) {
			var goto_link = goto_links[_index32];
			goto_link.addEventListener("click", function (e) {
				var target_block_class = goto_link.getAttribute("href").replace("#", "");
				var target_block = document.querySelector("." + target_block_class);

				_goto(target_block, 300);

				e.preventDefault();
			});
		};

		for (var _index32 = 0; _index32 < goto_links.length; _index32++) {
			_loop8(_index32);
		}
	}

	function _goto(target_block, speed) {
		var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var header = ""; //OffsetHeader

		header = "header";
		var options = {
			speedAsDuration: true,
			speed: speed,
			header: header,
			offset: offset,
		};
		var scr = new SmoothScroll();
		scr.animateScroll(target_block, "", options);
	}
}
burger();

/* Инициализация Swiper */
new Swiper(".banner-slider-swiper", {
	slidesPerView: 1,
	loop: true,
	spaceBetween: 50,
	pagination: {
		el: ".banner-slider-pagination",
		type: "bullets",
		clickable: true,
	},
});

/* Работа с формой */
function formFieldsInit(options = { viewPass: false }) {
	// Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
	const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
	if (formFields.length) {
		formFields.forEach((formField) => {
			if (!formField.hasAttribute("data-placeholder-nohide")) {
				formField.dataset.placeholder = formField.placeholder;
			}
		});
	}
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = "";
			}
			if (!targetElement.hasAttribute("data-no-focus-classes")) {
				targetElement.classList.add("_form-focus");
				targetElement.parentElement.classList.add("_form-focus");
			}
			formValidate.removeError(targetElement);
		}
	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (!targetElement.hasAttribute("data-no-focus-classes")) {
				targetElement.classList.remove("_form-focus");
				targetElement.parentElement.classList.remove("_form-focus");
			}
			// Моментальная валидация
			if (targetElement.hasAttribute("data-validate")) {
				formValidate.validateInput(targetElement);
			}
		}
	});

	// Если включено, добавляем функционал "Показать пароль"
	if (options.viewPass) {
		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (targetElement.closest('[class*="__viewpass"]')) {
				let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
				targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
				targetElement.classList.toggle("_viewpass-active");
			}
		});
	}
}
formFieldsInit();

/* Валидация формы */
function validationForm() {
	const formBanner = document.getElementById("formBanner"); // Берем весь объект форма и вешаем на него событие
	formBanner.addEventListener("submit", formSendBanner); // при отправке формы, мы переходим к выполнению функции formSend
	const formNewsletter = document.getElementById("formNewsletter"); // Берем весь объект форма и вешаем на него событие
	formNewsletter.addEventListener("submit", formSendNewsletter); // при отправке формы, мы переходим к выполнению функции formSend

	async function formSendBanner(e) {
		e.preventDefault(); // Сначала запрещаем стандартную отправку формы
		formValidate(formBanner);
	}

	async function formSendNewsletter(e) {
		e.preventDefault(); // Сначала запрещаем стандартную отправку формы
		formValidate(formNewsletter);
	}
	function formValidate(form) {
		let formReq = form.querySelectorAll("._req"); // Берем все объекты классом _req - означает каким объектам нужна валидация
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index]; // Получаем каждый объект из выборки formReq
			formRemoveError(input); // Сначала, когда приступаем к проверке, нужно убрать класс _error

			if (input.classList.contains("_email")) {
				// Проверяем - если объект E-mail, то далее выполняем тест. Нужно предварительно добавить полю с email класс _email
				if (emailTest(input)) {
					formAddError(input); // Если тест не пройдет, то выполняем функцию formAddError - добавляем объекту класс _error
					setTimeout(() => {
						formRemoveError(input);
					}, 5000);
				}
			} else {
				if (input.value === "") {
					// Если значения вообще нет - пустая строка
					formAddError(input); // Вешаем класс _error
					setTimeout(() => {
						formRemoveError(input);
					}, 5000);
				}
			}

			if (input.classList.contains("_tel")) {
				// Проверяем - если объект Tel, то далее выполняем тест. Нужно предварительно добавить полю с tel класс _tel
				if (telTest(input)) {
					formAddError(input); // Если тест не пройдет, то выполняем функцию formAddError - добавляем объекту класс _error
					setTimeout(() => {
						formRemoveError(input);
					}, 5000);
				}
			} else {
				if (input.value === "") {
					// Если значения вообще нет - пустая строка
					formAddError(input); // Вешаем класс _error
					setTimeout(() => {
						formRemoveError(input);
					}, 5000);
				}
			}
		}
	}

	/* Две функции, которые добавляют и убирают у объектов класс _error */
	function formAddError(input) {
		input.parentElement.classList.add("_error"); // Добавляем родителю объекта класс _error - потому что реальные объекты скрыты, а используются бутаффорные
		input.classList.add("_error"); // Добавляем объекту класс _error
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove("_error"); // Убираем у родителя объекта класс _error
		input.classList.remove("_error"); // Убираем у объекта класс _error
	}

	/* Функция теста email */
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	/* Функция теста номера телефона */
	function telTest(input) {
		return !/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/.test(input.value);
	}
}
validationForm();

/* Функция IBG */
function ibg() {
	let ibg = document.querySelectorAll("._ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector("img")) {
			ibg[i].style.backgroundImage = "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
		}
	}
}
ibg();

/* Функция для блока CHOOSE */
function choseeHover() {
	const blockForMouse = document.querySelector(".choose-content");
	const popular = blockForMouse.querySelector(".choose-content__column_popular");
	blockForMouse.addEventListener("mouseover", function (event) {
		let target = event.target.closest(".choose-content__column");
		if (!target.classList.contains("choose-content__column_popular")) {
			target.classList.toggle("_active");
			popular.classList.remove("_active");
		}
	});
	blockForMouse.addEventListener("mouseout", function (event) {
		let target = event.target.closest(".choose-content__column");
		target.classList.remove("_active");
		popular.classList.add("_active");
	});
}
choseeHover();

/* Анимация при скроле */
function animWithScroll() {
	const animItems = document.querySelectorAll("._anim-items"); // Получаем все элементы, которые отметили этим классом - мы хотим их анимировать
	if (animItems.length > 0) {
		// Проверяем попал ли в выборку хотя бы один элемент
		window.addEventListener("scroll", animOnScroll); // Вызываем функцию animOnScroll при прокрутке страницы
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				// Перебираем элементы нашей выборки
				const animItem = animItems[index]; // Помещаем в animItem конкретный элемент нашей выборки
				const animItemHeight = animItem.offsetHeight; // В animItemHeight помещаем размер элемента - высоту
				const animItemOffset = offset(animItem).top; // Получаем координаты элемента
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
					animItem.classList.add("_active");
				} else {
					if (!animItem.classList.contains("_anim-no-hide")) {
						// Если у элемента нет класса _anim-no-hide, то у него удаляется класс _active,
						animItem.classList.remove("_active"); // а значит при скроле анимация будет постоянно повторяться.
					} // Иначе класс _active после первого вызова останется у элемента и анимация не будет повторяться
				}
			}
		}
		function offset(el) {
			const rect = el.getBoundingClientRect(), // Получаем координаты элемента относительно окна браузера
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, // Кол-во прокрученных пикселей по X
				scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Кол-во прокрученных пикселей по Y
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
		}
		setTimeout(() => {
			animOnScroll();
		}, 100);
		function animTitle(title) {
			title.textyle({
				duration: 500,
				delay: 100,
				easing: "linear",
			});
		}
	}
}
animWithScroll();
