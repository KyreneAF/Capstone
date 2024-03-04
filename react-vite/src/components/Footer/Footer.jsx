import "./Footer.css";


function Footer() {
  return (

<div className="footer-main-cont">
  <span className="foot-abt">About me</span>
  <div id="github-cont">
    <div className="foot-link-cont">
      <div className="foot-a-cont">
        <a
          href="https://github.com/KyreneAF/Neon-Noir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/kyrene-flores-5870432a8/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
</div>

  );
}

export default Footer;
