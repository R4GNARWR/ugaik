(function(){
	jQuery.fn.slideFadeClose = function(speed, easing, callback) {
		return this.animate({opacity: 'hide', height: 'hide'}, speed, easing, callback);
	};
	jQuery.fn.slideFadeOpen = function(speed, easing, callback) {
		return this.animate({opacity: 'show', height: 'show'}, speed, easing, callback);
	};


	$(function(){
		$("#flat-block-info").click(function(){
			$("#popup-detail").fadeIn(300, function(){ $('body').addClass('locked'); });
			return false;
		});
	});


	var slides = {

	}
	var test;
	$(function() {

		//1. создать контексты
		//2. обработчики нажатий
		// смена этажа =>

		/*planeta.flat.image.onload = function(){
			$("#flat-block-image-loader").fadeOut(300);
			$("#flat-block-image").css("backgroundImage","url("+this.src+")").fadeIn(300);
		}
		planeta.popup.image.onload = function(){
			//alert(this.src);
			$("#popup-form-image-loader").fadeOut(300);
			$("#popup-form-image").css("backgroundImage","url("+this.src+")").fadeIn(300);
		}*/

		/*$( ".popup-form-thumb-item" ).on( "click", function() {
			//alert( "clicked: " + $(this).data("fullImage"));
			alert(123);
			return false;
		});*/

		var cxt, cxt2, cxt2_hover;

		//var img = document.createElement('img');



		// Поэтажка
		var slidenum = 0;
		$(".genplan-wrap .slide").each(function(){
			//alert($(this).data("svgblock"));
			var wrapH = $("#slides").height(), wrapW = $("#slides").width(), wrapRatio = wrapW/wrapH;
			var cxtH = 0, cxtW = 0;
			var scont = $(this), slideid = $(this).data("svgblock"), umageurl = $(this).data("image"), containerId = "", container = $(this);

			var cxt = slides[slideid] = SVG().addTo('#'+slideid);
			console.log(slides, slideid);
			slidenum++;

			if (typeof $(this).attr("id") == "undefined") {
				$(this).attr("id", "slide_" + getRandomInt(0,10000));
			}
			containerId = $(this).attr("id");
			container.css("marginTop", 0);
			container.css("marginLeft", 0);

			// var houseset = cxt.set();
			var houseset = new SVG.List([]);
			// var tooltipset = cxt.set();
			var tooltipset = new SVG.List([]);

			//Грузим картинку
			var image = cxt.image(umageurl, function(loader) {
				var image = loader.target;
				cxt.prop_w = image.naturalWidth;
				cxt.prop_h = image.naturalHeight || cxt.prop_w;
				cxt.ratio = cxt.prop_w / cxt.prop_h;
				cxt.container = containerId;

				//Вписываем картинку в зависимости от масштаба
				if (cxt.ratio > wrapRatio) {
					cxtH = wrapH;
					cxtW = cxt.ratio * cxtH;
					container.css("marginLeft", -Math.abs(cxtW - wrapW)/2+"px");
				} else {
					cxtW = wrapW;
					cxtH = cxtW / cxt.ratio;
					container.css("marginTop", -Math.abs(cxtH - wrapH)/2+"px");
				}
				cxt.size(cxtW, cxtH);
				cxt.viewbox(0, 0, cxt.prop_w, cxt.prop_h);
				this.size(cxt.prop_w, cxt.prop_h);
			});

			//Перебираем и рисуем все области слайда области
			var areanum = 0;
			scont.find(".area").each(function(){

				var coords = $(this).data('coords');
				//Если не указаны координаты, то пропускаем
				if (typeof coords=='undefined' || !coords) {
					//alert("fuck");
					return;
				}
				//alert(coords);

				//Есть ли плашка с подсказкой
				var tooltip = typeof $(this).data('tooltip') != "undefined" && $(this).data('tooltip') == 1 ? true : false;
				var gotoUrl = $(this).data('url') || "";

				areanum++;
				var areaid=slidenum+"_"+areanum;
				var houseid=$(this).data('houseid') || "";
				var ttactive=$(this).data('ttactive') || 0;

				//Рисуем саму область выделения
				var path = cxt.path(coords).attr({fill: "rgba(255,180,1,0.6)", opacity: 0.15, id: "area_"+areaid}).addClass("area_path").data("url", gotoUrl);
				if (tooltip) path.data({"linked_tooltip":"area_tooltip_"+areaid, "houseid":houseid, "ttactive": ttactive});
				houseset.push(path);

				//Если есть плашка
				if (tooltip){
					var ttdir = $(this).data('ttdir') || "top", ttposx = $(this).data('ttposx') || 0, ttposy = $(this).data('ttposy') || 0, tttext = $(this).data('tttext') || "", ttscale = $(this).data('ttscale') || 1, ttbgcolor = $(this).data('ttbgcolor') || "#0C52C2", ttbghover = $(this).data('ttbghover') || "#FFB401", tttextcolor = $(this).data('tttextcolor') || "#ffffff", tttexthover = $(this).data('tttexthover') || "#2F3130", ttfontsize = $(this).data('ttfontsize') || 18, ttsubt = $(this).data('ttsubt') || "";
					//Создаем группу, в которой будет контур и текст
					var plashka = cxt.group().attr({id: "area_tooltip_"+areaid}).addClass("pl_group").data({"linked_area":"area_"+areaid});
					plashka.data({"ttbgcolor":ttbgcolor, "ttbghover":ttbghover});
					plashka.data({"tttextcolor":tttextcolor, "tttexthover":tttexthover});
					var pl_bg;
					switch(ttdir){
						case 'left':
							pl_bg = plashka.path("M-15,-19 H-106 Q-110,-19 -110,-16 V16 Q-110,19 -106,19 H-15 L-1,2 Q1,0 -1,-2 Z");
							break;
						case 'right':
							pl_bg = plashka.path("M15,-19 H106 Q110,-19 110,-16 V16 Q110,19 106,19 H15 L1,2 Q-1,0 1,-2 Z");
							break;
						default:
							pl_bg = plashka.path("M0,0 l-8,-12 h-43 v-40 h101 v40 h-43 Z");
							break;
					}
					pl_bg.attr({fill: ttbgcolor}).addClass("pl_bg");
					plashka.text(function(add){
						add.tspan(tttext);
						if (ttsubt.length) {
							add.tspan(ttsubt).newLine().font({
								size: ttfontsize-5,
							});
						}
					})
					.font({
						family:   'PT Sans Narrow',
						size:     ttfontsize,
						anchor:   'middle',
						leading:  '1em'
					})
					.center(0,-0.6*pl_bg.height())
					.attr({
						"text-anchor":"middle",
						"font-weight":"bold",
						"fill":tttextcolor
					})
					.addClass("pl_text");

					//Рисуем в группе текст, назначаем класс, сдвигаем начало координат
					//Масштабируем группу
					plashka.center(ttposx,ttposy - 0.5*pl_bg.height()).scale(ttscale);
					tooltipset.push(plashka);
				}

			});

			houseset
				.mouseover(function(){
					this.timeline().stop();
					this.animate(200, 0, 'now').ease('<>').attr({opacity: 1});
					//Если есть связанная плашка, то анимируем отдельно контур и текст
					if (typeof this.data("linked_tooltip") != "undefined") {
						var element = SVG('#'+this.data("linked_tooltip")),
							pl_bg = element.find("path.pl_bg"),
							pl_text = element.find(".pl_text");
						//element.addClass("active");
						pl_bg.timeline().stop();
						pl_bg.animate(200, 0, 'now').ease('<>').attr({fill: element.data("ttbghover")});
						pl_text.timeline().stop();
						pl_text.animate(200, 0, 'now').ease('<>').attr({fill: element.data("tttexthover")});

						//alert(element.data("ttbghover"));
						//alert(pl_text.data("tttexthover"));
						//test=pl_bg;
						//element.animate(300).scale(1.5);
					}

				})
				.mouseout(function(){
					this.timeline().stop();
					this.animate(200, 0, 'now').ease('<>').attr({opacity: 0.15});
					//Если есть связанная плашка, то анимируем отдельно контур и текст
					if (typeof this.data("linked_tooltip") != "undefined") {
						var element = SVG('#'+this.data("linked_tooltip")),
							pl_bg = element.find("path.pl_bg"),
							pl_text = element.find('.pl_text');
						//element.removeClass("active");
						pl_bg.timeline().stop();
						pl_bg.animate(200, 0, 'now').ease('<>').attr({fill: element.data("ttbgcolor")});
						pl_text.timeline().stop();
						pl_text.animate(200, 0, 'now').ease('<>').attr({fill: element.data("tttextcolor")});
						//element.animate(300).scale(1);
					}
				})

				.click(function(){
					if (this.data('ttactive')) {
						openHouse(this.data("houseid"));
					}
					//alert(this.data("houseid"));
					/*if (this.data("url")) {
						document.location.href = this.data("url");
					}*/
					//document.location.href = url.value;
				});
		});



		$(".genplan-wrap a.arrow").click(function(){
			/*if ($(this).hasClass("left")) alert("left");
			if ($(this).hasClass("right")) alert("right");*/
			var $slides = $(".genplan-wrap .slide");
			var slideactive = $(".genplan-wrap .slide.active");
			var slidenext;
			if ($(this).hasClass("left")) {
				slidenext = slideactive.prev(".slide");

				if (slidenext.length == 0) slidenext = $slides.last();

				test=slidenext;
			}
			if ($(this).hasClass("right")) {
				slidenext = slideactive.next(".slide");

				if (slidenext.length == 0) slidenext = $slides.first();

				test=slidenext;
			}

			slideactive.fadeTo(300, 0, function(){$(this).removeClass("active"); $(this).css("display","none");});
			slidenext.fadeTo(300, 1, function(){$(this).addClass("active")});;

			/*slideactive.removeClass("active");
			slidenext.addClass("active");*/
			return false;
		});

		jQuery( window ).resize(function() {
			//alert(123);
			var wrapH = $("#slides").height(), wrapW = $("#slides").width(), wrapRatio = wrapW/wrapH;
			//alert(wrapW+" "+wrapH+" "+wrapRatio);
			console.log(slides);
			for (var key in slides) {
				var slide = slides[key], cxtW = 0, cxtH = 0, container = $("#"+slide.container);
				container.css("marginTop", 0);
				container.css("marginLeft", 0);
				if (slide.ratio > wrapRatio) {
					cxtH = wrapH;
					cxtW = slide.ratio * cxtH;
					container.css("marginLeft", -Math.abs(cxtW - wrapW)/2+"px");
				} else {
					cxtW = wrapW;
					cxtH = cxtW / slide.ratio;
					//slide.size(cxtW, cxtH);
					container.css("marginTop", -Math.abs(cxtH - wrapH)/2+"px");
				}
				slide.size(cxtW, cxtH);
				//alert(slide.ratio);
			}
		});



		/*var cxtH = $("#house").height(), cxtW = 0; //imgRatio * cxtH;

		planeta.house.cxt = cxt = SVG('house');

		var image = cxt.image("img/lit2-house.png").loaded(function(loader) {
			planeta.house.prop_w = loader.width;
			planeta.house.prop_h = loader.height;
			planeta.house.ratio = loader.ratio;

			cxtW = loader.ratio * cxtH;
			planeta.house.cxt.size(cxtW, cxtH);
			planeta.house.cxt.viewbox(0, 0, loader.width, loader.height);
			this.size(loader.width, loader.height);
		});
		planeta.house.image = image;*/

		/*var floorset = planeta.house.cxt.set();

		for (var key in floors) {
			var floor = floors[key];
			if (!floor.path) continue;
			var path = planeta.house.cxt.path(isNaN(floor.path) ? floor.path : paths[floor.path]).fill('rgba(255,180,1,0.75)').attr({"opacity": 0, id: "floor_"+floor.num}).data({"key": key, "floornum": floor.num});
			floorset.add(path);
		}

		floorset
			.mouseover(function(){
				var floorflats = floors[this.data("key")].flats;
				this.animate(300).attr("opacity",1);
				$("#sw-sign-floor").text(this.data("floornum"));
				//$("#sw-sign-text-num").text(floorflats.length);
				$("#sw-sign-text-title").text("На этаже "+floorflats.length+" квартир:");

				var str = '';
				if (typeof floors[this.data("key")].dstring != "undefined") {
					str = floors[this.data("key")].dstring;
				} else {

					var area_min = {};
					for (var key in floorflats) {
						var flat = flat_types[flats[floorflats[key]].ft];
						if (typeof area_min[flat.r] == "undefined") {
							area_min[flat.r] = {count: 1, area: flat.a};
						} else {
							area_min[flat.r].count++;
							if (flat.a < area_min[flat.r].area) area_min[flat.r].area = flat.a;
						}
					}

					for (var ii=0; ii<=6; ii++){
						if (typeof area_min[ii] != "undefined") {
							if (ii == 0) str += "Студии "; else str += ii+"-комн. ";
							str += "<strong>" + area_min[ii].count + " шт. от " + area_min[ii].area + " м&sup2;</strong><br/>";
						}
					}

					floors[this.data("key")].dstring = str;
				}


				$("#sw-sign-text-descr").html(str);
			})
			.mouseout(function(){
				this.animate(300).attr("opacity",0);
			})
			.click(function(){
				setActiveFloorHouse(this.data("key"));
				openSect(this.data("key"));
			});
	*/



		//Resize
		/*jQuery( window ).resize(function() {
			//alert(123);
			var cxtH = $("#house").height(), cxtW = planeta.house.ratio * cxtH;
			var cxtW2 = $("#sect").width(), cxtH2 = cxtW2 / planeta.sect.ratio;
			planeta.house.cxt.size(cxtW, cxtH);

			planeta.sect.cxt.size(cxtW2, cxtH2);
			planeta.sect.cxt_hover.size(cxtW2, cxtH2);
		});*/


	});

	function scrollToID(elem){
		var top = $(elem).offset().top;
		$('body,html').animate({scrollTop: top}, 700);
	}

	function getRandomInt(min, max)
	{
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

})();
