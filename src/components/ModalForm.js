import { Button, Modal } from "react-bootstrap";
import StudentForm from "./StudentForm";
import { useState } from "react";
function ModalForm({ onStudentAdd }) {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		onStudentAdd();
	};
	const handleShow = () => setShow(true);

	return (
		<>
			<Button
				variant="primary"
				onClick={handleShow}
				className="mb-3 dark-blue-btn"
			>
				+ Add Student
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				centered={true}
			>
				<Modal.Header closeButton>
					<div>
						<Modal.Title>Student's Details</Modal.Title>
						<p>Hello! please fill in the student's details</p>
					</div>
				</Modal.Header>
				<Modal.Body>
					<StudentForm closeModalOnSubmit={handleClose} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ModalForm;
