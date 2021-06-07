import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/StudentDisplay.css";

function StudentDisplay({ user }) {
	return (
		<div className="studentData">
			<Card className="mx-auto text-center p-4">
				{user ? (
					<>
						<Card.Body className="text-left">
							<Card.Title className="text-center font-weight-bolder">{`${user.username}`}</Card.Title>
							<ListGroup className="list-group-flush text-left">
								<ListGroupItem>
									<FontAwesomeIcon icon="mail-bulk" className="mr-3" />

									<Card.Link
										href={`mailto:${user.email}`}
									>{`${user.email}`}</Card.Link>
								</ListGroupItem>
								<ListGroupItem>
									<FontAwesomeIcon icon="medal" className="mr-3" />
									{`${user.average}`}
								</ListGroupItem>
								<ListGroupItem>
									<FontAwesomeIcon icon="venus-mars" className="mr-3" />
									{`${user.gender}`}
								</ListGroupItem>
								<ListGroupItem>
									<FontAwesomeIcon icon="graduation-cap" className="mr-3" />
									{`${user.course}`}
								</ListGroupItem>
								<ListGroupItem>
									<FontAwesomeIcon icon="city" className="mr-3" />
									{`${user.address}`}
								</ListGroupItem>
							</ListGroup>
						</Card.Body>
					</>
				) : (
					<>
						<Card.Body className="no-student-card pt-5">
							Click on a student’s username to display its data
						</Card.Body>
					</>
				)}
			</Card>
		</div>
	);
}
export default StudentDisplay;
