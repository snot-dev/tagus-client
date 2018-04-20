import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TranslatesList from './components/translatesList';
import store from '../../services/store';
import {getListIfNedeed} from '../../services/translates/actions';

class Translates extends Component {
    componentDidMount() {
        store.dispatch(getListIfNedeed());
    }

    render() {
        return (
            <section id="translates" className="full-height col-xs-12">
                <TranslatesList name={this.props.name} list={this.props.translates.list} fetchingList={this.props.translates.fetchingList} savingList={this.props.translates.savingList} />
            </section>
        );
    }
}

Translates.propTypes = {
    name: PropTypes.string.isRequired,
    translates: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        translates: state.translates
    };
};
  
export default connect(mapStateToProps)(Translates);
