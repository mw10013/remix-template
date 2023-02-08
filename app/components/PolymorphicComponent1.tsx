import React from 'react'

// https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/

type Color = 'red' | 'green' | 'blue';

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithoutRef on its own
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C
}

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = {},
  OverrideProps = {}
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends React.ElementType,
  Props = {}
> = ExtendableProps<PropsOf<C>, Props>

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = InheritableElementProps<C, Props & AsProp<C>>

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type PolymorphicRef<
  C extends React.ElementType
>
 = React.ComponentPropsWithRef<C>['ref']
/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
>
 = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

// 👇🏾👇🏾 sample usage in `Text` component 👇🏾👇🏾

interface Props {
  children: React.ReactNode
  color?: Color
  font?: 'thin' | 'regular' | 'heavy'
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
}

type TextProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  Props
>

type TextComponent = <C extends React.ElementType = 'span'>(
  props: TextProps<C>,
) => React.ReactElement | null

export const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = 'span'>(
    {
      as,
      children,
      font = 'regular',
      size = '4',
      color = 'blue',
      ...other
    }: TextProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const classes = `${color} ${font} ${size}`
    const Component = as || 'span'

    return (
      <Component {...other} className={classes} ref={ref}>
        {children}
      </Component>
    )
  },
)