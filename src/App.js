import React from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import MyNavBar from "./components/MyNavBar";
import friends from "./friends.json";
import "./App.css";

class App extends React.Component {
  state = {
    friends:friends,
    currentScore:0,
    highScore:0,
    gameMessage:'Click an image to begin!',
    status:0
  };

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  handleTouchFriend = (id) => {
    let newFriends = this.state.friends;
    const checkFriend = newFriends.indexOf(newFriends.find(friend => friend.id === id));
    if((newFriends[checkFriend].touched === 0) && (this.state.status === 0))
    {
      newFriends[checkFriend].goodBad = "cardGood";
      newFriends[checkFriend].touched = 1;
      newFriends[checkFriend].goodBad = "";
      this.shuffle(newFriends);
      this.setState({friends:newFriends});
      this.handleCurrentScore();
    }
    else if (this.state.status === 0)
    {
      newFriends[checkFriend].goodBad = "cardBad";
      this.setState({status:1});
      this.youLose();
    }
    
  }

  handleHighScore = (score) => {
    const newHighScore = score;
    if(score > this.state.highScore)
    this.setState({highScore:newHighScore});
    if(score === 12){
      this.setState({status:1});
      this.youWin()
    }
  }

  handleCurrentScore = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({currentScore:newScore});
    this.handleHighScore(newScore);
  }

resetFriends = () => {
  let newFriends = this.state.friends;
  newFriends.forEach(function(item,index){
    item.touched = 0;
    item.goodBad = "";
  });
  this.setState({friends:newFriends});
}

  resetGame = () => {
    this.setState({currentScore:0});
    this.setState({status:0})
    this.setState({gameMessage:"Click an image to begin!"})
    this.resetFriends();
  }

  youLose = () => {
    this.setState({gameMessage:"You lost!!  Click to reset"});
  }

  youWin = () => {
    this.setState({gameMessage:"You won!  Click here to reset"});
  }

render() {
  return (
    <div>
    <MyNavBar 
        highScore = {this.state.highScore} 
        currentScore = {this.state.currentScore}
        resetGame = {this.resetGame}
        gameMessage = {this.state.gameMessage}
        />
        <h2 className="title">Are you clicking it now, Mr. Krabs?</h2>
      <h4 className="title">Click an image to earn a point.  Click it twice in a row and you lose!</h4>
    <Wrapper>
      {this.state.friends.map(friend =>(
        <FriendCard
          handleTouchFriend ={this.handleTouchFriend}
          key={friend.id}
          id={friend.id}
          name={friend.name}
          image={friend.image}
          occupation={friend.occupation}
          location={friend.location}
          goodBad={friend.goodBad}
        />
        ))}
    </Wrapper>
    </div>
    );
  }
}
export default App;