import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getContentListIfNeeded, getUnitsListIfNeeded} from '../../services/content/actions';
import {Route, Redirect} from 'react-router-dom';
import store from '../../services/store';
import ContentList from './components/contentList';
import ContentDetail from './components/contentDetail';
import CreateContent from './components/createContent';
import './content.css';

class Content extends Component {
    componentWillMount() {
        store.dispatch(getContentListIfNeeded());
        store.dispatch(getUnitsListIfNeeded());
    };

    render() {  
        return (
            <section id="content" className="col-xs-12 full-height">
                <ContentList name={this.props.name} fetchingList={this.props.content.fetchingList} savingContent={this.props.content.savingContent} history={this.props.history} url={this.props.match.url} units={this.props.content.units} list={this.props.content.treeList} editingContent={this.props.content.editingContent} />
                <Route exact path={`${this.props.match.url}/create/:id`} render={(props)=>( 
                    this.props.content.createUnit
                    ?   <CreateContent {...props} savingContent={this.props.content.savingContent} unit={this.props.content.createUnit} parent={this.props.content.editingContent}/>
                    :   <Redirect to={this.props.match.url}/>)} 
                />
                <Route exact={false}  path={`${this.props.match.url}/detail/:id`} render={(props)=>(<ContentDetail {...props} savingContent={this.props.content.savingContent} detail={this.props.content.detail} unit={this.props.content.units[this.props.content.detail.unitType]} />)} />
            </section>
        )
    }
}

Content.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    content: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
      content: state.content
    };
  };
  
  export default connect(mapStateToProps)(Content);