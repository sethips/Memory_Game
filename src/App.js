import React, { Component } from "react";
import Card from "./Card";
import Navbar from "./Navbar";

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

class App extends Component {
  constructor(props) {
    super(props);
    let cards = [
      { id: 0, cardState: CardState.HIDING, backgroundColor: "red" },
      { id: 1, cardState: CardState.HIDING, backgroundColor: "red" },
      { id: 2, cardState: CardState.HIDING, backgroundColor: "navy" },
      { id: 3, cardState: CardState.HIDING, backgroundColor: "navy" },
      { id: 4, cardState: CardState.HIDING, backgroundColor: "green" },
      { id: 5, cardState: CardState.HIDING, backgroundColor: "green" },
      { id: 6, cardState: CardState.HIDING, backgroundColor: "yellow" },
      { id: 7, cardState: CardState.HIDING, backgroundColor: "yellow" },
      { id: 8, cardState: CardState.HIDING, backgroundColor: "black" },
      { id: 9, cardState: CardState.HIDING, backgroundColor: "black" },
      { id: 10, cardState: CardState.HIDING, backgroundColor: "purple" },
      { id: 11, cardState: CardState.HIDING, backgroundColor: "purple" },
      { id: 12, cardState: CardState.HIDING, backgroundColor: "pink" },
      { id: 13, cardState: CardState.HIDING, backgroundColor: "pink" },
      { id: 14, cardState: CardState.HIDING, backgroundColor: "lightskyblue" },
      { id: 15, cardState: CardState.HIDING, backgroundColor: "lightskyblue" }
    ];

    this.state = { cards: this.shuffle(cards), noClick: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  handleNewGame() {
    let cards = this.state.cards.map(value => ({
      ...value,
      cardState: CardState.HIDING
    }));
    cards = this.shuffle(cards);
    this.setState({ cards });
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    };

    const foundCard = this.state.cards.find(c => c.id === id);

    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter(c => c.cardState === CardState.SHOWING);

    const ids = showingCards.map(c => c.id);

    if (
      showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor
    ) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);

      noClick = true;

      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({ cards: hidingCards, noClick: false });
        }, 1300);
      });
      return;
    }

    this.setState({ cards, noClick });
  }

  render() {
    const cards = this.state.cards.map(value => {
      return (
        <Card
          color={value.backgroundColor}
          cardState={value.cardState}
          onClick={() => this.handleClick(value.id)}
        />
      );
    });

    return (
      <div>
        <Navbar onNewGame={this.handleNewGame} />
        {cards}
      </div>
    );
  }
}

export default App;
