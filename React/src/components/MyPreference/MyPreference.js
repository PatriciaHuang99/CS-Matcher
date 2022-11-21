import "./MyPreference.css";

import React from "react";

import axios from "axios";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MyPreference_array from "./Arraylist";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const preferencelist = MyPreference_array();

// const userId = localStorage.getItem("userId"); // not good to get userId here, get it when it getUserPreference called

class MyPreference extends React.Component {
  state = {
    pk: 0,
    interest_out: "",
    interest_in: "",
    interest_leisure: "",
    purpose: "",
    gender: "",
    personality: "",
    language: "",
    priority1_interests_out: "",
    priority2_interests_in: "",
    priority3_interests_lei: "",
    priority4_purpose: "",
    priority5_trait: "",
    // gender_prefer: "",

    show_interest_out_error: false,
    show_interest_in_error: false,
    show_interest_leisure_error: false,
    show_purpose_error: false,
    show_gender_error: false,
    show_personality_error: false,
    show_language_error: false,
    show_priority1_interests_out_error: false,
    show_priority2_interests_in_error: false,
    show_priority3_interests_lei_error: false,
    show_priority4_purpose_error: false,
    show_priority5_trait_error: false,

    is_save: false,
  };

  //get the user preference
  getUserPreference = (e) => {
    const userId = localStorage.getItem("userId"); // get item userId from local storage
    console.log("getuser");
    axios
      .get(
        "http://0.0.0.0:8000/api/mypreference/get/post/" + // change 127.0.0.1 to 0.0.0.0
          userId +
          "?format=json"
      ) //mypreference_detail function api // use the userId from localStorage
      .then((res) => {
        console.log(res);
        this.setState(res.data); //res.data is an obj, can see in the console
      });
  };

