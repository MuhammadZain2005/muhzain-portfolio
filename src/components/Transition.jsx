import { AnimatePresence, usePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const Transition = ({ children, in: show, timeout = 0, ...props }) => {
  const enterTimeout = useRef();
  const exitTimeout = useRef();

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeout.current);
    } else {
      clearTimeout(enterTimeout.current);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <TransitionContent
          enterTimeout={enterTimeout}
          exitTimeout={exitTimeout}
          in={show}
          timeout={timeout}
          {...props}
        >
          {children}
        </TransitionContent>
      )}
    </AnimatePresence>
  );
};

const TransitionContent = ({
  children,
  timeout = 0,
  enterTimeout,
  exitTimeout,
  in: show,
}) => {
  const [status, setStatus] = useState('exited');
  const [isPresent, safeToRemove] = usePresence();
  const [hasEntered, setHasEntered] = useState(false);
  const splitTimeout = typeof timeout === 'object';
  const nodeRef = useRef(null);

  useEffect(() => {
    if (hasEntered || !show) return;

    const actualTimeout = splitTimeout ? timeout.enter : timeout;

    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);

    setHasEntered(true);
    setStatus('entering');

    enterTimeout.current = setTimeout(() => {
      setStatus('entered');
    }, actualTimeout);
  }, [timeout, show, hasEntered, splitTimeout]);

  useEffect(() => {
    if (isPresent && show) return;

    const actualTimeout = splitTimeout ? timeout.exit : timeout;

    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);

    setStatus('exiting');

    exitTimeout.current = setTimeout(() => {
      setStatus('exited');
      safeToRemove?.();
    }, actualTimeout);
  }, [isPresent, safeToRemove, timeout, show, splitTimeout]);

  return children({ status, nodeRef });
};
