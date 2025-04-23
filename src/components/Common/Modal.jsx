import { Dialog } from "@headlessui/react";
import PropTypes from "prop-types";
import React from "react";

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default function Modal({ isOpen, onClose, children }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="rounded-2xl bg-white p-6 w-full max-w-xl shadow-xl mx-auto">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
