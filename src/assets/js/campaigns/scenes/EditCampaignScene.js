import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import Titlebar from 'app/common/components/layout/Titlebar';
import { loadCampaignCreatePage, selectBrand, selectCampaignType, resetCampaignCreate } from '../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

import CreateCampaignContainer from '../containers/CreateCampaignContainer';

import Steptracker from 'app/common/components/Steptracker';
import Avatar from 'app/common/components/Avatar';

class EditCampaign extends Component {
  componentDidMount() {
    this.props.actions.closeMenu();
  }

  componentWillUpdate(nextProps) {
  }

  render() {
    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <div className="container-fluid">
              <div className="row">
                <Titlebar className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-12">
                      <Avatar
                        src={' '}/>

                      <Avatar
                        icon={'icons8-settings'}/>

                      <h1>Edit Campaign</h1>
                      <Steptracker
                        steps={[
                          {
                            label: 'Step 1',
                            isActive: this.props.steptrackerStep === 0,
                            isPast: this.props.steptrackerStep > 0
                          },
                          {
                            label: 'Step 2',
                            isActive: this.props.steptrackerStep === 1,
                            isPast: this.props.steptrackerStep > 1
                          },
                          {
                            label: 'Step 3',
                            isActive: this.props.steptrackerStep === 2,
                            isPast: this.props.steptrackerStep > 2
                          }
                        ]}/>
                    </div>
                  </div>
                </Titlebar>
              </div>
            </div>
          );
        }}>
        <div className="container">
          <CreateCampaignContainer/>
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
      closeMenu: _ => {
        dispatch(updateUI(['scene', 'drawNav'], 'isOpen', false));
      },
      openAddBrandModal: _ => {
        dispatch(updateModalPath('addBrand'));
        dispatch(updateModalData({
        }));
        dispatch(openModal());
      }
    }
  };
};

let DecoratedComponent = EditCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'scene',
  state: {
  }
})(DecoratedComponent);

export default DecoratedComponent;