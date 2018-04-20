import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import AddLink from '../../../../../../components/AddLink';
import TabField from './components/TabField';
import './tabContent.css';

class TabContent extends Component {
    _addFieldClick(tab) {
        return () => {
            this.props.addFieldClick(tab)
        }
    }

    renderFields () {
        return (
            <div className="col-xs-12 tagus-unit-fieldss">
                {this.props.tab.fields.map((field, index) => {
                    return(
                        <TabField onDeleteField={this.props.onDeleteField} onEditField={this.props.onEditField} tab={this.props.tab.alias} field={field} key={`${field.alias}_${index}`} />
                    );
                })}
                <AddLink onClick={this._addFieldClick(this.props.tab.alias)} className="text-cent" disabled={!!this.props.addingField || !!this.props.addingTab} text="Add a new Field" />
            </div>
        );
    }
  
    
    render() {
        return (
            <Tabs defaultActiveKey={0}  id={`tagus-unit-${this.props.tab.alias}`}  className="tagus-unit-tabs" >
                <Tab eventKey={0} title={`${this.props.tab.name}`} >                    
                    <div className="row tagus-form-control">    
                        <div className="col-xs-12 tagus-form-field">
                            <label className="tagus-label">Alias</label>
                            <p className="tagus-info">{this.props.tab.alias}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label className="tagus-label">Fields</label>
                            {this.renderFields()}
                        </div>
                    </div>
                </Tab>
            </Tabs>  
        );
    }
}

TabContent.propTypes = {
    addFieldClick: PropTypes.func,
    onEditField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    tab: PropTypes.object.isRequired,
    addingTab: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    addingField: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

export default TabContent;