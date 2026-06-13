'use client';

import { useState } from 'react';
import { guidance as defaultGuidance, tasks as defaultTasks, Task } from '@/lib/defaultData';

export function AdminApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return defaultTasks;
    try {
      return JSON.parse(localStorage.getItem('nestkeeper-data') || '{}').tasks || defaultTasks;
    } catch {
      return defaultTasks;
    }
  });
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('House');
  const [frequency, setFrequency] = useState<Task['frequency']>('daily');
  const [guidance, setGuidance] = useState('Thank you. Please check this task is fully complete.');
  const homeUrl = typeof window === 'undefined' ? '/home/karl-rosie' : `${window.location.origin}/home/karl-rosie`;

  function save(nextTasks = tasks) {
    localStorage.setItem('nestkeeper-data', JSON.stringify({ tasks: nextTasks, guidance: defaultGuidance }));
  }

  function addTask() {
    if (!title.trim()) return;
    const next = [...tasks, { id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, category, frequency, guidance }];
    setTasks(next);
    save(next);
    setTitle('');
  }

  function removeTask(id: string) {
    const next = tasks.filter(t => t.id !== id);
    setTasks(next);
    save(next);
  }

  return (
    <main className="container" style={{ paddingTop: 26 }}>
      <div className="hero-card">
        <div className="kicker">Client admin</div>
        <h1>Household list editor</h1>
        <p>This simple MVP saves changes in the browser. The permanent helper QR/link is below.</p>
        <div className="card">
          <b>Permanent helper link</b>
          <p>{homeUrl}</p>
          <div style={{ width: 180, height: 180, background: '#fff', border: '1px solid var(--line)', borderRadius: 20, display: 'grid', placeItems: 'center', fontSize: 32 }}>QR</div>
          <p className="small">For launch, paste this URL into any QR generator and print it. Later we will generate the QR inside the app.</p>
        </div>
      </div>

      <section style={{ marginTop: 20 }} className="grid">
        <div className="card">
          <h2>Add task</h2>
          <div className="admin-form">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
            <select value={category} onChange={e => setCategory(e.target.value as Task['category'])}>
              {['House','Kitchen & Food','Bathrooms','Laundry','Plants','Communication','Friday Only'].map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={frequency} onChange={e => setFrequency(e.target.value as Task['frequency'])}>
              <option value="daily">Daily</option>
              <option value="friday">Friday only</option>
            </select>
            <textarea value={guidance} onChange={e => setGuidance(e.target.value)} rows={4} />
            <button className="btn" onClick={addTask}>Add task</button>
          </div>
        </div>
        <div className="card">
          <h2>Current tasks</h2>
          {tasks.map(task => (
            <div className="task" key={task.id}>
              <div style={{ flex: 1 }}><b>{task.title}</b><div className="small">{task.category} · {task.frequency}</div></div>
              <button className="btn secondary" onClick={() => removeTask(task.id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
