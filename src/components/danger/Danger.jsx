import React, { Component } from 'react';
import "./Danger.css"

export default class Danger extends Component {
    render() {
        const {mass__two} = this.props;
        let content = <h6>Ничего не уничтожено</h6>
        return(
            <div className="app__deleted">
                <h3 className="app__title">Уничтоженные</h3>
                <div className="app__dangers">
                  {mass__two == "" ? content : mass__two.map(item => {
                        let danger = "не опасен";
                        let app__left_true = ""
                        if(item.danger == true){
                            danger = "опасен"
                            app__left_true = "app__left_true"
                        }
                        let widthHR = {
                            width: `${item.diameter}px`
                        }
                        return(
                        <div className="app__wrap_true" key={item.id}>
                            <div className={`app__left opacity_app ${app__left_true}`}>
                                <img className="app__img_dino" src="/src/img/dino.png" alt=""/>
                                <img style={widthHR} className="app__img_aster" src="/src/img/aster.png" alt=""/>
                            </div>
                            <div className="app__center opacity_app">
                                <h3>{item.name}</h3>
                                <p>Дата...............<span>{item.date}</span></p>
                                <p>Расстояние..........<span>{item.km}</span></p>
                                <p>Размер....................................<span>{item.diameter} м</span></p>
                            </div>
                            <div className="app__right opacity_app">
                                <p>Оценка:</p>
                                <span>{danger}</span>
                                <a href="">На уничтожение</a>
                            </div>
                            <p className="app__del">Уничтожено</p>
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}