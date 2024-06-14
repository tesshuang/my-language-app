import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  List,
  ListItem,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";
import { Category, Favorite } from "./TranslateHome";

export const CategoryModal = (props: {
  category: Category[];
  setCategory: (category: Category[]) => void;
  word: Favorite;
}) => {
  const { category, setCategory, word } = props;
  console.log("🚀 ~ word:", word.categories);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  const toast = useToast();

  const handleCreateCategory = async () => {
    try {
      const body = {
        name: text,
      };
      const response = await fetch(`/api/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const { data }: { data: Category } = await response.json();

      setCategory([...category, data]);
      setText("");
      setIsCreate(false);
    } catch (e) {
      console.error(e);
      toast({
        description: "There is an error when creating. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Fragment>
      <InfoIcon
        tabIndex={0}
        color="gray.500"
        aria-label="update the status"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              colorScheme="blue"
              variant="outline"
              display="block"
              margin="auto"
              onClick={() => setIsCreate(true)}
            >
              New category
            </Button>
            {isCreate && (
              <Flex my={2}>
                <Input
                  flex="1"
                  placeholder="Add new category"
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  ml={2}
                  colorScheme="blue"
                  onClick={handleCreateCategory}
                >
                  Create
                </Button>
              </Flex>
            )}
            <List spacing={3}>
              {category.map((item, key) => (
                <ListItem
                  key={key}
                  display="flex"
                  justifyContent="space-between"
                >
                  {item.name}
                  <CheckCircleIcon
                    color={
                      word.categories[0].category.name === item.name
                        ? "blue.500"
                        : "gray.500"
                    }
                  />
                </ListItem>
              ))}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button
              display="block"
              margin="auto"
              colorScheme="blue"
              onClick={onClose}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
