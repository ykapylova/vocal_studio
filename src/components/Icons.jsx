const Icon = (props) => {
  return (
      <div className={props.type + " icon"}>
        <a href={props.link} target="_blank">
          <img src={"icons/icon-" + props.type + ".png"} alt="" />
        </a>
      </div>
  )
}

export const Icons = () => {
  return (
    <div className="icons">
      <div className="phone">
        <Icon type={"call"} link={"tel:+375297444468"} />
        <Icon type={"message"} link={"mailto:kristina1975@yandex.ru"} />
      </div>
      <div className="chats">
        <Icon
          type={"instagram"}
          link={"https://www.instagram.com/tiptop_crystal/"}
        />
        <Icon type={"viber"} link={"viber://chat?number=375297444468"} />
        <Icon type={"telegram"} link={"https://t.me/+375297444468"} />
      </div>
    </div>
  );
};
