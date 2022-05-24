const canvas = document.querySelector('canvas');
// const significa a declaração de uma constante para um valor que não será modificado
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;



// console.log(event.key) é um comando que mostra no console qual tecla está sendo pressionada


// todas medidas definidas em pixels

c.fillRect(0, 0, canvas.width, canvas.height);


// a palavra Sprite foi escolihda pois significa um gráfico que pode ser manipulado como uma entidade única
// para criar um objeto foi definida uma classe que atua como modelo de desenho


// criação de uma constante universal
const gravity = 0.7;



const background = new Sprite({
    // propriedades da constante aqui
    position:{
        x:0,
        y:0,
        // lugares em que a imagem vai começar
    },
    imageSrc: './assets/background/background_layer_5.png'
})
const shop = new Sprite({
    // propriedades da constante aqui
    position:{
        x:600,
        y:145,
        // lugares em que a imagem vai começar
    },
    imageSrc: './assets/decorations/shop_anim.png',
    scale:2.75,
    framesMax: 6
})

// criação do nosso jogador
// chaves usadas definem os parâmetros como um único objeto, para que tais não precisem ser dispostos em ordem
// abaixo foi criado um objeto a partir da classe Sprite
const player = new Fighter({

    position:{
    // parametros do position abaixo, que serão atribuídos ao this.position
        x:200,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc: './assets/king/Sprites/Idle.png',
    framesMax:8,
    scale: 2.5,
    offset:{
        x: 100,
        y:112
    },
    // framesMax aqui é sempre usado para indicar o número máximo de frames de uma imagem
    // abaixo são definidos os sprites, imagens de movimento 
    sprites:{
        idle:{
            imageSrc:'./assets/king/Sprites/Idle.png',
            framesMax:8
        },
        run:{
            imageSrc:'./assets/king/Sprites/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./assets/king/Sprites/Jump.png',
            framesMax:2
            // quantidade de frames, fotos que estão referenciadas acima
        },
        fall:{
            imageSrc:'./assets/king/Sprites/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./assets/king/Sprites/Attack1.png',
            framesMax:4
        },
        takeHit:{
            imageSrc:'./assets/king/Sprites/Take Hit - white silhouette.png',
            framesMax:4
        },
        death: {
            imageSrc:'./assets/king/Sprites/Death.png',
            framesMax:6
        }
    },
    attackBox:{
        // posicionamento do ataque
        offset:{
        x:90,
        y:30
    },
    // largura e altura do ataque
    width: 110,
    height:80
    }
})

// espaço para a execução do  método draw

// criação do inimigo
const enemy = new Fighter({

    position:{
    // parametros do position abaixo, que serão atribuídos ao this.position
        x:600,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    color:'blue',
    offset:{
        x: -50,
        y:0
    },
    imageSrc: './assets/warrior/Idle.png',
    framesMax:8,
    scale: 2.5,
    offset:{
        x: 100,
        y:86
    },
    // Ctrl + D seleciona palavras iguais em linhas diferentes
    sprites:{
        idle:{
            imageSrc:'./assets/warrior/Idle.png',
            framesMax:8
        },
        run:{
            imageSrc:'./assets/warrior/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./assets/warrior/Jump.png',
            framesMax:2
            // quantidade de frames, fotos que estão referenciadas acima
        },
        fall:{
            imageSrc:'./assets/warrior/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./assets/warrior/Attack1.png',
            framesMax:4
        },
        takeHit:{
            imageSrc: './assets/warrior/Take Hit - white silhouette.png',
            framesMax:4
        },
        death: {
            imageSrc:'./assets/warrior/Death2.png',
            framesMax:6
        }
    },
    attackBox:{
        offset:{
        x:-150,
        y:30
    },
    width: 150,
    height:80
    }
})


// constante criada para não parar completamente o movimento do personagem caso duas teclas estejam pressionadas ao mesmo tempo
// a constante será usada na função animate para que isso aconteça da maneira correta
// abaixo, objetos q recebem a propriedade press igualada a falso
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

// diferença entre let e var
// let tem escopo de bloco, e em um código grande pode ser usado para a declaração de uma variável em um pequeno trecho do código
// no caso se fosse um var, poderia ser acessado ou confundido com outras partes do código, enquanto let
// descreve o bloco em que está
// enquanto no var, a declaração de variável pode acontecer depois da atribuição de um valor ou da su exibição
// o var permite que se use uma variável antes mesmo de declará-la, oq não acontece com o let
// let lastKey
// acima, uma atribuição de variável que está sem valor no momento
// sem ponto e vírgula para a sua atribuição no escopo abaixo

// let foi excluído, pq foi criada a mesma propriedade com a class Sprite





decreaseTimer();


function animate(){
    // função abaixo que cria um loop para a função atribuída entre parênteses
    window.requestAnimationFrame(animate);
    // função acima que chama a função animate,
    // a função animate executa o seu próprio chamamento o que cria um loop infinito para a execução do jogo
    
    // comando abaixo que faz com que o preenchimento do fundo seja preto,
    // diferente dos jogadores que tem a função draw que cria uma cor vermelha para cada um
    c.fillStyle = 'black';


    // função abaixo que começa a "apagar" os retângulos da tela em x 0 e y 0
    // e é executada em toda a largura e altura do canvas
    c.fillRect(0,0,canvas.width,canvas.height);


    background.update();


    
    // shop update é oq vai permitir o movimento da fumaça no shop
    shop.update();
    // no update foi chamada a função q faz com que os desenhos permaneçam na tela e cria "gravidade" no jogo
    
    
    // comando abaixo para o contraste entre os jogadores e o fundo do jogo 
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0,0, canvas.width, canvas.height)



    player.update();
    enemy.update();


    player.velocity.x = 0;
    // igualar a velocidade do jogador a 0 faz com que o movimento pare quando uma tecla é levantada
    
    enemy.velocity.x = 0;


    // player1 movimentos
    // abaixo encontra se a execução dos movimentos do player1, na função animate, que contém o update, que contém o draw
    // oq faz o player aparecer na tela
    // comando que foi refereciado acima da função para não parar o movimento do personagem em caso de duas tecla serem
    // pressionadas simultaneamente
    // posteriormente foram colocadas condições para que a imagem de movimento apresentasse seu sprite, ou seja, seu movimento
    
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -7;
        player.switchSprite('run')
    }   else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 7;
        player.switchSprite('run')
    }   else{
        player.switchSprite('idle')
    }

    // pulando e caindo
    if(player.velocity.y < 0) {
        player.switchSprite('jump')
    }   else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }

    // player2 movimentos
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -7;
        enemy.switchSprite('run')
    }   else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 7;
        enemy.switchSprite('run')
    }   else{
        enemy.switchSprite('idle')
    }


    // Ctrl + D seleciona a mesma palavra em diferentes linhas do código

    // pulando e caindo
    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    }   else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }


    // ataque dos personagens e alteração na saúde de acordo com o id do html
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        })&&
        // abaixo é apresentado o frame em que o player causará a colisão
        player.isAttacking && player.framesCurrent === 2
        ){
        enemy.takeHit()
        // igualar o comando a falso faz com que ele seja executado apenas uma vez no console.log 
        player.isAttacking = false;
        // comando acima que tira 20 pontos de saúde, caso o inimigo seja atingido
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        // porcentagem acima que tira a porcentagem da barra de saúde, para a saúde decrescer gradualmente, e o inimigo poder
        // sofrer vários ataques 


        // gsap = importção da biblioteca que está no html
        gsap.to('#enemyHealth',{
            width: enemy.health + '%'
        })
    } 

    // condição para quando o jogador errar o golpe
    if(player.isAttacking && player.framesCurrent ===2){
        player.isAttacking = false
    }


    // condição para quando o jogador ser atingido
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        })&&
        enemy.isAttacking && enemy.framesCurrent === 2
        ){
        player.takeHit()
        // igualar o comando a falso faz com que ele seja executado apenas uma vez no console.log 
        enemy.isAttacking = false;
        // document.querySelector('#playerHealth').style.width = player.health + '%';
        gsap.to('#playerHealth',{
            width: player.health + '%'
        })
    }
    
    // condição do inimigo errar
    if(enemy.isAttacking && enemy.framesCurrent ===2){
        enemy.isAttacking = false
    }



    // Fim do jogo com base na saúde
    if(enemy.health<=0 || player.health<=0){
        determineWinner({player, enemy, timerId})
    }

}


