import React from "react";

// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
// https://raw.githubusercontent.com/ohansemmanuel/polymorphic-react-component/master/06.tsx

type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type TextProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  { color?: Rainbow | "black" }
>;

type TextComponent = <C extends React.ElementType = "span">(
  props: TextProps<C>
) => React.ReactElement | null;

// eslint-disable-next-line react/display-name
export const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = "span">(
    { as, color, children }: TextProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "span";

    const style = color ? { style: { color } } : {};

    return (
      <Component {...style} ref={ref}>
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

type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  { variant?: keyof typeof variantStyles }
>;

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C>
) => React.ReactElement | null;

export const Button: ButtonComponent = React.forwardRef(
  function PolymorphicButton<C extends React.ElementType = "button">(
    { as, variant = "solid", ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) {
    const Component = as ?? "button";
    return (
      <Component
        {...props}
        className={`${baseStyles[variant]} ${variantStyles[variant]["gray"]}`}
        ref={ref}
      />
    );
  }
);

export function Example() {
  return (
    <div>
      <div className="text-lg text-gray-600 mt-6">
        PolymorphicComponentOhans Example
      </div>
      <div className="grid grid-flow-col auto-cols-min- gap-4 mt-4">
        <Text color="violet">Text</Text>
        <Button>Default</Button>
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button as="a" href="#">
          Default Link
        </Button>
        <Button as="a" href="#" variant="outline">
          Default Link
        </Button>
      </div>
    </div>
  );
}
