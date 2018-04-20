import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabContent from '../TabContent';
import './tabList.css';

class TabsList extends Component {
    _onEditClick(tab) {
        return () => {
            this.props.onEditTab(tab);
        }
    }

    _onDeleteClick(tab) {
        return () => {
            this.props.onDeleteTab(tab)
        }
    }


    renderTabOptions(tab) {
        if(tab.alias !== 'default') {
            return (
                <div className="tagus-unit-tab-options">
                        <a onClick={this._onEditClick(tab)} className="tagus-unit-tab-option tagus-unit-field-edit-button">
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </a>
                        <a onClick={this._onDeleteClick(tab)} className="tagus-unit-tab-option tagus-unit-field-edit-button">
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </a>
                </div>
            );
        } 
        else {
            return null;
        }
    }

    render(){
        return (
            <div className="row tagus-form-control">
                {this.props.tabs.map((tab, index) => {
                    return (
                        <div className="col-xs-12 tagus-unit-tab-container" key={`${tab.alias}_${index}`}>
                            {index > 0 ? this.renderTabOptions(tab) : null}
                            <TabContent onDeleteField={this.props.onDeleteField} onEditField={this.props.onEditField} addFieldClick={this.props.addFieldClick} addingFieldTab={this.props.addingFieldTab} addingTab={this.props.addingTab} tab={tab} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

TabsList.propTypes = {
    tabs: PropTypes.array.isRequired,
    onDeleteTab: PropTypes.func.isRequired,
    onEditTab: PropTypes.func.isRequired,
    addingTab: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    onDeleteField: PropTypes.func.isRequired,
    onEditField: PropTypes.func.isRequired,
    addFieldClick: PropTypes.func.isRequired
};

export default TabsList;