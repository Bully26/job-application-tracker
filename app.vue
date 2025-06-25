<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body {
  background-color: #f9fafb; /* bg-gray-50 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #4b5563; /* text-gray-600 */
  transition: background-color 0.2s;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: #cbd5e1; /* hover:bg-slate-300 */
}

.sidebar-item.active {
  background-color: #e5e7eb; /* bg-gray-200 */
}

.stat-card,
.note-card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.stat-card:hover,
.note-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.note-card {
  cursor: pointer;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-applied,
.status-accepted {
  background-color: #d1fae5;
  color: #065f46;
}

.status-offer {
  background-color: #cffafe;
  color: #0e7490;
}

.status-interview {
  background-color: #dbeafe;
  color: #1e3a8a;
}

.status-waiting {
  background-color: #fef9c3;
  color: #92400e;
}

.status-rejected,
.status-not-applied,
.status-no-chance {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-withdrawn {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  outline: none;
  border: none;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #ffffff;
  color: #111827;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  outline: none;
}

.btn-secondary:hover {
  background-color: #f9fafb;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: #f1f5f9;
  color: #334155;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field::placeholder {
  color: #4b5563;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  outline: none;
}

.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.checkbox {
  height: 1rem;
  width: 1rem;
  color: #2563eb;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
}
</style>

