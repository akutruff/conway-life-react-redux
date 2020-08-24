import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Board, Vector2, LifeStatus } from './app/types';
import { World } from './World';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from './app/store';
import { stat } from 'fs';
import { tickAction } from './app/actions';
import { request } from 'https';

interface AppProps { 
  board: Board,
}

class App extends React.Component<PropsFromRedux> {
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);

  //From weird Node.JS return type from setInterval coming back.
  intervalId?: ReturnType<typeof setTimeout>;
  animationId?: number;

  constructor(props: PropsFromRedux) {
    super(props);
  }

  render() {
    return (      
      <div className="App">
        <World {...this.props.board} />
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <Welcome message="Morty"/> */}
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React and maybe you'll be happy
          </a>
        </header>
      </div>
    )
  }


  componentDidMount() {
    this.intervalId = setInterval(
      () => {      
        this.props.dispatch(tickAction());
      },
      33
    );
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

const mapDispatchToProps = {
  //toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
  
}

const mapStateToProps = (state: RootState) => ({
  board: state
});

const connector = connect(
  mapStateToProps
);

// const connector = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );

type PropsFromRedux = ConnectedProps<typeof connector>

//export default App;
export default connector(App);