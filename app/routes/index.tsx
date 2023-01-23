import { PolymorphicButton, PolymorphicText } from "@/components/PolymorphicComponent";

export default function Index() {
  // const { session } = useOutletContext<ContextType>();
  return (
    <div className="mt-8 max-w-xs mx-auto font-bold text-lg">
      <PolymorphicText as="div" color="indigo" className="text-4xl">
        Remix Template
      </PolymorphicText>
      <div className="flex gap-4 mt-8">
        <PolymorphicButton>Button</PolymorphicButton>
      </div>
    </div>
  );
}
