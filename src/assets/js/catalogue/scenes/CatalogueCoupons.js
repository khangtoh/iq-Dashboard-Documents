import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import { } from '../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import CouponListContainer from '../containers/CouponListContainer';

class CatalogueCoupons extends Component {

  render() {
    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar
              title="Manage / Coupons"
              ctas={[(
                <button
                  className="btn btn-secondary btn-radius-lg btn-block"
                  type="button"
                  onClick={this.props.actions.openAddCouponModal}>
                  Add New Coupon
                </button>
              )]}/>
          );
        }}>
        <div className="container container--gutter">
          <CouponListContainer/>
        </div>
      </DefaultLayout>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      openAddCouponModal: _ => {
        dispatch(updateModalPath('createCoupon'));
        dispatch(updateModalData({
        }));
        dispatch(openModal());
      }
    }
  };
};

let DecoratedComponent = CatalogueCoupons;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;