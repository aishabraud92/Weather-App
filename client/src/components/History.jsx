import React, { Component } from 'react';

class History extends Component {
  constructor(props) {
  super(props);
  this.state = {
      username: this.props.username,
      userId: this.props.userId,
      usersSearch: [],
  }
  this.getUsersHistory = this.getUsersHistory.bind(this);
  this.updateUsersSearch = this.updateUsersSearch.bind(this);
  this.emptyList = this.emptyList.bind(this);
  this.renderSearchList = this.renderSearchList.bind(this);
  }

  componentDidMount(){
      this.getUsersHistory();
  }

  getUsersHistory(){
    fetch(`/api/users/${this.props.userId}`)
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson);
      this.updateUsersSearch(responseJson.data.usersSearch);
    });
  }

  updateUsersSearch(Search){
    this.setState((prevState) => {
      return {
        usersSearch: Search,
      }
	  })
  }

  emptyList(){
    return(
      <div>
        <p>No Search History</p>
        <div className='emptySearch'></div>
      </div>
    )
  }

  renderSearchList(){
    return(
        <div className='main_container history'>
          {this.state.usersSearch.map((query, index) => {
          return (
            <li 
              key={index}
            ><p>{query.search_input}</p>
            </li>
          )
        })}
        </div>
    )
  }


render() {
    if (this.state.usersSearch.length === 0) {
      return this.emptyList();
    } else {
      return this.renderSearchList();
    }
}

}

export default History;