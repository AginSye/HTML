// JavaScript Document
//获得主界面
var mainDiv = document.getElementById("maindiv");
//获得开始界面
var startdiv = document.getElementById("startdiv");
//获得游戏中分数显示界面
var scorediv = document.getElementById("scorediv");
//获得游戏中时间显示界面
var timediv = document.getElementById("timediv");
//获得分数界面
var scorelabel = document.getElementById("scorelabel");
//获得时间界面
var timelabel = document.getElementById("timelabel");
//获得暂停界面
var suspenddiv = document.getElementById("suspenddiv");
//获得游戏说明界面
var shuomingdiv = document.getElementById("shuomingdiv");
//获得游戏结束界面
var enddiv = document.getElementById("enddiv");
//获得游戏结束后分数统计界面
var planscore = document.getElementById("planscore");
//获得游戏结束后时间统计界面
var plantime = document.getElementById("plantime");

var box = document.getElementById('box');

var skilldiv = document.getElementById('skilldiv');
var skilllabel = document.getElementById("skilllabel");

var gameover = document.getElementById("gameover");

var music = document.getElementById('music'); 

//初始化分数
var scores = 0;
var time = 0;
var level = 1;
var result = false;
var taken = 0;
var skill = 3;
var blinkx = 1;
var timemark = 79;
function styleEvent()
	{       
        if(timemark>=0){
			blinkdiv.style.opacity = blinkx; 
			blinkx = blinkx - 0.01;
			timemark--;
			}
		else if (timemark < 0&&timemark>=-80){
			blinkdiv.style.opacity = blinkx; 
			blinkx = blinkx + 0.01;
			timemark--;
			}
		else if(timemark == -81){
			timemark = 79;
		}
		setTimeout("styleEvent()",10)
	}
	

/*
 创建飞机类
 */
function plan(hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    this.planX=X;
    this.planY=Y;
    this.imagenode=null;
    this.planhp=hp;
    this.planscore=score;
    this.plansizeX=sizeX;
    this.plansizeY=sizeY;
    this.planboomimage=boomimage;
    this.planisdie=false;
    this.plandietimes=0;
    this.plandietime=dietime;
    this.plansudu=sudu;
//行为
	this.normalmove=function(){
            this.imagenode.style.left=this.imagenode.offsetLeft+this.plansudu+"px";
        }
	this.elitemove=function(){
		if(elitemark1 < this.plansudu){
			this.imagenode.style.top=this.imagenode.offsetTop+1+"px";
			elitemark1++;
		}
		else{
			if(elitemark == 3)
				elitemark = 0;
			if(elitemark == 0){
				this.imagenode.style.left=this.imagenode.offsetLeft-1+"px";
				this.imagenode.style.top=this.imagenode.offsetTop+1+"px";;
			}
			else if(elitemark == 1){
				this.imagenode.style.left=this.imagenode.offsetLeft-1+"px";
				this.imagenode.style.top=this.imagenode.offsetTop-1+"px";
			}
			else if(elitemark == 2)	
				this.imagenode.style.left=this.imagenode.offsetLeft+2+"px";
		}
		
	}
	this.followmove=function(){
			if(followmark < 150)
			this.imagenode.style.top=this.imagenode.offsetTop+1+"px";
			followmark++;
	}
	var bossdirection = 1;
	var debuffboss = 0;
	this.bossmove=function(){
		if(bossmark < 270){
			this.imagenode.style.top=this.imagenode.offsetTop+1+"px";
			bossmark++;
		}
		else{
			if(this.imagenode.offsetLeft<50)
				bossdirection = 1;
			else if(this.imagenode.offsetLeft>450)
				bossdirection = 2;
			debuffboss++;
			if(debuffboss == 3)
			{
			switch(bossdirection)
			{
				case 1:
				this.imagenode.style.left=this.imagenode.offsetLeft+this.plansudu+"px";
				break;
				case 2:
				this.imagenode.style.left=this.imagenode.offsetLeft+(-1*this.plansudu)+"px";
				break;
			}
			debuffboss = 0;
			}
		}
	}	
    this.init=function(){
        this.imagenode=document.createElement("img");
        this.imagenode.style.left=this.planX+"px";
        this.imagenode.style.top=this.planY+"px";
        this.imagenode.src=imagesrc;
        mainDiv.appendChild(this.imagenode);
    }
    this.init();
}
/*
创建子弹类
 */
