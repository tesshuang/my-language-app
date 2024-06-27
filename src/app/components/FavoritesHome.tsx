"use client";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Favorites } from "./Favorites";
import type { Category, Favorite } from "./TranslateHome";
import { SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export const FavoritesHome = (props: {
  favorites: Favorite[];
  categories: Category[];
}) => {
  const { favorites, categories } = props;

  const [category, setCategory] = useState(categories);
  const [selectedId, setSelectedId] = useState<null | number>(null);

  const selectedWords = favorites.filter((word) =>
    Boolean(
      word.categories.find((category) => category.category.id === selectedId)
    )
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleDeleteAllWords = async () => {
    try {
      await fetch(`/api/favorite`, {
        method: "DELETE",
      });
      router.refresh();
      onClose();
    } catch (e) {
      console.error("Error occurs when handleDeleteAllWords", e);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2} justifyContent={"space-between"}>
        <Box>
          {category.map((item) => (
            <Tag
              size="md"
              key={item.id}
              variant="solid"
              colorScheme="blue"
              borderRadius="full"
            >
              <button onClick={() => setSelectedId(item.id)}>
                {item.name}
              </button>
            </Tag>
          ))}
        </Box>
        <Popover>
          <PopoverTrigger>
            <IconButton
              isRound={true}
              minW={"min-content"}
              height={"fit-content"}
              colorScheme="gray"
              aria-label="Edit categories"
              size="sm"
              p={2}
              icon={<SettingsIcon />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Settings</PopoverHeader>
            <PopoverBody>
              <VStack spacing={"4"} alignItems={"flex-start"} p={"2"}>
                <Button colorScheme="blue" variant="link" onClick={onOpen}>
                  Clear all saved
                </Button>
                <Button colorScheme="blue" variant="link" onClick={onOpen}>
                  Clear all categories
                </Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>

      <Favorites
        words={selectedId ? selectedWords : favorites}
        category={category}
        setCategory={setCategory}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete all words</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This action will remove all saved words from your account.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDeleteAllWords}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
