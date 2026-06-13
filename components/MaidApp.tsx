'use client';

import { useMemo, useState } from 'react';
import { guidance as defaultGuidance, tasks as defaultTasks } from '@/lib/defaultData';

type SavedData = {
  tasks?: typeof defaultTasks;
  guidance?: typeof defaultGuidance;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function isFriday() {
  return new Date().getDay() === 5;
}

function loadData(): SavedData {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('nestkeeper-data') || '{}');
  } catch {
    return {};
  }
}

export function MaidApp() {
  const [data] = useState<SavedData>(loadData);
  const tasks = data.tasks || defaultTasks;
  const guidance = data.guidance || defaultGuidance;
  const visibleTasks = useMemo(() => tasks.filter(t => t.frequency === 'daily' || (t.frequency === 'friday' && isFriday())), [tasks]);
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(localStorage.getItem(`nestkeeper-done-${todayKey()}`) || '{}');
    } catch {
      return {};
    }
  });
  const [popup, setPopup] = useState<string | null>(null);
  const completed = visibleTasks.filter(t => done[t.id]).length;

  function toggleTask(id: string, guidanceText: string) {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    localStorage.setItem(`nestkeeper-done-${todayKey()}`, JSON.stringify(next));
    if (!done[id]) setPopup(guidanceText);
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <div className="kicker">Today's home guide</div>
            <h1>Hello<br />Thank you for helping today</h1>
            <p>Complete each task when it is finished. Swipe the guidance cards below for helpful reminders.</p>
            <div className="grid">
              <div className="card"><span className="badge">Today</span><h2>{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</h2></div>
              <div className="card"><span className="badge">Progress</span><h2>{completed} / {visibleTasks.length} complete</h2></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <h2>Checklist</h2>
        {visibleTasks.map(task => (
          <label key={task.id} className={`task ${done[task.id] ? 'done' : ''}`}>
            <input type="checkbox" checked={!!done[task.id]} onChange={() => toggleTask(task.id, task.guidance)} />
            <span>
              <span className="task-title">{task.title}</span>
              <div className="task-meta">{task.category}</div>
            </span>
          </label>
        ))}
      </section>

      <section className="container" style={{ marginTop: 24 }}>
        <h2>Swipe for guidance</h2>
        <div className="guidance">
          {guidance.map(group => (
            <article className="card guide-card" key={group.category}>
              <span className="badge">{group.category}</span>
              <ul>
                {group.items.map(item => <li key={item} style={{ marginBottom: 10 }}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {popup && (
        <div className="modal-backdrop" onClick={() => setPopup(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Thank you</h2>
            <p>{popup}</p>
            <button className="btn" onClick={() => setPopup(null)}>Done</button>
          </div>
        </div>
      )}
    </main>
  );
}
