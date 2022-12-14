$(() => {
	// Ширина окна для ресайза
	WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


	// Конкурсы и выставки
	if ($('.exhibitions .swiper').length) {
		new Swiper('.exhibitions .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.exhibitions-swiper-button-next',
				prevEl: '.exhibitions-swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Страница проекта
	const projectSliders = []

	$('.project_info .sliders .swiper').each(function (i) {
		$(this).addClass('project_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			slidesPerView: 1,
			breakpoints: {
				0: {
					spaceBetween: 0
				},
				768: {
					spaceBetween: WW * 0.04758 - widthScroll() / 3,
				}
			}
		}

		projectSliders.push(new Swiper('.project_s' + i, options))
	})


	// Статьи
	const articlesThumbsSliders = []

	$('.articles .article .swiper').each(function (i) {
		$(this).addClass('articles_thumbs_s' + i)

		let options = {
			loop: false,
			speed: 500,
			spaceBetween: 0,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			slidesPerView: 1
		}

		articlesThumbsSliders.push(new Swiper('.articles_thumbs_s' + i, options))
	})


	// Меню
	$('header .sub_menu.level2 a.sub_link').click(function (e) {
		e.preventDefault()

		let subMenu = $(this).data('level3')

		if (!$(this).hasClass('active')) {
			$('header .sub_menu.level2 a').removeClass('active')
			$(this).addClass('active')

			$('header .sub_menu.level3').removeClass('show')
			$('header .sub_menu.level3[data-level3=' + subMenu + ']').addClass('show')
		} else {
			$(this).removeClass('active')
			$('header .sub_menu.level3').removeClass('show')
		}
	})


	// Новости
	$('.articles .article .spoler_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.article')

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? parent.find('.desc .hide').slideDown(300)
			: parent.find('.desc .hide').slideUp(200)
	})


	// Моб. меню
	mobMenuBtnOffset = $('header .mob_menu_btn').offset().top

	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header .cont + .cont, header .col_right').toggleClass('show')
	})


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}
})



$(window).on('resize', () => {
	let windowW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Моб. версия
		if (!firstResize) {
			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
	}
})



$(window).on('scroll', () => {
	// Моб. меню
	typeof mobMenuBtnOffset !== 'undefined' && $(window).scrollTop() > mobMenuBtnOffset
		? $('header .mob_menu_btn').addClass('fixed')
		: $('header .mob_menu_btn').removeClass('fixed')
})