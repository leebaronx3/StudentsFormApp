let students = [
	{
		id: 1,
		username: "KimK3x3",
		email: "kimi@gmail.com",
		address: "Beverly 2, LA 1111",
		course: "React",
		gender: "Female",
		average: 80,
	},
	{
		id: 2,
		username: "Jsonx2",
		email: "jsx2@gmail.com",
		address: "Kalawala 2, Honolulu 33321",
		course: "JavaScript",
		gender: "Male",
		average: 85,
	},
	{
		id: 3,
		username: "NanaB4",
		email: "nb31@gmail.com",
		address: "Vally 2, SF 336447A",
		course: "Angular",
		gender: "Female",
		average: 95,
	},
	{
		id: 4,
		username: "nomad3",
		email: "nomno@gmail.com",
		address: "52 St New York USA 88746628200472",
		course: "React",
		gender: "Male",
		average: 90,
	},
];

const getStudents = () => {
	if (localStorage.getItem("students")) {
		students = JSON.parse(localStorage.getItem("students"));
	}
	return students;
};

const addStudent = (newStudent) => {
	newStudent.id = students.length + 1;
	newStudent.average = Math.floor(Math.random() * (101 - 55) + 55);
	students.push(newStudent);
	localStorage.setItem("students", JSON.stringify(students));
};

const getStudentDetails = (studentId) => {
	return students.find((user) => user.id === studentId);
};

export { getStudents, addStudent, getStudentDetails };
