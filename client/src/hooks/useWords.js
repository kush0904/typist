import { useCallback, useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

const generateWords = (count, mode) => {
  if (mode === 'Paragraph') {
    // Replicates faker.random.words(count) -> generates English words
    return faker.word.words(count).toLowerCase();
  } else if (mode === 'Words') {  
    // Replicates faker.random.word(count) -> ignores count, generates 1 English word
    return faker.word.words(1).toLowerCase();
  } else {
    // Replicates faker.lorem.words(count) -> generates Latin words
    return faker.lorem.words(count).toLowerCase();
  }
};

const useWords = (count, mode) => {
  const [words, setWords] = useState("");

  const updateWords = useCallback(() => {
    setWords(generateWords(count, mode));
  }, [count, mode]);

  useEffect(() => {
    updateWords();
  }, [updateWords]);

  return { words, updateWords };
};

export default useWords;
