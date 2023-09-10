import * as Select from "@radix-ui/react-select";
import { LuFilter } from "react-icons/lu";
import { PiCaretUpDownFill } from "react-icons/pi";
import tableSelect from "./TableSelect.module.css";
import React from "react";

const TableSelect = ({ onValueChange, options, tableFilter }) => {
  return (
    // <Select.Root onValueChange={onValueChange}>
    //   <Select.Trigger className={tableSelect.trigger} aria-label={tableFilter}>
    //     {/* <Select.Value placeholder={tableFilter} aria-placeholder /> */}
    //     <Select.Icon>
    //       <LuFilter stroke="#283845" />
    //     </Select.Icon>
    //   </Select.Trigger>

    //   <Select.Portal>
    //     <Select.Content
    //       position="popover"
    //       className={tableSelect.SelectContent}
    //     >
    //       <Select.ScrollUpButton />
    //       <Select.Viewport className={tableSelect.SelectViewport}>
    //         <Select.Group>
    //           <Select.Label>{"jj"}</Select.Label>
    //           {options.map((option) => {
    //             return (
    //               <Select.Item
    //                 className={tableSelect.SelectItem}
    //                 value={option}
    //                 key={option}
    //               >
    //                 <Select.ItemText>{option}</Select.ItemText>
    //                 <Select.ItemIndicator />
    //               </Select.Item>
    //             );
    //           })}
    //         </Select.Group>

    //         <Select.Separator />
    //       </Select.Viewport>
    //       <Select.ScrollDownButton />
    //       <Select.Arrow />
    //     </Select.Content>
    //   </Select.Portal>
    // </Select.Root>
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

const SelectDemo = ({ label, options, value, onValueChange, additional }) => (
  <Select.Root className={tableSelect.root} onValueChange={onValueChange}>
    <Select.Trigger className={tableSelect.SelectTrigger} aria-label={label}>
      <Select.Value placeholder={label} />
      <Select.Icon className={tableSelect.SelectIcon}>
        {/* <PiCaretUpDownFill size={16} /> */}
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className={tableSelect.SelectContent}>
        <Select.ScrollUpButton className={tableSelect.SelectScrollButton}>
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className={tableSelect.SelectViewport}>
          <Select.Group>
            <Select.Label className={tableSelect.SelectLabel}>
              {label}
            </Select.Label>
            <Select.Separator className={tableSelect.SelectSeperator} />
            {options.map((option) => {
              console.log(label);
              return (
                <SelectItem
                  className={tableSelect.SelectItem}
                  key={option}
                  value={option}
                >
                  {/Year|Mass/.test(label) ? option.replace(" ", "-") : option}
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
