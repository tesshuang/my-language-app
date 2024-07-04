"use client";
import {
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Favorites } from "./Favorites";
import type { Category, Favorite } from "./TranslateHome";
import { SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { DeleteModal } from "./DeleteModal";

export const FavoritesHome = (props: {
  favorites: Favorite[];
  categories: Category[];
}) => {
  const { favorites, categories } = props;

  const [category, setCategory] = useState(categories);
  const [selectedId, setSelectedId] = useState<null | number>(1);

  // Update categories when changes
  useEffect(() => {
    setCategory(categories);
  }, [categories]);

  const selectedWords = favorites.filter((word) =>
    Boolean(
      word.categories.find((category) => category.category.id === selectedId)
    )
  );

  const router = useRouter();

  const handleDeleteAllWords = async () => {
    try {
      await fetch(`/api/favorite`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (e) {
      console.error("Error occurs when handleDeleteAllWords", e);
    }
  };

  const handleDeleteAllCategories = async () => {
    try {
      await fetch(`/api/category`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (e) {
      console.error("Error occurs when handleDeleteAllCategories", e);
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
              colorScheme={`${selectedId === item.id ? "blue" : "gray"}`}
              borderRadius="full"
              mr={1}
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
                <DeleteModal
                  triggerLabel="Clear all saved"
                  modalHeader="Clear all saved"
                  modalContent="This action will remove all saved words from your account."
                  onDelete={handleDeleteAllWords}
                />
                <DeleteModal
                  triggerLabel="Clear all categories"
                  modalHeader="Clear all categories"
                  modalContent="This action will remove all saved categories from your account."
                  onDelete={handleDeleteAllCategories}
                />
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>

      <Favorites
        words={selectedWords}
        category={category}
        setCategory={setCategory}
      />
    </VStack>
  );
};