function bullet(X,Y,sizeX,sizeY,imagesrc,lei,lei2,targetX,targetY){
    this.bulletX=X;
    this.bulletY=Y;
    this.bulletimage=null;
    this.bulletattach=1;
    this.bulletsizeX=sizeX;
    this.bulletsizeY=sizeY;
	this.bulletl=lei;
	this.bulletl2=lei2;
	this.followX=targetX;
    this.followY=targetY;
//行为
    this.bulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop-10+"px";
		if(this.bulletl == 2)
			this.bulletimage.style.left=this.bulletimage.offsetLeft-4+"px";
		if(this.bulletl == 3)
			this.bulletimage.style.left=this.bulletimage.offsetLeft+4+"px";
		if(this.bulletl == 4){
			this.bulletattach = 3;
			this.bulletimage.style.top=this.bulletimage.offsetTop+12+"px";
			if(this.bulletimage.style.top>=this.bulletY+this.bulletsizeY+"px")
				this.bulletl =5;
		}
		if(this.bulletl == 5){
			this.bulletimage.style.top=this.bulletimage.offsetTop-this.bulletl2/2+"px";
			this.bulletl2++;
		}
		if(this.bulletl == 10)
			this.bulletimage.style.top=this.bulletimage.offsetTop+7+"px";
		
		if(this.bulletl == 11)
			this.bulletimage.style.left=this.bulletimage.offsetLeft-1+"px";
		if(this.bulletl == 12)
			this.bulletimage.style.left=this.bulletimage.offsetLeft-2+"px";
		if(this.bulletl == 13)
			this.bulletimage.style.left=this.bulletimage.offsetLeft-3+"px";
		if(this.bulletl == 14)
			this.bulletimage.style.left=this.bulletimage.offsetLeft-5+"px";
		if(this.bulletl == 15)
			this.bulletimage.style.left=this.bulletimage.offsetLeft+1+"px";
		if(this.bulletl == 16)
			this.bulletimage.style.left=this.bulletimage.offsetLeft+2+"px";
		if(this.bulletl == 17)
			this.bulletimage.style.left=this.bulletimage.offsetLeft+3+"px";
		if(this.bulletl == 18)
			this.bulletimage.style.left=this.bulletimage.offsetLeft+5+"px";
	}
		
	this.enemybulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop+5+"px";
		}
	this.followmove=function(){
		var x = this.followX-this.bulletX;
		var y = this.followY-this.bulletY;
		if((Math.abs(x)+Math.abs(y))<100){
			y = y*5;
			x = x*5;
			if(Math.abs(x)<50){
				if(x<0)
					x = -50;
				if(x>0)
					x = 50;
			}
			if(Math.abs(y)<50){
				if(y<0)
					y = -50;
				if(y>0)
					y = 50;
			}
		}
        this.bulletimage.style.left=this.bulletimage.offsetLeft+x/100+"px";
        this.bulletimage.style.top=this.bulletimage.offsetTop+y/100+"px";
		}
	this.elitebulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop+(2*this.bulletl)+"px";
		this.bulletimage.style.left=this.bulletimage.offsetLeft+(2*this.bulletl2)+"px";
		}
	this.bossbulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop+3+"px";
		if(this.bulletl == -10)
			this.bulletimage.style.left=this.bulletimage.offsetLeft-2+"px";
		if(this.bulletl == -20)
			this.bulletimage.style.left=this.bulletimage.offsetLeft+2+"px";
		if(this.bulletl2 == -10)
			this.bulletimage.style.top=this.bulletimage.offsetTop-6+"px";
	}
	
    this.init=function(){
        this.bulletimage=document.createElement("img");
        this.bulletimage.style.left= this.bulletX+"px";
        this.bulletimage.style.top= this.bulletY+"px";
        this.bulletimage.src=imagesrc;
        mainDiv.appendChild(this.bulletimage);
    }
    this.init();
}
//道具类
function thing(X,Y,sizeX,sizeY,imagesrc,kind){
    this.thingX=X;
    this.thingY=Y;
    this.thingimage=null;
    this.thingsizeX=sizeX;
    this.thingsizeY=sizeY;
	this.thingk=kind;
//行为
    this.thingmove=function(){
        this.thingimage.style.top=this.thingimage.offsetTop+1+"px";
		}
	this.init=function(){
        this.thingimage=document.createElement("img");
        this.thingimage.style.left= this.thingX+"px";
        this.thingimage.style.top= this.thingY+"px";
        this.thingimage.src=imagesrc;
        mainDiv.appendChild(this.thingimage);
    }
    this.init();
}
/*
 创建单行子弹类
 */
function oddbullet(X,Y,lei){
    bullet.call(this,X,Y,14,34,"image/myb_1.png",lei);
}
function oddmissile(X,Y,lei,lei2){
    bullet.call(this,X,Y,22,40,"image/missile.gif",lei,lei2);
}
function enemybullet(X,Y,lei){
    bullet.call(this,X,Y,20,37,"image/epb_1.png",lei);
}
function elitebullet(X,Y,lei,lei2){
    bullet.call(this,X,Y,14,14,"image/elitebullet.png",lei,lei2);
}
function followbullet(X,Y,lei,lei2,targetX,targetY){
    bullet.call(this,X,Y,14,14,"image/elitebullet.png",lei,lei2,targetX,targetY);
}
function bossbullet(X,Y,lei,lei2){
    bullet.call(this,X,Y,20,20,"image/BossBullet.png",lei,lei2);
}
function oddthing(X,Y,kind){
	if (kind >= 0 && kind <= 20)
		var imagesrc = "image/道具1.png";
	else if (kind >= 21&&kind <= 22)
		var imagesrc = "image/道具2.png";
	else if (kind >=23&&kind <=24)
		var imagesrc = "image/道具3.png";
    thing.call(this,X,Y,50,50,imagesrc,kind);
}

