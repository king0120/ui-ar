import React, { FC } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images';

interface ILightboxModal {
  open: boolean;
  handleClose: () => void;
  images: { src: string }[];
  currentIndex?: number;
}
const styleFn = (styleObj: any) => ({ ...styleObj, zIndex: 100 })

const LightboxModal: FC<ILightboxModal> = (props) => {
  const { open, handleClose, images, currentIndex } = props
  return (
    <ModalGateway>
      {open ? (
        <Modal styles={{ blanket: styleFn, positioner: styleFn }} onClose={handleClose}>
          <Carousel
            views={images}
            currentIndex={currentIndex}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  )
}

export default LightboxModal