window.onload=function(){
	search();
	banner();
	var sum=3*60*60;
	countDown(sum);
};
var search=function(){
	var sBox=document.querySelector('.s_box');
	
	var banner=document.querySelector('.banner');

	var bannerHeight=banner.offsetHeight;
	window.onscroll=function(){
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		
		var opacity=0;
		if (scrollTop<bannerHeight) {
			opacity=scrollTop/bannerHeight*0.85;
			
		}else{
			opacity=0.85;
			console.log(opacity);
		}
		sBox.style.background='rgba(201,21,35,'+opacity+')';
	}
};
var index=1;
var x=0;
var banner=function(){

	var banner=document.querySelector('.banner');
	var width=banner.offsetWidth;
	var imgBox=banner.querySelector('ul:first-child');
	var dotBox=banner.querySelector('ul:last-child');
	var dots=dotBox.querySelectorAll('li');
	var addTransition=function(){
		imgBox.style.transition='all 0.2s';
		imgBox.style.webkitTransition='all 0.2s';
	}
	var removeTransition=function(){
		imgBox.style.transition='none';
		imgBox.style.webkitTransition='none';
	}
	var setTransform=function(translateX){
		imgBox.style.transform='translateX('+translateX+'px)';
		imgBox.style.webkitTransform='translateX('+translateX+'px)';
	}
	var timer=setInterval(function(){
		index++;
		addTransition();
		x=-index*width;
		setTransform(x);		
	},1000)	;
	
	imgBox.addEventListener('transitionend',function(){
		if (index>8) {
			index=1;
			x=-index*width;
		}else if(index<1){
			index=8;
			x=-index*width;
		}
		removeTransition();
		setTransform(x);
		setdot();
	});

	var setdot=function(){
		for(var i=0;i<dots.length;i++){
			dots[i].classList.remove('current');
		}
		dots[index-1].classList.add('current');
	}

	var startX=0;
	var moveFlag=false;
	var changeX=0;
	imgBox.addEventListener('touchstart',function(e){
		clearInterval(timer);
		startX=e.touches[0].clientX;
	});

	imgBox.addEventListener('touchmove',function(e){
		moveX=e.touches[0].clientX;
		changeX=moveX-startX;
		x=(-index*width)+changeX;
		addTransition();
		setTransform(x);
		moveFlag=true;

	});
	imgBox.addEventListener('touchend',function(e){
		if(moveFlag){
			if(Math.abs(changeX) < width/3){
				/*在1/3内吸附到当前页面，index不变*/
			}else if(changeX<0){
				index++;
			}else{
				index--;
			}
			addTransition();
			x=-index*width;
			setTransform(x);	
		}
		moveFlag=false;
		startX=0;
		changeX=0;
		timer=setInterval(function(){
			index++;
			addTransition();
			x=-index*width;
			setTransform(x);
		},1000)	;
	});
}

var countDown=function(count){
	var time=document.querySelector('.time');
	
	var span=time.querySelectorAll('span');	
	var timer=setInterval(function(){
		
		count--;
		var h=Math.floor(count/3600);
		var m=Math.floor(count%3600/60);
		var s=count%60;
		
		span[0].innerHTML=Math.floor(h/10);
		span[1].innerHTML=h%10;
		span[3].innerHTML=Math.floor(m/10);
		span[4].innerHTML=m%10;
		span[6].innerHTML=Math.floor(s/10);
		span[7].innerHTML=s%10;

	},1000);

	
}

