import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Link from 'next/link';
import Header from '../components/header';

export default class extends React.Component {
  static async getInitialProps() {

    if(!process.browser) {
      const res =  await axios.get('http://api.football-data.org/v1/competitions/426/leagueTable');
      return {data : res.data }
    }
    else {
      return {data: JSON.parse(sessionStorage.getItem('fpl')) }
    }
  }

  componentDidMount() {
    !sessionStorage.getItem('fpl') ? sessionStorage.setItem('fpl', JSON.stringify(this.props.data)) : null;
  }
  render() {
    return (
      <div>
        <Header />
        <div className="center mw8 pa2">
          <h1 className="f1 lh-solid">Barclays Premier League</h1>
              <table className="ba br-2 b--black-10 pv2 ph3">
                <thead>
                  <tr>
                    <th className="pv2 ph3 tl f6 fw6 ttu">Position</th>
                    <th className="pv2 ph3 tl f6 fw6 ttu">Team</th>
                    <th className="pv2 ph3 tl f6 fw6 ttu">Points</th>
                    <th className="pv2 ph3 tl f6 fw6 ttu">Goals</th>
                    <th className="pv2 ph3 tl f6 fw6 ttu">Wins</th>
                    <th className="pv2 ph3 tl f6 fw6 ttu">Draws</th>
                    <th className="pv2 ph3 tl f6 fw6 ttu">Losses</th>
                    <th className="pv2 ph3 tl f6 fw6 ttu"></th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(this.props.data.standing, (standing, index) => {
                    return (
                        <tr key={index} className="striped--light-gray">
                          <td className="pv2 ph3 tl f6">{standing.position}</td>
                          <td className="pv2 ph3 tl f6">
                            <img className="mw-100 w-10" src={standing.crestURI} alt={standing.teamName}/>
                            <span className="f6 fw6 v-top mt3 dib pl3">{standing.teamName}</span>
                          </td>
                          <td className="pv2 ph3 tl f6">{standing.points}</td>
                          <td className="pv2 ph3 tl f6">{standing.goals}</td>
                          <td className="pv2 ph3 tl f6">{standing.wins}</td>
                          <td className="pv2 ph3 tl f6">{standing.draws}</td>
                          <td className="pv2 ph3 tl f6">{standing.losses}</td>
                          <td className="pv2 ph3 tl f6">
                            <Link href={`/details?id=${standing.position}`}>
                              <a className="link dim f6 tc underline-hover gray">More</a>
                            </Link>
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
        </div>
      </div>
    )}
}
