"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X as RemoveIcon } from "lucide-react";
import React, {
  useState,
  useCallback,
  useEffect,
  createContext,
  forwardRef,
} from "react";

const SPLITTER_REGEX = /[\n#?=&\t,./-]+/;
const FORMATTING_REGEX = /^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g;

const TagInputContext = createContext(null);

export const TagsInput = forwardRef(
  (
    {
      children,
      value,
      onValueChange,
      placeholder,
      maxItems,
      minItems,
      className,
      dir,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const [disableInput, setDisableInput] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [isValueSelected, setIsValueSelected] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const parseMinItems = minItems ?? 0;
    const parseMaxItems = maxItems ?? Infinity;

    const onValueChangeHandler = useCallback(
      (val) => {
        if (!value.includes(val) && value.length < parseMaxItems) {
          onValueChange([...value, val]);
        }
      },
      [value, parseMaxItems, onValueChange]
    );

    const RemoveValue = useCallback(
      (val) => {
        if (value.includes(val) && value.length > parseMinItems) {
          onValueChange(value.filter((item) => item !== val));
        }
      },
      [value, parseMinItems, onValueChange]
    );

    const handlePaste = useCallback(
      (e) => {
        e.preventDefault();
        const tags = e.clipboardData.getData("text").split(SPLITTER_REGEX);
        const newValue = [...value];
        tags.forEach((item) => {
          const parsedItem = item.replaceAll(FORMATTING_REGEX, "").trim();
          if (
            parsedItem.length > 0 &&
            !newValue.includes(parsedItem) &&
            newValue.length < parseMaxItems
          ) {
            newValue.push(parsedItem);
          }
        });
        onValueChange(newValue);
        setInputValue("");
      },
      [value, parseMaxItems, onValueChange]
    );

    const handleSelect = useCallback(
      (e) => {
        const target = e.currentTarget;
        const selection = target.value.substring(
          target.selectionStart ?? 0,
          target.selectionEnd ?? 0
        );

        setSelectedValue(selection);
        setIsValueSelected(selection === inputValue);
      },
      [inputValue]
    );

    useEffect(() => {
      setDisableButton(value.length - 1 < parseMinItems);
      setDisableInput(value.length + 1 > parseMaxItems);
    }, [value, parseMinItems, parseMaxItems]);

    const handleKeyDown = useCallback(
      (e) => {
        e.stopPropagation();

        const moveNext = () =>
          setActiveIndex((prev) =>
            prev + 1 > value.length - 1 ? -1 : prev + 1
          );
        const movePrev = () =>
          setActiveIndex((prev) =>
            prev - 1 < 0 ? value.length - 1 : prev - 1
          );
        const moveCurrent = () =>
          setActiveIndex((prev) =>
            prev - 1 <= 0 ? (value.length - 1 === 0 ? -1 : 0) : prev - 1
          );

        const target = e.currentTarget;

        switch (e.key) {
          case "ArrowLeft":
            if (dir === "rtl") {
              if (value.length > 0 && activeIndex !== -1) moveNext();
            } else {
              if (value.length > 0 && target.selectionStart === 0) movePrev();
            }
            break;
          case "ArrowRight":
            if (dir === "rtl") {
              if (value.length > 0 && target.selectionStart === 0) movePrev();
            } else {
              if (value.length > 0 && activeIndex !== -1) moveNext();
            }
            break;
          case "Backspace":
          case "Delete":
            if (value.length > 0) {
              if (activeIndex !== -1 && activeIndex < value.length) {
                RemoveValue(value[activeIndex]);
                moveCurrent();
              } else if (target.selectionStart === 0) {
                if (selectedValue === inputValue || isValueSelected)
                  RemoveValue(value[value.length - 1]);
              }
            }
            break;
          case "Escape":
            setActiveIndex((prev) => (prev === -1 ? value.length - 1 : -1));
            break;
          case "Enter":
            if (inputValue.trim() !== "") {
              e.preventDefault();
              onValueChangeHandler(inputValue);
              setInputValue("");
            }
            break;
        }
      },
      [
        activeIndex,
        value,
        inputValue,
        dir,
        isValueSelected,
        selectedValue,
        RemoveValue,
        onValueChangeHandler,
      ]
    );

    const handleChange = useCallback(
      (e) => setInputValue(e.currentTarget.value),
      []
    );

    return (
      <TagInputContext.Provider
        value={{
          value,
          onValueChange,
          inputValue,
          setInputValue,
          activeIndex,
          setActiveIndex,
        }}
      >
        <div
          {...props}
          ref={ref}
          dir={dir}
          className={cn(
            "flex items-center flex-wrap gap-1 p-1 rounded-md bg-background overflow-hidden border",
            activeIndex === -1 && "focus-within:ring-ring",
            className
          )}
        >
          {value.map((item, index) => (
            <Badge
              key={item}
              tabIndex={activeIndex !== -1 ? 0 : activeIndex}
              aria-disabled={disableButton}
              data-active={activeIndex === index}
              className={cn(
                "relative px-1 rounded flex items-center gap-1 data-[active='true']:ring-2 data-[active='true']:ring-muted-foreground truncate aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
              )}
              variant="secondary"
            >
              <span className="text-xs">{item}</span>
              <button
                type="button"
                aria-label={`Remove ${item} option`}
                disabled={disableButton}
                onClick={() => RemoveValue(item)}
                className="disabled:cursor-not-allowed"
              >
                <span className="sr-only">Remove {item} option</span>
                <RemoveIcon className="h-4 w-4 hover:stroke-destructive" />
              </button>
            </Badge>
          ))}
          <Input
            tabIndex={0}
            aria-label="input tag"
            disabled={disableInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "outline-0 border-none h-7 min-w-fit flex-1 placeholder:text-muted-foreground px-1 ring-0 focus:ring-none",
              activeIndex !== -1 && "caret-transparent"
            )}
          />
        </div>
      </TagInputContext.Provider>
    );
  }
);

TagsInput.displayName = "TagsInput";
