import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Breadcrumb, Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AddGoods from "./containers/AddGoods/AddGoods";
import GoodsToCategories from "./containers/Goods/GoodsToCategories";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import AllItem from "./containers/Goods/AllItem";
import OneGoods from "./containers/Goods/OneGoods";


class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar/>
                </header>
                <div>
                    <Breadcrumb>
                        <Sidebar/>
                    </Breadcrumb>
                </div>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/add" exact component={AddGoods}/>
                        <Route path="/" exact component={AllItem}/>
                        <Route path="/categories/:id" exact component={GoodsToCategories}/>
                        <Route path="/:id" exact component={OneGoods}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;