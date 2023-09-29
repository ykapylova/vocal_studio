export const AboutItem = (props) => {
  return (
    <div className="about-item">
      <div className="text">{props.text}</div>
      <div className="img-container">
        {props.images.map((image, key) => {
          let imageSrc = "about/" + image
          return <img src={imageSrc} alt="" />;
        })}
      </div>
    </div>
  );
};
