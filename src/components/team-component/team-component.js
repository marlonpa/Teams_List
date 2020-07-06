import React, { Component } from 'react';
import './team-component.css';

class TeamComponent extends Component {
    constructor(props) {
        super(props);
        this.team = this.props.team;
        this.teamIndex = this.props.teamIndex;

        this.state = {
            channelName: '',
            invalidInput: true,
        }
        this.addChannel = this.addChannel.bind(this)
        this.removeChannel = this.removeChannel.bind(this)
        
    }

    formValidation(value) {
        let regex = new RegExp("^[a-zA-Z][a-zA-Z0-9.,$;]+$");
        if (value && regex.test(value)) {
            this.setState({ invalidInput: false })
        } else {
            this.setState({ invalidInput: true })
        }
    }

    removeChannel(index) {
        this.props.removeChannel(this.teamIndex, index)
    }

    addChannel() {
        this.props.addChannel(this.teamIndex, this.state.channelName)
    }

   

    render() {
        return (
            <div>
                {
                    this.team &&
                    <div>
                        <span className="team-name">{this.team.name}</span>
                        
                        <span className="add-channel">
                            <input placeholder="Channel name" value={this.state.channelName} onChange={e => {
                                this.setState({ channelName: e.target.value })
                                this.formValidation(e.target.value)
                            }} />
                            <button disabled={this.state.invalidInput} onClick={this.addChannel}>&#8853;</button>
                        </span>
                    </div>
                }
                {
                    this.team &&
                    <ul className="one">
                        {this.team.channels && this.team.channels.map((channel, idx) => (
                            <li className="channel-name" key={idx}>
                                <span>{channel.name}</span>
                                <button onClick={() => this.removeChannel(idx)}>&#8854;</button>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        );
    }
}

export default TeamComponent;
