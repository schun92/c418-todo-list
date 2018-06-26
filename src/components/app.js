import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import AddItem from './add_item';
import List from './list';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: []
        };

        this.base_url = 'http://api.reactprototypes.com';
        this.api_key = '?key=c418demouser';
    }

    componentDidMount(){
        this.getListData();
    }

    async addItem(item){
        try{
            await axios.post(`${this.base_url}/todos${this.api_key}}`, item);

            this.getListData();
        }catch(err){
            console.log('Error adding item:', err.message);
        }
    }

    async deleteItem(id){
        const resp = await axios.delete(`${this.base_url}/todos/${id}${this.api_key}`);

        this.getListData();
    }

    async getListData(){
        
        try {
            const resp = await axios.get(`${this.base_url}/todos${this.api_key}`);

            this.setState({
                list: resp.data.todos
            });
        }catch(err){
            console.log('get Data Error:', err.response.data.error);
        }


        //using async and await makes code look like its working in a line

        // Make call to server to get data
        // axios.get(`${this.base_url}/todos${this.api_key}`).then(resp => {
        //     console.log('Get todos Response:', resp.data.todos);

        //     this.setState({
        //         list: resp.data.todos
        //     });

        // }).catch(err => {
        //     console.log('Get todos error:', err.message);
        // })
    }

    render(){

        return (
            <div className="container">
                <h1 className="center">To Do List</h1>
                <AddItem add={this.addItem.bind(this)}/>
                <List data={this.state.list} delete={this.deleteItem.bind(this)}/>
            </div>
        );
    }
}

export default App;
