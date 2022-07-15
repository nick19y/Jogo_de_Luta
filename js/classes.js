class Sprite{

    // aqui, Sprite passa a ser definida como uma imagem estática

    // as chaves são usadas para definir os parâmetros como um único objeto, para assim, não ser necessário colocá-los em ordem
    // constructor funciona como uma função na class para definir suas propriedades
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}}){
        // positoin e imgSrc são propriedades
        // parâmetros position e velocity definidos para que cada "sprite" tenha posições diferentes
        // propriedade que fará associação com a posição colocada na tela
        // this é sempre usado para fazer referência a um objeto
        this.position = position;

        this.width = 50;
        
        // altura do personagem
        this.height = 150;

        // criação da propriedade imagem
        this.image = new Image();
        
        // fonte da imagem
        this.image.src = imageSrc;

        this.scale = scale;
        
        this.framesMax = framesMax;

        this.framesCurrent = 0;
        
        this.framesElapsed = 0;

        this.framesHold = 5;

        this.offset = offset;
    }
    draw(){

        
        // abaixo, uma função do canvas
        c.drawImage(this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale)
        // os últimos dois parâmetros definem o quanto a tela vai ocupar no canvas




    }
    
    
    animateFrames(){
        this.framesElapsed++;

        // comando abaixo que cria uma condição para a execução do loop oq diminui sua velocidade
        if(this.framesElapsed % this.framesHold === 0){

            if(this.framesCurrent < this.framesMax -1){
                this.framesCurrent++
            } else{
                this.framesCurrent = 0
            }
        }
    }



    // método criado
    update(){
        // referencia ao metodo draw
        this.draw();
        this.animateFrames();
    }   
}

class Fighter extends Sprite{
    // as chaves são usadas para definir os parâmetros como um único objeto, para assim, não ser necessário colocá-los em ordem
    // constructor funciona como uma função na class para definir suas propriedades
    constructor({position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x:0, y:o},
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined}
    })  {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        // parâmetros position e velocity definidos para que cada "sprite" tenha posições diferentes
        // propriedade que fará associação com a posição colocada na tela
        // this é sempre usado em uma função para conter o valor que invoca o parâmetro, no caso seria position e velocity
        this.position = position;
        // nova propriedade de velocidade e movimento
        this.velocity = velocity;
        // velocity vai definir movimento no código inteiro

        this.width = 50;
        
        // altura do personagem
        this.height = 150;



        // propriedade abaixo iniciada para deixar a tecla do oponente independente
        // se o valor não fosse referenciado, os comandos do oponente afetariam os movimentos do player1
        this.lastKey;



        // this cria aqui uma propriedade para a função contructor que pode ser modificada ao ser referenciada no código
        this.attackBox = {
            // parâmetros de atackBox abaixo
            // this.position vai alterar o tempo todo, pois "this" vai sempre estar buscando a referência da posição do player
            position: {
                x: this.position.x,
                y: this.position.y
            },
            // offset criado para fazer a caixa de ataque do oponente
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        
        // comando abaixo para posteriormente ser feita a referência a ele
        // color foi definido como um parâmetro para poder ser modificada no inimigo posteriormente
        this.color = color;

        // propriedade para criar o ataque
        this.isAttacking;

        // pontos iniciais de saúde de jogador
        this.health = 100;


        // propriedades para os frames e sprites para movimento
        this.framesCurrent = 0;
        
        this.framesElapsed = 0;

        this.framesHold = 5;

        this.sprites = sprites;

        this.dead = false

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        

    }

    // método para a criação de um retângulo
    
    
    // método criado
    update(){
        // referencia ao metodo draw
        this.draw();
        // this.draw faz com que os desenhos dos personagens não sumam no jogo

        // condição abaixo que diz que se o jogador não está morto, o programa deve continuar animando o jogo
        if(!this.dead)this.animateFrames();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;



        // caixa de ataque abaixo
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)


        // comando que faz com que a posição mude de acordo com a tecla pressionada no addEventListener
        this.position.x += this.velocity.x;


        // this.position.y = this.position.y + 10 = comando que substitui o de baixo
        // esse comando abaixo criará um cenário de gravidade para o jogo
        this.position.y += this.velocity.y;



        // condição inteira abaixo faz com que, após pressionar o w, o jogador volte para o "chão"
        // ou seja cria "gravidade" e chão para o personagem
        // isso é feito de acordo com a análise da posição do personagem pela própria condição abaixo


        // basicamente, o comando abaixo funciona como uma função de gravidade
        // comando abaixo soma a 1ª posição do retângulo com a sua altura e posição, oq resulta em sua base
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 82){
            this.velocity.y = 0;
            this.position.y = 344;
            // comando acima qua para o movimento do retângulo, criando um "chão"
        }
        // nessa posição, o else faz com que os "retângulos" cheguem de fato à base da tela
        // comando que é apenas executado se o comando acima não for verdadeiro
        else{
            // comando abaixo que faz com que o valor gravidade seja adicionado à posição de acordo com o tempo
            this.velocity.y += gravity;
        }
    }
    attack(){
        this.switchSprite('attack1')
        this.isAttacking = true;
        // depois de 100 milisegundos, acabará o tempo de cada ataque
        // setTimeout(() => {
            // this.isAttacking = false;
        // }, 1000);
    }


    // novo método para receber ataque
    takeHit(){
        this.health -=5

        if(this.health <= 0){
            this.switchSprite('death')
        }   else this.switchSprite('takeHit')
    }

    
    switchSprite(sprite){
        // condição abaixo que diz se o jogador realmente morreu
        if(this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax -1) this.dead = true
            return}

        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1. framesMax -1) return

        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax -1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
                // Ctrl + d seleciona elementos que tem a mesma palavra
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
    }
    }

}
