import React, { Component } from 'react';
import List from './List';
import Sidebar from './Sidebar';
import Data from './review.json';
import './index.css';

const str = "reviewDateEpoch"
const epoch = Data.map(item => Date.parse(item.reviewDate)).map(function(key){ return {[str]:key}});
const newData = Data.map((item, i) => Object.assign({}, item, epoch[i]));
//const noOfpage = Data.length/10

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            data : newData ,
            showPerPage:10,
            page : [...Array(Data.length/10).keys()],
            start:0,
            end:10,
            startpage:0,
            endpage:10,
            count: Data.length
          };
          this.filterCountry = this.filterCountry.bind(this);
          this.searchList = this.searchList.bind(this);
          this.filterRating = this.filterRating.bind(this);
          this.filterVersion = this.filterVersion.bind(this);
          this.filterDate = this.filterDate.bind(this);
          this.sortNew = this.sortNew.bind(this);
          this.sortApp = this.sortApp.bind(this);
          this.increase=this.increase.bind(this); 
          this.decrease=this.decrease.bind(this); 
          this.click=this.click.bind(this);
          
    }

    

    searchList(event) {
        console.log(event.target.value);
            this.setState({
                data : Data.filter(item => item.reviewText.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ),
            });
    }


    filterCountry(event) {
        console.log(event.target.value);
            this.setState({
                data : newData.filter(item => item.countryName.indexOf(event.target.value) >=0),
                start:0,
                end:10,
                startpage:0,
                endpage:10
            });
    }

    filterRating(event) {
        console.log(event.target.value);
            this.setState({
                data : Data.filter(item => item.rating.indexOf(event.target.value)  >=0),
                start:0,
                end:10,
                startpage:0,
                endpage:10
            });
    }

    filterVersion(event) {
        console.log(event.target.value);
            this.setState({
                data : Data.filter(item => item.version === event.target.value),
                start:0,
                end:10,
                startpage:0,
                endpage:10
            });
    }

    filterDate(event) {
        console.log(event.target.value);
        if(event.target.value === "all time")
        {
            this.setState({data: Data})
        }else {
            this.setState({
                data : Data.filter(item => item.reviewDate.indexOf(event.target.value)  >=0),
                start:0,
                end:10,
                startpage:0,
                endpage:10
            });
        }
            
    }

    sortNew(event){
        console.log(event.target.value);
        if(event.target.value === "Newest First"){
            this.setState({
                data: newData.sort((a, b) => b.reviewDateEpoch - a.reviewDateEpoch)
            })
        }else{
            this.setState({
                data: newData.sort((a,b) => a.reviewDateEpoch - b.reviewDateEpoch )
            })
        }
        
    }

    sortApp(event) {
        console.log(event.target.value);
        if(event.target.value === "all")
        {
            this.setState({
                data : Data
            });
        }
        else{
            this.setState({
                data : Data.filter(item => item.appID.indexOf(event.target.value)  >=0)
            });
        }    
    }

    increase(event){ 
        if(this.state.start<=1490 && this.state.end<this.state.data.length){
           this.setState({
               start: this.state.start +this.state.showPerPage,
               end: this.state.end +this.state.showPerPage,
               startpage: this.state.startpage + 1,
               endpage: this.state.endpage + 1
            }); 
        }
    } 
    
    decrease(event){ 
           if(this.state.start>=0 && this.state.end>this.state.showPerPage && this.state.startpage>0  ){
            this.setState({
                start: this.state.start-this.state.showPerPage,
                end: this.state.end-this.state.showPerPage,
                startpage: this.state.startpage - 1,
                endpage: this.state.endpage - 1 
             }); 
           }
           else if(this.state.start>0){
            this.setState({
                start: this.state.start-this.state.showPerPage,
                end: this.state.end-this.state.showPerPage
             }); 
           }
           
    }
    
    click(event){
            console.log(event.target.value)
            if(event.target.value>4 && event.target.value<this.state.data.length/this.state.showPerPage)
            {
                this.setState({
                    start: event.target.value*10,
                    end:event.target.value*10+10,
                    startpage:  event.target.value -5,
                    endpage: event.target.value + 5
                });
            }
            else if(event.target.value<this.state.data.length/this.state.showPerPage){
                this.setState({
                    start: event.target.value*10,
                    end:event.target.value*10+10,
                    startpage:  0,
                    endpage: 10
                });
            }
            
    }

    render() {
        return (
            <div>
                <div className="content">
                    <div className="sidebar">       
                        <Sidebar 
                        count={this.state.data.length}
                        data={this.state.data}
                        searchList= {this.searchList}
                        searchbyCountry= {this.searchbyCountry}
                        filterCountry = {this.filterCountry}
                        filterRating = {this.filterRating}
                        filterVersion = {this.filterVersion}
                        filterDate = {this.filterDate}
                        ></Sidebar>
                    </div>
                    <div className="main">
                        <List 
                        page={this.state.page} 
                        count={this.state.data.length} 
                        data={this.state.data} 
                        showPerPage={this.state.showPerPage}
                        sortNew={this.sortNew}
                        sortApp={this.sortApp}
                        start={this.state.start}
                        startpage={this.state.startpage}
                        end={this.state.end}
                        endpage={this.state.endpage}
                        increase={this.increase}
                        decrease={this.decrease}
                        click={this.click}
                        filterDate = {this.filterDate}
                        ></List>
                    </div>
                </div>
            </div>
        )
    }
}
