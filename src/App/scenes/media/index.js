import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Gallery from './components/gallery';
import Panel from '../../components/Panel';
import Overlay from '../../components/Overlay';
import store from '../../services/store';
import {getMedia} from '../../services/media/actions';

class Media extends Component {
    componentDidMount() {
        store.dispatch(getMedia());
    }

    render() {
        return (
            <section id="media" className="col-xs-12 full-height">
                <Panel title={this.props.name} className="col-xs-12 full-height">
                    <Gallery images={this.props.media.list} uploadingMedia={this.props.media.uploadingMedia} />
                    <Overlay show={this.props.media.uploadingMedia || this.props.media.fetchingList || this.props.media.deletingMedia} />
                </Panel>
            </section>
        )
    }
}

Media.propTypes = {
    name: PropTypes.string.isRequired,
    media: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
      media: state.media
    };
  };
  
export default connect(mapStateToProps)(Media);