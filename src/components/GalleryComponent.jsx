export const GalleryComponent = (props) => {
  return (
    <a className="card" href={props.link}>
      <div className="image">
        <img src={props.img} alt="" />
      </div>
      <div className="name">{props.title}</div>
      <div className="desc">{props.desc}</div>
    </a>
  );
};
