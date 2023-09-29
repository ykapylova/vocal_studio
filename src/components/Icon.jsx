export const Icon = (props) => {
    return (
        <div className={props.type + " icon"}>
          <a href={props.link} target="_blank">
            <img src={"icon-" + props.type + ".png"} alt="" />
          </a>
        </div>
    )
}