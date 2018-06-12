import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  YellowBox
} from "react-native";
import Custombutton from "./common/Custombutton";
import { connect } from "react-redux";
import * as actions from "../actions";
import DatePicker from "react-native-datepicker";
const today = new Date();
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

class TodoItemScreen extends Component {
  state = {
    term: "",
    date:
      today.getFullYear() +
      "-" +
      "0" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate()
  };
  //For Add Go Back
  goBack() {
    if (this.state.term === "") {
      alert("Add Some Task");
      return;
    }
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect(this.state.term, this.state.date);
  }

  // For UPdate Go Back

  UpdateGoBack() {
    if (this.state.term === "") {
      alert("Add Some Task");
      return;
    }
    const { navigation } = this.props;
    navigation.goBack();

    const item = this.props.navigation.getParam("packetName", "psdfadfaf");

    navigation.state.params.OnUpdate(this.state.term, item, this.state.date);
  }

  componentWillMount() {
    const itemId = this.props.navigation.getParam(
      "updateEdit",
      "alksjalkdjfdlkjgakfj"
    );
    const item = this.props.navigation.getParam("packetName", "psdfadfaf");

    if (itemId !== "alksjalkdjfdlkjgakfj") {
      this.setState({ term: item.name });
    }
  }
  componentWillReceiveProps() {}

  render() {
    const { navigate } = this.props.navigation;
    const itemId = this.props.navigation.getParam("updateEdit", "Bool");
    const TitleName = this.props.navigation.getParam(
      "packetName",
      "alksjalkdjfdlkjgakfj"
    );

    //this.props.addnewTodo.bind(this, this.state.term)

    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ term: text })}
          value={this.state.term}
          placeholder="Add Your Task Here"
          underlineColorAndroid={"transparent"}
        />

        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2018-06-01"
          maxDate="2018-06-30"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              marginBottom: 12,
              elevation: 3,
              backgroundColor: "tomato"
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />

        {itemId === true ? (
          <Custombutton onPressed={this.UpdateGoBack.bind(this)}>
            Update
          </Custombutton>
        ) : (
          <Custombutton onPressed={this.goBack.bind(this)}>Add</Custombutton>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    color: "white",
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: "center",
    width: 300
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#8D6E63"
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: "white",
    color: "orange",
    borderRadius: 15,
    fontWeight: "bold",
    alignContent: "center",
    padding: 10,
    paddingLeft: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 7
  }
});

export default connect(
  null,
  actions
)(TodoItemScreen);
