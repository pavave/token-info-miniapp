export default function Header({ darkMode, setDarkMode }: any) {
  return (
    <header className="header">
      <h2>Token Info</h2>
      <div className="header-right">
        <a href="https://x.com/pavavalera" target="_blank" rel="noopener noreferrer">
          Підписатися на X
        </a>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </header>
  );
}