  componentDidMount() {
    this.getUserPreference();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }); //key: value pair, if key is variable, use []
    console.log(this.state);
  };

  editUserPreference = (e) => {
    const userId = localStorage.getItem("userId"); // get item userId from local storage
    console.log("edituser");
    e.preventDefault();

    if (this.state.interest_out == "") {
      this.setState({ show_interest_out_error: true });
    }
    if (this.state.interest_in == "") {
      this.setState({ show_interest_in_error: true });
    }
    if (this.state.interest_leisure == "") {
      this.setState({ show_interest_leisure_error: true });
    }
    if (this.state.purpose == "") {
      this.setState({ show_purpose_error: true });
    }
    console.log(this.state.purpose);
    if (this.state.gender == "") {
      this.setState({ show_gender_error: true });
    }
    if (this.state.personality == "") {
      this.setState({ show_personality_error: true });
    }
    if (this.state.language == "") {
      this.setState({ show_language_error: true });
    }
    if (this.state.priority1_interests_out == "") {
      this.setState({ show_priority1_interests_out_error: true });
    }
    if (this.state.priority2_interests_in == "") {
      this.setState({ show_priority2_interests_in_error: true });
    }
    if (this.state.priority3_interests_lei == "") {
      this.setState({ show_priority3_interests_lei_error: true });
    }
    if (this.state.priority4_purpose == "") {
      this.setState({ show_priority4_purpose_error: true });
    }
    if (this.state.priority5_trait == "") {
      this.setState({ show_priority5_trait_error: true });
    }

    if (
      this.state.interest_out != "" &&
      this.state.interest_in != "" &&
      this.state.interest_leisure != "" &&
      this.state.purpose != "" &&
      this.state.gender != "" &&
      this.state.personality != "" &&
      this.state.language != "" &&
      this.state.priority1_interests_out != "" &&
      this.state.priority2_interests_in != "" &&
      this.state.priority3_interests_lei != "" &&
      this.state.priority4_purpose != "" &&
      this.state.priority5_trait != ""
    ) {
      axios
        .put(
          "http://0.0.0.0:8000/api/mypreference/delete/put/" + userId, //  update_mypreference function api
          this.state
        )
        .then(() => {
          this.resetState();
          Swal.fire({
            title: "Success!",
            text: "Congrat! You have entered all preferences",
            icon: "success",
            confirmButtonText: "Cool",
          });
        });

      this.setState(
        {
          show_interest_out_error: false,
          show_interest_in_error: false,
          show_interest_leisure_error: false,
          show_purpose_error: false,
          show_gender_error: false,
          show_personality_error: false,
          show_language_error: false,
          show_priority1_interests_out_error: false,
          show_priority2_interests_in_error: false,
          show_priority3_interests_lei_error: false,
          show_priority4_purpose_error: false,
          show_priority5_trait_error: false,
        },
        () => {
          this.setState({ is_save: true });
        }
      );
    }
  };

  resetState = () => {
    this.getUserPreference();
  };

  render() {
    return (
      <div>
        <h2>
          My Preference{" "}
          {this.state.show_interest_out_error ||
          this.state.show_interest_in_error ||
          this.state.show_interest_leisure_error ||
          this.state.show_purpose_error ||
          this.state.show_gender_error ||
          this.state.show_personality_error ||
          this.state.show_language_error ||
          this.state.show_priority1_interests_out_error ||
          this.state.show_priority2_interests_in_error ||
          this.state.show_priority3_interests_lei_error ||
          this.state.show_priority4_purpose_error ||
          this.state.show_priority5_trait_error ? (
            <span className="alert">*Please fill in all field</span>
          ) : (
            ""
          )}
        </h2>
        <Container>
          <Row>
            <Col>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <h6 className="subtitle">Favourite outdoor activities:</h6>

              <Form.Select
                className="select"
                //aria-label={this.state.interest_out} // default select for blind people
                type="text"
                name="interest_out"
                onChange={this.onChange}
                value={this.state.interest_out}
              >
                <>
                  {/* {console.log(preferencelist.interest_outdoor)} */}
                  <option value="">Favourite outdoor activities:</option>
                  {preferencelist.interest_outdoor.map(
                    (
                      data,
                      index // key (index) for improving efficiency in react
                    ) => (
                      <option value={data} key={data}>
                        {" "}
                        {/*data can be changed to index */}
                        {data}
                      </option> // not sure key and index here are correct
                    )
                  )}
                </>
              </Form.Select>

              <h6>Favourite indoor activities:</h6>
              <Form.Select
                className="select"
                type="text"
                name="interest_in"
                onChange={this.onChange}
                value={this.state.interest_in}
              >
                <>
                  <option value="">Favourite indoor activities:</option>
                  {preferencelist.interest_indoor.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Favourite leisure activities:</h6>
              <Form.Select
                className="select"
                type="text"
                name="interest_leisure"
                onChange={this.onChange}
                value={this.state.interest_leisure}
              >
                <>
                  <option value="">Favourite leisure activities:</option>
                  {preferencelist.interest_leisure.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>
            </Col>

            <Col>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <h6 className="subtitle">Purpose/Want to:</h6>

              <Form.Select
                className="select"
                type="text"
                name="purpose"
                onChange={this.onChange}
                value={this.state.purpose}
              >
                <>
                  <option value="">Purpose/Want to:</option>
                  {preferencelist.purpose_list.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Your gender:</h6>
              <Form.Select
                className="select"
                type="text"
                name="gender"
                onChange={this.onChange}
                value={this.state.gender}
              >
                <>
                  <option value="">Gender:</option>
                  {preferencelist.gender_list.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Your personality:</h6>
              <Form.Select
                className="select"
                type="text"
                name="personality"
                onChange={this.onChange}
                value={this.state.personality}
              >
                <>
                  <option value="">Personality:</option>
                  {preferencelist.personality_list.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Your language:</h6>
              <Form.Select
                className="select"
                aria-label={this.state.language}
                type="text"
                name="language"
                onChange={this.onChange}
                value={this.state.language}
              >
                <>
                  <option value="">Language:</option>
                  {preferencelist.language_list.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>
            </Col>
            <Col>
              <p className="priority">
                *Your matching priority{" "}
                <p className="small">
                  <br></br>3 = Very important <br></br>2 = Important <br></br>1
                  = Least important.
                </p>
              </p>

              <h6>Favourite outdoor activities priority:</h6>
              <Form.Select
                className="select"
                type="text"
                name="priority1_interests_out"
                onChange={this.onChange}
                value={this.state.priority1_interests_out}
              >
                <>
                  <option value="">Interest outdoor:</option>
                  {preferencelist.priority.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Favourite indoor activities priority:</h6>
              <Form.Select
                className="select"
                type="text"
                name="priority2_interests_in"
                onChange={this.onChange}
                value={this.state.priority2_interests_in}
              >
                <>
                  <option value="">Interest indoor:</option>
                  {preferencelist.priority.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Favourite leisure activities priority:</h6>
              <Form.Select
                className="select"
                type="text"
                name="priority3_interests_lei"
                onChange={this.onChange}
                value={this.state.priority3_interests_lei}
              >
                <>
                  <option value="">Interest leisure:</option>
                  {preferencelist.priority.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Purpose/Want to priority:</h6>
              <Form.Select
                className="select"
                type="text"
                name="priority4_purpose"
                onChange={this.onChange}
                value={this.state.priority4_purpose}
              >
                <>
                  <option value="">Purpose/Want to:</option>
                  {preferencelist.priority.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <h6>Your personality priority:</h6>
              <Form.Select
                className="select"
                type="text"
                name="priority5_trait"
                onChange={this.onChange}
                value={this.state.priority5_trait}
              >
                <>
                  <option value="">Personality:</option>
                  {preferencelist.priority.map((data, index) => (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  ))}
                </>
              </Form.Select>

              <Button
                className="button"
                onClick={this.editUserPreference}
                variant="outline-success"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Container>
        <p className="guidelinestopic">* MATCHING PRIORITY GUIDELINES</p>
        <p className="guidelines">
          Classify how important each of the matching preferences are to you.
          You can classify these using the following: <br></br>3 = Very
          important 2 = Important 1 = Least important. <br></br>
          <br></br>E.g. If your favourite indoor activity is yoga and you would
          like your partner to be interested in that too, you would classify it
          as 3. <br></br>If you have selected photography as a favourite leisure
          activity you enjoy but you aren’t concerned if you’re partner is
          interested in this, you would classify it as 1. You can use the same
          classification for multiple activities, traits and purpose. <br></br>
          <br></br>E.g. your ‘indoor interest’ and ‘leisure interest’ could both
          be classified as 3, whilst your ‘outdoor interest’ and ‘purpose’ could
          be classified as 2.
        </p>
        <p className="guidelinestopic">
          *Your language and gender will not be used to match you with a
          partner.
        </p>
        {this.state.is_save && <Navigate to="/" />}{" "}
        {/*In js <> call "jsx" not html */}{" "}
        {/*if is_save is true, show navigate, else show nothing */}
      </div>
    );
  }
}

export default MyPreference;
