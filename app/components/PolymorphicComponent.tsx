import React from "react";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  Props = {}
> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentPropsWithoutRef<C, Props> & { ref?: PolymorphicRef<C> };

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type PolymorphicTextProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, { color?: Rainbow | "black" }>;

type PolymorphicTextComponent = <C extends React.ElementType = "span">(
  props: PolymorphicTextProps<C>
) => React.ReactElement | null;

export const PolymorphicText: PolymorphicTextComponent = React.forwardRef(
  function PolymorphicTextComponent<C extends React.ElementType = "span">(
    { as, color, children, ...props }: PolymorphicTextProps<C>,
    ref?: PolymorphicRef<C>
  ) {
    const Component = as || "span";
    const style = color ? { style: { color } } : {};
    return (
      <Component {...style} {...props} ref={ref}>
        {children}
      </Component>
    );
  }
);

// type PolymorphicButtonProps<C extends React.ElementType> =
