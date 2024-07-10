let game_mode = "two-player-mode";
const O_src = "./images/circle.png";
const X_src = "./images/cross.png";

let player_1 = {name:"",symbol:"O"}
let player_2 = {name:"",symbol:"X"}
let encountered_moves = [];
let board = [[" "," "," "],[" "," "," "],[" "," "," "]];
let winner = "?";

document.getElementById('pointer-p1').style.opacity = 1;
document.getElementById('pointer-p2').style.opacity = 0;

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
        player_2.name = "ai";
    }
}

// player perform move 
function player_move(click){
    let clicked_box = click.id.replace("box","");
    let i = parseInt(clicked_box[0]);
    let j = parseInt(clicked_box[1]);
    console.log(clicked_box);

    let move_number = encountered_moves.length+1;

    if(move_number!=10){
        if(!encountered_moves.includes(clicked_box)){
            encountered_moves.push(clicked_box);
            if(move_number%2!=0){
                board[i][j]=player_1.symbol;
            }
            else{
                board[i][j]=player_2.symbol;
            }
            update_board()
            update_pointer(move_number)
        }
        else{
            console.log("this move already encountered!");
        }
    }
    else{
        console.log("game over!");
    }
}

// function symbol(move_num){
//     if(move_num%2!=0){
        
//     }
//     else{

//     }
// }

// updating the live player pointer
function update_pointer(move_number){
    if(move_number!=9){
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

function restart_game(){
    player_1 = {name:"",symbol:"O"}
    player_2 = {name:"",symbol:"X"}
    encountered_moves = [];
    board = [[" "," "," "],[" "," "," "],[" "," "," "]];
    winner = "?";
    document.getElementById('pointer-p1').style.opacity = 1;
    document.getElementById('pointer-p2').style.opacity = 0;
    for(let i = 0; i<3 ; i++){
        for(let j = 0; j<3; j++){
            document.getElementById(`img${i}${j}`).src = "./images/blank.png";
        }
    }
}