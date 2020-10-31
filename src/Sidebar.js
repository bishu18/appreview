import React, { Component } from 'react';
import Data from './review.json';
import './index.css';

export default class Sidebar extends Component {
    
    render() {
        
        const str1 = "reviewDate"
        const str2 = "reviewDateEpoch"
        const date = [...new Set(Data.map(i => i.reviewDate.slice(0,12)))]
        const dateName = date.map(function(key) { return {[str1]:key} })
        const dateEpoch = date.map(item => Date.parse(item)).map(function(key){ return {[str2]:key}});
        const dateWithEpoch = dateName.map((item, i) => Object.assign({}, item, dateEpoch[i]))
        const dateSorted = dateWithEpoch.sort((a, b) => b.reviewDateEpoch - a.reviewDateEpoch)

        const countryNames = Data
        .map(dataItem => dataItem.countryName) 
        .filter((country_Name, index, array) => array.indexOf(country_Name) === index).sort(),

            country = countryNames
            .map(country_Name => ({
                type: country_Name,
                count: Data.filter(item => item.countryName === country_Name).length
            }))


        const appVersion = Data
        .map(dataItem => dataItem.version) 
        .filter((app_Version, index, array) => array.indexOf(app_Version) === index).sort(), 

            version = appVersion
                .map(app_Version => ({
                    type: app_Version,
                    count: Data.filter(item => item.version === app_Version).length
            }))
        

        const appRating = Data
        .map(dataItem => dataItem.rating) 
        .filter((app_Rating, index, array) => array.indexOf(app_Rating) === index).sort().reverse(), 

            rating = appRating
                .map(app_Rating => ({
                    type: app_Rating,
                    count: Data.filter(item => item.rating === app_Rating).length
            }))


        return (
            <div className="container">
            <div className="sidebar">
                <div className="row container font-weight-bold">
                    <div className="col-6 pt-2">Filter</div>
                    <button className="btn btn-link col-6" onClick={this.props.filterDate } value="all time">ClearFilter</button>
                </div>
                <div className="container pt-5">
                    <input label="Search Country" icon="search" placeholder="search" onChange={this.props.searchList}/>   
                </div>   
               
                <div className="container pt-3">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    <label className="pl-2"> Filter by Date</label>
                    <select className="form-control"  onClick={this.props.filterDate}>
                        <option>all time</option>
                        { dateSorted.map((i) => {
                            return <option className="btn" value={i.reviewDate}>{i.reviewDate}</option>
                        })}
                    </select>
                    <hr></hr>
                </div>

                <div className="container pt-3">
                <button class="btn " type="button" data-toggle="collapse" data-target="#collapseRating" aria-expanded="false" aria-controls="collapseExample">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg> Filter by Rating
                </button>
                <div class="collapse" id="collapseRating">
                
                <div className="row ">
                        <div className="col-2">
                            { appRating.map((i) => { 
                                return  <div className="row">
                                        <button className="btn text-left " onClick={this.props.filterRating} value={i}>{i}</button>
                                        </div> 
                            })}
                        </div>
                        <div className="col-6 pt-2">
                            <div className="size">
                                <i className=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                            </div>
                            <div className="pt-4 size">
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                            </div>
                            <div className="pt-3 size">
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                            </div>
                            <div className="pt-4 size">
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                            </div>
                            <div className="pt-3 size">
                                <i class=' fas fa-star' style={{color:"orange"}}></i>
                            </div>
                        </div>
                            
                        
                        <div className=" col-4">
                            { rating.map((i) => { 
                                return <div className="btn">{ i.count }</div>
                            })}
                        </div>
                    </div>   
                
                </div><hr></hr>
                </div>

                <div className="container pt-3">
                <button class="btn " type="button" data-toggle="collapse" data-target="#collapseVersion" aria-expanded="false" aria-controls="collapseExample">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg> Filter by Version
                </button>
                <div class="collapse" id="collapseVersion">
                    <div className="row ">
                        <div className="col-6">
                            { appVersion.map((i) => {
                                return  <button className="btn text-left" onClick={this.props.filterVersion} value={i}>{i}</button>
                            })}
                        </div>
                        <div className=" pl-5 col-6">
                            { version.map((i) => { 
                                return <div className="btn">{ i.count }</div>
                            })}
                        </div>
                    </div>   
                </div><hr></hr>
                </div>

                <div className="container pt-3 mb-5">
                <button class="btn " type="button" data-toggle="collapse" data-target="#collapseCountry" aria-expanded="false" aria-controls="collapseExample">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg> Filter by Country
                </button>
                
                <div class="collapse" id="collapseCountry">
                    <div className="row ">
                        <div className="col-6">
                            { countryNames.map((i) => {
                                 return  <button className="btn text-left" onClick={this.props.filterCountry} value={i}>{i}</button>
                            })}
                            </div>
                                <div className=" pl-5 col-6">
                                    { country.map((i) => { 
                                        return <div className="btn">{ i.count }</div>
                                    })}
                                </div>
                        </div>
                    </div>
                </div>
            </div>   
            </div>
        )
    }
}
