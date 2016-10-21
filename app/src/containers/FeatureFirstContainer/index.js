import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MyActions from './actions';

export class FeatureFirstContainer extends Component {
  constructor(props) {
    super(props);
    this.initiateLoading = this.initiateLoading.bind(this);
  }

  componentDidMount() {
    this.initiateLoading();
  }

  initiateLoading() {
    const {
      actions,
    } = this.props;
    actions.loadDataInitiation();
  }

  render() {
    const {
      isLoading,
    } = this.props;
    return (
      <div className={styles.container}>
        {isLoading ?
          <h1>LOADING...</h1>
          :
          <div>
            <h1>Hello from FeatureFirstContainer</h1>
          </div>
        }
      </div>
    );
  }
}

FeatureFirstContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// mapStateToProps :: {State} -> {Action}
const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

// mapDispatchToProps :: Dispatch Func -> {Actions}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MyActions, dispatch),
});

const StyledContainer = cssModules(FeatureFirstContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledContainer);
