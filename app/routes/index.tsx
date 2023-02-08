import {
  PolymorphicButton,
  PolymorphicText,
} from "@/components/PolymorphicComponent";
import {
  Text as PolymorphicText1,
  Button as PolymorphicButton1,
} from "@/components/PolymorphicComponent1";
import { Link } from "@remix-run/react";

export default function Index() {
  // const { session } = useOutletContext<ContextType>();
  return (
    <div className="mt-8 max-w-sm mx-auto font-bold text-lg">
      <PolymorphicText as="div" color="indigo" className="text-4xl">
        Remix Template
      </PolymorphicText>
      <div className="flex flex-col w-32 mx-auto gap-4 mt-8">
        <PolymorphicText1 color="green" font="heavy" size="8">
          PolymorphicText1
        </PolymorphicText1>
        <PolymorphicButton1>Default1</PolymorphicButton1>
        <PolymorphicButton>Default</PolymorphicButton>
        <PolymorphicButton
          as="button"
          color="cyan"
          onClick={() => alert("click")}
        >
          Button
        </PolymorphicButton>
        <PolymorphicButton as={Link} color="cyan" to="#link">
          Link
        </PolymorphicButton>
        <PolymorphicButton
          as="button"
          variant="outline"
          onClick={() => alert("click")}
        >
          Button
        </PolymorphicButton>
        <PolymorphicButton as={Link} variant="outline" to="#link">
          Link
        </PolymorphicButton>
        <PolymorphicButton
          as="button"
          variant="outline"
          color="gray"
          className="py-8"
          onClick={() => alert("click")}
        >
          Button
        </PolymorphicButton>
        <PolymorphicButton
          as={Link}
          variant="outline"
          color="gray"
          className="py-8"
          to="#link"
        >
          Link
        </PolymorphicButton>
      </div>
    </div>
  );
}
