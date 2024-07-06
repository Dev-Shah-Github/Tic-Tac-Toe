let game_mode = "two-player-mode";
let player_1 = ""

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

    start_game();
}

function start_game(){
    const board = [[" "," "," "],[" "," "," "],[" "," "," "]];
    let winner = "?";
}