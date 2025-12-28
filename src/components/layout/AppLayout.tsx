type Props = {
  children: React.ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <div className="app">
      <div className="app-inner">
        <header className="header">
          <h1 className="app-logo">nanikiyo</h1>
          <p className="app-tagline">今日何着よ？</p>

          {/* サンプルカラー テスト表示用 */}
          <div className="color-wrapper">
            <span className="color-sample main-color"></span>
            <span className="color-sample sub-color"></span>
            <span className="color-sample sunny"></span>
            <span className="color-sample cloud"></span>
            <span className="color-sample rain"></span>
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