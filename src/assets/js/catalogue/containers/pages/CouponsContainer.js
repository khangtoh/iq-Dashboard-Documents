import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui/transpiled';
import { catalogueLoadCouponPage } from '../../signals';
import { modalOpen } from 'app/modal/signals';
import AuthenticationRequiredContainer from 'app/common/containers/hoc/AuthenticationRequiredContainer';
import CouponsPage from '../../components/pages/Coupons';
import _ from 'lodash';
import { ModalPaths } from 'app/common/Constants';

class CouponsContainer extends Component {
  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    return (
      <CouponsPage {...this.props}/>
    );
  }
}

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      load: catalogueLoadCouponPage,
      modalOpen
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    actions: {
      ...dispatchProps.actions,
      ...ownProps.actions
    },
    onAddCouponClick: () => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.COUPON_CREATE
      });
    }
  });
};

let DecoratedComponent = CouponsContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
// DecoratedComponent = ui({
// })(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;