import { ComponentChildren, createContext, VNode } from "preact";

export interface ModalData {
  isOpen: boolean;
  toggle?: ({ content, value }: { content?: VNode; value?: boolean }) => void;
  content: ComponentChildren;
}
const defaultData: ModalData = {
  isOpen: false,
  content: null,
};

export const ModalContext = createContext(defaultData);
