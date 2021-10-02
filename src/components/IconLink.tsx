import { MuiRouterLink } from "./MuiRouterLink";
import { LinkProps } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";

interface IconLinkProps {
  icon: JSX.Element;
  props: HTMLAnchorElement & LinkProps;
}

const IconLink = ({ icon, ...props }: IconLinkProps) => {
  return (
    <MuiRouterLink {...props}>
      <ListItemIcon aria-hidden="true">{icon}</ListItemIcon>
    </MuiRouterLink>
  );
};

export default IconLink;
