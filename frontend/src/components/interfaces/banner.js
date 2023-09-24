
const Banner = () =>{
    
      const rowStyle = {
        width: '110%',
        height: '10%',
      };
    
      const colStyle = {
        width: '100%',
        height: '100%',
        padding: '0px',
      };
    
      const sectionStyle = {
        maxWidth: '100%',
        width: '130%',
        margin: 'inherit',
        paddingBottom: '0px',
        height: '100%',
        borderRadius: '0px',
      };
    
      const containerStyle = {
        maxWidth: '100%',
        height: '100%',
      };
    
      const textStartStyle = {
        width: '100%',
        maxWwidth: '100%',
        height: '100%',
        marginBottom: '0px',
        marginTop: '-1px',
        marginLeft: '2px',
        paddingTop: '17px',
        paddingBottom: '0px',
        paddingLeft: '37px',
      };
    
      return (
          <div className="row" style={rowStyle}>
            <div className="col" style={colStyle}>
              <section style={sectionStyle}>
                <div className="container" style={containerStyle}>
                  <div className="text-start text-white bg-dark border rounded border-0" style={textStartStyle}>
                    <h2 className="fw-bold text-white">
                      &nbsp;Chatbot: Text and Voice
                    </h2>
                  </div>
                </div>
              </section>
            </div>
          </div>
      );
};

export default Banner;