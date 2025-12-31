type Props = {
  children: React.ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <div className="app">
      <div className="app-inner">
        <header className="header">
          <div className="header-left">
            <div className="color-wrapper">
              <span className="color-block main-color"></span>
              <span className="color-block sub-color"></span>
              <span className="color-block sunny"></span>
              <span className="color-block cloud"></span>
              <span className="color-block rain"></span>
            </div>
          </div>

          <div className="header-main">
            <h1 className="app-logo">nanikiyo</h1>
            <p className="app-tagline">今日何着よ？</p>
          </div>
        </header>

        <main className="main">{children}</main>

        <footer className="footer">
          <small>© nanikiyo</small>
        </footer>
      </div>
    </div>
  );
}