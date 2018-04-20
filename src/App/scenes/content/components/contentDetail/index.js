import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {getContentDetailIfNeeded, saveContent} from '../../../../services/content/actions';
import {Tabs, Tab} from 'react-bootstrap';
import Overlay from '../../../../components/Overlay';
import Panel from '../../../../components/Panel';
import Form from '../../../../components/Form';
import Properties from './components/properties'
import Preview from './components/preview'
import store from '../../../../services/store';
import './contentDetail.css';

class ContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            disabled: true
        };
    }
    
    componentDidMount() {
        if(this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(this.props.match.params.id));
        }
    }
    
    shouldComponentUpdate(props) {
        const hasNeededContent = props.detail && props.unit && this.props.match.params.id === props.detail._id && props.unit._id;
        const processingSave = props.savingContent !== this.props.savingContent;
        
        return hasNeededContent || processingSave;
    }
    
    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(newProps.match.params.id));
            this.setState({
                disabled: true
            });
        }
    }
    
    onSubmitContent(formValues) {
        const updatedContent = _.cloneDeep(this.props.detail); 
        updatedContent.content = Object.assign(updatedContent.content, formValues);

        this.setState({
            disabled: true
        });

        store.dispatch(saveContent(updatedContent));
    }
    
    onSubmitProperties(formValues) {
        const newContent = Object.assign(this.props.detail, formValues.properties);
        store.dispatch(saveContent(newContent));
    }

    _handleTabchange(key) {
        this.setState({
            key,
            disabled: true
        });
    }

    _onFieldChange() {
        if (this.state.disabled) {
            this.setState({
                disabled: false
            });
        }
    }

    _getPropertiesDefaultValues() {
        const defaultValues = {};

        for(const field of this.propertiesFields) {
            defaultValues[field.alias] = this.props.detail[field.alias];
        }

        return defaultValues;
    }

    _renderTabs(tabs) {
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange.bind(this)} id="tagus-content-tabs">
                {tabs.map((tab, index) => (
                        <Tab eventKey={index} title={tab.name} key={`${this.props.detail._id}_${tab.alias}_${index}`}>
                            <Form onChange={this._onFieldChange.bind(this)} disabled={this.state.disabled} onSubmit={this.onSubmitContent.bind(this)} name={tab.alias} defaultValues={this.props.detail.content[tab.alias]} fields={tab.fields} />
                        </Tab>
                    ))
                }
                <Tab eventKey={tabs.length} key={`${this.props.detail._id}_Properties_${tabs.length}`} title='Properties'>
                    <Properties disabled={this.state.disabled} onChange={this._onFieldChange.bind(this)} detail={this.props.detail} unit={this.props.unit} onSubmit={this.onSubmitProperties.bind(this)} />
                </Tab>
            </Tabs>
        )
    }
    
    render() {
        console.warn(this.props);
        return (
            <Panel title={this.props.detail.name} className="col-xs-12 col-sm-8 full-height">
                <Preview id={this.props.detail._id} />
                {
                    this.props.unit
                    ? this._renderTabs(this.props.unit.tabs)
                    : null
                }
                <Overlay show={this.props.savingContent}/>
            </Panel>  
        );
    };
}

ContentDetail.propTypes = {
    detail: PropTypes.object.isRequired,
    savingContent: PropTypes.bool.isRequired,
    unit: PropTypes.object
};

export default ContentDetail;