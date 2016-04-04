import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicDetailsForm from '../components/forms/BasicDetailsForm';
import ui from 'redux-ui/transpiled';
import { reduxForm } from 'redux-form';
import { openModal, updateModalPath } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: (e) => {
      ownProps.updateUI('step', ownProps.ui.step - 1);
    },

    onSubmit: (...args) => {
      ownProps.updateUI('step', ownProps.ui.step + 1);
    }
  };
};

const fields = ['campaignTitle', 'magazineLanguage', 'campaignPeriodFrom', 'campaignPeriodTo', 'defaultTarget'];

let DecoratedComponent = BasicDetailsForm;
DecoratedComponent = reduxForm({
  form: 'campaignPrintBasicDetails',
  fields
})(DecoratedComponent);
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);


export default DecoratedComponent;