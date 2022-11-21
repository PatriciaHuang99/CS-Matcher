import { Figure } from "react-bootstrap";
import React from "react";

import {
  Modal,
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import axios from "axios";

import "./MyProfile.css";
import user_raw from "./user_raw.png";

import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

// const userId = localStorage.getItem("userId"); // not put here

class MyProfile extends React.Component {
  state = {
    pk: 0,
    first_name: "",
    last_name: "",
    contact_email: "",
    intro: "",
    is_open: false,

    editing_first_name: "",
    editing_last_name: "",
    editing_contact_email: "",
    editing_intro: "",

    show_first_name_error: false,
    show_last_name_error: false,
    show_contact_email_error: false,
    show_contact_student_email_error: false,

    is_send: false,
  };

  // not used
  defaultIfEmpty = (value) => {
    return value === "" ? "" : value; // if sth before ? is true, return sth before :, vise versa // ===compare
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }); //if key is variable, use []
  };

  editUser = (e) => {
    const userId = localStorage.getItem("userId"); // get item userId from local storage
    console.log(123);
    e.preventDefault();
    if (this.state.editing_first_name == "") {
      this.setState({ show_first_name_error: true });
    }
    if (this.state.editing_last_name == "") {
      this.setState({ show_last_name_error: true });
    }
    if (this.state.editing_contact_email == "") {
      this.setState({ show_contact_email_error: true });
    }
    if (!this.state.editing_contact_email.includes("@student.bham.ac.uk")) {
      this.setState({ show_contact_student_email_error: true });
    }
    if (
      this.state.editing_first_name != "" &&
      this.state.editing_last_name != "" &&
      this.state.editing_contact_email != "" &&
      this.state.editing_contact_email.includes("@student.bham.ac.uk")
    ) {
      axios
        .put(
          "http://0.0.0.0:8000/api/users/my-profile/delete/put/" + userId,
          //this.state
          {
            first_name: this.state.editing_first_name,
            last_name: this.state.editing_last_name,
            contact_email: this.state.editing_contact_email,
            intro: this.state.editing_intro,
            pk: this.state.pk,
          }
        )
        .then(() => {
          this.resetState();
          this.toggle();
          // success alert
          Swal.fire({
            title: "Success!",
            text: "Congrat! You have completed your profile.\n Next step, set your preference",
            icon: "success",
            confirmButtonText: "Cool",
          });
        })
        .catch((e) => {
          Swal.fire({
            title: "error!",
            text: "Oops...there's something wrong with your edit",
            icon: "error",
            confirmButtonText: "Got it",
          });
        });

      this.setState({ show_first_name_error: false });
      this.setState({ show_last_name_error: false });
      this.setState({ show_contact_email_error: false });
      this.setState({ show_contact_student_email_error: false });

      this.setState({ is_send: true });
    }
  };

  toggle = () => {
    this.setState((previous) => ({
      is_open: !previous.is_open,
    }));
  };

  getUser = (e) => {
    const userId = localStorage.getItem("userId"); // get item userId from local storage
    axios
      .get(
        "http://0.0.0.0:8000/api/users/my-profile/" + userId + "/?format=json"
      )
      .then((res) => {
        console.log(res);
        this.setState({
          ...res.data, // ... = copy, cannot put object (res.data) in an object, transfer res.data into key and value pairs
          editing_first_name: res.data.first_name,
          editing_last_name: res.data.last_name,
          editing_contact_email: res.data.contact_email,
          editing_intro: res.data.intro,
        }); //res.data is an obj
      });
  };

  resetState = () => {
    this.getUser();
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div className="myprofile">
        <h2>My Profile</h2>
        <div className="person">
          {" "}
          {/*  */}
          <Figure>
            <Figure.Image
              width={90}
              height={80}
              alt="171x180" // if image not show, then show the alt (alternative) text
              src={user_raw}
            />
            <Figure.Caption></Figure.Caption>
          </Figure>
        </div>
        <p className="myprofile_info">
          Name:{" "}
          <span className="myprofile_content">
            {this.state.first_name} {this.state.last_name}
          </span>{" "}
        </p>{" "}
        {/*span: won't change line*/}
        <p className="myprofile_info">
          Email:{" "}
          <span className="myprofile_content">{this.state.contact_email}</span>
        </p>
        <form>
          <div class="form-group">
            <p for="exampleFormControlTextarea1" className="myprofile_info">
              * Introduction{" "}
              <span className="lessthan50">(&gt; 30 words):</span>
              <br></br>
              <p className="myprofile_content">{this.state.intro}</p>
            </p>
          </div>
        </form>
        <Button
          variant="outline-success"
          onClick={() => this.toggle()}
          className="editbutton"
        >
          Edit
        </Button>
        <Modal isOpen={this.state.is_open} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit</ModalHeader>

          <ModalBody>
            <Form onSubmit={this.editUser}>
              <p className="label">Please read carefully:</p>
              <p className="textone">
                Your profile introduction is your chance to describe your
                personality, academic interests and hobbies in detail so that
                potential course matches can learn more about you. You can also
                explain why you have decided to use the app.
              </p>
              <p className="texttwo">
                A good profile introduction increases your chance of being
                contacted by your match. Please note that an incomplete profile
                or a introduction with insufficient detail will not be matched.
              </p>
              <p className="textthree">
                Here is an example of a good introduction: <br></br>Hello, nice
                to meet you! My name is Patricia and I am from Taiwan. Some of
                my friends are going back to their home countries soon and
                therefore I hope to meet people and make more friends! My
                interests consist of exercise and sport like badminton and
                swimming. In my leisure time, I like to spend time with my
                friends having afternoon tea, picnics and just generally having
                fun. When I have some days off I love travelling and exploring
                different cultures. I am starting LeetCode and would love to
                meet someone who is also doing this.
              </p>
              <FormGroup>
                {/* one formgroup is one input field in form */}
                <Label for="first_name" className="label">
                  First_name:{" "}
                  {/* if value before && is true than do the action after && */}
                  {this.state.show_first_name_error && (
                    <span className="alert">*Please enter your first name</span>
                  )}
                </Label>
                <Input
                  type="text"
                  name="editing_first_name"
                  onChange={this.onChange}
                  value={this.defaultIfEmpty(this.state.editing_first_name)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="last_name" className="label">
                  Last_name:{" "}
                  {this.state.show_last_name_error && (
                    <span className="alert">*Please enter your last name</span>
                  )}
                </Label>
                <Input
                  type="text"
                  name="editing_last_name"
                  onChange={this.onChange}
                  value={this.defaultIfEmpty(this.state.editing_last_name)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="contact_email" className="label">
                  Student email: (@student.bham.ac.uk)
                  {this.state.show_contact_email_error && (
                    <span className="alert">*Please enter contact email</span>
                  )}
                  {!this.state.show_contact_email_error &&
                    this.state.show_contact_student_email_error && (
                      <span className="alert">
                        <br></br>*Please enter student email
                      </span>
                    )}
                </Label>
                <Input
                  type="email"
                  name="editing_contact_email"
                  onChange={this.onChange}
                  value={this.defaultIfEmpty(this.state.editing_contact_email)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="intro" className="label">
                  Introduction: (&gt; 30 words)
                </Label>
                <Input
                  type="textarea"
                  name="editing_intro"
                  onChange={this.onChange}
                  value={this.defaultIfEmpty(this.state.editing_intro)}
                />
              </FormGroup>
              <Button>Send</Button>
            </Form>
          </ModalBody>
        </Modal>{" "}
        <br></br>
        {this.state.is_send && <Navigate to="/my-preference" />}
      </div>
    );
  }
}

export default MyProfile;
