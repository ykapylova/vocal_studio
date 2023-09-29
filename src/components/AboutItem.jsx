export const AboutItem = (props) => {
  return (
    <div>
      <div className="text">{props.text}</div>
      <div className="img-container">
        {/* {props.images.map((image, key) => ( <img src="about/" + image alt="" />я))} */}
        
        <img src="about/about2.jpeg" alt="" />
        <img src="about/about3.jpeg" alt="" />
      </div>
    </div>
  );
};
