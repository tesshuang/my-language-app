import { VStack, Heading, Box } from "@chakra-ui/react";
import { Translation } from "./components/Translation";

export default function Home() {
  return (
    <VStack as="main" align="stretch" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="3xl">
          Translation
        </Heading>
        <Translation />
      </VStack>
      <section>
        <Heading as="h1" size="3xl">
          Recent
        </Heading>
      </section>
    </VStack>
  );
}
