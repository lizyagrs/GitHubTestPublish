/*****************************EsriMap***************************************/
var fid;
require(
	[
		"esri/Map",
		"esri/layers/FeatureLayer",
		//"esri/symbols/PictureMarkerSymbol",
		"esri/Graphic",
		"esri/views/MapView",
		"dojo/domReady!",
	],
	function(
		Map, FeatureLayer, Graphic, MapView //PictureMarkerSymbol,
	) {
		
		var layer1 = new FeatureLayer({
			portalItem: {
				id: "08e37515524644848e98784b4a1ee2fc"
			},

			popupTemplate: {
				title: "地点：{location}",
				content: "fid:{FID}"
			}
			//popupEnabled: false

		});

		var map = new Map({
			basemap: "topo",
			layers: [layer1]
		});

		/************************************************************
		 * Set the WebMap instance to the map property in a MapView.
		 ************************************************************/
		var view = new MapView({
			map: map,
			container: "viewDiv",
			zoom: 4,
			center: [107, 35.5]
		});

		//    view.ui.add("info", "top-left");
		view.ui.add("info");
		view.on("pointer-move", eventHandler);
		view.on("pointer-down", eventHandler);

		function eventHandler(event) {
			// the hitTest() checks to see if any graphics in the view
			// intersect the given screen x, y coordinates
			view.hitTest(event)
				.then(getGraphics);
		}

		function getGraphics(response) {
			// the topmost graphic from the Layer1
			// and display select attribute values from the
			// graphic to the user
			if(response.results.length) {
				var graphic = response.results.filter(function(result) {
					return result.graphic.layer === layer1;
				})[0].graphic;

				var attributes = graphic.attributes;
				fid = attributes.fid;
				var poemlcid = attributes.poemlcid;
				var location = attributes.location;

				document.getElementById("info").style.visibility = "visible";
				document.getElementById("location").innerHTML = location;
				document.getElementById("fid").innerHTML = "FID " + fid;
				xianshifid(fid);

				layer1.renderer = renderer;
			}
		}

	});

console.log(fid);

//var pg = require('pg');
//
///* 
// * 使用连接池 
// * */  
//function connectPgWithPool() {  
//  var pgConfig = {  
//      user: 'postgres',  
//      database: 'postgres',  
//      password: '123456',  
//      host: '127.0.0.1',  
//      port: '5432',  
//      poolSize: 5,  
//      poolIdleTimeout: 30000,  
//      reapIntervalMillis: 10000  
//  };  
//  var pgPool = new pg.Pool(pgConfig);  
//  // var pgPool = new pg.pools.getOrCreate(pgConfig);// 低版本的pg模块需要这样来创建连接池  
//    
//  pgPool.connect(function (isErr, client, done) {  
//      if (isErr) {  
//          console.log('connect query:' + isErr.message);  
//          return;  
//      }  
//      client.query('select now();', [], function (isErr, rst) {  
//          done();  
//          if (isErr) {  
//              console.log('query error:' + isErr.message);  
//          } else {  
//              console.log('connectPgWithPool query success, data is: ' + rst.rows[0].now);  
//          }  
//      })  
//  });  
//}  

