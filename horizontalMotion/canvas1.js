var canvas = document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');
console.log(canvas);
var mouse={
x:undefined,
y:undefined
}

var maxRadius=15;
var minRadius=4;

var colorArray=[
'#009688',
'#35a79c',
'#54b2a9',
'#65c3ba',
'#82d0c9',

];
console.log();

window.addEventListener('mousemove',
function(event)
{
	mouse.x=event.x;
	mouse.y=event.y;
	
})

window.addEventListener('resize',function()
{
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;	

	init();
});


function Circle(x,y,dx,dy,radius)
{
	this.x=x;
	this.y=y;
	this.dx=dx;
	
	this.radius=radius;
	this.minRadius=radius;
	this.color= colorArray[Math.floor(Math.random() * colorArray.length)]
	this.draw=function()
	{
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		
		c.fillStyle=this.color;
		c.fill();

	}
	this.update=function()
	{
		if(this.x+this.radius>innerWidth || this.x-this.radius <0)
		{ 
  			 this.dx=-this.dx;
		}
		if(this.y+this.radius>innerHeight || this.y-this.radius<0 )			
		{ 
  			 this.dy=-this.dy;
	        }
		this.x+=this.dx;
                
		if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50 && this.radius<maxRadius)
		{
			this.radius++;
		}
		else if(this.radius>this.minRadius)
		{
			this.radius--;
		}
		this.draw();
	}
}


var circleArray=[];
for( var i=0; i<300; i++)
{
        var radius=5;
	var x=100;
	var y=Math.random()*(innerHeight-radius*2)+radius;
	var dx=(Math.random()-0.5)*10;
	var dy=(Math.random()-0.5)*10;
	circleArray.push(new Circle(x,y,dx,dy,radius));
}

function init()
{
circleArray=[];

for( var i=0; i<300; i++)
{
        
	var radius=5;
	var x=100;
	var y=Math.random()*(innerHeight-radius*2)+radius;
	var dx=(Math.random()-0.5)*10;
	var dy=(Math.random()-0.5)*10;
	circleArray.push(new Circle(x,y,dx,dy,radius));
}	
}

function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

	for( var i=0; i< circleArray.length; i++)
	{
		circleArray[i].update();
	}
}
animate();
