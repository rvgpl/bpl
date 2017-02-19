import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import _ from 'lodash';
import Header from '../components/header';

export default class extends React.Component {
  static async getInitialProps({query}) {
    const id = query.id;

    if(!process.browser) {
      //On Server
      const res =  await axios.get('http://api.football-data.org/v1/competitions/426/leagueTable');
      return {
        data: res.data,
        standing: _.filter(res.data.standing, (standing) => standing.position == id)
      }
    }
    else {
      const fplData = JSON.parse(sessionStorage.getItem('fpl'));
      return  {
        standing : _.filter(fplData.standing, (standing) => standing.position == id)
      }
    }
  }
  componentDidMount() {
    !sessionStorage.getItem('fpl') ? sessionStorage.setItem('fpl', JSON.stringify(this.props.data)) : null;
  }
  render() {
      return(
        <div>
          <Header />

          <div className="mw8 center">
             <div className="w-100 overflow-hidden">
               <div className="fl w-30 pa2 mt4">
                 <img src={this.props.standing[0].crestURI} className="mw5" alt={this.props.standing[0].teamName} />
               </div>
               <div className="fl w-70 pa4 mt4">
                 <h1 className="f1 lh-solid">{this.props.standing[0].teamName}</h1>
                 <h3 className="f3 lh-solid">Points: {this.props.standing[0].points}</h3>
               </div>
             </div>

                 <ul className="list pl0 mt5">
                     <li className="pv3 bb b--black-10">
                       <span className="f3 fw6 pa3">Goals</span>
                       <span className="f3 pa3">{this.props.standing[0].goals}</span>
                     </li>
                     <li className="pv3 bb b--black-10">
                       <span className="f3 fw6 pa3">Wins</span>
                       <span className="f3 pa3">{this.props.standing[0].wins}</span>
                     </li>
                     <li className="pv3 bb b--black-10">
                       <span className="f3 fw6 pa3">Lossess</span>
                       <span className="f3 pa3">{this.props.standing[0].losses}</span>
                     </li>
                     <li className="pv3 bb b--black-10">
                       <span className="f3 fw6 pa3">Draws</span>
                       <span className="f3 pa3">{this.props.standing[0].draws}</span>
                     </li>
                     <li className="pv3 bb b--black-10">
                       <span className="f3 fw6 pa3">Goals Against</span>
                       <span className="f3 pa3">{this.props.standing[0].goalsAgainst}</span>
                     </li>
                     <li className="pv3 bb b--black-10">
                       <span className="f3 fw6 pa3">Goal Difference</span>
                       <span className="f3 pa3">{this.props.standing[0].goalDifference}</span>
                     </li>
                     <li className="pv3 bb b--black-10">
                       <span className="f3 fw6 pa3">Played</span>
                       <span className="f3 pa3">{this.props.standing[0].playedGames}</span>
                     </li>
                 </ul>

           <Link href="/">
             <a className="db cf link dim f5 ttu tc fw6"> 🔙 Home</a>
           </Link>
         </div>
      </div>
      )
  }
}
