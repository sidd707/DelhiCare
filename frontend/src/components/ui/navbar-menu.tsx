
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// MenuItem component
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsClicked(false);
      setActive(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setIsClicked((prev) => !prev); // Toggle the clicked state
    if (!isClicked) setActive(item);
  };

  const handleMouseEnter = () => {
    if (!isClicked) {
      setActive(item);
    }
  };

  return (
    <div
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onClick={handleItemClick}
      className="relative cursor-pointer"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {(active === item || isClicked) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
            >
              <motion.div layout className="w-max h-full p-4">
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Menu component
export const Menu = ({
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      className="relative border border-transparent dark:bg-black dark:border-white/[0.2] bg-stone-200 shadow-input flex justify-center space-x-10 px-2"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <motion.a
      href={href}
      className="flex space-x-2"
      whileHover={{ scale: 1.05  }} // Adjust the scale for hover effect
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </motion.a>
  );
};
// HoveredLink component
export const HoveredLink = ({
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </a>
  );
};

