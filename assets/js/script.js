	/* ========================================================================= */
	/*	Reveal on scroll (va primero: es vanilla y no debe depender de que
	/*	el resto del script —jQuery/Slick— cargue sin errores)
	/* ========================================================================= */
	(function () {
		if (!document.documentElement.classList.contains('js-anim')) return;
		if (!('IntersectionObserver' in window)) {
			document.documentElement.classList.remove('js-anim');
			return;
		}

		var targets = document.querySelectorAll(
			'.resources-item, .post-item, .contact-meta-block, .team-member'
		);
		if (!targets.length) return;

		var observer = new IntersectionObserver(function (entries, obs) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-revealed');
					obs.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

		for (var i = 0; i < targets.length; i++) {
			targets[i].style.transitionDelay = (i % 4) * 0.07 + 's';
			observer.observe(targets[i]);
		}
	})();

	/* ========================================================================= */
	/*	Page Preloader
	/* ========================================================================= */

	$(window).on("load", function () {
		$('#preloader').fadeOut('slow', function () {
			$(this).remove();
		});
	});

	(function ($) {
		"use strict";

		/* Respeta la preferencia del sistema de reducir movimiento */
		var prefersReducedMotion = window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		/* ========================================================================= */
		/*	Feature Slider (carrusel de novedades de la home)
		/* =========================================================================  */
		if ($('#featureSlider').length) {
			$('#featureSlider').slick({
				dots: true,
				arrows: !prefersReducedMotion,
				infinite: true,
				speed: 500,
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: !prefersReducedMotion,
				autoplaySpeed: 5000,
				pauseOnHover: true,
				pauseOnFocus: true,
				responsive: [
					{
						breakpoint: 992,
						settings: { slidesToShow: 2, slidesToScroll: 1 }
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							centerPadding: '20px'
						}
					}
				]
			});
		}

		/* ========================================================================= */
		/*	recursos Filtering Hook
		/* =========================================================================  */
		$('.play-icon i').click(function () {
			var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
			$(this).replaceWith(video);
		});

		/* ========================================================================= */
		/*	recursos Filtering Hook
		/* =========================================================================  */
		setTimeout(function () {
			var filterizd = $('.filtr-container').filterizr({});
			//Active changer
			$('.filtr-control').on('click', function () {
				$('.filtr-control').removeClass("active");
				$(this).addClass("active");
			});
		}, 500);

		/* ========================================================================= */
		/*	Testimonial Carousel
		/* =========================================================================  */

		//Init the slider
		$('.testimonial-slider').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			responsive: [{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});


		/* ========================================================================= */
		/*	Clients Slider Carousel
		/* =========================================================================  */

		//Init the slider
		$('.clients-logo-slider').slick({
			infinite: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			slidesToShow: 5,
			slidesToScroll: 1,
		});




		/* ========================================================================= */
		/*	Company Slider Carousel
		/* =========================================================================  */
		$('.company-gallery').slick({
			infinite: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			slidesToShow: 5,
			slidesToScroll: 1,
		});


		/* ========================================================================= */
		/*	Awars Counter Js
		/* =========================================================================  */
		$('.counter').each(function () {
			var $this = $(this),
				countTo = $this.attr('data-count');

			$({
				countNum: $this.text()
			}).animate({
					countNum: countTo
				},

				{
					duration: 1500,
					easing: 'linear',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
						//alert('finished');
					}

				});
		});




		/* ========================================================================= */
		/*   contacto Form Validating
		/* ========================================================================= */


		$('#contacto-submit').click(function (e) {

			//stop the form from being submitted
			e.preventDefault();

			/* declare the variables, var error is the variable that we use on the end
			to determine if there was an error or not */
			var error = false;
			var name = $('#name').val();
			var email = $('#email').val();
			var subject = $('#subject').val();
			var message = $('#message').val();

			/* in the next section we do the checking by using VARIABLE.length
			where VARIABLE is the variable we are checking (like name, email),
			length is a JavaScript function to get the number of characters.
			And as you can see if the num of characters is 0 we set the error
			variable to true and show the name_error div with the fadeIn effect. 
			if it's not 0 then we fadeOut the div( that's if the div is shown and
			the error is fixed it fadesOut. 
			
			The only difference from these checks is the email checking, we have
			email.indexOf('@') which checks if there is @ in the email input field.
			This JavaScript function will return -1 if no occurrence have been found.*/
			if (name.length == 0) {
				var error = true;
				$('#name').css("border-color", "#D8000C");
			} else {
				$('#name').css("border-color", "#666");
			}
			if (email.length == 0 || email.indexOf('@') == '-1') {
				var error = true;
				$('#email').css("border-color", "#D8000C");
			} else {
				$('#email').css("border-color", "#666");
			}
			if (subject.length == 0) {
				var error = true;
				$('#subject').css("border-color", "#D8000C");
			} else {
				$('#subject').css("border-color", "#666");
			}
			if (message.length == 0) {
				var error = true;
				$('#message').css("border-color", "#D8000C");
			} else {
				$('#message').css("border-color", "#666");
			}

			//now when the validation is done we check if the error variable is false (no errors)
			if (error == false) {
				//disable the submit button to avoid spamming
				//and change the button text to Sending...
				$('#contacto-submit').attr({
					'disabled': 'false',
					'value': 'Sending...'
				});

				/* using the jquery's post(ajax) function and a lifesaver
				function serialize() which gets all the data from the form
				we submit it to send_email.php */
				$.post("sendmail.php", $("#contacto-form").serialize(), function (result) {
					//and after the ajax request ends we check the text returned
					if (result == 'sent') {
						//if the mail is sent remove the submit paragraph
						$('#cf-submit').remove();
						//and show the mail success div with fadeIn
						$('#mail-success').fadeIn(500);
					} else {
						//show the mail failed div
						$('#mail-fail').fadeIn(500);
						//re enable the submit button by removing attribute disabled and change the text back to Send The Message
						$('#contacto-submit').removeAttr('disabled').attr('value', 'Send The Message');
					}
				});
			}
		});


	})(jQuery);


	/* ========================================================================= */
	/*	Mapa de contacto (Leaflet + OpenStreetMap)
	/* =========================================================================  */
	(function () {
		var mapEl = document.getElementById('map');
		if (!mapEl || typeof L === 'undefined') return;

		var lat = parseFloat(mapEl.getAttribute('data-lat'));
		var lng = parseFloat(mapEl.getAttribute('data-long'));
		if (isNaN(lat) || isNaN(lng)) return;

		var map = L.map(mapEl, { scrollWheelZoom: false }).setView([lat, lng], 17);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

		var marker = L.circleMarker([lat, lng], {
			radius: 10,
			color: '#fff',
			weight: 2,
			fillColor: '#cb0017',
			fillOpacity: 1
		}).addTo(map);

		var title = mapEl.getAttribute('data-title');
		if (title) marker.bindPopup(title).openPopup();

		/* El zoom con rueda se activa solo tras interactuar, para no
		   capturar el scroll de la página de forma accidental. */
		mapEl.addEventListener('click', function () {
			map.scrollWheelZoom.enable();
		});
	})();


	/* ========================================================================= */
	/*	Scrollytelling — Líneas de actuación
	/* =========================================================================  */
	(function () {
		var section = document.querySelector('.scrolly');
		if (!section) return;
		if (!('IntersectionObserver' in window)) return;
		if (window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		section.classList.add('js-scrolly');

		var steps = section.querySelectorAll('.scrolly-step');
		var figures = section.querySelectorAll('.scrolly-figure');
		var dots = section.querySelectorAll('.scrolly-dot');

		function setActive(idx) {
			for (var i = 0; i < steps.length; i++) {
				steps[i].classList.toggle('is-active', i === idx);
			}
			for (var j = 0; j < figures.length; j++) {
				figures[j].classList.toggle('is-active', j === idx);
			}
			for (var k = 0; k < dots.length; k++) {
				dots[k].classList.toggle('is-active', k === idx);
			}
		}

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					setActive(parseInt(entry.target.getAttribute('data-step'), 10));
				}
			});
		}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

		for (var s = 0; s < steps.length; s++) {
			observer.observe(steps[s]);
		}
	})();


	/* ========================================================================= */
	/*	Botón "volver arriba"
	/* =========================================================================  */
	(function () {
		var btn = document.getElementById('back-to-top');
		if (!btn) return;

		function toggle() {
			if (window.pageYOffset > 400) {
				btn.classList.add('is-visible');
			} else {
				btn.classList.remove('is-visible');
			}
		}

		var reduce = window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		window.addEventListener('scroll', toggle, { passive: true });
		toggle();

		btn.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		});
	})();


	/* ========================================================================= */
	/*	Hero: facade de vídeo (carga el iframe solo al hacer clic)
	/* =========================================================================  */
	(function () {
		var facade = document.querySelector('.hero-video-facade');
		if (!facade) return;

		facade.addEventListener('click', function () {
			var url = facade.getAttribute('data-video');
			if (!url) return;
			var sep = url.indexOf('?') > -1 ? '&' : '?';
			var iframe = document.createElement('iframe');
			iframe.src = url + sep + 'autoplay=1';
			iframe.setAttribute('allow', 'autoplay; fullscreen');
			iframe.setAttribute('allowfullscreen', '');
			iframe.title = 'La OfiLibre en dos minutos';
			var wrap = facade.closest('.hero-video');
			wrap.innerHTML = '';
			wrap.appendChild(iframe);
		});
	})();


	/* ========================================================================= */
	/*	Hero: constelación generativa de fondo (nodos rojos conectados)
	/* =========================================================================  */
	(function () {
		var canvas = document.querySelector('.hero-canvas');
		if (!canvas || !canvas.getContext) return;

		var ctx = canvas.getContext('2d');
		var COLOR = '203,0,23'; /* #cb0017 */
		var LINK_DIST = 130;
		var reduce = window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var w, h, dpr, nodes, raf = null, visible = true;

		function initNodes() {
			var count = Math.max(20, Math.min(70, Math.round(w * h / 16000)));
			nodes = [];
			for (var i = 0; i < count; i++) {
				nodes.push({
					x: Math.random() * w,
					y: Math.random() * h,
					vx: (Math.random() - 0.5) * 0.4,
					vy: (Math.random() - 0.5) * 0.4,
					r: Math.random() * 1.6 + 1
				});
			}
		}

		function resize() {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = canvas.clientWidth;
			h = canvas.clientHeight;
			if (!w || !h) return;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			initNodes();
		}

		function draw() {
			ctx.clearRect(0, 0, w, h);
			var i, j, n;
			for (i = 0; i < nodes.length; i++) {
				n = nodes[i];
				if (!reduce) {
					n.x += n.vx; n.y += n.vy;
					if (n.x < 0 || n.x > w) n.vx *= -1;
					if (n.y < 0 || n.y > h) n.vy *= -1;
				}
				ctx.beginPath();
				ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(' + COLOR + ',0.55)';
				ctx.fill();
			}
			for (i = 0; i < nodes.length; i++) {
				for (j = i + 1; j < nodes.length; j++) {
					var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
					var dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < LINK_DIST) {
						ctx.beginPath();
						ctx.moveTo(nodes[i].x, nodes[i].y);
						ctx.lineTo(nodes[j].x, nodes[j].y);
						ctx.strokeStyle = 'rgba(' + COLOR + ',' + (0.18 * (1 - dist / LINK_DIST)) + ')';
						ctx.lineWidth = 1;
						ctx.stroke();
					}
				}
			}
		}

		function loop() { draw(); raf = window.requestAnimationFrame(loop); }
		function start() { if (!raf && nodes) { loop(); } }
		function stop() { if (raf) { window.cancelAnimationFrame(raf); raf = null; } }

		resize();
		if (!nodes) return;
		window.addEventListener('resize', resize);

		if (reduce) { draw(); return; } /* un frame estático, sin animación */

		/* Arranca siempre; el observer solo sirve para PAUSAR fuera de pantalla */
		start();

		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				entries.forEach(function (e) {
					visible = e.isIntersecting;
					if (visible) { start(); } else { stop(); }
				});
			}).observe(canvas);
		}
		document.addEventListener('visibilitychange', function () {
			if (document.hidden) { stop(); } else if (visible) { start(); }
		});
	})();


	/* ========================================================================= */
	/*	Barra de progreso de lectura + sombra del header al hacer scroll
	/* =========================================================================  */
	(function () {
		var bar = document.getElementById('reading-progress');
		var article = document.querySelector(
			'.blog-single .post-content, .single-post .post-content, .single-presentation .post-content, .section-sm .content'
		);
		var header = document.querySelector('.top-bar');
		var hasArticle = !!(bar && article);

		if (!header && !hasArticle) return;
		if (hasArticle) { bar.hidden = false; }

		function update() {
			if (header) {
				if (window.pageYOffset > 20) {
					header.classList.add('is-scrolled');
				} else {
					header.classList.remove('is-scrolled');
				}
			}
			if (hasArticle) {
				var docEl = document.documentElement;
				var max = docEl.scrollHeight - docEl.clientHeight;
				var pct = max > 0 ? window.pageYOffset / max : 0;
				pct = Math.max(0, Math.min(1, pct));
				bar.style.width = (pct * 100) + '%';
				bar.setAttribute('aria-valuenow', Math.round(pct * 100));
			}
		}

		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		update();
	})();


	/* ========================================================================= */
	/*	Tilt 3D sutil en tarjetas (inclinación según el cursor)
	/* =========================================================================  */
	(function () {
		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
		if (reduce || noHover) return;

		var MOVE = 'transform 0.08s ease-out, background 0.3s ease, box-shadow 0.3s ease';
		var REST = 'transform 0.5s ease, background 0.3s ease, box-shadow 0.3s ease';
		var cards = document.querySelectorAll('.feature-card, .resources-item, .post-item');

		for (var i = 0; i < cards.length; i++) {
			(function (card) {
				card.addEventListener('mouseenter', function () {
					card.style.transition = MOVE;
				});
				card.addEventListener('mousemove', function (e) {
					var r = card.getBoundingClientRect();
					var px = (e.clientX - r.left) / r.width;
					var py = (e.clientY - r.top) / r.height;
					var rx = ((py - 0.5) * -7).toFixed(2);
					var ry = ((px - 0.5) * 7).toFixed(2);
					card.style.transform =
						'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
				});
				card.addEventListener('mouseleave', function () {
					card.style.transition = REST;
					card.style.transform = '';
				});
			})(cards[i]);
		}
	})();
