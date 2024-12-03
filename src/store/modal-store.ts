import { create } from "zustand";

// 모달 props의 기본 타입 정의
interface BaseModalProps {
  onClose?: () => void;
}

// 각 모달 컴포넌트의 props 타입 정의
export interface RefreshModalProps extends BaseModalProps {
  remainingRefreshes: number;
  onAccept: () => void;
  onDecline: () => void;
}

// 지원되는 모달 타입들을 유니온 타입으로 정의
export type ModalType = "refresh" | "alert" | "confirm";

// 각 모달 타입별 props 타입 매핑
type ModalPropsMap = {
  refresh: RefreshModalProps;
  alert: BaseModalProps & { message: string };
  confirm: BaseModalProps & { message: string; onConfirm: () => void };
};

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps: ModalPropsMap[ModalType] | null;
  openModal: <T extends ModalType>(type: T, props: ModalPropsMap[T]) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  modalProps: null,
  openModal: (type, props) =>
    set({ isOpen: true, modalType: type, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: null }),
}));

export default useModalStore;
