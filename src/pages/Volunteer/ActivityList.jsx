import React from "react";

const formatDate = new Intl.DateTimeFormat("sv-SE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const formatTime = new Intl.DateTimeFormat("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
});

function categoryBadgeClasses(category) {
  if ((category || "").toLowerCase() === "förpackning") {
    return "bg-emerald-100 text-emerald-800";
  }
  return "bg-amber-100 text-amber-800";
}

function ActivityCard({
  activity,
  onSignup,
  onCancel,
  onInfo,
  loadingActivityId,
}) {
  const isBusy = loadingActivityId === activity.id;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="h-2 bg-slate-100" />

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-900">{activity.title}</h3>
          {activity.category && (
            <span
              className={`text-xs px-3 py-1 rounded-full border border-transparent ${categoryBadgeClasses(
                activity.category
              )}`}
            >
              {activity.category}
            </span>
          )}
        </div>

        <div className="mt-3 space-y-1.5 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span aria-hidden className="inline-block">
              🗓️
            </span>
            <span>{formatDate.format(activity.start)}</span>
            <span className="mx-2">•</span>
            <span aria-hidden className="inline-block">
              🕒
            </span>
            <span>
              {formatTime.format(activity.start)} –{" "}
              {formatTime.format(activity.end)}
            </span>
          </div>

          {activity.address && (
            <div className="flex items-center gap-2">
              <span aria-hidden className="inline-block">
                📍
              </span>
              <span>{activity.address}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          {activity.isRegistered ? (
            <button
              disabled={isBusy}
              onClick={() => onCancel(activity)}
              className="px-5 h-10 rounded-full font-medium border border-rose-300 text-rose-700 bg-white hover:bg-rose-50 disabled:opacity-60"
            >
              {isBusy ? "Avbryter…" : "Avregistrera"}
            </button>
          ) : (
            <button
              disabled={activity.spotsLeft <= 0 || isBusy}
              onClick={() => onSignup(activity)}
              className={[
                "px-5 h-10 rounded-full font-medium",
                activity.spotsLeft > 0
                  ? "bg-emerald-900 text-white hover:brightness-95"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed",
                isBusy && "opacity-60",
              ].join(" ")}
            >
              {isBusy ? "Bokar…" : "Boka"}
            </button>
          )}

          <button
            onClick={() => onInfo(activity)}
            className="px-4 h-10 rounded-full border border-slate-300 text-slate-800 font-medium hover:bg-slate-50 inline-flex items-center gap-2"
          >
            <span>Mer information</span>
            <span aria-hidden>›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ActivityList({
  missions,
  loading,
  error,
  onSignup,
  onCancel,
  onInfo,
  loadingId: loadingActivityId,
}) {
  if (loading)
    return <div className="text-sm text-slate-500">Laddar uppdrag…</div>;
  if (error) return <div className="text-sm text-rose-600">Fel: {error}</div>;
  if (!missions?.length)
    return (
      <div className="text-sm text-slate-500">Inga uppdrag för vald dag.</div>
    );

  return (
    <div className="space-y-4">
      {missions.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onSignup={onSignup}
          onCancel={onCancel}
          onInfo={onInfo}
          loadingActivityId={loadingActivityId}
        />
      ))}
    </div>
  );
}
