import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Redirect} from "react-router-dom";
import {addGoods} from "../../store/action/goodsActions";
import {fetchCategories} from "../../store/action/categoriesActions";

class AddGoods extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        price: '',
        categories: ''
    };
    componentDidMount() {
        this.props.fetchCategories()
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });

        this.props.addGoods(formData);
    };

    render() {
        if (!this.props.user) {
            return <Redirect to='/login'/>
        } else {
            return (
                <Container>
                    <h1>Add Goods</h1>
                    <hr className="HRColor"/>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input onChange={this.inputChangeHandler}
                                   type="text"
                                   name="title"
                                   id="title"
                                   placeholder="with a placeholder"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Text</Label>
                            <Input onChange={this.inputChangeHandler}
                                   type="textarea"
                                   name="description"
                                   id="description"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input onChange={this.inputChangeHandler}
                                   type="number"
                                   name="price"
                                   id="price"
                                   placeholder="with a placeholder"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={this.fileChangeHandler}
                                />
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="category">Category</Label>
                            <Col sm={10}>
                                <Input
                                    type="select"
                                    name="categories" id="categories"
                                    value={this.state.category}
                                    onChange={this.inputChangeHandler}
                                >
                                    <option value="">Please select a category...</option>
                                    {this.props.categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.title}</option>
                                    ))}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{offset: 2, size: 10}}>
                                <Button type='submit'>Create</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        categories: state.categoriesReducer.categories
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addGoods: (goodsData) => dispatch(addGoods(goodsData)),
        fetchCategories: () => dispatch(fetchCategories()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddGoods);