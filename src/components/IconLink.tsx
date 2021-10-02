import { MuiRouterLink } from "./MuiRouterLink";
import { LinkProps } from "react-router-dom";

interface IconLinkProps {
    icon: JSX.Element;
    props: HTMLAnchorElement & LinkProps;
}


const IconLink = ({icon, props}: IconLinkProps) => {
  console.log(icon);

  return <MuiRouterLink {...props}>
    <img aria-hidden="true" focusable="false" {...icon.props}/>
  </MuiRouterLink>
};

export default IconLink;