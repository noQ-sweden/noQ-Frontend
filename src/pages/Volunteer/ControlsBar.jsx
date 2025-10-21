import React from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { VscFilter } from "react-icons/vsc";

export default function ControlsBar({
  sortOrder,
  onChangeSortOrder,
  categories,
  selectedCategories,
  onToggleCategory,
  organizations = [],
  selectedOrganizations = new Set(),
  onToggleOrganization = () => {},

}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between md:justify-normal gap-3">
        <div className="relative">
          <button
            type="button"
            className="h-9 px-4 rounded-full text-sm text-newGreen border border-newGreen bg-white  flex items-center gap-2"
          >
            <span>Filtrera</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ">
              <VscFilter />
            </span>
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            className="h-9 px-4 rounded-full text-sm border border-newGreen bg-white text-newGreen flex items-center gap-2"
          >
            <span>Sortera</span>
            <span className="inline-flex w-6 items-center justify-center">
              <LuArrowUpDown />
            </span>
          </button>
          <select
            value={sortOrder}
            onChange={(e) => onChangeSortOrder(e.target.value)}
            aria-label="Välj sortering"
            className="absolute inset-0 opacity-0 cursor-pointer"
          >
            <option value="timeAsc">Tid (tidigast först)</option>
            <option value="timeDesc">Tid (senast först)</option>
            <option value="spotsDesc">Flest platser</option>
          </select>
        </div>
      </div>

      {categories?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onToggleCategory(category)}
              className={[
                "h-8 px-3 rounded-full text-sm border shadow-sm",
                selectedCategories.has(category)
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-white text-slate-700 border-slate-300",
              ].join(" ")}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {organizations?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {organizations.map((org) => (
            <button
              key={org}
              onClick={() => onToggleOrganization(org)}
              className={[
                "h-8 px-3 rounded-full text-sm border shadow-sm",
                selectedOrganizations.has(org)
                  ? "bg-slate-50 text-slate-900 border-slate-300"
                  : "bg-white text-slate-700 border-slate-300",
              ].join(" ")}
            >
              {org}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
