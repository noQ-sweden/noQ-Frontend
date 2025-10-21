import React, { useEffect, useMemo, useState } from "react";
import CalendarPanel from "./CalendarPanel";
import ControlsBar from "./ControlsBar";
import ActivityList from "./ActivityList";

export default function HittaUppdrag() {
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loadingActivityId, setLoadingActivityId] = useState(null);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedOrganizations, setSelectedOrganizations] = useState(new Set());
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortOrder, setSortOrder] = useState("timeAsc");

  const sameDate = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const addMonths = (date, n) =>
    new Date(date.getFullYear(), date.getMonth() + n, 1);

  // === FETCH ACTIVITIES ===
  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/activities/list");
        if (!response.ok) throw new Error("Kunde inte hämta uppdrag.");

        const data = await response.json();

        // Make sure all data has consistent shape
        const formatted = data.map((item) => ({
          id: item.id ?? item.activity_id,
          title: item.title ?? item.name ?? "Uppdrag",
          category: item.category ?? item.type ?? "",
          org: item.organization ?? item.organisation ?? "",
          start: new Date(item.start ?? item.start_time ?? item.starts_at),
          end: new Date(
            item.end ?? item.end_time ?? item.ends_at ?? item.start
          ),
          address: item.address ?? item.location ?? "",
          spotsLeft: item.available_spots ?? item.remaining ?? 0,
          isRegistered: item.isRegistered ?? item.enrolled ?? false,
        }));

        setActivities(formatted);
      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta uppdrag.");
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  // === FILTERING ===
  const allCategories = useMemo(
    () =>
      Array.from(new Set(activities.map((x) => x.category).filter(Boolean))),
    [activities]
  );
  const allOrganizations = useMemo(
    () => Array.from(new Set(activities.map((x) => x.org).filter(Boolean))),
    [activities]
  );

  const dotsByDay = useMemo(() => {
    const dotsMap = new Map();
    for (const activity of activities) {
      if (selectedCategories.size && !selectedCategories.has(activity.category))
        continue;
      if (
        selectedOrganizations.size &&
        !selectedOrganizations.has(activity.org)
      )
        continue;
      if (showOnlyAvailable && activity.spotsLeft <= 0) continue;
      const key = activity.start.toDateString();
      dotsMap.set(key, (dotsMap.get(key) || 0) + 1);
    }
    return dotsMap;
  }, [
    activities,
    selectedCategories,
    selectedOrganizations,
    showOnlyAvailable,
  ]);

  const activitiesForSelectedDate = useMemo(() => {
    let filtered = activities.filter((a) => sameDate(a.start, selectedDate));
    if (selectedCategories.size)
      filtered = filtered.filter((a) => selectedCategories.has(a.category));
    if (selectedOrganizations.size)
      filtered = filtered.filter((a) => selectedOrganizations.has(a.org));
    if (showOnlyAvailable) filtered = filtered.filter((a) => a.spotsLeft > 0);

    if (sortOrder === "timeAsc") filtered.sort((a, b) => a.start - b.start);
    if (sortOrder === "timeDesc") filtered.sort((a, b) => b.start - a.start);
    if (sortOrder === "spotsDesc")
      filtered.sort((a, b) => b.spotsLeft - a.spotsLeft);

    return filtered;
  }, [
    activities,
    selectedDate,
    selectedCategories,
    selectedOrganizations,
    showOnlyAvailable,
    sortOrder,
  ]);

  //  CALENDAR
  function handleCalendarAction(action) {
    if (action.type === "prevMonth") {
      const newMonth = addMonths(month, -1);
      setMonth(newMonth);
      setSelectedDate(newMonth);
    } else if (action.type === "nextMonth") {
      const newMonth = addMonths(month, 1);
      setMonth(newMonth);
      setSelectedDate(newMonth);
    } else if (action.type === "setDate") {
      setSelectedDate(action.date);
      setMonth(new Date(action.date.getFullYear(), action.date.getMonth(), 1));
    }
  }

  //  FILTER TOGGLES
  const toggleCategory = (category) => {
    const updated = new Set(selectedCategories);
    updated.has(category) ? updated.delete(category) : updated.add(category);
    setSelectedCategories(updated);
  };

  const toggleOrganization = (organization) => {
    const updated = new Set(selectedOrganizations);
    updated.has(organization)
      ? updated.delete(organization)
      : updated.add(organization);
    setSelectedOrganizations(updated);
  };

  //  SIGNUP / CANCEL ACTIONS
  async function handleSignup(activity) {
    try {
      setLoadingActivityId(activity.id);
      const response = await fetch(
        `/api/volunteer/activities/signup/${activity.id}`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Kunde inte boka.");

      setActivities((prev) =>
        prev.map((x) =>
          x.id === activity.id ? { ...x, isRegistered: true } : x
        )
      );
    } catch (err) {
      alert("Kunde inte boka uppdraget.");
    } finally {
      setLoadingActivityId(null);
    }
  }

  async function handleCancel(activity) {
    try {
      setLoadingActivityId(activity.id);
      const response = await fetch(
        `/api/volunteer/activities/cancel/${activity.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Kunde inte avregistrera.");

      setActivities((prev) =>
        prev.map((x) =>
          x.id === activity.id ? { ...x, isRegistered: false } : x
        )
      );
    } catch (err) {
      alert("Kunde inte avregistrera uppdraget.");
    } finally {
      setLoadingActivityId(null);
    }
  }

  const handleInfo = (activity) => {
    alert(`Mer information om ${activity.title}`);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="p-[24px]  max-w-6xl">
        <h1 className="text-2xl  mb-6">Hitta uppdrag</h1>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px),1fr] gap-6">
          <div>
            <CalendarPanel
              month={month}
              selected={selectedDate}
              onAction={handleCalendarAction}
              dotsByDay={dotsByDay}
            />
          </div>

          <div className="space-y-4">
            <ControlsBar
              sortOrder={sortOrder}
              onChangeSortOrder={setSortOrder}
              categories={allCategories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              organizations={allOrganizations}
              selectedOrganizations={selectedOrganizations}
              onToggleOrganization={toggleOrganization}
              showOnlyAvailable={showOnlyAvailable}
              onChangeShowOnlyAvailable={setShowOnlyAvailable}
            />

            <ActivityList
              missions={activitiesForSelectedDate}
              loading={loading}
              error={error}
              onSignup={handleSignup}
              onCancel={handleCancel}
              onInfo={handleInfo}
              loadingId={loadingActivityId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