function enemy(hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    plan.call(this,hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc);
}
//产生min到max之间的随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

function ourplan(X,Y){
    var imagesrc="image/my_2.png";
    plan.call(this,25,X,Y,60,30,0,660,0,"image/blow.gif",imagesrc);
    this.imagenode.setAttribute('id','ourplan');
}

 var selfplan = new ourplan(120,485);
 var ourplan = document.getElementById('ourplan');
 
 var yidong = function(){
	var oevent = window.event||arguments[0];
	var selfplanX = oevent.clientX;
	var selfplanY = oevent.clientY;
	ourplan.style.left = selfplanX-selfplan.plansizeX/2+"px";
	ourplan.style.top = selfplanY-selfplan.plansizeY/2+"px";
	//skills
	 document.onkeydown=function(e)
	{//技能
		var keyNum=window.event ? e.keyCode :e.which;  //获取被按下的键值 
		if(keyNum==90&&skill>0){ //z
			var enemybulletslen = enemybullets.length;
			for(var i = enemybulletslen - 1; i > -1 ; i--){
				mainDiv.removeChild(enemybullets[i].bulletimage);
				enemybullets.splice(i,1);
			}
			enemybulletslen = 0;
			skill--;
			skilllabel.innerHTML=skill;
		} 
		if(keyNum==88&&skill>0){ //x
			skilltwo();
			setTimeout("skilltwo()",200)
			setTimeout("skilltwo()",400)
			skill--;
			skilllabel.innerHTML=skill;
		}
		if(keyNum==67&&skill>0){ //c
			selfplan.planhp += 10;
			if(selfplan.planhp > 25)
				selfplan.planhp = 25;
			box.style.width =8*selfplan.planhp+"px";
			skill--
			skilllabel.innerHTML=skill;
		}
	}
}

function skilltwo()
{
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 1));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 2));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 3));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 11));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 12));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 13));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 14));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 15));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 16));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 17));
	bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 18));
}

/*
暂停事件
 */
var number = 0;
var zantingtime;
var zanting = function(){
	zantingtime = time;
	clearTimeout(t);
	if(number==0){
		suspenddiv.style.display = "block";
		if(document.removeEventListener){
			mainDiv.removeEventListener("mousemove",yidong,true);
			bodyobj.removeEventListener("mousemove",bianjie,true);
		}
		else if(document.detachEvent){
			mainDiv.detachEvent("onmousemove",yidong);
			bodyobj.detachEvent("onmousemove",bianjie);
		}
		clearInterval(set);
		number = 1;
	}
	else{
		suspenddiv.style.display = "none";
		if(document.addEventListener){
			mainDiv.addEventListener("mousemove",yidong,true);
			bodyobj.addEventListener("mousemove",bianjie,true);
		}
		else if(document.attachEvent){
			mainDiv.attachEvent("onmousemove",yidong);
			bodyobj.attachEvent("onmousemove",bianjie);
		}
		set = setInterval(start,20);
		time = zantingtime;
		timeCount();
		number = 0;
	}
}

//判断本方飞机是否移出边界，如果移出边界，则取消mousemove事件，反之加上mousemove事件			
var bianjie = function(){
	var oevent = window.event||arguments[0];
	var bodyobjX = oevent.clientX;
	var bodyobjY = oevent.clientY;
	
	if(bodyobjX<-5||bodyobjX>805||bodyobjY<0||bodyobjY>600){
		if(document.removeEventListener){
			mainDiv.removeEventListener("mousemove",yidong,true);
		}
		else if(document.detachEvent){
			mainDiv.detachEvent("onmousemove",yidong);
		}
	}
	else{
		if(document,addEventListener){
			mainDiv.addEventListener("mousemove",yidong,true);
		}
		else if(document.attachEvent){
			mainDiv.attachEvent("onmousemove",yidong);
		}
	}
}

