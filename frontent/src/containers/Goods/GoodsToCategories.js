import React, {Component} from 'react';
import {getGoodsByCategory} from "../../store/action/goodsActions";
import {connect} from "react-redux";
import {Button, Card, Container, Media} from "reactstrap";
import notImage from "../../assets/images/chat.png";
import next from "../../assets/images/forward (1).png";

class GoodsToCategories extends Component {
    componentDidMount() {
        this.props.getGoodsByCategory(this.props.match.params.id)
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getGoodsByCategory(this.props.match.params.id)
        }
    }

    pushHandler = (id) => {
        this.props.history.push('/' + id)
    };

    render() {
        return (
            <Container>
                <h1>Goods</h1>
                <hr className="HRColor"/>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {this.props.goods && this.props.goods.map(item => (
                        <Card
                            key={item._id}
                            style={{
                                width: '48%',
                                margin: '10px',
                                border: '1px solid #888'
                            }}
                        >
                            <Media>
                                <Media left>
                                    <Media style={{
                                        width: '200px',
                                        height: '180px'
                                    }}
                                           object
                                           src={item.image ? 'http://localhost:8008/uploads/' + item.image : notImage}
                                    />
                                </Media>
                                <Media body style={{margin: "0 3%"}}>
                                    <Media heading>
                                        {item.title}
                                    </Media>
                                    <Media>
                                        {item.price}
                                    </Media>
                                </Media>
                                <Button onClick={() => this.pushHandler(item._id)} style={{border: 'none'}} outline color="secondary"><img src={next} alt={"View goods"}/></Button>
                            </Media>
                        </Card>
                    ))}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        goods: state.goodsReducers.goods
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getGoodsByCategory: (id) => dispatch(getGoodsByCategory(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(GoodsToCategories);