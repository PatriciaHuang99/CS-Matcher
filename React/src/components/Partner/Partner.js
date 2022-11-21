import Figure from "react-bootstrap/Figure";

import Card from "react-bootstrap/Card";

import axios from "axios";
import React from "react";
import "./Partner.css";

import user from "./user.png";

class Today extends React.Component {
  state = {
    // info of partner: from partner users
    pk: 0,
    first_name: "",
    last_name: "",
    contact_email: "",
    intro: "",

    // info of partner: from chats in django, not sure if need chats pk, but need to figure out how to setstate pk
    chatA_id: "",
    chatB_id: "", // user + id
    schedule_time: "",
    date: "",
  };

  // get matching partner from chats

  getMyPartner = async (e) => {
    const userId = localStorage.getItem("userId"); // get item userId from local storage
    console.log("I am ", userId);
    let chatA_id = "user" + userId; // to get the record that chatA_id = userId (such as user28)
    console.log("type", typeof userId);
    console.log(chatA_id);
    console.log("getpartner");

    const res = await axios.get(
      "http://0.0.0.0:8000/api/today/get/" + chatA_id + "?format=json"
    ); //getMyPartner function api // use the userId from localStorage
    console.log(res.data, "getMyPartner");
    this.setState({
      chatA_id: res.data.chatA_id,
      chatB_id: res.data.chatB_id,
      schedule_time: res.data.schedule_time,
      date: res.data.date,
    });
    return res.data.chatB_id;
  }; // then get chatB_id

  getPartnerProfile = async (chatB_id) => {
    console.log("Hello", this.state.chatA_id);
    console.log("getPartnerProfile");

    let partnerId = chatB_id.replace("user", ""); // remove user in front of useid
    console.log(partnerId, "partnerId", chatB_id);
    let url =
      "http://0.0.0.0:8000/api/users/my-profile/" + partnerId + "?format=json";
    console.log(url);
    const res = await axios.get(url);

    this.setState({
      // here use res.data will fail, but not sure why
      first_name: res.data.first_name,
      last_name: res.data.last_name,
      contact_email: res.data.contact_email,
      intro: res.data.intro,
    });
    // .then((res) => {
    //   console.log(res);
    //   this.setState(res.data); //res.data is an obj
    // });
  };

  async componentDidMount() {
    console.log("componentDidMount");
    const chatB_id = await this.getMyPartner();

    await this.getPartnerProfile(chatB_id);

    console.log("I am sad", this.state.chatB_ID);
  }

  render() {
    return (
      <div>
        <h2>My Match</h2>
        <div className="person">
          <Figure style={{ margin: "10px auto" }}>
            <Figure.Image width={100} height={110} alt="171x180" src={user} />
          </Figure>

          <div>
            <Card style={{ width: "35rem", margin: "10px auto" }}>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <Card.Text className="mypartner_info">
                  Name:{" "}
                  <span className="mypartner_content">
                    {this.state.first_name} {this.state.last_name}
                  </span>
                  <br></br>
                  Email:{" "}
                  <span className="mypartner_content">
                    {this.state.contact_email}
                  </span>
                  <br></br>
                  Introduction:{" "}
                  <span className="mypartner_content">{this.state.intro}</span>
                </Card.Text>

                {/* <Card.Link href="#">Video chat Link</Card.Link>
          <Card.Link href="#">Text chat Link</Card.Link> */}
              </Card.Body>
            </Card>
          </div>
          <p className="msg">
            It's time to chat with your amazing match!!!<br></br>
          </p>
          <p>
            * Read the instructions carefully<br></br>* You could contact your
            match by Microsoft campus email<br></br>* (Recommendation) You could
            have video chat/ test chat by searching the email address in Teams
          </p>
          <p className="caution">
            Important: If you decide to meet with your match in person, please
            take necessary precautions as you would if you were meeting someone
            on any other friendship apps. <br></br>For example: Meet your match
            in a public space <br></br>Let your friends and family know who you
            are meeting
            <br></br>Use location services so that friends/family know where you
            are
          </p>
        </div>
      </div>
    );
  }
}

export default Today;
