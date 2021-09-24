import React from "react";
import Link, { LinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

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
