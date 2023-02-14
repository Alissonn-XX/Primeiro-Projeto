//CONSTANTES QUE SELECIONA OS ELEMENTOS HTML ATRAVES DA API DO DOM
const btnConfirmaPalavra = document.getElementById('confirmar');
const btnVerificarLetra = document.getElementById('verificar');
const tela = document.querySelector('#resposta');

//VARIÁVEIS QUE SELECIONA OS ELEMENTOS HTML ATRAVES DA API DO DOM
let inputEntrada = document.getElementById('entrada');
let verificarLetra = document.getElementById('conferir');
let corpoBoneco = document.querySelectorAll('.boneco .corpo');
let palavraOculta = document.createElement('p');
let tituloGradiente = document.querySelector('.gradient')
let telaVitoria = document.querySelector('.vitoria')

//ARRAYS COM NÍVEL GLOBAL QUE SOFRERAM INFLUÊNCIA
let listaLetras = [];
let listaLetrasErradas = [];
let listaPalavaCompleta = [];

//VARIÁVEL DE VIDA, JÁ COM O MÁXIMO DE VIDAS E SENDO DECREMENTADA SE NECESSÁRIO
let vidaGame = 6;

    /*ESTAGIOS DO JOGO, INICIADOS POR CHAMADA ATRAVES DO BUTTON*/
    function inicioJogo(){
      return window.location.href= '/forca/html/index.html'
    }

    function inicio(){
      return window.location.href= '/forca/html/forca_inicio.html'
    }

    function jogo(){
      return window.location.href= '/forca/html/index.html'
    }

    function desabilitarBotao(){
      btnConfirmaPalavra = document.getElementById('confirmar').disabled = true;
    }

     /*  -FUNÇÃO-
        -QUE RECEBE A ENTRADA DA PALAVRA. 
        -A PALAVRA É AMAZENADA EM UM ARRAY.
        -ESSA PALAVRA É MOSTRADA NA TELA DE ATRAVEZ DO _, OCULTANDO O SEU CONTEUDO E DEMOSTRANDO O TAMANHO DA PALAVRA MISTERIOSA
        -CONTEÚDO DO INPUT SENDO SUBSTITUIDO PELO SINAL DE *
     */
      function palavraDeEntrada(){
        let ignoreCase = inputEntrada.value;
        let palavraEntrada = ignoreCase.toUpperCase().trim();
        let oculto = '* '
        
        if(palavraEntrada != ''){
          for(let letra of palavraEntrada){
            listaLetras.push(letra)
            palavraOculta.innerHTML += `<span> __ </span> `;
          }
          
          tela.appendChild(palavraOculta)
        }
        
        inputEntrada.value = oculto.repeat(listaLetras.length)
        desabilitarBotao();
      }

    /*
       -FUNÇÃO-
      -RECEBENDO PALAVRA MISTERIOSA E COMPARADO COM A ENTRADA DA LETRA DIGITADA.
      -LAÇO FOR QUE COMPARA SE A LETRA DIGITADA É A MESMA DE ACORDO COM A PALAVRA DE ENTRA.
      -LAÇO FOR FEITO PARA COMPARA OS INDICES DO ELEMENTO HTML COM O DO ARRAY, SE FOR IGUAL SETA A LETRA NO ELEMENTO.
    */
      function palavraEscondida(){
        
        let ignoreCase = verificarLetra.value;
        let letras = ignoreCase.toUpperCase();
        
        let lista = palavraOculta.querySelectorAll('span')
      
        
        for(let i = 0; i < listaLetras.length; i++){
            
          contar: if(listaLetras[i] === letras){
                      listaPalavaCompleta.push(letras)
                    for(let x = 0; x < lista.length; x++){                 
                        if(i == x){
                          lista[x].innerHTML = listaLetras[i]
                        }  
                      }              
                    } else{
                        if(!listaLetrasErradas.includes(letras) && letras != '' && !listaLetras.includes(letras)){
                            listaLetrasErradas.push(letras)    
                            vidaGame--  
                            
                               
                                            
                          }else{
                              listaLetrasErradas.pop
                    } 
                }        
            }
        verificarLetra.value='';
      }

      /*FUNÇÃO
       -LAÇO FOREACH NO ARRAY QUE RECEBEU A PALAVRA
       -VERIFICANDO SE CADA ITEM DO ARRAY DA PALAVRA DE ENTRADA COM AS LETRAS CERTAS
       -VERIFICAÇÃO DA VIDA O TAMANHO DOS ARRAYS E A VARIAVES DO LAÇO FOR OF DA LISTA DE PALAVRA CERTAS
       -NO FIM SE A CONDIÇÃO FOR ALCANÇADA É CHAMADO UMA FUNÇÃO*/
      function verificarVitoria(){ 
        listaLetras.forEach(item =>{
          let validando = item
          
          for(let letrax of  listaPalavaCompleta){
            if(vidaGame > 0 && listaPalavaCompleta.length == listaLetras.length && letrax == validando){
              console.log('você ganhou!!')
              vitoria();
            }
          }
          return validando
        })

      }

      /*
       -FUNÇÃO
       -QUANDO A VERIFICAÇÃO DA LETRA DE ENTRADA, COM A LISTA DE PALAVRA, E A VIDA É VERIFICADA
       -ESSA FUNÇÃO EXIBE UMA MENSSAGEM DE VITORIA E FIM DO JOGO.
      */
        function vitoria(){
          var element = document.getElementById("vitoria");
          element.classList.add("vitoriaJogo");
      }

      /*
          -FUNÇÃO-
          -C0NTROLE DE TENTATIVAS FEITA PELO USUÁRIO PARA DESCOBRIR A LETRA.
          -CADA ERRO RESULTA EM UMA PARTE DO CORPO QUE FICA A VISTA.
          -LAÇO SWITCH COM CONDIÇÕES FIXADAS
      */
      function vidas(){  
        
                switch (vidaGame){
                  case 0 :
                    corpoBoneco[vidaGame].classList.add('gameOver');
                    window.location.href= '/forca/html/forca_gameOver.html'
                  break;
                  case 1 :
                    corpoBoneco[vidaGame].classList.add('gameOver');
                    break;
                  case 2 :
                    corpoBoneco[vidaGame].classList.add('gameOver');
                    break;
                  case 3 :
                    corpoBoneco[vidaGame].classList.add('gameOver');;
                    break;
                  case 4 :
                    corpoBoneco[vidaGame].classList.add('gameOver');
                    break;
                  case 5 :
                    corpoBoneco[vidaGame].classList.add('gameOver');
                  break;
                }


      }
      
      /*
          -EVENTO-
          -LIGADO AO BUTTON, EXECUTA FUNÇÃO DE "CLICK", QUE CHAMA A FUNÇÃO DA PALAVRA DE ENTRADA.
      */
      btnConfirmaPalavra.addEventListener('click', ()=>{
        palavraDeEntrada();
      })

      /*
          -EVENTO-
          -LIGADO AO BUTTON, EXECUTA FUNÇÃO DE "CLICK", QUE CHAMA DUAS FUNÇÕES, DE CHECAGEM DE PALAVRA E LETRA E VIDAS RESTANTES.
      */
      btnVerificarLetra.addEventListener('click', ()=>{
        palavraEscondida();
        vidas();
        verificarVitoria();
      })

      