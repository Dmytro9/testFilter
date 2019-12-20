import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ListItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface IProps {
  href: string;
  nested?: boolean;
  selected?: boolean;
}

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SidebarLink: React.FC<IProps> = ({
  children,
  href,
  nested,
  selected,
}) => {
  const router = useRouter();
  const classes = useStyles({});

  return (
    <Link href={href}>
      <ListItem
        button={true}
        selected={router.pathname === href || selected}
        className={clsx({
          [classes.nested]: nested,
        })}
      >
        {children}
      </ListItem>
    </Link>
  );
};

export default SidebarLink;
