const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <p className="footer__copyright">
            © {new Date().getFullYear()} - Handcraft with love with Next.js by
            <span className="footer__name">Tanguy Gibrat</span>
          </p>
          <p className="footer__location">
            Étudiant à Marseille
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;