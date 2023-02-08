import clsx from "clsx";
import React from "react";

// https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/

type Color = "red" | "green" | "blue";

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithoutRef on its own
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = {},
  OverrideProps = {}
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends React.ElementType,
  Props = {}
> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = InheritableElementProps<C, Props & AsProp<C>>;

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];
/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

// 👇🏾👇🏾 sample usage in `Text` component 👇🏾👇🏾

interface Props {
  children: React.ReactNode;
  color?: Color;
  font?: "thin" | "regular" | "heavy";
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
}

type TextProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  Props
>;

type TextComponent = <C extends React.ElementType = "span">(
  props: TextProps<C>
) => React.ReactElement | null;

export const Text: TextComponent = React.forwardRef(
  function PolymorphicTextComponent<C extends React.ElementType = "span">(
    {
      as,
      children,
      font = "regular",
      size = "4",
      color = "blue",
      ...other
    }: TextProps<C>,
    ref?: PolymorphicRef<C>
  ) {
    const classes = `${color} ${font} ${size}`;
    const Component = as || "span";

    return (
      <Component {...other} className={classes} ref={ref}>
        {children}
      </Component>
    );
  }
);

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors",
};

const variantStyles = {
  solid: {
    cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
};

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: keyof typeof variantStyles;
  color?: keyof (typeof variantStyles)["solid"];
  className?: string;
}

type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, ButtonBaseProps>;

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C>
) => React.ReactElement | null;

export const Button: ButtonComponent = React.forwardRef(
  function PolymorphicButtonComponent<C extends React.ElementType = "button">(
    {
      as,
      children,
      variant = "solid",
      color = "cyan",
      className,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) {
    const Component = as || "button";
    className = clsx(baseStyles[variant], variantStyles[variant][color]);
    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  }
);
