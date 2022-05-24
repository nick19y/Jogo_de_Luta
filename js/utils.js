    // detecção de colisão 
    // abaixo estã as condições de detecção de colisão
    // posição inicial da caixa, o this faz com que a posição seja dinâmica, ou seja  muda de acordo com o tempo
    // a soma com a largura da caixa faz com que tenhamos o final da caixa, oq seria a colisão
    // primeiro comando vê se a caixa de ataque passa  da posição do oponente da esquerda para a direita
    // segundo comando faz o contrário
    // na condição y, na primeira linha do y se compara a base da caixa de ataque do player com a posição de cima do inimigo
    // por isso se pega a posição y do player e se soma à sua altura
    // na segunda condição se compara a altura do player com a base do inimigo
    function rectangularCollision({rectangle1, rectangle2}){
        return(
            rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
            rectangle1.attackBox.position.x  <= rectangle2.position.x + rectangle2.width &&
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
        )
    }
    
    // entre{} encontra-se as propriedades chamadas
    function determineWinner ({player, enemy, timerId}){
        clearTimeout(timerId)
        document.querySelector('#displayText').style.display = 'flex'
        if(player.health === enemy.health){
            // tie vai ser usado para dizer quando a saúde dos players estão iguais e o tempo já acabou
            document.querySelector('#displayText').innerHTML = 'Tie'
        } 
        else if(player.health>enemy.health){
            document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    
        }
        else if(enemy.health>player.health){
            document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
            
        }
    }
    
    // função abaixo que faz o tempo cair
    // como a função setTimeout chama a função decreaseTimer, o comando se torna um loop infinito
    // o tempo vai caindo em 1000 milisegundos, ou seja, de um em um segundo
    let timer = 60
    let timerId
    function decreaseTimer(){
        timerId = setTimeout(decreaseTimer, 1000)
        if (timer>0){
            timer--
            document.querySelector('#timer').innerHTML = timer
            // inner.HTML fará com que o comando seja inserido no que está em HTML
        }
    
        if(timer===0){
            determineWinner({player, enemy, timerId})   
        }
    }