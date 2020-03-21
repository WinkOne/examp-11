import React, {Component} from 'react';
import '../../App.css'
import {Button, Col, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store/action/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayName: '',
        phone: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.registerUser({...this.state});
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <>
                <h2>Register new user</h2>
                <hr className="HRColor"/>
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('username')}
                        placeholder="Enter username"
                        autoComplete="new-username"
                    />
                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter password"
                        autoComplete="new-password"
                    />
                    <FormElement
                        propertyName="displayName"
                        title="Display Name"
                        type="displayName"
                        value={this.state.displayName}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('displayName')}
                        placeholder="Enter Display Name"
                        autoComplete="new-Display Name"
                    />
                    <FormElement
                        propertyName="phone"
                        title="Phone"
                        type="phone"
                        value={this.state.phone}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('phone')}
                        placeholder="Enter phone"
                        autoComplete="new-phone"
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit">
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError,
    loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);