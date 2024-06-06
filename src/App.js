import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    oppA: '',
    oppB: '',
    showResult: false,
    display: '',
    image1: '',
    image2: '',
  }

  itemClicked = id => {
    const random = Math.ceil(Math.random() * 3)
    const opponent = choicesList[random - 1]
    const opp = opponent.id
    this.setState({oppA: id, oppB: opp}, this.checkResult)
  }

  playAgain = () => {
    this.setState({showResult: false})
  }

  checkResult = () => {
    const {oppA, oppB} = this.state
    const playerChoice = oppA
    const computerChoice = oppB
    let result = ''
    if (playerChoice === computerChoice) {
      result = 'draw'
    } else if (playerChoice === 'ROCK') {
      if (computerChoice === 'SCISSORS') {
        result = true
      } else {
        result = false
      }
    } else if (playerChoice === 'PAPER') {
      if (computerChoice === 'ROCK') {
        result = true
      } else {
        result = false
      }
    } else if (playerChoice === 'SCISSORS') {
      if (computerChoice === 'PAPER') {
        result = true
      } else {
        result = false
      }
    }
    const oppAIamge = choicesList.filter(each => each.id === oppA)
    const imgA = oppAIamge[0].imageUrl
    const oppBIamge = choicesList.filter(each => each.id === oppB)
    const imgB = oppBIamge[0].imageUrl

    if (result === true) {
      this.setState(prevValue => ({
        score: prevValue.score + 1,
        display: 'YOU WON',
        showResult: true,
        image1: imgA,
        image2: imgB,
      }))
    } else if (result === 'draw') {
      this.setState({
        display: 'IT IS DRAW',
        showResult: true,
        image1: imgA,
        image2: imgB,
      })
    } else {
      this.setState(prevValue => ({
        score: prevValue.score - 1,
        display: 'YOU LOSE',
        showResult: true,
        image1: imgA,
        image2: imgB,
      }))
    }
  }

  render() {
    const {score, showResult, display, image1, image2} = this.state

    return (
      <div className="bg">
        <h1>Rock Paper Scissors</h1>
        <div className="bg1">
          <div>
            <li>ROCK</li>
            <li>PAPER</li>
            <li>SCISSORS</li>
          </div>
          <div className="score">
            <p>Score</p>
            <p className="para">{score}</p>
          </div>
        </div>
        {showResult ? (
          <div className="bg3">
            <div className="bg2">
              <div>
                <p>YOU</p>
                <img src={image1} alt="your choice" />
              </div>
              <div>
                <p>OPPONENT</p>
                <img src={image2} alt="opponent choice" />
              </div>
            </div>
            <p>{display}</p>
            <button onClick={this.playAgain} type="button">
              Play Again
            </button>
          </div>
        ) : (
          <div>
            <ul>
              {choicesList.map(each => (
                <li key={each.id}>
                  <button
                    type="button"
                    className="but"
                    data-testid={`${each.id.toLowerCase()}Button`}
                    onClick={() => this.itemClicked(each.id)}
                  >
                    <img src={each.imageUrl} alt={each.id} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                RULES
              </button>
            }
          >
            {close => (
              <>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  Close
                </button>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
              </>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default App
