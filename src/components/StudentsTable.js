import { useState } from "react";
import Table from "react-bootstrap/Table";
import "../css/StudentsTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StudentsTable({ studentRowClick, sortTable, students }) {
	const propsToShow = ['username', 'course', 'average'];

	const [sortDown, setSortDown] = useState(true);
	function createSortBtn() {
		return <button
			className="sort-btn"
			onClick={(e) => {
				sortTable(sortDown, e);
				setSortDown(!sortDown);
			}}
		>
			{sortDown && <FontAwesomeIcon icon="sort-alpha-down" />}
			{!sortDown && <FontAwesomeIcon icon="sort-alpha-up" />}
		</button>
	}

	return (
		<div>
			<Table responsive hover className="table-sm">
				<thead>
					<tr>
						{propsToShow.map((prop, index) => {
							return (
								<th key={index}>
									{`${prop[0].toUpperCase()}${prop.slice(1)}`}
									{prop === "username" ?
										createSortBtn()
										: null}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className="scrollingTable" style={{ height: "100px" }}>
					{students.map((student, index) => {
						return (
							<tr key={index} onClick={() => studentRowClick(student.id)}>
								{propsToShow.map((prop, index) => (
									<td key={index} >
										{student[prop]}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
export default StudentsTable;
