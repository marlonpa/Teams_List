import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
    constructor(props) {
        super(props);
        this.teams = [];
        this.teams.push({
            name: 'Team1',
            channels: [{
                name: 'Channel1',
                index: 1
            },
            {
                name: 'Channel2',
                index: 2
            }]
        });
        this.teams.push({
            name: 'Team2',
            channels: [{
                name: 'Channel1',
                index: 1
            },
            {
                name: 'Channel2',
                index: 2
            }]
        });
        this.state = {
            teams: this.teams,
            teamName: '',
            validar: false
        };

        this.addTeam = this.addTeam.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.removeChannel = this.removeChannel.bind(this)
        
    }

    formValidation(value) {
        let regex = new RegExp("^[a-zA-Z][a-zA-Z0-9.,$;]+$");

        if (value && regex.test(value)) {
            this.setState({ validar: false })
        } else {
            this.setState({ validar: true })
        }
    }

    onChangeInput= (e) => {
        this.setState({
            [e.target.name]: e.target.value }
            )
        
    }

    addTeam(e) {
        e.preventDefault()
        
        if(this.state.teamName.trim()!==''){
            const new_team = {
                name: this.state.teamName,
                channels: []
            }
    
            this.setState(State => {
                return {
                    ...State,
                    teams: [
                        ...State.teams,
                        new_team
                    ]
                }
            })

        }else{
            console.log("vacio")
        }
       
    }

    addChannel(teamIndex, channelName) {
        this.setState(State => {
            return {
                ...State,
                teams: State.teams.map((team, index) => {
                    if (index === teamIndex) {
                        team.channels.push({
                            name: channelName,
                            index: team.channels.length + 1
                        })
                    }
                    return team
                })
            }
        })
    }

    removeChannel(teamIndex, index) {
        this.setState(prevState => {
            return {
                ...prevState,
                teams: prevState.teams.map((team, i) => {
                    if (i === teamIndex) {
                        team.channels.splice(index, 1)
                    }
                    return team
                })
            }
        })
    }

    

    render() {
        return (
            <div>
                <div className="teams-list">
                    <ul>
                        {this.state.teams && this.state.teams.map((team, idx) => (
                            <li key={idx}>
                                <TeamComponent team={team} teamIndex={idx} addChannel={this.addChannel} removeChannel={this.removeChannel}  />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="add-team">
                    <b>Add Team</b>
                    <input placeholder="Team name" value={this.teamName} name="teamName" onChange={this.onChangeInput}/>
                    <button disabled={this.state.validar} onClick={this.addTeam}>&#8853;</button>
                </div>
            </div>
        );
    }
}

export default TeamList;