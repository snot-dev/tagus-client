import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import List from '../../../../components/List';
import Panel from '../../../../components/Panel';
import ListItem from '../../../../components/ListItem';
import Modal from '../../../../components/Modal';
import AddLink from '../../../../components/AddLink';
import CreateBridgeMenu from './components/createBridgeMenu';
import Overlay from '../../../../components/Overlay';
import store from '../../../../services/store';
import {createBridge, deleteBridge} from '../../../../services/bridges/actions';
import './bridgeList.css';

class BridgeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingBridge: null,
            deleteBridge: null
        };
    }

    _toggleDeleteModal(id) {
        return() => {
            this.setState({
                deleteBridge: id
            });
        };
    }

    _toggleCreatingBridge(state) {
        return () => {
            this.setState({
                creatingBridge: state
            });
        }
    }

    _deleteBridge() {
        store.dispatch(deleteBridge(this.state.deleteBridge));
        this.setState({
            deleteBridge: null
        });

        this.props.history.push(this.props.url);
    }

    _onSubmitCreatingBridge(values) {
        this.setState({
            creatingBridge: null
        });

        this.props.history.push(this.props.url);
        store.dispatch(createBridge(values.newBridge));
    }

    render() {
        const menu = [
            <CreateBridgeMenu key="createBridge" units={this.props.units}  show={!!this.state.creatingBridge} onClose={this._toggleCreatingBridge(false)} onSubmit={this._onSubmitCreatingBridge.bind(this)} />
        ];

        return (
            <Panel title={this.props.name} className="col-xs-12 col-sm-4 full-height" menu={menu}>
                <List id="tagus-bridges-list" className="tagus-bridges-list">
                    {this.props.list && this.props.list.length > 0
                    ?   this.props.list.map((bridge, key) => {
                            return (
                                <ListItem key={`${bridge._id}_${key}`} className="tagus-bridges-list-item">
                                    <NavLink to={`${this.props.url}/detail/${bridge._id}`} activeClassName="active" className="tagus-list-item-link">
                                        <i className={`fa fa-file`} aria-hidden="true"></i>{bridge.name}
                                    </NavLink>
                                    <div onClick={this._toggleDeleteModal(bridge._id)} className="tagus-bridges-list-delete">
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </div>
                                </ListItem>
                            );
                        })
                    :   null}
                </List>
                <AddLink text="Create new Bridge" disabled={this.state.creatingBridge} onClick={this._toggleCreatingBridge(true)} />
                <Overlay show={this.props.savingDetail || this.props.fetchingList || this.props.fetchingDetail}/>
                <Modal type='warning' show={!!this.state.deleteBridge} title="Warning!" body={"Are you sure you want to DELETE PERMANENTLY this bridge?"} closeButton={{onClick: this._toggleDeleteModal(false), text: "Cancel"}} confirmButton={{onClick:this._deleteBridge.bind(this), text: "Yes, I'm sure!"}} />
            </Panel>
        );
    }
}

BridgeList.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    fetchingList: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    units: PropTypes.object.isRequired
};

export default BridgeList;