export default function checkTie(board) {
  if (board.includes("")) return false; //game cannot have ended in a tie, when theres a empty cell

  return true;
}
