import {
  PolymorphicButton,
  PolymorphicText,
} from "@/components/PolymorphicComponent";
import { Link } from "@remix-run/react";

export default function Index() {
  // const { session } = useOutletContext<ContextType>();
  return (
    <div className="mt-8 max-w-sm mx-auto font-bold text-lg">
      <PolymorphicText as="div" color="indigo" className="text-4xl">
        Remix Template
      </PolymorphicText>
      <div className="flex gap-4 mt-8">
        <PolymorphicButton>Default</PolymorphicButton>
        <PolymorphicButton as="button" color="cyan" onClick={() => alert("click")}>
          Button
        </PolymorphicButton>
        <PolymorphicButton as={Link} color="cyan" to="#link">
          Link
        </PolymorphicButton>
        <PolymorphicButton as="button" variant="outline" color="cyan" onClick={() => alert("click")}>
          Button
        </PolymorphicButton>
        <PolymorphicButton as={Link} variant="outline" color="cyan" to="#link">
          Link
        </PolymorphicButton>
      </div>
    </div>
  );
}
