import React from "react";
import * as Select from "@radix-ui/react-select";
import select from "./Select.module.css";
// import classnames from "classnames";
import { PiCaretUpDownFill } from "react-icons/pi";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectDemo = ({ label, options, value, onValueChange, additional }) => (
  <Select.Root className={select.root} onValueChange={onValueChange}>
    <Select.Trigger className={select.SelectTrigger} aria-label={label}>
      <Select.Value placeholder={label} />
      <Select.Icon className={select.SelectIcon}>
        <PiCaretUpDownFill size={16} />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className={select.SelectContent}>
        <Select.ScrollUpButton className={select.SelectScrollButton}>
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className={select.SelectViewport}>
          <Select.Group>
            <Select.Label className={select.SelectLabel}>{label}</Select.Label>
            <Select.Separator className={select.SelectSeperator} />
            {options.map((option) => {
              return (
                <SelectItem
                  className={select.SelectItem}
                  key={option}
                  value={option}
                >
                  {option}
                </SelectItem>
              );
            })}
          </Select.Group>
          <Select.Separator className={select.SelectSeperator} />
        </Select.Viewport>
        <Select.ScrollDownButton className={select.SelectScrollButton}>
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item className={className} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={select.SelectItemIndicator}>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectDemo;
