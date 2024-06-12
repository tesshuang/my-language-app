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
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";
import { Category } from "@prisma/client";

export const CategoryModal = (props: {
  category: Category[];
  setCategory: (category: Category[]) => void;
}) => {
  const { category, setCategory } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  const handleCreateCategory = () => {
    // setCategory([...category, text]);

    setText("");
    setIsCreate(false);
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
                  <CheckCircleIcon color="blue.500" />
                </ListItem>
              ))}
              <ListItem display="flex" justifyContent="space-between">
                List 2
                <CheckCircleIcon color="gray.500" />
              </ListItem>
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
