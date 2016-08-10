import React from 'react';
import Modal from 'app/modal/components/Modal';
import PreviewCoupon from '../molecules/PreviewCoupon';
import { ModalSizes } from '../../Constants';

const PreviewCouponModal = props => {
  return (
    <Modal
      size={ModalSizes.MEDIUM}
      isOpen={this.props.isOpen}
      onRequestClose={this.props.onCloseClick}>
      <div className="modal-content modal-content--hollow">
        <div className="modal-body">
          <PreviewCoupon/>

          <button type="button" className="btn btn-primary" onClick={this.props.onRestoreClick}>
            Close Preview
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewCouponModal;