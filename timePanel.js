(function($){
	$.fn.timePanelPlugin = function(options){

		var TimePanel = function(ele,opt){
			this.$element = ele;
			this.defaults = {
				'beginInput':'#datetimepicker1',
				'endInput':'#datetimepicker2',
				'showTime':'200'
			};
			this.options = $.extend({},this.defaults,opt)
		}
		TimePanel.prototype = {
			init: function(){
				this.initTempalte()
				this.allElements()
				this.date2Click()
				this.date3Click()
				this.timePanelClick()
			},
			_tempalte:[
				'<div id="timePanel" class="timePanel">',
				'<p class="timeHead"><span>06</span>:<span>00</span></p>',
				'<ul class="timeHour"></ul>',
				'<ul class="timeMin"></ul>',
				'<div class="btn-usunal time-confirm">确认</div></div>'
			],
			initTempalte: function(){
				
				$(this.$element).append(this._tempalte.join(""));

				this.$timePanel =$timePanel= $(this.$element).children(".timePanel");
				 this.$timeHour = $timeHour = $timePanel.children('.timeHour');

				 this.$timeMin = $timeMin = $timePanel.children('.timeMin');
				 for(var i=0;i<18;i++){

				 	$timeHour.append("<li class='live'></li>")
				 }
				for(var i=0;i<12;i++){
					$timeMin.append("<li class='live'></li>")
				}
				$timeHour.children('li:first').addClass("active")
				$timeMin.children('li:first').addClass("active")

				$timeHour.children('li').each(function(index){

					if(index<4){
						$(this).text('0'+(6+index))
					}else{
						$(this).text(6+index)
					}
				})
				$timeMin.children('li').each(function(index){
					if(index ==0||index == 1){
						$(this).text('0'+5*index)
					}else{
						$(this).text(5*index)
					}
				})
			},
			allElements: function(){
				var $date2,$date1,$timeMinLi,$timeHourLi,$timeHeadSpanLast,$timeHeadSpanFirst;
				this.$date1 =$(this.$element).find(this.options.beginInput),
				this.$date2 =$(this.$element).find(this.options.endInput),

				this.$timeMinLi = this.$timeMin.children("li"),
				this.$timeHourLi =this.$timeHour.children("li"),
			 	this.$timeHeadSpanLast =this.$timePanel.find(".timeHead span:last"),
			 	this.$timeHeadSpanFirst = this.$timePanel.find(".timeHead span:first");

			},
			date2Click: function(){
				$date1 = this.$date1,
				$timePanel=this.$timePanel,
				$date2 = this.$date2,
				$timeHourLi = this.$timeHourLi,
				$timeMinLi = this.$timeMinLi,
				$timeHeadSpanFirst = this.$timeHeadSpanFirst,
				showTime = this.options.showTime;
				$date1.click(function(){
						//起始时间点击事件
						$timePanel.show(showTime)
						$timePanel.css({
							'top':$date1.position().top+70,
							'left':$date1.position().left+20
						})
						$(this).addClass("texting")
						$date2.removeClass("texting")
						var data2ValF =$(this).val().slice(0,2)
						var keyNum = parseInt($timeHourLi.eq(0).text())

						$date2.val("")
						$timePanel.find("li").each(function(){

							$(this).addClass("live")
						})
						if($timeHeadSpanFirst.text() ==$timeHourLi.length+keyNum-1){
								$timeHourLi.eq($timeHourLi.length-1).click()
								$timeMinLi.eq($timeMinLi.length-2).click()
							}

					})

			},
			date3Click: function(){
				$date1 = this.$date1,
				$timePanel=this.$timePanel,
				$date2 = this.$date2,
				$timeHourLi = this.$timeHourLi,
				$timeMinLi = this.$timeMinLi,
				showTime = this.options.showTime;
				$date2.click(function(){
		
						$(this).addClass("texting")
						$date1.removeClass("texting")
						if($date1.val()){
						$timePanel.show(showTime)
						$timePanel.css({
							'top':$date2.position().top+70,
							'left':$date2.position().left-100
						})
						var data2ValF = $date1.val().slice(0,2)
						var data2ValA = $date1.val().slice(3,5)
						var actText = parseInt(data2ValF)
						var MinText = parseInt(data2ValA)
						var keyNum = parseInt($timeHourLi.eq(0).text())
						var num = MinText/5
						$timePanel.find('li').each(function(){
							$(this).addClass("live")
						})
						$timeMinLi.eq(num+1).click()
						for(var i=0;i<num+1;i++){
							$timeMinLi.eq(i).removeClass("class")
						}
						clearHourNum = data2ValA == 55?actText-keyNum+1:actText-keyNum;
						$timeHourLi.eq(clearHourNum).click()
						for(var i =0;i<clearHourNum;i++){
								
								$timeHourLi.eq(i).removeClass("live")

							}
					}else{
						alert("请先输入起始时间！")
						$timePanel.hide(showTime)
					}
					})

			},
			timePanelClick : function(){
				$date1 = this.$date1,
				$timePanel=this.$timePanel,
				$date2 = this.$date2,
				$timeHourLi = this.$timeHourLi,
				$timeMinLi = this.$timeMinLi,
				$timeHeadSpanFirst = this.$timeHeadSpanFirst,
				$timeHeadSpanLast =  this.$timeHeadSpanLast,
				showTime = this.options.showTime;
				$timePanel.click(function(e){
								if($(e.target).parent().hasClass("timeHour")&&$(e.target).hasClass("live")){
									var thisTime = $(e.target).text()
									$timeHeadSpanFirst.text(thisTime)
									$(e.target).addClass("active").siblings().removeClass("active")
									var keyNum = parseInt($timeHourLi.eq(0).text())
									if($date2.hasClass("texting")){
										var paseTime = parseInt(thisTime)
										var data2Val = parseInt($date1.val())
										
										if(paseTime>data2Val){
											$timeMinLi.each(function(){
												$(this).addClass("live")
											})
										}else{
											var data2ValA = $date1.val().slice(3,5)
											var data3ValA = $date2.val().slice(3,5)
											var MinText = parseInt(data2ValA)
											var num = MinText/5
											$timeHeadSpanLast.text(data2ValA)
											$timeMinLi.filter(".active").removeClass("active")
											if(data3ValA<=data2ValA){
												$timeMinLi.eq(num+1).click()
											}else{
												var nowNum = parseInt(data3ValA)/5
												$timeMinLi.eq(nowNum).click()
											}
											for(var i=0;i<num+1;i++){
													$timeMinLi.eq(i).removeClass("live")
												
											}
										}
										
									}
									else{
										
										if($(e.target).text() ==$timeHourLi.length+keyNum-1){
											$timeMinLi.eq($timeMinLi.length-1).removeClass("live")
											$timeMinLi.eq(0).click()
										}else{
											$timeMinLi.eq($timeMinLi.length-1).addClass("live")
										}
									}			
								}
								if($(e.target).parent().hasClass("timeMin")&&$(e.target).hasClass("live")){
									var thisMin = $(e.target).text()
									$timeHeadSpanLast.text(thisMin)
									$(e.target).addClass("active").siblings().removeClass("active")

									}
								if($(e.target).hasClass("time-confirm")){

									$timePanel.hide(showTime)

									var timeHM = $timePanel.find(".timeHead").text()
									
									$($timePanel).parent().find(".texting").val(timeHM)	
								}
							})
			
			}

		}
		var timePanel = new TimePanel(this,options);
		return timePanel.init();
	}
})(jQuery)
