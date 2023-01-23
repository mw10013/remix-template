import {Text} from "@/components/PolymorphicComponent"

export default function Index() {
  // const { session } = useOutletContext<ContextType>();
  return (
    <div className="mt-8 max-w-xs mx-auto font-bold text-lg">
      <Text as="div" color="indigo" className="text-4xl">Remix Template</Text>
    </div>
  );
}