//
//
///*****************************遮罩***************************************/
//$(function() {
//	//alert($(window).height());
//	$('#_ClickMe').click(function() {
//		$('#code').center();
//		$('#goodcover').show();
//		$('#code').fadeIn();
//	});
//	$('#_close').click(function() {
//		$('#code').hide();
//		$('#goodcover').hide();
//	});
//	$('#goodcover').click(function() {
//		$('#code').hide();
//		$('#goodcover').hide();
//	});
//
//	jQuery.fn.center = function(loaded) {
//		var obj = this;
//		body_width = parseInt($(window).width());
//		body_height = parseInt($(window).height());
//		block_width = parseInt(obj.width());
//		block_height = parseInt(obj.height());
//
//		left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
//		if(body_width < block_width) {
//			left_position = 0 + $(window).scrollLeft();
//		};
//
//		top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
//		if(body_height < block_height) {
//			top_position = 0 + $(window).scrollTop();
//		};
//
//		if(!loaded) {
//
//			obj.css({
//				'position': 'absolute'
//			});
//			obj.css({
//				'top': ($(window).height() - $('#code').height()) * 0.5,
//				'left': left_position
//			});
//			$(window).bind('resize', function() {
//				obj.center(!loaded);
//			});
//			$(window).bind('scroll', function() {
//				obj.center(!loaded);
//			});
//
//		} else {
//			obj.stop();
//			obj.css({
//				'position': 'absolute'
//			});
//			obj.animate({
//				'top': top_position
//			}, 200, 'linear');
//		}
//	}
//
//})
//
///*****************************登录注册界面***************************************/
//$(document).ready(function() {
//		//打开会员登录 
//		$("#Login_start_").click(function() {
//			$("#regist_container").hide();
//			$("#_close").show();
//			$("#_start").animate({
//				left: '350px',
//				height: '500px',
//				width: '400px',
//
//			}, 500, function() {
//				$("#login_container").show(500);
//				$("#_close").animate({
//					height: '20px',
//					width: '20px'
//				}, 500);
//			});
//		});
//		//打开会员注册
//		$("#Regist_start_").click(function() {
//			$("#login_container").hide();
//			$("#_close").show();
//			$("#_start").animate({
//				left: '350px',
//				height: '500px',
//				width: '400px',
//			}, 500, function() {
//				$("#regist_container").show(500);
//				$("#_close").animate({
//					height: '20px',
//					width: '20px'
//				}, 500);
//			});
//		});
//		//关闭
//		$("#_close").click(function() {
//			
//			$("#_close").animate({
//				height: '0px',
//				width: '0px'
//			}, 500, function() {
//				$("#_close").hide(500);
//				$("#login_container").hide(500);
//				$("#regist_container").hide(500);
//				$("#_start").animate({
//					left: '0px',
//					height: '0px',
//					width: '0px'
//				}, 500);
//			});
//		});
//		//去 注册
//		$("#toRegist").click(function(){
//			$("#login_container").hide(500);
//			$("#regist_container").show(500);
//		});
//		//去 登录
//		$("#toLogin").click(function(){
//			$("#regist_container").hide(500);
//			$("#login_container").show(500);
//		});
//	});
//
////*********选项btn**********//
//
//var clock = '';
//var nums = 30;
//var btn;
//
//function sendCode(thisBtn) {
//	btn = thisBtn;
//	btn.disabled = true; //将按钮置为不可点击
//	btn.value = '重新获取（' + nums + '）';
//	clock = setInterval(doLoop, 1000); //一秒执行一次
//}
//
//function doLoop() {
//	nums--;
//	if(nums > 0) {
//		btn.value = '重新获取（' + nums + '）';
//	} else {
//		clearInterval(clock); //清除js定时器
//		btn.disabled = false;
//		btn.value = '点击发送验证码';
//		nums = 10; //重置时间
//	}
//}
//
//$(document).ready(function() {
//	$("#login_QQ").click(function() {
//		alert("暂停使用！");
//	});
//	$("#login_WB").click(function() {
//		alert("暂停使用！");
//	});
//});

