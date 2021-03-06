import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import { Card, CardSection, Button } from './Common';


export default class LandingScreen extends Component {

  onSignInButtonPress() {
        Actions.signIn({ type: 'reset' });
     }
  onSignUpButtonPress() {
    Actions.signUp({ type: 'reset' });
  }
  

  render() {
     return (
             <Card>
            <CardSection>
                        <Text>please sign in </Text>
            </CardSection>
            <CardSection>
                          <Button onPress={this.onSignUpButtonPress.bind(this)}>
                               signup
                        </Button>
           </CardSection>
            <CardSection>
                        <Button onPress={this.onSignInButtonPress.bind(this)}>
                               signin
                         </Button>
             </CardSection >


             </Card>


       );
  }

}
