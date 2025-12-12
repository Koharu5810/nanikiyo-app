// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './styles/global.css'

function App() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">nanikiyo</h1>
          <p className="subtitle">今日何着よ？</p>
        </header>

        <main className="main">
          <section className="card">
            <p className="">ここに天気が表示されます</p>
          </section>

          <section className="card">
            <p>ここにおすすめの服装が表示されます</p>
          </section>
        </main>

        <footer className="footer">
          <small>© nanikiyo</small>
        </footer>
      </div>
    );

}

export default App
