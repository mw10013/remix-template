// https://fettblog.eu/typescript-react-generic-forward-refs/
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012

import React from "react";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
};
function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <>
            <button onClick={(el) => props.onSelect(item)}>Select</button>
            {item}
          </>
        </li>
      ))}
    </ul>
  );
}

export const ClickableList = React.forwardRef(ClickableListInner);

export function Example() {
  const ref = React.useRef<HTMLUListElement>(null);
  return (
    <div>
      <div className="text-lg text-gray-600 mt-6">GenericForwardRef</div>
      <ClickableList
        items={[1, 2, 3]}
        onSelect={(item) => alert(`Clicked item ${item}`)}
        ref={ref}
      ></ClickableList>
    </div>
  );
}
