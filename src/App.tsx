import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './styles/global.css'

function App() {
  const [activeTab, setActiveTab] = useState<'current' | 'custom'>('current');

  return (
    <div className='app'>
      <div className='app-inner'>

        <header className='header'>
          <h1 className='title'>nanikiyo</h1>
          <p className='subtitle'>今日何着よ？</p>
        </header>

        <main className='main'>
          <section className='card'>
            {/* タブ */}
            <div className='tabs'>
              <button
                className={`tab ${activeTab === 'current' ? 'active' : ''}`}
                onClick={() => setActiveTab('current')}
              >
                現在地
              </button>

              <button
                className={`tab ${activeTab === 'custom' ? 'active' : ''}`}
                onClick={() => setActiveTab('custom')}
              >
                任意の地名
              </button>
            </div>

            <p className=''>ここに天気が表示されます</p>

            {/* コンテンツ */}
            <div className='tab-content'>
              {activeTab === 'current' && (
                <div>
                  <p className='label'>現在地の天気</p>
                  <p>⛅️ 晴れ / 17{'\u00b0'}C</p>
                  {/* ℃のユニコードu2103を利用するより組み合わせたほうが文字化けに強いらしい */}
                </div>
              )}

              {activeTab === 'custom' && (
                <div>
                  <p className='label'>場所を指定</p>
                  <input
                    type='text'
                    placeholder='例：東京'
                    className='input'
                  />
                  <button className='search-button'>検索</button>
                </div>
              )}
            </div>

            {/* <section className='card'>
            <p>ここにおすすめの服装が表示されます</p>
          </section> */}
          </section>
        </main>

        <footer className='footer'>
          <small>© nanikiyo</small>
        </footer>

      </div>
    </div>
  );

}

export default App