var bodyobj = document.getElementsByTagName("body")[0];
if(document.addEventListener){
	//为本方飞机添加移动和暂停
	mainDiv.addEventListener("mousemove",yidong,true);
	//为本方飞机添加暂停事件
	selfplan.imagenode.addEventListener("click",zanting,true);
	//为body 添加判断本方飞机移出边界事件
	bodyobj.addEventListener("mousemove",bianjie,true);
//
suspenddiv.getElementsByTagName("button")[0].addEventListener("click",zanting,true);
//			
suspenddiv.getElementsByTagName("button")[1].addEventListener("click",youxishuoming,true);
//为暂停界面的返回主页按钮添加事件
suspenddiv.getElementsByTagName("button")[2].addEventListener("click",jixu,true);
}
else if(document.attachEvent){
	//为本方飞机添加移动
	mainDiv.attachEvent("onmousemove",yidong);
	//为本方飞机添加暂停事件
	selfplan.imagenode.attachEvent("onclick",zanting);
	//为body天机判断本方飞机移出边界事件
	bodyobj,attachEvent("onmousemove",bianjie);
	
//为暂停界面的继续按钮添加暂停事件
suspenddiv.getElementsByTagName("button")[0].attachEvent("click",zanting);
//
suspenddiv.getElementsByTagName("button")[1].attachEvent("click",youxishuoming,true);
//为暂停界面的返回主页按钮添加事件
suspenddiv.getElemengtsByTagName("button")[2].attachEvent("click",jixu,true);
}

//初始化隐藏本方飞机
selfplan.imagenode.style.display = "none";

/*
敌机对象数组
*/
var enemys=[];
/*
子弹对象数组
*/
var bullets=[];
var enemybullets=[];
var things=[];
var mark = 0;//计时器0
var mark1 = 0;//计时器1
var mark2 = 0;//计时器2
var mark3 = 1;//阶段，按照精英怪的死亡数增加，1,2,3,6
var elitemark = 0;//精英怪计时器0
var elitemark1 = 0;//精英怪计时器1
var elitemark2 = 0;//精英怪计时器2
var followmark = 0;//跟踪飞机计时器
var bosson = 0;
var bossmark = 0;//boss计时器0
var bossmark1 = 0;//boss计时器1
var disdirection = 2;
var displayX = 0;
var displayY = 100;
var backgroundPositionY = 0;

