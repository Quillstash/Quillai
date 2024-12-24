import React, { useState, useEffect } from 'react';
import { Chip, Input } from '@nextui-org/react';
import { useController, Control } from 'react-hook-form';
import { z } from 'zod';
import ErrorMessage from '../ui/error-message';

// Define the schema
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  title: z.string(),
  keywords: z.array(z.string()).max(8, "Maximum 8 keywords allowed"),
  tone: z.enum([
    "professional",
    "casual",
    "academic",
    "conversational",
    "humorous",
    "persuasive",
  ]),
  targetAudience: z.string(),
  
});

type FormValues = z.infer<typeof formSchema>;

interface KeywordInputProps {
  control: Control<FormValues>;
}

function KeywordInput({ control }: KeywordInputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'keywords',
    control,
    defaultValue: [],
  });

  const keywords = Array.isArray(value) ? value : [];

  const addKeyword = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !keywords.includes(trimmedValue) && keywords.length < 8) {
      onChange([...keywords, trimmedValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleRemoveKeyword = (keywordToDelete: string) => {
    onChange(keywords.filter((keyword: string) => keyword !== keywordToDelete));
  };

  useEffect(() => {
    if (keywords.length === 0) {
      setInputValue('');
    }
  }, [keywords]);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        aria-label="Add a keyword"
        value={inputValue}
        onBlur={addKeyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        isDisabled={keywords.length >= 8}
        description="Press Enter or comma to add a keyword."
        placeholder={keywords.length < 8 ? 'Add a keyword' : 'Max keywords reached'}
        className="max-w-xs"
      />
      <div className="flex flex-wrap gap-2" aria-label="Selected keywords">
        {keywords.map((keyword: string, index: number) => (
          <Chip 
            key={`${keyword}-${index}`} 
            onClose={() => handleRemoveKeyword(keyword)}
            variant="flat"
            className="bg-blue-100 text-blue-800"
          >
            {keyword}
          </Chip>
        ))}
      </div>
      {error && <ErrorMessage message={error.message} className="text-red-500 text-sm mt-1"/>}
    </div>
  );
}

export default KeywordInput;

