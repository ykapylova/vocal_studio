import { Link } from "react-router-dom"

export const MenuItem = (props) => {
    return (
        <Link to={"/" + props.item}>
          <div className="menu--item">{props.text}</div>
        </Link>
    )
}