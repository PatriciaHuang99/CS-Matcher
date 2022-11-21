import Card from "react-bootstrap/Card";

function Instruction() {
  return (
    <div>
      <h2>Instruction</h2>
      <Card style={{ width: "32rem", margin: "10px auto" }}>
        <Card.Body>
          <Card.Text>
            <p style={{ fontSize: "large" }}>
              Welcome to CS Matcher, CS Matcher is an app that aims to help
              students on the Computer Science Conversion course make friends
              and socialise by matching students together based on their similar
              interests. By using the Stable Roommate algorithm, you will be
              matched with course partners who have similar interests to your
              own.
            </p>
            <br></br>
            You must: <br></br>
            <p style={{ color: "indianred" }}>
              * Set your profile and preference
            </p>
            You will: <br></br>* Get a pal every noon <br></br>
            <br></br>
            You can: <br></br>* Contact your partner by email <br></br>* Do
            Video and text chat in Teams (search for your partners by email)
            <br></br>
            <br></br>
            <p style={{ color: "indianred" }}>
              Important:<br></br>* Your partner information only exists for one
              day
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Instruction;
