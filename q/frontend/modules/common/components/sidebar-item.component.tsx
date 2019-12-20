import React, { useState, useCallback, useEffect } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from '@material-ui/core';
import SidebarLink from './sidebar-link.component';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { map, includes } from 'lodash';

interface IProps {
  routes: Array<{ href: string; icon: JSX.Element; title: string }>;
  icon: JSX.Element;
  title: string;
  moduleRoutes?: string[];
}

const SidebarItem: React.FC<IProps> = ({
  routes,
  moduleRoutes,
  title,
  icon,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(!open), [open, setOpen]);
  const router = useRouter();
  const isActive = includes(moduleRoutes, router.pathname);

  useEffect(() => {
    if (isActive) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <ListItem button={true} onClick={handleOpen}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{title}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} unmountOnExit={true} timeout="auto">
        <List>
          {// @ts-ignore
          map(routes, ({ href, icon, title: subTitle }, index) => (
            <SidebarLink key={index} href={href} nested={true} selected={isActive}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{subTitle}</ListItemText>
            </SidebarLink>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarItem;
