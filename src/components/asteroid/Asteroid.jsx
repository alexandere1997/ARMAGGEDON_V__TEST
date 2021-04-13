import React, { Component } from 'react';
import "./Asteroid.css";
import Spinner from "../spiner/spiner";

export default class Asteroid extends Component {

    state = {
        forArr: null,
        chek: false,
        dKm: true
    }

    clickDanger = (e) => {
        this.setState((state) => {
            return {
                chek: e.target.checked
            }
        })
    }
    distKil = (e) => {
        e.preventDefault();
        this.setState((state) => {
            return {
                dKm: true
            }
        })
    }
    distLun = (e) => {
        e.preventDefault();
        this.setState((state) => {
            return {
                dKm: false
            }
        })
    }

    render() {
        const {mass} = this.props;
        const {chek, dKm} = this.state;
        if(mass == false) {
            <Spinner />
        }
        else if(mass == true) {

        }
        let bold_one = "bold";
        let bold_two = ""
        if(dKm == true) {
            bold_one = "bold";
            bold_two = "..."
        }
        if(dKm == false) {
            bold_one = "...";
            bold_two = "bold"
        }
     let aster = Object.keys(mass).map((keyName, i) => {
           let app__wrap_one = "app__wrap";
           let app__left_true = ""
           let danger = "не опасен";
           let distance = `${mass[keyName].close_approach_data[0].miss_distance.kilometers} км`
           if(mass[keyName].is_potentially_hazardous_asteroid == true){
               app__wrap_one = "app__wrap_true";
               danger = "опасен"
               app__left_true = "app__left_true"
           }
           if(chek &&  danger == "не опасен") {
               app__wrap_one += " display__none"
           }
           let widthHR = {
               width: `${mass[keyName].estimated_diameter.meters.estimated_diameter_max}px`
           }
           if(dKm == true) {
               distance = `${mass[keyName].close_approach_data[0].miss_distance.kilometers} км`
           }
           if(dKm == false) {
               distance = `${mass[keyName].close_approach_data[0].miss_distance.lunar} лун`
           }

           return(
               <div className={app__wrap_one} key={mass[keyName].id}>
               <div className={`app__left ${app__left_true}`}>
                   <img className="app__img_dino" src="/src/img/dino.png" alt="dino"/>
                   <img style={widthHR} className="app__img_aster" src="/src/img/aster.png" alt="aster"/>
               </div>
               <div className="app__center">
                   <h3>{mass[keyName].name}</h3>
                   <p>Дата...............<span>{mass[keyName].close_approach_data[0].close_approach_date}</span></p>
                   <p>Расстояние..........<span>{distance}</span></p>
                   <p>Размер....................................<span>{mass[keyName].estimated_diameter.meters.estimated_diameter_max} м</span></p>
               </div>
               <div className="app__right">
                   <p>Оценка:</p>
                   <span>{danger}</span>
                   <a href="#" onClick={() => this.props.onDeleted(mass[keyName].id, 
                                                                   mass[keyName].name,
                                                                   mass[keyName].close_approach_data[0].close_approach_date,
                                                                   mass[keyName].close_approach_data[0].miss_distance.kilometers,
                                                                   mass[keyName].estimated_diameter.meters.estimated_diameter_max,
                                                                   mass[keyName].is_potentially_hazardous_asteroid)}>На уничтожение</a>
               </div>
           </div>
           )
       })
        return(
            <div className="app">
                <div className="app__container">
                   <div className="app__box">
                        <div className="app__line"></div>
                        <div className="app__filter">
                           <div className="app__inner_left">
                                <input onChange={this.clickDanger} type="checkbox" name="" id=""/>
                                <p>Показать только опасные</p>
                            </div>
                            <div className="app__inner_right">
                                <a onClick={this.distKil} href="">Расстояние <span className={bold_one}>в километрах</span>,</a>&nbsp;&nbsp;&nbsp;
                                <a onClick={this.distLun} href="">в дистанциях <span className={bold_two}>до луны</span></a>
                            </div>
                        </div>
                        <div className="app__content">
                            {mass == false ? < Spinner/> : aster}
                        </div>
                        <div className="app__footer">
                            <p>2021 © Все права и планета защищены</p>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}
