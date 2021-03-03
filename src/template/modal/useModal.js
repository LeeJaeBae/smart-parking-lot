import { useRef, useState } from 'react';
import Modal from 'react-modal';

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => {
		setIsOpen(false);
	};

	const ModalComponent = ({ children }) => {
		return (
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
				style={{
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						minHeight: '250px',
					},
				}}>
				{children}
			</Modal>
		);
	};

	return [openModal, closeModal, ModalComponent];
};

export default useModal;
