import React from "react";
import Link, { LinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { RouteComponentProps } from "react-router";

const isExternal = (url: string) => !url.startsWith("/");

export const RefRouterLink = React.forwardRef<
  HTMLAnchorElement,
  RouterLinkProps
>((props: RouterLinkProps, ref) => {
  return <RouterLink ref={ref} {...props} />;
});

export const MuiRouterLink = React.forwardRef<
  HTMLAnchorElement,
  RouterLinkProps | LinkProps | RouteComponentProps
>((props: RouterLinkProps & LinkProps & RouteComponentProps, ref) => {
  if (!isExternal(props.to)) {
    return <Link component={RefRouterLink} ref={ref} {...props} />;
  } else {
    return (
      <Link
        href={props.to}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {props.children}
      </Link>
    );
  }
});