//开始函数
function start(){
	music.play();
	document.getElementById("music").volume = 0.1;
	mainDiv.style.backgroundPositionY = backgroundPositionY+"px";
	backgroundPositionY+=0.5;
	if(backgroundPositionY==2048){
		backgroundPositionY=0;
	}
	//开始写流程****************************************************************************************
	mark++;
	if (mark3 == 1){//第一阶段
		if(mark1 ==6)
		{
			displayY = random(0,401);
			disdirection = random(1,3);
			if(disdirection ==1){
				displayX = 0;
				disdirection = 2;
			}
			else{
				displayX = 800;
				disdirection = -2;
			}
			var enemyslen = enemys.length;//发射子弹
			for(var i=0;i<enemyslen;i++){
				if(enemys[i].planisdie ==false&&enemys[i].plansudu<=2&&enemys[i].planscore == 1000){
					enemybullets.push(new enemybullet(parseInt(enemys[i].imagenode.style.left)+20,parseInt(enemys[i].imagenode.style.top)+10, 1));
				}
			}
			if (mark2 == 4)//跟踪弹飞机
				enemys.push(new enemy(80,370,-50,63,50,3000,360,1,"image/blow_2.gif","image/ep_7.png"))
			mark1 = 0;
			mark2++;	
		}
		if(mark == 20){//敌方普通飞机
			enemys.push(new enemy(2,displayX,displayY,31,26,1000,360,disdirection,"image/blow_1.gif","image/ep_9.png"))
			mark1++;
		}
		if(mark % 10 == 0){//跟踪飞机子弹
			var enemyslen = enemys.length;
			for(var i=0;i<enemyslen;i++){
				if(enemys[i].planisdie ==false&&enemys[i].planscore == 3000){//跟踪子弹
					enemybullets.push(new followbullet(parseInt(enemys[i].imagenode.style.left)+29,parseInt(enemys[i].imagenode.style.top)+20, 5, 0,parseInt(ourplan.style.left)+28,parseInt(ourplan.style.top)+15));
				}
			}
		}
	}//第一阶段结束
	else if (mark3 == 2){//第二阶段
		elitemark3 = 205;//精英怪计时器1
		if(mark1 ==6)
		{
			if(elitemark1 ==elitemark3)
				elitemark++;
			displayY = random(0,401);
			disdirection = random(1,3);
			if(disdirection ==1){
				displayX = 0;
				disdirection = 2;
			}
			else{
				displayX = 800;
				disdirection = -2;
			}
			var enemyslen = enemys.length;//发射子弹
			for(var i=0;i<enemyslen;i++){
				if(enemys[i].planisdie ==false&&enemys[i].plansudu<=2&&enemys[i].planscore == 1000){
					enemybullets.push(new enemybullet(parseInt(enemys[i].imagenode.style.left)+20,parseInt(enemys[i].imagenode.style.top)+10, 1));
				}
			}
			if (mark2 == 4)
			{
				enemys.push(new enemy(100,340,-105,122,105,5000,360,elitemark3,"image/blow_2.gif","image/ep_3.png"))//精英飞机
			}
			mark1 = 0;
			mark2++;	
		}
		if(mark == 20){//敌方普通飞机
			enemys.push(new enemy(2,displayX,displayY,31,26,1000,360,disdirection,"image/blow_1.gif","image/ep_9.png"))
			mark1++;
		}
		if(mark % 10 == 0){//精英飞机子弹
			var enemyslen = enemys.length;
			for(var i=0;i<enemyslen;i++){
				if(enemys[i].planisdie ==false&&enemys[i].planscore == 5000){//精英子弹
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, 2, 0));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, Math.sqrt(2), Math.sqrt(2)));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, 0, 2));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, -Math.sqrt(2), Math.sqrt(2)));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, -2, 0));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, -Math.sqrt(2), -Math.sqrt(2)));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, 0, -2));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, Math.sqrt(2), -Math.sqrt(2)));
				}
			}
		}
	}//第二阶段结束
	else if (mark3 >= 3&&mark3<=5){//第三阶段
		elitemark3 = 410;
		if(mark1 ==6)
		{
			if(elitemark1 ==elitemark3)
				elitemark++;
			displayY = random(0,401);
			disdirection = random(1,3);
			if(disdirection ==1){
				displayX = 0;
				disdirection = 2;
			}
			else{
				displayX = 800;
				disdirection = -2;
			}
			var enemyslen = enemys.length;//发射子弹
			for(var i=0;i<enemyslen;i++){
				if(enemys[i].planisdie ==false&&enemys[i].plansudu<=2&&enemys[i].planscore == 1000){
					enemybullets.push(new enemybullet(parseInt(enemys[i].imagenode.style.left)+20,parseInt(enemys[i].imagenode.style.top)+10, 1));
				}
			}
			if (mark2 == 4)
			{
				enemys.push(new enemy(150,190,-105,122,105,5000,360,elitemark3,"image/blow_2.gif","image/ep_3.png"))//精英飞机
				enemys.push(new enemy(150,550,-105,122,105,5000,360,elitemark3,"image/blow_2.gif","image/ep_3.png"))//精英飞机
				enemys.push(new enemy(150,370,-50,63,50,3000,360,1,"image/blow_2.gif","image/ep_7.png"))//跟踪弹飞机
			}
			mark1 = 0;
			mark2++;	
		}
		if(mark == 20){//敌方普通飞机
			enemys.push(new enemy(2,displayX,displayY,31,26,1000,360,disdirection,"image/blow_1.gif","image/ep_9.png"))
			mark1++;
		}
		//精英飞机子弹
		if(mark % 10 == 0){
			var enemyslen = enemys.length;
			for(var i=0;i<enemyslen;i++){
				if(enemys[i].planisdie ==false&&enemys[i].planscore == 5000&&mark1 %2 == 0&&mark == 20){//精英子弹
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, 2, 0));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, Math.sqrt(2), Math.sqrt(2)));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, 0, 2));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, -Math.sqrt(2), Math.sqrt(2)));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, -2, 0));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, -Math.sqrt(2), -Math.sqrt(2)));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, 0, -2));
					enemybullets.push(new elitebullet(parseInt(enemys[i].imagenode.style.left)+60,parseInt(enemys[i].imagenode.style.top)+50, Math.sqrt(2), -Math.sqrt(2)));
				}
				if(enemys[i].planisdie ==false&&enemys[i].planscore == 3000){//跟踪子弹
					enemybullets.push(new followbullet(parseInt(enemys[i].imagenode.style.left)+29,parseInt(enemys[i].imagenode.style.top)+20, 5, 0,parseInt(ourplan.style.left)+28,parseInt(ourplan.style.top)+15));
				}
			}
		}
	}
	//第三阶段结束
	
	else if (mark3 >= 6){//最终阶段
		if(mark1 ==12){
			if(bosson == 0){
				enemys.push(new enemy(500,300,-250,250,250,50000,360,1,"image/blow_3.gif","image/boss_1.gif"))//boss
				bosson++;
			}
			enemys.push(new enemy(50,Math.abs(displayX-800),random(0,401),63,50,4000,360,(-1*disdirection),"image/blow_2.gif","image/ep_7.png"))//跟踪弹飞机
			mark1 = 0;
		}
		if(mark == 20){//跟踪飞机子弹
			var enemyslen = enemys.length;
			for(var i=0;i<enemyslen;i++){
				if(enemys[i].planisdie ==false&&enemys[i].planscore == 4000&&mark1 % 2 ==0){//跟踪子弹
					enemybullets.push(new followbullet(parseInt(enemys[i].imagenode.style.left)+29,parseInt(enemys[i].imagenode.style.top)+20, 5, 0,parseInt(ourplan.style.left)+28,parseInt(ourplan.style.top)+15));
				}
				if(enemys[i].planisdie ==false&&enemys[i].planscore == 50000){//boss子弹
					enemybullets.push(new bossbullet(parseInt(enemys[i].imagenode.style.left)+100,parseInt(enemys[i].imagenode.style.top)+100, 1,0));
					if(mark1 % 2 ==0){
					enemybullets.push(new bossbullet(parseInt(enemys[i].imagenode.style.left)+100,parseInt(enemys[i].imagenode.style.top)+100, -10,0));
					enemybullets.push(new bossbullet(parseInt(enemys[i].imagenode.style.left)+100,parseInt(enemys[i].imagenode.style.top)+100, -20,0));
					}
				}
			}
			if(mark1 ==6||mark1 ==0){
				displayY = random(0,401);
				disdirection = random(1,3);
				if(disdirection ==1){
					displayX = 0;
					disdirection = 2;
				}
				else{
					displayX = 800;
					disdirection = -2;
				}
				var enemyslen = enemys.length;//发射子弹
				for(var i=0;i<enemyslen;i++){
					if(enemys[i].planisdie ==false&&enemys[i].plansudu<=2&&enemys[i].planscore == 1000){
						enemybullets.push(new enemybullet(parseInt(enemys[i].imagenode.style.left)+20,parseInt(enemys[i].imagenode.style.top)+10, 1));
					}
				}
			}
			enemys.push(new enemy(2,displayX,displayY,31,26,1000,360,disdirection,"image/blow_1.gif","image/ep_9.png"))
			mark1++;
		}
	}//第四阶段结束
	
	if(mark == 20)
		mark = 0
	
	//流程结束*************************************************************************************************
	var enemyslen = enemys.length;
	for(var i=0;i<enemyslen;i++){
		if(enemys[i].planisdie!=true&&(enemys[i].planscore == 1000||enemys[i].planscore == 4000)){
			enemys[i].normalmove();
		}
		else if(enemys[i].planisdie!=true&&enemys[i].planscore == 5000){
			enemys[i].elitemove();
		}
		else if(enemys[i].planisdie!=true&&enemys[i].planscore == 3000){
			enemys[i].followmove();
		}
		else if(enemys[i].planisdie!=true&&enemys[i].planscore == 50000){
			enemys[i].bossmove();
		}
/*
如果敌机超出边界，删除敌机
*/
	if(enemys[i].imagenode.offsetTop>600||enemys[i].imagenode.offsetLeft<0||enemys[i].imagenode.offsetLeft>800){
		mainDiv.removeChild(enemys[i].imagenode);
		enemys.splice(i,1);
		enemyslen--;
		}
//当敌机死亡标记为true时，经过一段时间后清除敌机
	if(enemys[i].planisdie==true){
		enemys[i].plandietimes+=9;
		if(enemys[i].plandietimes==enemys[i].plandietime){
			if(enemys[i].planscore ==50000){
				result = true;
				end();
			}
			mainDiv.removeChild(enemys[i].imagenode);
			var th = parseInt(random(0,101));
			if(th <= 24)
				things.push(new oddthing(parseInt(enemys[i].imagenode.style.left)+20,parseInt(enemys[i].imagenode.style.top)+10, th));
			enemys.splice(i,1);
			enemyslen--;
			}
		}
	}

	
	/*
创建子弹
*/	
	if(mark%5==0){
		if(level == 1)
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 1));
		else if(level ==2)
		{
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 2));
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 3));
		}
		else if(level ==3)
		{	
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 1));
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 2));
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 3));
		}
		else if(level ==4)
		{	
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 1));
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 2));
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 3));
			if(mark == 10 && mark1 % 2 == 0)
				bullets.push(new oddmissile(parseInt(selfplan.imagenode.style.left)+20,parseInt(selfplan.imagenode.style.top)-20, 4,-10));
		}
		else if(level ==5)
		{	
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 1));
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 2));
			bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+22,parseInt(selfplan.imagenode.style.top)-30, 3));
			if(mark == 10 && mark1 % 2 == 0){
				bullets.push(new oddmissile(parseInt(selfplan.imagenode.style.left)-10,parseInt(selfplan.imagenode.style.top)-20, 4,-10));
				bullets.push(new oddmissile(parseInt(selfplan.imagenode.style.left)+50,parseInt(selfplan.imagenode.style.top)-20, 4,-10));
			}
		}
	}

	var bulletslen = bullets.length;
	for (var i=0;i<bulletslen;i++){
		bullets[i].bulletmove();
	if(bullets[i].bulletimage.offsetTop<0){
		mainDiv.removeChild(bullets[i].bulletimage);
		bullets.splice(i,1);bulletslen--;
		}
	else if(bullets[i].bulletimage.offsetLeft>800||bullets[i].bulletimage.offsetLeft<0){
		mainDiv.removeChild(bullets[i].bulletimage);
		bullets.splice(i,1);bulletslen--;
		}
	}
	
	var enemybulletslen = enemybullets.length;
	for (var i=0;i<enemybulletslen;i++){
		if(enemybullets[i].bulletl == 1)									//普通敌机子弹移动	1
		{
			enemybullets[i].enemybulletmove();
			if(enemybullets[i].bulletimage.offsetTop>580){
				mainDiv.removeChild(enemybullets[i].bulletimage);
				enemybullets.splice(i,1);enemybulletslen--;
			}
		}
		else if(enemybullets[i].bulletl == 5)								//跟踪子弹	5
		{
			enemybullets[i].followmove();
			if(enemybullets[i].bulletimage.offsetTop>580){
			mainDiv.removeChild(enemybullets[i].bulletimage);
			enemybullets.splice(i,1);enemybulletslen--;
			}
			else if(enemybullets[i].bulletimage.offsetLeft>800||enemybullets[i].bulletimage.offsetLeft<0){
			mainDiv.removeChild(enemybullets[i].bulletimage);
			enemybullets.splice(i,1);enemybulletslen--;
			}
		}
		else if(enemybullets[i].bulletl == -10||enemybullets[i].bulletl == -20)//boss子弹	-10	-20
		{
			enemybullets[i].bossbulletmove();
			if(enemybullets[i].bulletimage.offsetTop > 580){
				enemybullets[i].bulletl2 = -10;
			}
			if(enemybullets[i].bulletimage.offsetTop<0){
			mainDiv.removeChild(enemybullets[i].bulletimage);
			enemybullets.splice(i,1);enemybulletslen--;
			}
			else if(enemybullets[i].bulletimage.offsetLeft>800||enemybullets[i].bulletimage.offsetLeft<0){
				if(enemybullets[i].bulletl == -10)
					enemybullets[i].bulletl = -20;
				else if(enemybullets[i].bulletl == -20)
					enemybullets[i].bulletl = -10;
			}
		}
		else																	//精英怪子弹
		{
			enemybullets[i].elitebulletmove();
			if(enemybullets[i].bulletimage.offsetTop>580||enemybullets[i].bulletimage.offsetTop<0){
				mainDiv.removeChild(enemybullets[i].bulletimage);
				enemybullets.splice(i,1);enemybulletslen--;
			}
			else if(enemybullets[i].bulletimage.offsetLeft>800||enemybullets[i].bulletimage.offsetLeft<0){
				mainDiv.removeChild(enemybullets[i].bulletimage);
				enemybullets.splice(i,1);enemybulletslen--;
		}
		}
	}

	var thingslen = things.length;
	for (var i=0;i<thingslen;i++){
		things[i].thingmove();
		if(things[i].thingimage.offsetTop>600){
			mainDiv.removeChild(things[i].thingimage);
			things.splice(i,1);thingslen--;
		}
	}
	
	/*
	碰撞判断
	*/
    for(var k=0;k<bulletslen;k++){
        for(var j=0;j<enemyslen;j++){
            //判断碰撞本方飞机
            if(enemys[j].planisdie==false){
                if(enemys[j].imagenode.offsetLeft+enemys[j].plansizeX>=selfplan.imagenode.offsetLeft&&enemys[j].imagenode.offsetLeft<=selfplan.imagenode.offsetLeft+selfplan.plansizeX){  
				   if(enemys[j].imagenode.offsetTop+enemys[j].plansizeY>=selfplan.imagenode.offsetTop+15&&enemys[j].imagenode.offsetTop<=selfplan.imagenode.offsetTop-7+selfplan.plansizeY){
                      //碰撞本方飞机
					end();
					}
				}
                //判断子弹与敌机碰撞
                if((bullets[k].bulletimage.offsetLeft+bullets[k].bulletsizeX>enemys[j].imagenode.offsetLeft)&&(bullets[k].bulletimage.offsetLeft<enemys[j].imagenode.offsetLeft+enemys[j].plansizeX)){
                    if(bullets[k].bulletimage.offsetTop<=enemys[j].imagenode.offsetTop+enemys[j].plansizeY&&bullets[k].bulletimage.offsetTop+bullets[k].bulletsizeY>=enemys[j].imagenode.offsetTop){
                        //敌机血量减子弹攻击力
                        enemys[j].planhp=enemys[j].planhp-bullets[k].bulletattach;
						if (enemys[j].planhp<0)
							enemys[j].planhp = 0;
                        if(enemys[j].planhp==0){
                            scores=scores+enemys[j].planscore;
                            scorelabel.innerHTML=scores;
							if(enemys[j].planscore != 1000)
							{
								mark3++;
								if(mark3 == 2||mark3 == 3||mark3 ==6){
									mark2 = 0;
									elitemark = 0;
									elitemark1 = 0;
									followmark = 0;
								}
							}
                            enemys[j].imagenode.src=enemys[j].planboomimage;
                            enemys[j].planisdie=true;
                        }
                        //删除子弹
                        mainDiv.removeChild(bullets[k].bulletimage);
                            bullets.splice(k,1);
                            bulletslen--;
                            break;
                    }
				}
			}
        }
    }
