import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {fetchCategories} from "../../../store/action/categoriesActions";
import {connect} from "react-redux";
import {BreadcrumbItem} from "reactstrap";

class Sidebar extends Component {
    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        return this.props.categories && this.props.categories.map(item => (
                <BreadcrumbItem key={item._id} tag={NavLink} to={item.title === 'All Item' ? '/' : `/categories/${item._id}`}>{item.title}</BreadcrumbItem>
            ))}
}

const mapStateToProps = state => {
    return {
        categories: state.categoriesReducer.categories
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);