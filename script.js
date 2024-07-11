let game_mode = "two-player-mode";
const O_src = "./images/circle.png";
const X_src = "./images/cross.png";
let player_1,player_2,encountered_moves,board,winner;


start_game();


function select_game_mode(mode){
    if(mode.value=="ai-mode"){
        game_mode = "ai-mode";
    }
    else if(mode.value=="two-player-mode"){
        game_mode = "two-player-mode";
    }

    let modes = document.getElementsByClassName("mode-button");
    for(let i = 0 ;i<modes.length;i++){
        modes[i].classList.remove("mode-selected");
    }
    mode.classList.add("mode-selected");
    assgin_players();
}

// for assign name to players
function assgin_players(){
    player_1.name = prompt("Enter Name of Player-1.");
    if(game_mode=="two-player-mode"){
        player_2.name = prompt("Enter Name of Player-2.");
    }
    else if(game_mode=="ai-mode"){
        player_2.name = "AI✨";
    }
    document.getElementById("player-1-name").innerHTML = player_1.name;
    document.getElementById("player-2-name").innerHTML = player_2.name;
    document.getElementById("p1-name").innerHTML = player_1.name;
    document.getElementById("p2-name").innerHTML = player_2.name;
}

// player perform move 
function player_move(click){
    let clicked_box = click.id.replace("box","");
    let i = parseInt(clicked_box[0]);
    let j = parseInt(clicked_box[1]);
    console.log(clicked_box);

    let move_number = encountered_moves.length+1;

    if(move_number!=10 && winner=="?"){
        if(!encountered_moves.includes(clicked_box)){

            encountered_moves.push(clicked_box);

            if(move_number%2!=0){
                board[i][j]=player_1.symbol;
            }
            else{
                board[i][j]=player_2.symbol;
            }

            update_board();
            
            if(check_win()){
                // console.log("test-2");
                if(move_number%2!=0){
                    winner = player_1.name;
                }
                else{
                    winner = player_2.name;
                }
            }
            
            if(winner!="?"){
                document.getElementById("winner").innerHTML = winner + "<br/>🥳";
                document.getElementById("game-status").innerHTML = "🚩 GAME OVER! 🏁";
            }

            update_pointer(move_number);
        }
        else{
            setTimeout(()=>{
                document.getElementById(`box${i}${j}`).style.boxShadow = "0px 0px 0px";
            },500)
            document.getElementById(`box${i}${j}`).style.boxShadow = "inset 0px 0px 3px 2px red";
            console.log("this move already encountered!");
        }
    }
    else{
        console.log("game over!");
    }
}

// updating the live player pointer
function update_pointer(move_number){
    if(move_number!=9 && winner=="?"){
        if(move_number%2==0){
            document.getElementById('pointer-p1').style.opacity = 1;
            document.getElementById('pointer-p2').style.opacity = 0;
        }
        else{
            document.getElementById('pointer-p1').style.opacity = 0;
            document.getElementById('pointer-p2').style.opacity = 1;
        }
    }
    else{
        document.getElementById('pointer-p1').style.opacity = 0;
        document.getElementById('pointer-p2').style.opacity = 0;
        document.getElementById("game-status").innerHTML = "🚩 GAME OVER! 🏁";
    }
}

// updating the O-X symbols on the board.
function update_board(){
    for(let i = 0; i<3 ; i++){
        for(let j = 0; j<3; j++){
            if(board[i][j]=="O"){
                document.getElementById(`img${i}${j}`).src = O_src;
            }
            else if(board[i][j]=="X"){
                document.getElementById(`img${i}${j}`).src = X_src;
            }
        }
    }
}

function check_win(){
    let winning_status = false;
    // console.log("test-1");
    
    // check all rows & columns
    for(let x = 0; x<3 ; x++){
        if((board[x][0]==board[x][1] && board[x][1]==board[x][2] && board[x][0]!="-")||(board[0][x]==board[1][x] && board[1][x]==board[2][x] && board[0][x]!="-")){
            winning_status = true;
            break;
        }
    }

    // check both diagonal
    if(winning_status == false){
        if(board[1][1]!="-" &&((board[0][0]==board[1][1] && board[1][1]==board[2][2])||(board[0][2]==board[1][1] && board[1][1]==board[2][0]))){
            winning_status = true;
        }
    }
    return winning_status;
}

function start_game(){
    player_1 = {name:"Player-1",symbol:"O"}
    player_2 = {name:"Player-2",symbol:"X"}
    encountered_moves = [];
    board = [["-","-","-"],["-","-","-"],["-","-","-"]];
    winner = "?";
    
    document.getElementById('pointer-p1').style.opacity = 1;
    document.getElementById('pointer-p2').style.opacity = 0;
    document.getElementById("game-status").innerHTML = "Current Turn";
    document.getElementById("winner").innerHTML = winner;
    
    for(let i = 0; i<3 ; i++){
        for(let j = 0; j<3; j++){
            document.getElementById(`img${i}${j}`).src = "./images/blank.png";
        }
    }
}