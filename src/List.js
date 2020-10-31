import React, { Component } from 'react';
import Data from './review.json';


export default class List extends Component {

    render() {

        const app = [...new Set(Data.map(i => i.appID.slice(4,)))].sort()

        return (
            <div className=" list">
                <h3 className="page text-center pr-5">App Review List </h3>
                {(() => {
                    if(this.props.count !== 0)
                    {
                        return(
                            <div className="page">
                            <div className="row justify-content-between">
                                <div className="pl-4">
                                <div >select products</div>
                                <div>
                                    <select className="form-control" onChange={this.props.sortApp}>
                                    <option  value="all">{app.length} Apps</option>
                                        { app.map((i) => {
                                            return <option  value={i}>{i}</option>
                                        })}
                                    </select>
                                </div>
                                </div>
                            {(() => {
                                if(this.props.end < this.props.count)
                                {
                                    return(
                                        <div className="pt-4 font-weight-bold" style={{fontSize:12}}>Viewing {this.props.start + 1}-{this.props.end} of {this.props.count} </div>
                                    )
                                }
                                else{
                                    return(
                                        <div className="pt-4 font-weight-bold" style={{fontSize:12}}>Viewing {this.props.start + 1}-{this.props.count} of {this.props.count} </div>
                                    )
                                }
                            })()}
                            
                            <div className="mobile pr-5 mb-4">
                            <div style={{paddingRight:80}}>sort</div>
                            <div>
                                <select className="form-control" onChange={this.props.sortNew}>
                                    <option >Newest First</option>
                                    <option>Oldest First</option>
                                </select>
                            </div>
                            </div>
                            </div>
                            </div>
                        )
                    }
                    else {
                        return(
                            <div className="page text-center pr-5 mt-5 font-weight-bold" style={{fontSize:40}} >Not Found</div>
                        )
                    }
                })()}
                {this.props.data.slice(this.props.start,this.props.end).map(item => {
                  return    <div className="card border border-info  shadow mb-4 bg-white rounded cardlist">
                            <div className="row card-header lead" style={{justifyContent:"space-around" }}>
                            <div className="" style={{fontSize:20}} >               
                                {(() => {
                                    if (item.appStoreName === "iOS") {
                                    return (
                                        <div><i class='fab fa-apple'></i></div>
                                    )
                                    }  else {
                                    return (
                                        <div><i class='fab fa-google-play'></i></div>
                                    )
                                    }
                                })()}
                            </div>
                            <div className="font-weight-bold" style={{fontSize:14}}>{item.reviewHeading}</div>
                            <div>
                            {(() => {
                                    if (item.rating === "1") {
                                    return (
                                        <div><i class='fas fa-star' style={{color:"orange"}}></i></div>
                                    )
                                    }  else if(item.rating === "2"){
                                    return (
                                        <div>
                                            <i class='fas fa-star' style={{color:"orange"}}></i>
                                            <i class='fas fa-star' style={{color:"orange"}}></i>
                                        </div>
                                    )
                                    }else if(item.rating === "3"){
                                        return (
                                            <div>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                            </div>
                                        )
                                    }else if(item.rating === "4"){
                                        return (
                                            <div>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                            </div>
                                        )
                                    
                                    }else {
                                        return (
                                            <div>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                                <i class='fas fa-star' style={{color:"orange"}}></i>
                                            </div>
                                        )
                                    }
                                })()}
                                
                            </div>
                            </div>
                            <div className="card-body">
                                <div className="lead font-weight-normal text-wrap" style={{fontSize:15}}>{item.reviewText}</div>  
                                <div className="row pt-3" >
                                        <div className="btn-sm font-weight-bold pl-3" style={{fontSize:12}}>by {item.reviewUserName}</div>
                                        <div className="btn-sm font-weight-bold pl-5" style={{fontSize:12}}>{item.reviewDate}</div>
                                        <div className="btn-sm font-weight-bold pl-5" style={{fontSize:12}}>{item.version}</div>
                                        <div className="btn-sm font-weight-bold pl-5" style={{fontSize:12}}>{item.countryName}</div>
                                </div> 
                                </div>
                            </div>
                        
                })}  
                
                {(() => {
                    if(this.props.count !== 0)
                    {
                        return(
                            <div className="page">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-around">
                                <li class="btn" onClick={this.props.decrease}>Previous</li>
                                {this.props.page.slice(this.props.startpage,this.props.endpage).map(i => {
                                    return <li class="btn" onClick={this.props.click} value={i}>{i +1}</li>
                                })}
                                <li class="btn" onClick={this.props.increase}>Next</li>
                                </ul>
                                </nav>
                                </div>
                        )
                    }
                })()}
                
            </div>
        )
    }
}
