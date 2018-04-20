import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Panel from '../../components/Panel';
import Overlay from '../../components/Overlay';
import Button from '../../components/Button';
import ProfileForm from './components/profileForm';
import PasswordForm from './components/passwordForm';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changingPassword: false
        };
    }

    togglePassword() {
        this.setState({
            changingPassword: !this.state.changingPassword
        });
    }

    render() {
        const buttonString = this.state.changingPassword ? 'Back' : 'Change Password';
        return (
            <section id="profile" className="full-height col-xs-12">
                <Panel className="col-xs-12 col-sm-6" title={this.props.name}> 
                {this.state.changingPassword
                ?   <PasswordForm user={this.props.profile.user} />
                :   <ProfileForm user={this.props.profile.user} />}
                    
                <div className="col-xs-12">
                    <Button onClick={this.togglePassword.bind(this)} className="tagus-profile-change-password">{buttonString}</Button>
                </div>
                <Overlay show={this.props.profile.savingUser} />
                </Panel>
            </section> 
        );
    }
}

Profile.propTypes = {
    name: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
      profile: state.profile
    };
  };
  
export default connect(mapStateToProps)(Profile);