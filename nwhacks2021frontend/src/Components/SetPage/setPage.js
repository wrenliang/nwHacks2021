import React from 'react';

import './setPage.css';
import ProfileIcon from './ProfileIcon.svg';
import PenIcon from './PenIcon.svg';
import ShareIcon from './ShareIcon.svg';
import StarIcon from './StarIcon.svg';
import YPenIcon from './YPenIcon.svg';


class IndividualCard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {edit: false};
      this.edit = this.edit.bind(this);
      this.edit2 = this.edit2.bind(this);
   }

   shouldComponentUpdate(nextProps, nextState){
      if(nextState.edit !== this.state.edit) {
         console.log(nextState);
         return true;
      }

      return false;
   }

   edit() {
      let e  = !this.state.edit;
      this.setState({edit: e});
   }

   edit2 () {
      const newText = document.getElementById('text').value;
      console.log(newText);
      let d = this.props.set; 

      for (let i = 0; i < d.cards.length; i++) {
         if(d.cards[i].term === this.props.term) {
            d.cards[i].definition = newText;
         }
      }

console.log(d);

      fetch('http://127.0.0.1:8000/sets', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         method: 'PUT',
          body: JSON.stringify(
             d
          )
      })

      this.edit();
   }

   render() {
      return(

         <div className="individualCard">
         <div className="Term">
                     <h1>{this.props.term}</h1>
                  </div>
         <div className="Definition">
            {this.state.edit && 
            <form>
               <textarea id="text">
                  {this.props.definition}
               </textarea>
            </form> 
            }

            {!this.state.edit && 
            <h1>{this.props.definition}</h1>
            }

            <div className="Icons"> 
               <img src={StarIcon} />

               {this.state.edit && 
                  <img src={YPenIcon} onClick={this.edit2} />
               }
               {!this.state.edit && 
                  <img src={PenIcon} onClick={this.edit} />
               }
            </div>
         </div>
         </div>
      )
   }
}

class CardList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {edit: false};
   }

   render() {
      return (
         <div>
            {this.props.data.map(card => {
               return (

                  <IndividualCard definition={card.definition} term={card.term} set={this.props.set}/>

               )
            })}
         </div>
      )
   }
         
}
class SetPage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {cards: this.props.location.state.cards, count: 1, cardState: "Term"};
      this.forwardCard = this.forwardCard.bind(this);
      this.backwardCard = this.backwardCard.bind(this);
      this.changeText = this.changeText.bind(this);
   }

   forwardCard = () => {
      let currCount = this.state.count + 1 > this.state.cards.length ? 1 : this.state.count + 1;
      let currCards = this.state.cards;
      let popCard = currCards.shift();
      currCards.push(popCard);
      this.setState({cards: currCards, count: currCount, cardState: "Term"});
   }

   backwardCard = () => {
      let currCount = this.state.count ===  1 ? this.state.cards.length : this.state.count - 1;
      let currCards = this.state.cards;
      let popCard = currCards.pop();
      currCards.unshift(popCard);
      this.setState({cards: currCards, count: currCount, cardState: "Term"});
   }

   changeText = () => {
      let currText = this.state.cardState;
      currText === "Term" ? this.setState({cardState: "Definition"}) : this.setState({cardState: "Term"});

   }


   render() {
      console.log(this.props.location.state);

      return (
         <div>
            <div className="header">
               <h1>WIREFRAME</h1>
            </div>
            <div className="setInfo">
               <h1>{this.props.location.state.title}</h1>
               <div className="creatorInfo">
                  <img src={ProfileIcon} />
                  <div>
                     <h3>Created By</h3>
                     <h2>{this.props.location.state.creatorId}</h2>
                  </div>
               </div>


               <div className="card" onClick={this.changeText}>
                  <h1 >{this.state.cardState === "Term" ? this.state.cards[0].term : this.state.cards[0].definition}</h1>
               </div>

               <div className="cardNav">
                  <h1 onClick={this.backwardCard} className="Arrow">{"<"}  &nbsp;</h1> 
                  <h1>{this.state.count} / {this.state.cards.length}</h1> 
                  <h1 onClick={this.forwardCard} className="Arrow"> &nbsp; {">"}</h1> 
               </div>
            </div>


            <div className="bottomHalf">
               <div className="cueCardsList">
                  <div className="listHeader">
                     <h1>All &nbsp;</h1>
                     <h2>&nbsp; Starred</h2>
                  </div>

                  <div class="list">
                     <CardList data={this.props.location.state.cards} set={this.props.location.state}/>

                  </div>
               </div>

            </div>


         </div>
      )
   }
}

export default SetPage;