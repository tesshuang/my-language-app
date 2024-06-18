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
import { useRouter } from "next/navigation";

export const CategoryModal = (props: {
  category: Category[];
  setCategory: (category: Category[]) => void;
  word: Favorite;
}) => {
  const { category, setCategory, word } = props;
  console.log("🚀 ~ word.categories:", word.categories);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  const getCategoryIds: number[] = word.categories.map(
    (item) => item.category.id
  );
  const [categoryIds, setCategoryIds] = useState(getCategoryIds);

  const toast = useToast();
  const router = useRouter();

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

  const handleCategoryIds = (id: number) => {
    const updated = categoryIds.includes(id)
      ? categoryIds.filter((categoryId) => categoryId !== id)
      : [...categoryIds, id];
    setCategoryIds(updated);
  };

  const handleUpdateCategory = async () => {
    // TODO: if no change in categoryIds, no need make fetch
    try {
      const body = {
        categoryIds: categoryIds,
      };
      const response = await fetch(`/api/favorite/${word.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.refresh();
      console.log("🚀 ~ handleUpdateCategory ~ response:", response);
    } catch (e) {
      console.error(e);
      toast({
        description:
          "There is an error when updating the category for this word. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
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
              {category.map((item, key) => {
                return (
                  <ListItem
                    key={key}
                    display="flex"
                    justifyContent="space-between"
                  >
                    {item.name}
                    <CheckCircleIcon
                      color={
                        categoryIds.includes(item.id) ? "blue.500" : "gray.500"
                      }
                      aria-label={`${word.userInput} is${
                        categoryIds.includes(item.id) ? "" : " not"
                      } in category ${item.name}.`}
                      onClick={() => handleCategoryIds(item.id)}
                    />
                  </ListItem>
                );
              })}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button
              display="block"
              margin="auto"
              colorScheme="blue"
              onClick={handleUpdateCategory}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
