import { useCallback, useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

const generateWords = (count, mode) => {
  if (mode === 'Paragraph') {
    return faker.random.words(count).toLowerCase();
  } else if (mode === 'Words') {  
    return faker.random.word(count).toLowerCase();
  } else {
    return faker.lorem.words(count).toLowerCase();
  }
};

const useWords = (count, mode) => {
  const [words, setWords] = useState("");

  useEffect(() => {
    setWords(generateWords(count, mode));
  }, [count, mode]);

  const updateWords = useCallback(() => {
    setWords(generateWords(count, mode));
  }, [count, mode]);

  return { words, updateWords };
};

export default useWords;
