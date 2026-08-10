export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>⚽ Apex Sports</h2>

          <p>
            Real-time football scores, fixtures, standings,
            match statistics and football news from leagues
            around the world.
          </p>
        </div>

        <div className="footer-links">

          <div>
            <h3>Navigation</h3>

            <a href="/">Home</a>
            <a href="/league/epl">Leagues</a>
            <a href="/contact">Contact</a>
          </div>

          <div>
            <h3>Legal</h3>

            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Apex Sports. All rights reserved.
      </div>

    </footer>
  );
}