//判断敌方子弹与本机碰撞
	for(var l=0;l<enemybulletslen;l++){
		if((enemybullets[l].bulletimage.offsetLeft+enemybullets[l].bulletsizeX>selfplan.imagenode.offsetLeft)&&(enemybullets[l].bulletimage.offsetLeft<selfplan.imagenode.offsetLeft+selfplan.plansizeX)){
			if(enemybullets[l].bulletimage.offsetTop<=selfplan.imagenode.offsetTop+selfplan.plansizeY&&enemybullets[l].bulletimage.offsetTop+enemybullets[l].bulletsizeY>=selfplan.imagenode.offsetTop){
		//本机血量减子弹攻击力
				selfplan.planhp=selfplan.planhp-enemybullets[l].bulletattach;
				box.style.width =8*selfplan.planhp+"px";
				taken++;
				if(taken == 20){
					level--;
					taken = 0;
				}
				if(level<1)
					level = 1;
				console.log(selfplan.planhp);
				if(selfplan.planhp<=0){
					end();
				}
				//删除子弹
				mainDiv.removeChild(enemybullets[l].bulletimage);
				enemybullets.splice(l,1);
				enemybulletslen--;
				break;
			}
		}
	}
//判断道具与本机碰撞
	for(var l=0;l<thingslen;l++){
		if((things[l].thingimage.offsetLeft+things[l].thingsizeX>selfplan.imagenode.offsetLeft)&&(things[l].thingimage.offsetLeft<selfplan.imagenode.offsetLeft+selfplan.plansizeX)){
			if(things[l].thingimage.offsetTop<=selfplan.imagenode.offsetTop+selfplan.plansizeY&&things[l].thingimage.offsetTop+things[l].thingsizeY>=selfplan.imagenode.offsetTop){
				if(things[l].thingk >=0&&things[l].thingk <=20)
				{
					selfplan.planhp=selfplan.planhp += 1;
					if(selfplan.planhp>25)
					{
						selfplan.planhp = 25;
						taken--;
					}
					box.style.width =8*selfplan.planhp+"px";
				}
				else if(things[l].thingk >=21&&things[l].thingk <=22){
					level += 1;
					if(level>5)
						level = 5;
				}
				else if(things[l].thingk >=23&&things[l].thingk <=24){
					skill += 1;
					if(skill>5)
						skill = 5;
					skilllabel.innerHTML=skill;
				}
				mainDiv.removeChild(things[l].thingimage);
				things.splice(l,1);
				thingslen--;
				break;
			}
		}
	}

	function end(){
		if(result == false)
			selfplan.imagenode.src="image/myblow.gif";	
		if(result == true){
			gameover.innerHTML="恭喜过关";
			var enemyslen = enemys.length;
			for(var i=0;i<enemyslen;i++){
				enemys[i].imagenode.src=enemys[i].planboomimage;
                enemys[i].planisdie=true;
			}
		}
			enddiv.style.display="block";
			planscore.innerHTML=scores;
			plantime.innerHTML=time;
			clearTimeout(t);
			if(document.removeEventListener){
				mainDiv.removeEventListener("mousemove",yidong,true);
				bodyobj.removeEventListener("mousemove",bianjie,true);
			}
			else if(document.detachEvent){
				mainDiv.detachEvent("onmousemove",yidong);
				bodyobj.removeEventListener("mousemove",bianjie,true);
			}
			clearInterval(set);
	}
}

/*
开始游戏按钮点击事件
*/
var set;
function begin(){
	startdiv.style.display = "none";
	mainDiv.style.display = "block";
	selfplan.imagenode.style.display = "block";
	scorediv.style.display = "block";
	timediv.style.display = "block";
	skilldiv.style.display = "block";
/*
调用开始函数
*/
	set = setInterval(start,20);
	timeCount();
	}
//暂停界面游戏说明时间，添加游戏操作和自己的信息，具体请自行实现
function youxishuoming(){
	suspenddiv.style.display = "none";
	shuomingdiv.style.display = "block";
	shuomingdiv.getElementsByTagName("button")[0].addEventListener("click",youxishuoming2,true);
	}
function youxishuoming2(){
	shuomingdiv.style.display = "none";
	zanting();
	}
//游戏结束后点击继续按钮事件
function jixu(){
	location.reload(true);
	}
	
//计时
var t;
function timeCount(){
	time = time + 1;
	timelabel.innerHTML=time;
	t = setTimeout("timeCount()",1000)
}