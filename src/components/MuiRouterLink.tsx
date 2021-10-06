import React from "react";
import Link, { LinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const isExternal = (url: string) => !url.startsWith("/");

export const RefRouterLink = React.forwardRef<
  HTMLAnchorElement,
  RouterLinkProps
>((props: RouterLinkProps, ref) => {
  return <RouterLink ref={ref} {...props} />;
});

export const MuiRouterLink = React.forwardRef<
  HTMLAnchorElement,
  RouterLinkProps | LinkProps
>((props: RouterLinkProps | LinkProps, ref) => {
  return <Link component={RefRouterLink} ref={ref} {...props} />;
});

export const MuiSafeLink = React.forwardRef<
  HTMLAnchorElement,
  RouterLinkProps | LinkProps
>((props: RouterLinkProps | LinkProps, ref) => {
  if (props.href) {
    const linkProps = isExternal(props.href)
      ? { ...props, target: "_blank", rel: "noopener noreferrer" }
      : props;
    return <Link {...linkProps} />;
  } else {
    return <Link component={RefRouterLink} ref={ref} {...props} />;
  }
});
