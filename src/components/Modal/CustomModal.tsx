import React from 'react'; 
import { Box, Modal, ModalProps } from '@mui/material';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: 10,
};

const CustomModal = (props: ModalProps) => {
	return (
		<Modal {...props}>
			<Box sx={style}>{props.children}</Box>
		</Modal>
	);
};

export default CustomModal;
