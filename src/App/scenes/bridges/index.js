import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {getBridgesListIfNeeded, getUnitsListIfNeeded} from '../../services/bridges/actions';
import store from '../../services/store';
import BridgeList from './components/bridgeList';
import BridgeDetail from './components/bridgeDetail';
import './bridges.css';

class Bridges extends Component {
    componentDidMount() {
        store.dispatch(getBridgesListIfNeeded());
        store.dispatch(getUnitsListIfNeeded());
    }

    render() {
        return (
            <section id="bridges" className="full-height col-xs-12">
                <BridgeList name={this.props.name} url={this.props.match.url} history={this.props.history} fetchingList={this.props.bridges.fetchingList} list={this.props.bridges.list} units={this.props.bridges.units} />
                <Route exact={false}  path={`${this.props.match.url}/detail/:id`} render={(props)=>(<BridgeDetail {...props} savingDetail={this.props.bridges.savingDetail} fetchingDetail={this.props.bridges.fetchingDetail} detail={this.props.bridges.detail} unit={this.props.bridges.units[this.props.bridges.detail.unitType]} />)} />
            </section>
        );
    }
}

Bridges.propTypes = {
    name: PropTypes.string.isRequired,
    bridges: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        bridges: state.bridges
    };
};
  
export default connect(mapStateToProps)(Bridges);