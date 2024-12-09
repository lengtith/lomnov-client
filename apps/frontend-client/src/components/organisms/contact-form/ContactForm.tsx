"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { useSpring, animated } from "@react-spring/web";

const ContactForm = ({ propertyUser }: { propertyUser: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const animationProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  });

  return (
    <div>
      <button
        onClick={openModal}
        className="border-olive-green border hover:border-grayish-white py-[5px] w-full rounded-[5px]"
      >
        <span className="font-helvetica text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph font-bold text-charcoal">
          Contact {propertyUser}
        </span>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="absolute inset-0" onClick={closeModal} />
        <animated.div
          style={animationProps}
          className="relative bg-white p-6 rounded-[15px] shadow-lg max-w-lg w-full"
          onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the overlay
        >
          <h2 className="font-bold font-helvetica text-charcoal text-xl mb-4 text-center">
            Contact {propertyUser}
          </h2>
          <form className="w-full">
            <div className="mb-4">
              <label
                className="block text-charcoal text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-charcoal leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-charcoal text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-charcoal leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Your phone number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-charcoal text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-charcoal leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Your message"
                rows={4}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-neutral hover:bg-olive-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Send
              </button>
            </div>
          </form>
        </animated.div>
      </Modal>
    </div>
  );
};

export default ContactForm;
