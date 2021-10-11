class Crisp extends React.Component {
    componentDidMount () {
      // Include the Crisp code here, without the <script></script> tags
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "9c37b529-f47c-42d5-be15-d7db88635701";
  
      (function() {
        var d = document;
        var s = d.createElement("script");
  
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    }
  
    render () {
      return null;
    }
  }
  export default Crisp