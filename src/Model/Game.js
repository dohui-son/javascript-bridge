const InputView = require("../GameIO/InputView");
const Bridge = require("./Bridge.js");
const BridgeGame = require("../Controller/BridgeGame");
const OutputView = require("../GameIO/OutputView");

class Game {
  #bridge;
  #playCount;
  #bridgeLength;
  #bridgeStatus;
  constructor(bridgeLength) {
    this.#bridgeLength = bridgeLength;
    this.setPlayCount();
    this.#bridge = new Bridge(this.#bridgeLength);
    this.#bridgeStatus = this.#bridge.getBridgeStatus;
    this.bridgeGame = new BridgeGame(this.#bridgeStatus);
  }

  setPlayCount() {
    this.#playCount = 0;
  }

  getPlayCount() {
    return this.#playCount;
  }

  increasePlayCount() {
    this.#playCount += 1;
  }

  playAlgorithms() {
    let quitResult = true;

    for (let moveCount = 0; moveCount < this.#bridgeLength; moveCount++) {
      const MOVE_RESULT = this.bridgeGame.move(
        InputView.readMoving(),
        moveCount
      );

      if (!MOVE_RESULT) {
        quitResult = this.askQuit();
      }
      if (quitResult === false) {
        return false;
      }
    }
    return true;
  }

  askQuit() {
    const IS_QUIT = InputView.readGameCommand();
    if (IS_QUIT === "Q") {
      return false;
    }
    if (IS_QUIT === "R") {
      return true;
    }
  }
}

module.exports = Game;
