import { useState } from 'react';
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
			<Modal isOpen={isOpen} onRequestClose={closeModal}>
				{children}
			</Modal>
		);
	};

	return [openModal, closeModal, ModalComponent];
};

export default useModal;
