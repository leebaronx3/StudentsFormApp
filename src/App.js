import "./utils/fontAwesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { useState } from "react";
import { getStudents, getStudentDetails } from "./DAL/api";

import { Container, Row, Col } from "react-bootstrap";
import StudentsTable from "./components/StudentsTable";
import StudentDisplay from "./components/StudentDisplay";
import ModalForm from "./components/ModalForm";

function App() {
	const [studentsList, setStudentsList] = useState(getStudents());
	const [shownStudent, setShownStudent] = useState(false);

	function showStudentDetails(id) {
		const studentToDisplay = getStudentDetails(id);
		if (studentToDisplay) {
			setShownStudent(studentToDisplay);
		}
	}

	function sortTable(order) {
		let sorted = [];
		if (order) {
			sorted = studentsList.sort((a, b) => (a.username < b.username ? -1 : 1));
		} else {
			sorted = studentsList.sort((a, b) => (b.username < a.username ? -1 : 1));
		}
		setStudentsList([...sorted]);
	}

	function updateTable() {
		setStudentsList([...getStudents()]);
	}

	return (
		<Container fluid>
			<Row>
				<header className="text-center w-100">
					<h1>Harvard University</h1>
					<h2>Students Management Interface</h2>
				</header>
			</Row>
			<Row>
				<Col sm={6} className="p-5 table-section">
					<h3>Class 101</h3>
					<ModalForm
						onStudentAdd={updateTable}
						className="justify-content-center"
					/>
					<StudentsTable
						students={studentsList}
						studentRowClick={showStudentDetails}
						sortTable={sortTable}
					/>
				</Col>
				<Col sm={6} className="p-5">
					<StudentDisplay user={shownStudent} />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
