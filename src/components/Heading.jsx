export const Heading = ({
  children,
  level = 1,
  as,
  align = 'auto',
  weight = 'medium',
  className = '',
  ...rest
}) => {
  const clampedLevel = Math.min(Math.max(level, 0), 5);
  const Component = as || `h${Math.max(clampedLevel, 1)}`;

  return (
    <Component
      className={`heading ${className}`}
      data-align={align}
      data-weight={weight}
      data-level={clampedLevel}
      {...rest}
    >
      {children}
    </Component>
  );
};
