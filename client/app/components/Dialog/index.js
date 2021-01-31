/**
 *
 * Dialog
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';


function useComponentVisible(initialIsVisible, setShowList) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible,
  );
  const ref = useRef(null);

  const handleClickOutside = event => {
    // uses ref to check if outside of Div is clicked
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
      if (setShowList === undefined) {
        console.log('!! onClose function not passed to dialog component. !!');
      } else {
        setShowList(false);
      }
    }
  };

  useEffect(() => {
    // document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      // document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}




const Dialog = ({ open, onClose, className, title, body, actions }) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(open, onClose);

  return open ? (
    <>
      <div className="w-screen h-screen z-40 fixed top-0 left-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className={`fixed left-2/4 z-50 shadow-lg transform -translate-x-2/4 rounded-lg bg-white slide-dialog ${className && className !== '' ? className : 'max-w-xl'
        } `}>
        {title !== undefined && (
          <div className="flex flex-wrap items-center justify-between px-2 py-4 border-b">
            <h3 className="text-xl">{title}</h3>
            <button
              type="button"
              className="text-gray-500"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
        )}
        {body !== undefined && <div className="p-4">{body}</div>}
        {actions !== undefined && (
          <div className="border-t p-2 flex justify-center">
            {actions}
          </div>
        )}
      </div>
    </>
  ) : null;
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.any,
  body: PropTypes.any,
  actions: PropTypes.any,
};

export default Dialog;