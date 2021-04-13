import React, { Component } from 'react';
import Asteroid from "../asteroid/Asteroid";
import getResourse from "../../services/services";
import Danger from "../danger/Danger";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Redirect } from "react-router"
import { Link } from "react-router-dom";

export default class App extends Component {
    state = {
        arrayAster: "",
        numShow: 3,
        arrayAsterTWo:""
    }

    componentDidMount = () => {
        getResourse("https://www.neowsapp.com/rest/v1/feed?start_date=2020-09-07&end_date=2020-09-14&detailed=false&api_key=hYJWSsIgwKGIjtwiObnXmIokVNpDO8jkYIJ15FbE")
        .then(res => {
            let arr = [];
            Object.keys(res.near_earth_objects).map((keyName, i) => {
                Object.keys(res.near_earth_objects[keyName]).map((items, i) => {
                    arr.push(res.near_earth_objects[keyName][items])
                })
            })
            this.setState({
                arrayAster: arr,
            })

        });

    }
    scrollLoad = (e) => {
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
            this.setState((state) => {
                return{
                    numShow: this.state.numShow += 3
                }
            })
          }
    }

    onDeleted = (id, name, date, km, diameter, danger) => {
        this.setState(({arrayAster}) => {
          const inx = arrayAster.findIndex((el) => el.id === id);
    
          const newArr = [...arrayAster.slice(0, inx), ...arrayAster.slice(inx + 1)]
    
          return {
            arrayAster: newArr
          }
        })

        const newItem = {
            id: id,
            name: name,
            date: date,
            km: km,
            diameter: diameter,
            danger: danger
        }
        this.setState(({arrayAsterTWo}) => {
            const newArr = [
                ...arrayAsterTWo,
                newItem
            ];
    
            return {
                arrayAsterTWo: newArr
            }
        });
    }
    render() {
        const {arrayAster, arrayAsterTWo} = this.state;
        let arrIntems = arrayAster.slice(0, this.state.numShow);
        return(
            <Router>
                <div onScroll={this.scrollLoad} className="box">
                    <div className="app__header">
                                <div className="app__items_left">
                                    <Link to="/">ARMAGGEDON V</Link>
                                    <p>Сервис мониторинга и уничтожения астероидов, <br/> опасно подлетающих к Земле.</p>
                                </div>
                                <div className="app__items_right">
                                    <Link  to="/aster">Астероиды</Link>&nbsp;&nbsp;&nbsp;
                                    <Link  to="/danger">Уничтожение</Link>
                                </div>
                        </div>
                        <Route path="/" render={() => {
                            return(
                                <div className="app__start">
                                    <h2>ASTEROID</h2>
                                    <img src="/src/img/aster.png" alt="aster"/>
                                    <img src="/src/img/dino.png" alt="dino"/>
                                </div>
                            )
                        }} exact/>
                        <Route  path="/aster" render={(numShow) => {
                            return <Asteroid mass={arrIntems} numShow={numShow} onDeleted={this.onDeleted}/>
                        }} />
                        <Route path="/danger" render={() => {
                            return <Danger mass__two={arrayAsterTWo}/>
                        }}/>
                        <Redirect push to="/" />
                </div>
            </Router>
        )
    }
}