const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(c)

canvas.width = window.innerWidth
canvas.height = window.innerHeight


class Player {
    constructor(){  
        this.velocity = {
            x:0,
            y:0
        }
        const image = new Image()
        image.src = './img/canon.png'
        image.onload = () => {
            this.image =  image
            this.width = image.width * 0.15
            this.height = image.height * 0.15
            this.position = {
                x: canvas.width/2 - this.width /2, 
                y: canvas.height -this.height -20
            }
        }   
    }
    draw(){
        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
            )
    }
    update(){
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x  
        }   
    }
}

class Projectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius,0, Math.PI*2)
        c.fillStyle = '#8B4513'
        c.fill()
        c.closePath()
    } 
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
//rocket
class Cible {
    constructor(){  
        this.velocity = {
            x:0,
            y:1
        }
        const image = new Image()
        image.src = './img/rocket.png'
        image.onload = () => {
            //const scale = 1
            this.image =  image
            this.width = image.width * 0.05
            this.height = image.height * 0.05
            this.position = {
                x: canvas.width/2 - this.width /2, 
                y: canvas.height/2 -250
            }
        }   
    }
    draw(){
        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
            )
    }
    update(){
        if(this.image){
            this.draw()
            //this.position.x += this.velocity.x 
            this.position.y += this.velocity.y
        }   
    }
}

const player = new Player()
const projectiles = []
const cible = new Cible()
const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    Space: {
        pressed: false
    }

}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = "green"
    c.fillRect(0, 0, canvas.width, canvas.height)
    cible.update()
    player.update()
    projectiles.forEach((projectile,index) => {
        if(projectile.position.y + projectile.radius <=0 ){
            setTimeout(()=>{
                projectiles.splice(index,1)
            },0)
        }
        else{
            projectile.update()
        }
    })

    if(keys.ArrowLeft.pressed && player.position.x >= 0){
        player.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width){
        player.velocity.x = 5
    }
    
    else{
        player.velocity.x = 0
    }
}
animate()

addEventListener('keydown', ({key}) =>{
    switch(key){
        case 'ArrowLeft':
            console.log('left')
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = true
            break
        case ' ':
            //keys.Space.pressed = true
            console.log("space")
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width/2,
                    y: player.position.y
                },
                velocity:{
                    x: 0,
                    y: -5
                }
            }))
            break
    }
})
addEventListener('keyup', ({key}) => {
    switch(key){ 
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case ' ':
            //keys.Space.pressed = false
            console.log("space")
            break
    }
})

