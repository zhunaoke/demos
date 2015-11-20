/**
 * Created by Administrator on 2015/11/12.
 */
(function($){

    /**生成底部切换小按钮html内容；
     *
     * @param length
     * @param pageUlHtml
     * @returns {*}
     */
    $.createPageUlHtml=function(length,pageUlHtml){
        var pageUlHtml=pageUlHtml;
        for(var i=1;i<=length;i++){
            if(i==1){
                pageUlHtml+='<li class="active"><a>'+i+'</a></li>'
            }else{
                pageUlHtml+='<li><a>'+i+'</a></li>'
            }
        }
        pageUlHtml+='</ul>';
        return pageUlHtml;
    }
    /**生成左右切换按钮的html内容；
     *
     * @returns {string}
     */
    $.createBtnHtml=function(){
        var btnHtml='';
        btnHtml='<a class="btn leftBtn"></a><a class="btn rightBtn"></a>';
        return btnHtml;
    }
    /**左右轮播
     *
     * @param obj
     */
    $.slideLR=function(obj){
        var defaultOptions={
            "slideShowId":"#slide-show",
            "slideUlClassId":"ul#slide-img",
            "slidePageUlId":"ul#page",
            "showPageUl":true,
            "showLRBtn":true
        }
        var options= $.extend(defaultOptions,obj);
        var WIDTH=$(options.slideShowId).width();//轮播展示区域的宽度；
        var slideImgs=$(options.slideUlClassId).find("li");
        var slidePages=null;
        var index= 0,leftWidth=0;
        var timer=null;
        function init(){
            var pageUlHtml='',btnHtml='';
            //添加底部切换按钮；
            if(options.showPageUl){
                pageUlHtml+='<ul class="page" id="page-LR">';
                pageUlHtml=$.createPageUlHtml(slideImgs.length,pageUlHtml);
                //console.log(pageUlHtml);
                $(options.slideShowId).append(pageUlHtml);
                slidePages=$(options.slidePageUlId).find("li")
            }
            //添加左右切换button;
            if(options.showLRBtn){
                btnHtml= $.createBtnHtml();
                //console.log(btnHtml);
                $(options.slideShowId).append(btnHtml);
            }
            autoSlide();
        }
        init();
        function autoSlide(){
            timer=setInterval(function(){
                if(index==slideImgs.length) index=0;
                slideLeftToRight(index);
                index++;
            },4000);
        }
        //点击按钮时轮播；
        slidePages.bind("click",function(){
            var clickIndex=$(this).index();
            //console.log("over"+clickIndex);
            clearInterval(timer);
            slideLeftToRight(clickIndex);
            index=clickIndex+1;
            autoSlide();
        });
        //点击向左按钮时，表示向左运动；
        $("a.leftBtn").bind("click",function(){
           var curIndex=$(options.slideUlClassId).find("li.active").index();
            if(curIndex==-1){
                curIndex=0;
            }
            var leftIndex=curIndex+1;
            clearInterval(timer);
            if(leftIndex==slideImgs.length){leftIndex=0;}
            slideLeftToRight(leftIndex);
            index=leftIndex+1;
            autoSlide();
        });
        //点击向右按钮时，表示向右运动；
        $("a.rightBtn").bind("click",function(){
            var rightIndex,curIndex=$(options.slideUlClassId).find("li.active").index();
            if(curIndex==-1){
                rightIndex=slideImgs.length-1;
            }else{
                rightIndex=curIndex-1;
            }
            clearInterval(timer);
            if(rightIndex==-1){
                rightIndex=slideImgs.length-1;
            }
            //console.log("right:"+rightIndex)
            slideLeftToRight(rightIndex);
            index=rightIndex+1;
            autoSlide();
        });

        function slideLeftToRight(mark){
            //console.log(mark);
            var next=mark;
            if(next<slideImgs.length){
                leftWidth=-WIDTH*next;
                slidePages.removeClass("active").eq(next).addClass("active");
                slideImgs.removeClass("active").eq(next).addClass("active");
                //console.log(options.slideUlClassId);
                $(options.slideUlClassId).animate({"left":leftWidth+"px"},1000);
            }else{
                slidePages.removeClass("active").eq(0).addClass("active");
                slideImgs.removeClass("active").eq(0).addClass("active");
                $(options.slideUlClassId).animate({"left":0},1000);
            }
        }
    }
    /**淡入淡出轮播；
     *
     * @param obj
     */
    $.slideFade=function(obj){
        var defaultOptions={
            "slideShowId":"#slide-show",
            "slideUlClassId":"ul#slide-img",
            "slidePageUlId":"ul#page",
            "showPageUl":true,
            "showLRBtn":true
        }
        var options= $.extend(defaultOptions,obj);
        var slideImgs=$(options.slideUlClassId).find("li");
        var slidePages=null;
        var index= 0,timer=null;
        function init(){
            var pageUlHtml='',btnHtml='';
            //添加底部切换按钮；
            if(options.showPageUl){
                pageUlHtml+='<ul class="page" id="page-fade">';
                pageUlHtml=$.createPageUlHtml(slideImgs.length,pageUlHtml);
                //console.log(pageUlHtml);
                $(options.slideShowId).append(pageUlHtml);
                slidePages=$(options.slidePageUlId).find("li")
            }
            //添加左右切换button;
            if(options.showLRBtn){
                btnHtml= $.createBtnHtml();
                //console.log(btnHtml);
                $(options.slideShowId).append(btnHtml);
            }
            autoSlide();
        }
        init();
        function autoSlide(){
            timer=setInterval(function(){
                if(index==slideImgs.length) index=0;
                slideOfFade(index);
                index++;
            },4000);
        }
        //点击按钮时轮播；
        slidePages.bind("click",function(){
            var clickIndex=$(this).index();
            //console.log("over"+clickIndex);
            clearInterval(timer);
            slideOfFade(clickIndex);
            index=clickIndex+1;
            autoSlide();
        });
        //点击向左按钮时，表示向左运动；
        $("a.leftBtn").bind("click",function(){
            var curIndex=$(options.slideUlClassId).find("li.active").index();
            if(curIndex==-1){
                curIndex=0;
            }
            var leftIndex=curIndex+1;
            clearInterval(timer);
            if(leftIndex==slideImgs.length){leftIndex=0;}
            slideOfFade(leftIndex);
            index=leftIndex+1;
            autoSlide();
        });
        //点击向右按钮时，表示向右运动；
        $("a.rightBtn").bind("click",function(){
            var rightIndex,curIndex=$(options.slideUlClassId).find("li.active").index();
            if(curIndex==-1){
                rightIndex=slideImgs.length-1;
            }else{
                rightIndex=curIndex-1;
            }
            clearInterval(timer);
            if(rightIndex==-1){
                rightIndex=slideImgs.length-1;
            }
            //console.log("right:"+rightIndex)
            slideOfFade(rightIndex);
            index=rightIndex+1;
            autoSlide();
        });
        function slideOfFade(mark){
            var next=mark;
            //console.log("淡入淡出"+next);
            if(next<slidePages.length){
                slidePages.removeClass("active").eq(next).addClass("active");
            }else{
                slidePages.removeClass("active").eq(0).addClass("active");
            }
            slideImgs.removeClass('active').eq(next).addClass("active");
            slideImgs.eq(next).fadeIn("slow").siblings('li').fadeOut('slow');
        }
    }

    /**爆炸效果轮播；
     *
     * @param obj
     */
    $.slideBuffer=function(obj){
        var defaultOptions={};
        var options= $.extend(defaultOptions,obj);
        var slideDiv=$(options.slideShowId).get(0)
        var slideShow=$(options.slideShowId);
        var clips=null;
        var staticOptions={
            "W":$(options.slideShowId).width(),//获取整个展示区域的宽度；
            "H":$(options.slideShowId).height(),//获取整个展示区域的高度；
            "row":3,//表示展示区域下被切为几排；
            "col":4//表示展示区域下被切为几列；
        }
        staticOptions['everyDivW']=Math.ceil(staticOptions.W/staticOptions.col);
        staticOptions['everyDivH']=Math.ceil(staticOptions.H/staticOptions.row);
        var imgIndex=1;//图片的名称标号；

        //初始化，将分割的图正确的显示；
        init();
        function init(){
            $(options.slideShowId).html("");
            $(options.slideShowId).css({
                background:'url("../img/"'+imgIndex+'a.jpg) no-repeat '
            })
            //循环的将爆炸快填充在展示区域内部；
            for(var r=0;r<staticOptions.row;r++){//每排;
                for(var c=0;c<staticOptions.col;c++){//每列;
                    var everyDivObj=$('<div>');
                    everyDivObj.css({
                        position:'absolute',
                        width:staticOptions.everyDivW,
                        height:staticOptions.everyDivH,
                        left:c*staticOptions.everyDivW+'px',
                        top:r*staticOptions.everyDivH+'px',
                        opacity:1,
                        background:'url("../img/'+imgIndex+'a.jpg") no-repeat ',
                        "background-position":-c*staticOptions.everyDivW+'px '+-r*staticOptions.everyDivH+'px',
                        //"-webkit-transition":"opacity 1s,-webkit-transform 1s"
                    })
                    slideDiv.appendChild(everyDivObj[0]);
                }
            }
            clips=slideShow.find("div");
        }
        function fun(){
            if(imgIndex==3){imgIndex=1;}else imgIndex++;//控制背景图片的标号；
            slide3D.blast(clips,options,imgIndex,staticOptions);//真正的调用爆炸效果；
        }
        $("#change").bind("click",function(){
            fun();
        });
    }

    /**
     * 翻转效果
     * @param obj
     */
    $.slideFz=function(obj){
        var defaultOptions={};
        var options= $.extend(defaultOptions,obj);
        var slideDiv=$(options.slideShowId).get(0);
        var slideShow=$(options.slideShowId);
        var clips=null;
        var staticOptions={
            "W":$(options.slideShowId).width(),//获取整个展示区域的宽度；
            "H":$(options.slideShowId).height(),//获取整个展示区域的高度；
            "row":3,//表示展示区域下被切为几排；
            "col":4//表示展示区域下被切为几列；
        }
        staticOptions['everyDivW']=Math.ceil(staticOptions.W/staticOptions.col);
        staticOptions['everyDivH']=Math.ceil(staticOptions.H/staticOptions.row);
        var imgIndex=1;//图片的名称标号；

        init();
        //初始化，将分割的图正确的显示；
        function init(){
            $(options.slideShowId).html("");
            //循环的将爆炸快填充在展示区域内部；
            for(var r=0;r<staticOptions.row;r++){//每排;
                for(var c=0;c<staticOptions.col;c++){//每列;
                    var everyDivObj=$('<div>');
                    everyDivObj.css({
                        position:'absolute',
                        width:staticOptions.everyDivW,
                        height:staticOptions.everyDivH,
                        left:c*staticOptions.everyDivW+'px',
                        top:r*staticOptions.everyDivH+'px',
                        opacity:1,
                        background:'url("../img/'+imgIndex+'a.jpg") no-repeat ',
                        "background-position":-c*staticOptions.everyDivW+'px '+-r*staticOptions.everyDivH+'px',
                        //"-webkit-transform":'perspective(1000px) scale(1,1) rotateY(360deg)'
                    })
                    slideDiv.appendChild(everyDivObj[0]);
                }
            }
            clips=slideShow.find("div");
        }
        $(options.btnId).bind("click",function(){
            if(imgIndex==3){imgIndex=1;}else imgIndex++;//控制背景图片的标号；
            slide3D.turn(clips,options,imgIndex-1,staticOptions);
        });
    }

    /**
     * 翻书效果
     * @param obj
     */
    $.slidePage=function(obj){
        var defaultOptions={};
        var options= $.extend(defaultOptions,obj);
        var ready=true;
        var now=0;//图片的标号初始化；
        var slideShowDiv=$(options.slideShowId).get(0);
        var next =function(){
            return (now+1)%3;
        }
        $("#page-change").bind("click",function(){
            slidePage();
        });

        function slidePage(){
            slideShowDiv.innerHTML='';//清空展示区域内的html内容；
            if(!ready)return;
            ready=false;
            var defaultOptions={};
            var options= $.extend(defaultOptions,obj);
            slideShowDiv.style.background='url(../img/'+(next()+1)+'a.jpg) center no-repeat';
            var firstDiv=$("<div>");
            firstDiv.css({
                "position": "absolute",
                "z-index": 3,
                "left": "50%",
                "top": "0px",
                "width": "50%",
                "height": "100%",
                "overflow": "hidden",
                "transform": "perspective(1000px) scale(-1, 1) rotateY(0deg)",
                "transform-origin":" left 50% 0px",
                "background": 'url("../img/'+(now+1)+'a.jpg") 100% 50% no-repeat'
            })
            slideShowDiv.appendChild(firstDiv[0]);
            var OldDiv=$("<div>");
            OldDiv.css({
                "position": "absolute",
                "z-index": 2,
                "left": "0",
                "top": "0",
                "width": "50%",
                "height": "100%",
                "background": 'url("../img/'+(now+1)+'a.jpg") 0 50% no-repeat'
            })
            slideShowDiv.appendChild(OldDiv[0]);
            firstDiv.ch=false;
            slide3D.buffer(firstDiv, {y:0, opacity: 1}, {y:-180, opacity: 0},20, function(now){
                if(now.y<-90 && !firstDiv.ch) {
                    firstDiv.ch=true;
                    firstDiv.html('<img/>');

                    var oImg=firstDiv.find('img');
                    oImg.attr("src",'../img/'+(next()+1)+'a.jpg');
                    oImg.css({
                        "transform":'scaleX(-1)',
                        "position": 'absolute',
                        "right": 0,
                        "top": 0,
                        "width": '200%',
                        "height": '100%'
                    })
                    firstDiv.css({
                        "transformOrigin":'left'
                    })
                }
                if(now.y<-90){
                    firstDiv.css({
                        "transform":'perspective(1000px) scale(-1,1) rotateY('+(180-now.y)+'deg)'
                    })
                }else{
                    firstDiv.css({
                        "transform":'perspective(1000px) rotateY('+now.y+'deg)'
                    })
                }
            },function(){
                now=next();
                ready=true;
            },14)
        }
    }



})(jQuery);

