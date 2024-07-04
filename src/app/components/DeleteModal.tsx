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
} from "@chakra-ui/react";
import { Fragment, ReactNode } from "react";

export const DeleteModal = (props: {
  triggerLabel: string;
  modalHeader: string;
  modalContent: string | ReactNode;
  onDelete: () => Promise<void>;
  onClear?: () => void;
}) => {
  const { triggerLabel, modalHeader, modalContent, onDelete, onClear } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleOnClose = () => {
    onClear?.();
    onClose();
  };

  return (
    <Fragment>
      <Button colorScheme="blue" variant="link" onClick={onOpen}>
        {triggerLabel}
      </Button>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalContent}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={handleOnClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
