/*eslint-disable*/
import { Box, List, ListItemText } from '@mui/material';
import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

const NavItem = ({ to, children, ...rest }) => {
  if (to)
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );

  return <div {...rest}>{children}</div>;
};

const NavSection = ({ navConfig, open, isMobile, handleCloseSidebar, ...rest }) => {
  const { pathname } = useLocation();

  const match = (path) => (open && path ? !!matchPath({ path, exact: false }, pathname) : false);

  return (
    <Box className="NavSection" pt={3} {...rest}>
      <List disablePadding>
        {navConfig.map(({ title, path: oldPath, icon, onClick, sub = [], permission }) => {
          const path = `${oldPath}`;
          const active = !sub.length && match(path);
          const disabled = !open || !!sub.length;

          const handleClick = (e) => {
            if (isMobile) handleCloseSidebar?.();
            onClick?.(e);
          };

          return (
            <React.Fragment key={title}>
              <NavItem
                className={`NavSection-item${active ? ' active' : ''}${disabled ? ' disabled' : ''} hide_underline`}
                onClick={handleClick}
                to={oldPath ? path : undefined}
              >
                <i className={icon} />
                <ListItemText>{title}</ListItemText>
                <div className="NavSection-item__border-right"></div>
              </NavItem>
              {sub.map((z, index) => {
                const { path: oldPath, title } = z;
                const path = `/admin/${oldPath}`;
                const active = match(path);

                return (
                  <NavItem
                    key={index}
                    className={`NavSection-item small${active ? ' active' : ''}${index === 0 ? ' first' : ''}${
                      !open ? ' disabled' : ''
                    } hide_underline`}
                    to={path}
                    onClick={() => {
                      if (isMobile) handleCloseSidebar?.();
                    }}
                  >
                    <div className="NavSection-sub">
                      <i className="fas fa-plus" />
                      {title}
                    </div>
                  </NavItem>
                );
              })}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default NavSection;
