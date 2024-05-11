import { VStack } from "@chakra-ui/react";
import { TranslateHome } from "./components/TranslateHome";

export default function Home() {
  return (
    <VStack as="main" align="stretch" p={4}>
      <TranslateHome />
    </VStack>
  );
}