// execução da função animate
animate();


// console.log(event.key) faz com que o nome e as propriedades da tecla digitada apareça no console

// window funciona como um objeto
// o método abaixo configura funções a serem chamadas quando um evento especificado acontece
// keydown é o evento, para toda a vez que se pressionar uma tecla
// para se usar o addListener, é usada a estrutura a seguir
// no caso o event é definido como um objeto
window.addEventListener('keydown', (event) => {
    if(!player.dead){
    // o jogador só poderá executar os comandos abaixo se não estiver morto

    
    // comando abaixo criado para realizar o movimento do personagem em caso de uma tecla ser pressionada
    // console.log(event.key) esse comando mostra no console a tecla que está sendo pressionada
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case ' ':
            player.attack();
            break;        
    }
}


    // se fosse usado apenas um switch para o player1 e o player2, após um jogador morrer, o outro não poderia
    // fazer nenhum movimento de comemoração

    if(!enemy.dead){
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            // comando acima que faz referência à propriedade lastKey criada no Sprite para diferenciar o player2 do player1
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'Enter':
            enemy.attack();
            break;
    }
}
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            // comando acima que zera a velocidade do personagem, quando a tecla é levantada
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
    
    // teclas do inimigo
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            // comando acima que zera a velocidade do personagem, quando a tecla é levantada
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }

})

