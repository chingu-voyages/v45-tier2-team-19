import * as Select from "@radix-ui/react-select";
import { PiCaretUpDownFill } from "react-icons/pi";
import tableSelect from "./TableSelect.module.css";
import React from "react";

const TableSelect = ({ onValueChange, options, tableFilter }) => {
  return (
    <Select.Root className={tableSelect.root} onValueChange={onValueChange}>
      <Select.Trigger className={tableSelect.trigger} aria-label={tableFilter}>
        <Select.Value placeholder={tableFilter} />
        <Select.Icon className={tableSelect.SelectIcon}>
          <PiCaretUpDownFill size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={tableSelect.SelectContent}>
          <Select.ScrollUpButton className={tableSelect.SelectScrollButton}>
            {/* <ChevronUpIcon /> */}
          </Select.ScrollUpButton>
          <Select.Viewport className={tableSelect.SelectViewport}>
            <Select.Group>
              <Select.Label className={tableSelect.SelectLabel}>
                Filter
              </Select.Label>
              <Select.Separator className={tableSelect.SelectSeperator} />
              {options.map((option) => {
                // console.log(label);
                return (
                  <SelectItem
                    className={tableSelect.SelectItem}
                    key={option}
                    value={option}
                  >
                    {option}
                  </SelectItem>
                );
              })}
            </Select.Group>
            <Select.Separator className={tableSelect.SelectSeperator} />
          </Select.Viewport>
          <Select.ScrollDownButton className={tableSelect.SelectScrollButton}>
            {/* <ChevronDownIcon /> */}
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default TableSelect;

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item className={className} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={tableSelect.SelectItemIndicator}>
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
