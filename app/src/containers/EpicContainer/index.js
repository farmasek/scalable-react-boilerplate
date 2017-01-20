import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as EpicActionCreators from './actions';
import styles from './index.module.scss';
import { Button } from 'react-toolbox/lib/button';
import { Input } from 'react-toolbox/lib/input';
import { AppFooter } from 'components';

class EpicContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.epic}>
        Write github user:
        <Input
          onChange={(text) => this.props.actions.fetchUserInfo(text)}
        />
        <pre>
          {this.props.userInfo}
        </pre>
        <Button
          icon='remove'
          label='Clean text'
          flat primary
          onClick={() => this.props.actions.clearUserInfo()}
        />
        <AppFooter/>
      </div>
    );
  }
}

EpicContainer.propTypes = {
  userInfo: PropTypes.string,
  actions: PropTypes.shape({
    fetchUserInfo: PropTypes.func,
    clearUserInfo: PropTypes.func,
  })
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  userInfo: state.githubReducer.get('userInfo'),
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    EpicActionCreators,
    dispatch
  ),
});

const Container = cssModules(EpicContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