//
///*****************************bubbleScroll右下角******************************************************/
//(function ( $ ) {
//	//////////////////////////////////////////
//	// THE BUBBLESCROLL PLUGIN STARTS HERE //
//	/////////////////////////////////////////
//	$.fn.bubbleScroll = function( options ) {
//	
//		if($.cookie("bubbleScroll_close") == null) {
//			var el = $(this); 
//			
//			// Plugin Param
//			var settings = $.extend({
//				borderColor: "#000",
//				backgroundColor: "#FFF",
//				textColor: "#000",
//				bubbleStyle: "circle",
//				position: "right",
//				alwaysVisible: false,
//				useCookie: false
//			}, options );
//			
//			// Change the BubbleScroll Style
//			el.find(".bubbleScroll_inner").css({
//				borderColor: settings.borderColor,
//				background: settings.backgroundColor,
//				color: settings.textColor
//			});
//			
//			// Change the style to a square
//			if(settings.bubbleStyle == "square") {
//				el.find(".bubbleScroll_inner").css({
//					borderRadius: 0
//				});
//			}
//			
//			// Change the position (left or right)
//			if(settings.position == "left" && settings.bubbleStyle == "circle")
//			{
//				el.css({
//					left: 0,
//					right: "inherit"
//				});
//				
//				el.find(".bubbleScroll_inner").css({
//					borderRadius: "150px 150px 150px 0",
//					borderLeft: "none",
//					borderRight: "2px solid " + settings.borderColor
//				});
//			} else if(settings.position == "left" && settings.bubbleStyle == "square") {
//				el.find(".bubbleScroll_inner").css({
//					borderLeft: "none",
//					borderRight: "2px solid " + settings.borderColor
//				});
//				
//				el.css({
//					left:"-300px",
//					right: "inherit"
//				});
//			}
//			
//			if(settings.alwaysVisible) {
//				if(settings.position == "right")
//					el.stop(true).animate({bottom:'0px', right:'0px'},450);
//				else
//					el.stop(true).animate({bottom:'0px', left:'0px'},450);
//			} else {
//				// Scroll Event
//				$(window).scroll(function()
//				{
//					var clicked = false;
//					var scrollPosition = window.pageYOffset;
//					var windowSize     = window.innerHeight;
//					var bodyHeight     = document.body.offsetHeight;
//					var bottomDistance = Math.max(bodyHeight - (scrollPosition + windowSize), 0);
//					
//					if(bottomDistance < 300)
//					{
//						if(settings.position == "right")
//							el.stop(true).animate({bottom:'0px', right:'0px'},450);
//						else
//							el.stop(true).animate({bottom:'0px', left:'0px'},450);
//					} else if(bottomDistance > 300) {
//						if(settings.position == "right")
//							el.animate({bottom:'-300px', right:'-300px'},650);
//						else
//							el.animate({bottom:'-300px', left:'-300px'},650);
//					}
//				});
//			}
//			
//			// Click to close the bubble
//			$(document).on("click", ".bubbleScroll_close_button", function(e) {
//		    	e.preventDefault();
//			    $(el).animate({bottom:'-300px', right:'-300px'},650);
//			    $(el).remove();
//			    
//			    		
//				// Check the cookie option
//				if(settings.useCookie) {
//					$.cookie("bubbleScroll_close", 1);
//				}
//			});
//		}
//		
//	};
//}( jQuery ));
//
//$(document).ready(function() {
//
//	var bgColor 		= "#FFF";
//	var borderColor 	= "#000";
//	var textColor 		= "#000";
//	var bubbleStyle 	= "circle";
//	var position 		= "right";
//	var alwaysVisible	= false;
//	var useCookie		= false;
//	
//	$(".bubbleScroll").bubbleScroll();
//	
//	// BubbleScroll Options
//	// -- Always Visible
//	$(".update").click( function(){
//		if( $(".alwaysVisible").is(':checked') ) 
//		{ 
//			alwaysVisible = true;
//		} else { 
//			alwaysVisible = false;
//		}
//		
//		if( $(".useCookie").is(':checked') ) 
//		{ 
//			useCookie = true;
//		} else { 
//			useCookie = false;
//		}
//				
//		bgColor = $(".backgroundColor").val();
//		borderColor = $(".borderColor").val();
//		textColor = $(".textColor").val();
//		bubbleStyle = $(".bubbleStyle").val();
//		position = $(".position").val();
//		
//		if(useCookie)
//		{
//			if (confirm("You have checked the cookie option. When you will close the bubble and if you refresh the page, you will not see it anymore until you erase your cookies ;-) .")) {
//				$(".bubbleScroll").remove();
//				$("body").append("<div class='bubbleScroll'><div class='bubbleScroll_inner'><a href='#' class='bubbleScroll_close_button'>x</a><h2>BubbleScroll</h2><p><img style=\"border-radius:8px\" src=\"img/codecanyon.jpg\" alt=\"codecanyon\" width=\"150\" /><br />Buy this Script on <b>CodeCanyon</b></p></div></div>");
//				// BubbleScroll
//				$(".bubbleScroll").bubbleScroll({
//					borderColor: borderColor,
//					backgroundColor: bgColor,
//					textColor: textColor,
//					bubbleStyle: bubbleStyle,
//					position: position,
//					alwaysVisible: alwaysVisible,
//					useCookie: useCookie
//				});
//			}
//		} else {
//			$(".bubbleScroll").remove();
//			$("body").append("<div class='bubbleScroll'><div class='bubbleScroll_inner'><a href='#' class='bubbleScroll_close_button'>x</a><h2>BubbleScroll</h2><p><img style=\"border-radius:8px\" src=\"img/codecanyon.jpg\" alt=\"codecanyon\" width=\"150\" /><br />Buy this Script on <b>CodeCanyon</b></p></div></div>");
//			// BubbleScroll
//			$(".bubbleScroll").bubbleScroll({
//				borderColor: borderColor,
//				backgroundColor: bgColor,
//				textColor: textColor,
//				bubbleStyle: bubbleStyle,
//				position: position,
//				alwaysVisible: alwaysVisible,
//				useCookie: useCookie
//			});
//		}
//	});
//
//	// BubbleScroll
//	$(".bubbleScroll").bubbleScroll({
//		borderColor: borderColor,
//		backgroundColor: bgColor,
//		textColor: textColor,
//		bubbleStyle: bubbleStyle,
//		position: position,
//		alwaysVisible: alwaysVisible,
//		useCookie: useCookie
//	});
//});
///**************************************************************************************************/