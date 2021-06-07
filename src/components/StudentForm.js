import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/StudentForm.css';

import GenderRb from "./GenderRb";
import ErrorMessages from "./ErrorMessages";

import { addStudent } from "../DAL/api";

function StudentForm({ closeModalOnSubmit }) {
	const [formData, setFormData] = useState({
		username: {
			value: "",
			errors: [],
			validations: {
				required: true,
				pattern: /.{2,}/,
				maxLength: 20

			},
		},
		email: {
			value: "",
			errors: [],
			validations: {
				required: true,
				pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				maxLength: 30
			},
		},
		address: {
			value: "",
			errors: [],
			validations: {
				required: true,
				pattern: /.{10,}/,
				maxLength: 50
			},
		},
		course: {
			value: "Select Course",
			errors: [],
			validations: {
				pattern: /^(?!.*Select Course).*$/,
				required: true,
			},
		},
		gender: {
			value: "",
			errors: [],
			validations: {
				required: true,
			},
		},
	});

	//utils
	function mergeObjs(obj1, obj2) {
		return {
			...obj1,
			...obj2,
		};
	}

	function updateFormData(updatedFormData) {
		setFormData(updatedFormData);
	}

	//on change
	const onInputValueChange = ({ target: { name, value } }) => {
		setFormData({
			...formData,
			[name]: {
				...formData[name],
				value: value,
			},
		});
	};

	//validations
	function validateInput({ target: { name, value } }, updatedData) {
		updatedData = (!updatedData || Object.keys(updatedData).length === 0) ? formData : updatedData;

		const newErrors = [];
		const { validations } = updatedData[name];

		if (!value && validations.required) {
			newErrors.push(`${name} is required`);
		} else if (validations.pattern && !validations.pattern.test(value)) {
			newErrors.push(`Invalid ${name} value`);
		}

		return {
			...updatedData,
			[name]: {
				...updatedData[name],
				value: value,
				errors: [...newErrors]
			}
		}
	};



	function onSubmitValidation(e) {
		e.preventDefault();

		let updatedFormData = {};
		for (let i = 0; i < e.target.length - 4; i++) {
			const target = e.target[i];
			updatedFormData = mergeObjs(
				updatedFormData,
				validateInput({ target }, updatedFormData)
			);
		}

		//seperate validation for gender because it consists 3 inputs (rb)
		updatedFormData = mergeObjs(
			updatedFormData,
			validateInput({ target: { name: 'gender', value: formData['gender'].value } }, updatedFormData)
		);

		updateFormData(updatedFormData);
		submitIfValid(updatedFormData);
	}

	function submitIfValid(updatedFormData) {
		const newStudent = {};
		for (const inputName in updatedFormData) {
			if (updatedFormData[inputName]["errors"].length > 0) {
				return false;
			}
			newStudent[inputName] = updatedFormData[inputName].value;
		}
		addStudent(newStudent);
		closeModalOnSubmit();
	}

	return (
		<Form onSubmit={onSubmitValidation}>
			<Form.Row>
				<Form.Group as={Col} controlId="formGridUsername">
					<Form.Label>Username</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="user" />
						</InputGroup.Text>
						<Form.Control
							type="text"
							placeholder="Enter Username"
							name="username"
							onChange={(e) => onInputValueChange(e)}
							onBlur={(e) => updateFormData(validateInput(e))}
							value={formData.username.value}
							maxLength={formData.username.validations.maxLength}
						/>
					</InputGroup>
					<ErrorMessages errors={formData.username.errors} />
				</Form.Group>

				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Email</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="mail-bulk" />
						</InputGroup.Text>
						<Form.Control
							type="text"
							placeholder="Enter Email"
							name="email"
							onChange={(e) => onInputValueChange(e)}
							onBlur={(e) => updateFormData(validateInput(e))}
							value={formData.email.value}
							maxLength={formData.email.validations.maxLength}
						/>
					</InputGroup>
					<ErrorMessages errors={formData.email.errors} />
				</Form.Group>
			</Form.Row>

			<Form.Group controlId="formGridAddress1">
				<Form.Label>Address</Form.Label>
				<InputGroup>
					<InputGroup.Text>
						<FontAwesomeIcon icon="city" />
					</InputGroup.Text>
					<Form.Control
						as="textarea"
						name="address"
						placeholder="Street, Number, City, Zip"
						onChange={(e) => onInputValueChange(e)}
						onBlur={(e) => updateFormData(validateInput(e))}

						value={formData.address.value}
						maxLength={formData.address.validations.maxLength}
					/>
				</InputGroup>
				<ErrorMessages errors={formData.address.errors} />
			</Form.Group>

			<Form.Row>
				<Form.Group as={Col} controlId="formGridCourse">
					<Form.Label>Course</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="graduation-cap" />
						</InputGroup.Text>
						<Form.Control
							as="select"
							name="course"
							value={formData.course.value}
							onChange={(e) => onInputValueChange(e)}
							onBlur={(e) => updateFormData(validateInput(e))}
						>
							<option>Select Course</option>
							<option>JavaScript</option>
							<option>React</option>
							<option>Angular</option>
						</Form.Control>
					</InputGroup>
					<ErrorMessages errors={formData.course.errors} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Gender</Form.Label>
					<div className="gender-rb">
						<GenderRb
							onRbChange={(e) => {
								onInputValueChange(e)
								updateFormData(validateInput(e))
							}}
						/>
					</div>
					<ErrorMessages errors={formData.gender.errors} />
				</Form.Group>
			</Form.Row>
			<Button className="col dark-blue-btn" variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);

}

export default StudentForm;
