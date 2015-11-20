var slide3D={
    //3D效果——爆炸,主要设置每个元素的过度效果；
    /**
     *
     * @param clips 每个爆炸块
     * @param options 展示区域所属模块
     * @param imgIndex 背景图片标号
     * 斜切skew(30deg,30deg) 旋转rotate(90deg)  移动translate(50px,100px)
     */
    //爆炸效果；
    blast:function(clips,options,imgIndex,staticOptions){
        $(options.slideShowId).css({
            background:'url(../img/'+imgIndex+'a.jpg) no-repeat '
        })
        //为了不让每个爆炸块都朝同一个方向移动，所以上述随机值需要有一个正负之分；
        var boolType=function(){
            return Math.random()>0.5?1:-1;//规定随机数如果大于0.5就取1正，反之取-1负；
        }
        clips.each(function(i){
            var everyDiv=$(this);
            var skewXAngle=parseInt(Math.random()*50);//斜切时x轴的旋转角度；
            var skewYAngle=parseInt(Math.random()*50);//斜切时y轴的旋转角度；
            var moveX=0;//移动的X轴的随机距离；
            var moveY=0;//移动的Y轴的随机距离；
            var step=300;

            if(i<(staticOptions.row*0.25*staticOptions.col)){
                moveX=1*step;
                moveY=-1*step;
            }else if(i<(staticOptions.row*0.5*staticOptions.col)){
                moveX=step;
                moveY=1*step;
            }else if(i<(staticOptions.row*0.75*staticOptions.col)){
                moveX=-1*step;
                moveY=-1*step;
            }else{
                moveX=1*step;
                moveY=-1*step;
            }
            moveX +=boolType()*Math.random()*step;
            moveY +=boolType()*Math.random()*step;

            everyDiv.css({
                "opacity":0,
                "-webkit-transform-origin":"center",
                "-webkit-transform":
                'skew('+skewXAngle*boolType()+'deg,'+skewYAngle*boolType()+'deg) '
                +'translate('+moveX*boolType()+'px,'+moveY*boolType()+'px) '
                +'scale3d(1.5,1.5,1.5) '
                +'rotateY(270deg)',
                "-webkit-transition":"opacity 1s,-webkit-transform 1s"
            })
            setTimeout(function () {
                everyDiv.css('transform', '');
                everyDiv.css('background', 'url("../img/' + imgIndex + 'a.jpg") no-repeat');
                clips.each(function(i){
                    var thisDiv=$(this);//当前的这个元素；
                    var subRow=parseInt(i/staticOptions.col) ;//判断在多少行；
                    var subCol=i%staticOptions.col;//判断在多少列；

                    thisDiv.css({
                        opacity:1,
                        position:'absolute',
                        width:staticOptions.everyDivW,
                        height:staticOptions.everyDivH,
                        left:subCol*staticOptions.everyDivW+'px',
                        top:subRow*staticOptions.everyDivH+'px',
                        background:'url("../img/"'+imgIndex+'a.jpg) no-repeat ',
                        "background-position":-subCol*staticOptions.everyDivW+'px '+-subRow*staticOptions.everyDivH+'px',
                        //"-webkit-transition":"background-clolor 1s,opacity 1s,-webkit-transform 1s",
                        "-webkit-transition":"opacity,-webkit-transform "
                    })
                });
            }, 1000);
        })
    },
    //3d翻页效果-控制旋转的角度；
    buffer : function(obj, cur, target,speed, fnDo, fnEnd, fs){
        if(!fs)fs=6;
        var now={};
        var x=0;
        var v=0;

        if(!obj.__last_timer)obj.__last_timer=0;
        var t=new Date().getTime();
        if(t-obj.__last_timer>speed)
        {
            fnMove();
            obj.__last_timer=t;
        }

        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove,speed);
        function fnMove(){
            v=Math.ceil((100-x)/fs);
            x+=v;
            for(var i in cur)
            {
                now[i]=(target[i]-cur[i])*x/100+cur[i];
            }
            if(fnDo)fnDo.call(obj, now);

            if(Math.abs(v)<1 && Math.abs(100-x)<1)
            {
                clearInterval(obj.timer);
                if(fnEnd)fnEnd.call(obj, target);
            }
        }
    },
    //翻转效果
    turn:function(clips,options,imgIndex,staticOptions){
        var ready=true;
        var current=imgIndex;//图片的标号初始化；
        var slideShowDiv=$(options.slideShowId).get(0);
        var next =function(){
            return (current+1)%4;
        }
        var time=0;
        var curDiv=clips.eq(time);
        var timer=null;
        timer=setInterval(function(){
            console.log(time);
            var subRow=parseInt(time/staticOptions.col) ;//判断在多少行；
            var subCol=time%staticOptions.col;//判断在多少列；
            curDiv=clips.eq(time);
            if(!ready)return;
            ready=false;
            slide3D.buffer(curDiv, {y:0, opacity: 1}, {y:-180, opacity: 0},0.1,function(now){
                if(now.y<-90){
                    curDiv.css({
                        position:'absolute',
                        width:staticOptions.everyDivW,
                        height:staticOptions.everyDivH,
                        left:subCol*staticOptions.everyDivW+'px',
                        top:subRow*staticOptions.everyDivH+'px',
                        opacity:1,
                        background:'url("../img/'+(current+1)+'a.jpg") no-repeat ',
                        "background-position":-subCol*staticOptions.everyDivW+'px '+-subRow*staticOptions.everyDivH+'px',
                        "transform":'perspective(1000px) scale(1,1) rotateY('+(180-now.y)+'deg)'
                    })
                }else{
                    curDiv.css({
                        position:'absolute',
                        width:staticOptions.everyDivW,
                        height:staticOptions.everyDivH,
                        left:subCol*staticOptions.everyDivW+'px',
                        top:subRow*staticOptions.everyDivH+'px',
                        opacity:1,
                        background:'url("../img/'+next()+'a.jpg") no-repeat ',
                        "background-position":-subCol*staticOptions.everyDivW+'px '+-subRow*staticOptions.everyDivH+'px',
                        "transform":'perspective(1000px) rotateY('+now.y+'deg)'
                    })
                }
            },function(){
                time++;
                if(time>clips.length-1){
                    clearInterval(timer);
                    time=0;
                    current=next();
                }
                ready=true;
            },20);
        },1);
    }

}