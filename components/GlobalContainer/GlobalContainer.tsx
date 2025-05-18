import { Box, BoxProps } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

interface GlobalContainerProps extends Pick<BoxProps, 'sx'> {
  children: PropsWithChildren["children"];
  bgColor?: string;
  className?: string;
  component?: React.ElementType;
}

const GlobalContainer: FC<GlobalContainerProps> = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <Box
      component={props.component ?? ""}
      className={`global-container-wrapper ${className}`}
      {...otherProps}
      sx={{
        maxWidth: "1280px",
        width: "100%",
        margin: "0 auto",
        "@media(max-width: 768px)": {
          width: "calc(100% - var(--mobile-margin-x))",
        },
        "@media(max-width: 1310px) and (min-width: 768px)": {
          width: "calc(100% - (var(--mobile-margin-x)  * 2))",
        },
        ...props?.sx
      }}
    >
      {children}
    </Box>
  )
}

export default GlobalContainer;
