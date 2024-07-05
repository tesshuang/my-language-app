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
  IconButton,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { Category, Favorite } from "./TranslateHome";
import { useRouter } from "next/navigation";

export const CategoryModal = (props: {
  category: Category[];
  word: Favorite;
}) => {
  const { category, word } = props;

  const intialCategoryIds: number[] = word.categories.map(
    (item) => item.category.id
  );

  const [text, setText] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [categoryIds, setCategoryIds] = useState(intialCategoryIds);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const handleCreateCategory = async () => {
    try {
      await fetch(`/api/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: text }),
      });

      setText("");
      setIsCreate(false);
      router.refresh();
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
    const addCategoryIds = categoryIds.filter(
      (number) => !intialCategoryIds.includes(number)
    );
    const removeCategoryIds = intialCategoryIds.filter(
      (number) => !categoryIds.includes(number)
    );

    if (addCategoryIds.length !== 0 || removeCategoryIds.length !== 0) {
      try {
        const body = {
          addCategoryIds,
          removeCategoryIds,
        };
        await fetch(`/api/favorite/${word.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        router.refresh();
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
    }
    onClose();
  };

  const handleOnClose = () => {
    setCategoryIds(intialCategoryIds);
    onClose();
  };

  return (
    <Fragment>
      <IconButton
        isRound={true}
        minW={"min-content"}
        height={"fit-content"}
        variant="solid"
        colorScheme={"white"}
        aria-label={"update the word status"}
        icon={<InfoIcon color="gray.500" />}
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        motionPreset="slideInBottom"
      >
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
              onClick={() => setIsCreate(!isCreate)}
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
              {category.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                  >
                    {item.name}
                    <IconButton
                      isRound={true}
                      size="xs"
                      variant="solid"
                      colorScheme={
                        categoryIds.includes(item.id) ? "blue" : "gray"
                      }
                      aria-label={`${word.userInput} is${
                        categoryIds.includes(item.id) ? "" : " not"
                      } in category ${item.name}.`}
                      icon={<CheckIcon />}
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
