import React from 'react';

import './setPage.css';
import img from './ProfileIcon.svg';


class SetPage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {cards: this.props.data.cards}
   }


   render() {
      return (
         <div>
            <div className="header">
               <h1>WIREFRAME</h1>
            </div>
            <div className="setInfo">
               <h1>{this.props.data.title}</h1>
               <div className="creatorInfo">
                  <img src={img} />
                  <div>
                     <h3>Created By</h3>
                     <h2>{this.props.data.creatorId}</h2>
                  </div>
               </div>


               <div className="card">
                  {/* NEED THIS TO RELY ON THE CURRENT STATE */}
                  <h1>{this.props.data.cards[0].term}</h1>

               </div>

               <div className="cardNav">
                  <h1>{"<"}  &nbsp;</h1> 
                  <h1>1 / {this.state.cards.length}</h1> 
                  <h1> &nbsp; {">"}</h1> 
               </div>
            </div>


            <div className="bottomHalf">
               <div className="cueCardsList">
                  <div className="listHeader">
                     <h1>All &nbsp;</h1>
                     <h2>&nbsp; Starred</h2>
                  </div>

                  <div class="list">
                     {this.props.data.cards.map(card => {
                        return (
                        <div>
                           <h1>{card.term}</h1>
                           <h1>{card.definition}</h1>

                        </div>
                        )
                     })}

                  </div>
               </div>

            </div>


         </div>
      )
   }
}

export default SetPage;