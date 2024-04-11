import React from "react";
import rectangleIcon from "../resources/icons/rectangle.svg";
import lineIcon from "../resources/icons/line.svg";
import pencilIcon from "../resources/icons/pencil.svg";
import rubberIcon from "../resources/icons/rubber.svg";
import textIcon from "../resources/icons/text.svg";
import selectIcon from "../resources/icons/selection.svg";
import { toolTypes } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setElements, setToolType } from "./whiteboardSlice";
import { emitClearWhiteboard } from "../socketConn/socketConn";

const Icon = ({ src, type, isEraser }) => {
  const dispatch = useDispatch();
  const selectedToolType = useSelector((state) => state.whiteboard.tool);
  const handleToolChange = () => {
    dispatch(setToolType(type));
  };
  const handleClearCanvas = () => {
    dispatch(setElements([]));
    emitClearWhiteboard();
  };

  return (
    <button
      onClick={isEraser ? handleClearCanvas : handleToolChange}
      className={
        selectedToolType === type ? "menu_button_active" : "menu_button"
      }
    >
      <img width="80%" height="80%" src={src} alt="Menu Icon" />
    </button>
  );
};

const Menu = () => {
  return (
    <div className="menu_container">
      <Icon src={rectangleIcon} type={toolTypes.RECTANGLE} />
      <Icon src={lineIcon} type={toolTypes.LINE} />
      <Icon src={pencilIcon} type={toolTypes.PENCIL} />
      <Icon src={textIcon} type={toolTypes.TEXT} />
      <Icon src={rubberIcon} isEraser />
      <Icon src={selectIcon} type={toolTypes.SELECT} />
    </div>
  );
};

export default Menu;
