import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div<{
  position: "center" | "underButton" | "right";
  buttonRect?: DOMRect | null;
  height?: string;
  width?: string;
  className?: string;
}>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 100;
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.className && `class: ${props.className};`}

  ${(props) =>
    props.position === "center" &&
    `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}

  ${(props) =>
    props.position === "right" &&
    `
    top: 0;
    right: 0;
    height: 100vh;
    transform: none;
    border-radius: 0px; // Remove border-radius for right alignment
  `}

  ${(props) =>
    props.position === "underButton" &&
    props.buttonRect &&
    `
    top: ${props.buttonRect.bottom + window.scrollY}px;
    left: ${props.buttonRect.left + window.scrollX}px;
    transform: none;
    border-radius: 8px important;
  `}

 /* Add vertical scroll for overflowing content */
   overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  //   border-bottom: 1px solid #e0e0e0;
`;

const HeaderText = styled.div<{ align?: "center" | "left" | "right" }>`
  margin: 0;
  font-size: 18px;
  color: #333;
  text-align: ${(props) => props.align || "left"};
`;

const CloseButton = styled.div`
  cursor: pointer;
  color: #333;
`;

const ModalContentWrapper = styled.div`
  padding: 16px;
`;

interface ModalProps {
  /**
   * Determines if the modal is visible.
   */
  isOpen: boolean;
  /**
   * Callback function to close the modal.
   */
  onClose: () => void;
  /**
   * Content to be displayed inside the modal.
   */
  children: React.ReactNode;
  /**
   * Positioning of the modal.
   */
  position: "center" | "underButton" | "right";
  /**
   * Reference to the button element used for positioning when `position` is `underButton`.
   */
  buttonRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Height of the modal.
   */
  height?: string;
  /**
   * Width of the modal.
   */
  width?: string;
  /**
   * Custom class names for the modal wrapper.
   */
  className?: string;
  /**
   * Content to display in the modal header.
   */
  headerText?: string | React.ReactNode;

  // hide or show X close btn
  closeXBtn?: boolean;
}

/**
 * Modal Component
 *
 * A reusable, flexible modal dialog for React applications. It supports multiple positioning options
 * (`center`, `underButton`, `right`), and allows custom header content, including icons and text.
 * The modal also dynamically positions itself based on the location of a referenced button when the `underButton`
 * position is selected.
 */

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  position,
  buttonRef,
  height,
  width,
  className,
  headerText,
  closeXBtn = false, 
}) => {
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (position === "underButton" && buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // console.log(rect);
      setButtonRect(rect);
    }
  }, [position, buttonRef]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper
        position={position}
        buttonRect={buttonRect}
        height={height}
        width={width}
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {position === "right" && (
          <Header
            style={{ backgroundColor: "#6278FF", height: "7px !important" }}
          />
        )}
        <ModalContentWrapper>
          <Header>
            {headerText && <HeaderText>{headerText}</HeaderText>}
            {closeXBtn && <CloseButton onClick={onClose}>
              <IoClose size={30} />
            </CloseButton>}
          </Header>
          {children}
        </ModalContentWrapper>
      </ModalWrapper>
    </Overlay>,
    document.body
  );
};

export default Modal;
