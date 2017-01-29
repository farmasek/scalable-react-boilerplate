import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as EpicActionCreators from './actions';
import styles from './index.module.scss';

import TextField from 'react-md/lib/TextFields';
// import Button from 'react-md/lib/Buttons/Button';

import { AppFooter } from 'components';
import { Card, CardTitle, CardText, CardActions } from 'react-md/lib/Cards';
import Button from 'react-md/lib/Buttons';


class EpicContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.epic}>

        This is basic example of rxjs epics.

        <TextField
         label="Find github user"
         className="md-cell md-cell--bottom"
          onChange={(text) => this.props.actions.fetchUserInfo(text)}
        />
        <pre>
          {this.props.userInfo}
        </pre>
         <Button raised primary label="Clear"
         onClick={() => this.props.actions.clearUserInfo()}>
         home
         </Button>
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
