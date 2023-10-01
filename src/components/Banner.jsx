export const Banner = (props) => {
  return (
    <div className="banner" style={{ backgroundImage: "url(img/banners/" + props.imgSrc + ")"}}>
      <div className="black_shadow"></div>
      <div className="page_name">{props.pageName}</div>
    </div>
  );
};
