// import * as Tooltip from "@radix-ui/react-tooltip";
import PropTypes from "prop-types";
// import { PlusIcon } from '@radix-ui/react-icons';
// import "./styles.css";

const TooltipDemo = ({ children }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButton">{children}</button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            Add to library
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

TooltipDemo.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TooltipDemo;
