import { useEffect } from "react";

export function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export function useClickInside(ref, callback) {
  useEffect(() => {
    function handleClickInside(event) {
      if (ref.current && ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClickInside);
    return () => {
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, [ref]);
}

export function useOnHoverOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener("mouseover", handleClickOutside);
    return () => {
      document.removeEventListener("mouseout", handleClickOutside);
    };
  }, [ref]);
}

export function useOnHoverInside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener("mouseout", handleClickOutside);
    return () => {
      document.removeEventListener("mouseover", handleClickOutside);
    };
  }, [ref]);
}