import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import * as AppContainerActionCreators from './actions';

// TODO  fix hot reloading console error..

class AppContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ReactHotLoader>
        <div>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </ReactHotLoader>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired, // eslint-disable-line
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = state => ({
  isMobile: state.app.isMobile, // example / unused
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    AppContainerActionCreators,
    dispatch,
  ),
});

const Container = AppContainer;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
