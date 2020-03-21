import React, {Component} from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardImg, CardSubtitle, CardText,
    Container,
} from "reactstrap";
import {deleteGoodsGet, getOneGoods} from "../../store/action/goodsActions";
import {connect} from "react-redux";

class OneGoods extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getOneGoods(id);
    }

    render() {
        return this.props.oneGoods && (
            <Container>
                <h1><Badge color="secondary">{this.props.oneGoods.title}</Badge></h1>
                <hr className="HRColor"/>
                <Card>
                    <CardImg style={{height: '301px'}} top width="100%" src={'http://localhost:8008/uploads/' + this.props.oneGoods.image} alt="Card image cap"/>
                    <CardBody>
                        <CardSubtitle>Categories: {this.props.oneGoods.categories.title}</CardSubtitle>
                        <CardSubtitle>Author: {this.props.oneGoods.user.displayName}</CardSubtitle>
                        <CardSubtitle>Phone: {this.props.oneGoods.user.phone}</CardSubtitle>
                        <CardSubtitle>Price: {this.props.oneGoods.price} KGS</CardSubtitle>
                        <CardText>Text: {this.props.oneGoods.description}</CardText>
                        <Button onClick={() => this.props.deleteGoodsGet(this.props.match.params.id)}>Delete</Button>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        oneGoods: state.goodsReducers.oneGoods,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getOneGoods: (id) => dispatch(getOneGoods(id)),
        deleteGoodsGet: (id) => dispatch(deleteGoodsGet(id))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OneGoods);