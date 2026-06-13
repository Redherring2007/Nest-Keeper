'use client';

import { useState } from 'react';
import { guidance as defaultGuidance, tasks as defaultTasks, Task } from '@/lib/defaultData';

type ShoppingItem = {
  id: string;
  name: string;
  note: string;
  createdAt: string;
  status: 'requested' | 'bought';
};

function loadShopping(): ShoppingItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('nestkeeper-shopping-list') || '[]');
  } catch {
    return [];
  }
}

export function AdminApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return defaultTasks;
    try {
      return JSON.parse(localStorage.getItem('nestkeeper-data') || '{}').tasks || defaultTasks;
    } catch {
      return defaultTasks;
    }
  });
  const [shopping, setShopping] = useState<ShoppingItem[]>(loadShopping);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('House');
  const [frequency, setFrequency] = useState<Task['frequency']>('daily');
  const [guidance, setGuidance] = useState('Thank you. Please check this task is fully complete.');
  const homeUrl = typeof window === 'undefined' ? '/home/karl-rosie' : `${window.location.origin}/home/karl-rosie`;
  const requestedItems = shopping.filter(item => item.status === 'requested');

  function save(nextTasks = tasks) {
    localStorage.setItem('nestkeeper-data', JSON.stringify({ tasks: nextTasks, guidance: defaultGuidance }));
  }

  function saveShopping(next: ShoppingItem[]) {
    setShopping(next);
    localStorage.setItem('nestkeeper-shopping-list', JSON.stringify(next));
  }

  function markBought(id: string) {
    saveShopping(shopping.map(item => item.id === id ? { ...item, status: 'bought' } : item));
  }

  function removeShoppingItem(id: string) {
    saveShopping(shopping.filter(item => item.id !== id));
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
        <div className="grid">
          <div className="card">
            <b>Permanent helper link</b>
            <p>{homeUrl}</p>
            <div style={{ width: 180, height: 180, background: '#fff', border: '1px solid var(--line)', borderRadius: 20, display: 'grid', placeItems: 'center', fontSize: 32 }}>QR</div>
            <p className="small">For launch, paste this URL into any QR generator and print it. Later we will generate the QR inside the app.</p>
          </div>
          <div className="card">
            <span className="badge">Shopping</span>
            <h2>{requestedItems.length} requested items</h2>
            <p>Items added by the helper as out of stock or nearly finished.</p>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 20 }} className="grid">
        <div className="card">
          <h2>Shopping list requests</h2>
          {requestedItems.length === 0 && <p>No shopping requests yet.</p>}
          {requestedItems.map(item => (
            <div className="task" key={item.id}>
              <div style={{ flex: 1 }}>
                <b>{item.name}</b>
                <div className="small">{item.note || 'No extra note'}</div>
                <div className="small">Requested {new Date(item.createdAt).toLocaleString()}</div>
              </div>
              <button className="btn" onClick={() => markBought(item.id)}>Bought</button>
              <button className="btn secondary" onClick={() => removeShoppingItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>

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
