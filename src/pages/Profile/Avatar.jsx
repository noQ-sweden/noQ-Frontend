import React, { useState, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export const Avatar = ({ avatar, alt, className = "" }) => {
  const [err, setErr] = useState(false);

  const hasSrc = typeof avatar === "string" && avatar.trim().length > 0;

  useEffect(() => {
    setErr(false);
  }, [avatar]);

  const showFallback = err || !hasSrc;

  return (
    <div
      className={`rounded-full overflow-hidden border border-gray-300 bg-gray-100 shrink-0 aspect-square ${className}`}
    >
      {showFallback ? (
        <span className="flex items-center justify-center w-full h-full text-gray-400 p-[9px]">
          <UserIcon className="w-full h-full" aria-hidden="true" />
        </span>
      ) : (
        <img
          key={avatar}
          src={avatar}
          alt={alt || "avatar"}
          className="w-full h-full object-cover"
          onError={() => {
            console.warn("[avatar] image failed to log ", avatar);
            setErr(true);
          }}
          onLoad={() => {
            if (err) setErr(false);
          }}
        />
      )}
    </div>
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};
