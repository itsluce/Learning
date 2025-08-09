import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, Tag, Trash2, Edit3, Check, X, Star, Filter, Search, Plus, ChevronDown, Archive, BarChart3, CheckCircle2, Circle, AlertCircle, ChevronRight, Folder, Hash, User, Bell, Moon, Sun, Layout, List, Grid3x3 } from 'lucide-react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState(['Personal', 'Work', 'Shopping', 'Health', 'Learning']);
    const [darkMode, setDarkMode] = useState(false);
    const [viewMode, setViewMode] = useState('list');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [showAddTask, setShowAddTask] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showStats, setShowStats] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: 'Personal',
        priority: 'medium',
        dueDate: '',
        dueTime: '',
        tags: [],
        subtasks: [],
        recurring: 'none',
        reminder: false
    });
    const [tagInput, setTagInput] = useState('');
    const [subtaskInput, setSubtaskInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('advancedTodos');
        if (saved) {
            setTasks(JSON.parse(saved));
        }
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            setDarkMode(JSON.parse(savedDarkMode));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('advancedTodos', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const addTask = () => {
        if (!newTask.title.trim()) return;

        const task = {
            id: Date.now(),
            ...newTask,
            completed: false,
            archived: false,
            createdAt: new Date().toISOString(),
            completedAt: null,
            subtasks: newTask.subtasks.map(st => ({ id: Date.now() + Math.random(), text: st, completed: false }))
        };

        setTasks([...tasks, task]);
        resetForm();
        setShowAddTask(false);
    };

    const resetForm = () => {
        setNewTask({
            title: '',
            description: '',
            category: 'Personal',
            priority: 'medium',
            dueDate: '',
            dueTime: '',
            tags: [],
            subtasks: [],
            recurring: 'none',
            reminder: false
        });
        setTagInput('');
        setSubtaskInput('');
        setEditingTask(null);
    };

    const updateTask = () => {
        setTasks(tasks.map(task =>
            task.id === editingTask ? { ...task, ...newTask } : task
        ));
        resetForm();
        setShowAddTask(false);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        if (selectedTask?.id === id) setSelectedTask(null);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null }
                : task
        ));
    };

    const toggleSubtask = (taskId, subtaskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? {
                    ...task,
                    subtasks: task.subtasks.map(st =>
                        st.id === subtaskId ? { ...st, completed: !st.completed } : st
                    )
                }
                : task
        ));
    };

    const archiveTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, archived: !task.archived } : task
        ));
    };

    const addTag = () => {
        if (tagInput.trim() && !newTask.tags.includes(tagInput.trim())) {
            setNewTask({ ...newTask, tags: [...newTask.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setNewTask({ ...newTask, tags: newTask.tags.filter(t => t !== tag) });
    };

    const addSubtask = () => {
        if (subtaskInput.trim()) {
            setNewTask({ ...newTask, subtasks: [...newTask.subtasks, subtaskInput.trim()] });
            setSubtaskInput('');
        }
    };

    const removeSubtask = (index) => {
        setNewTask({ ...newTask, subtasks: newTask.subtasks.filter((_, i) => i !== index) });
    };

    const startEdit = (task) => {
        setNewTask({
            title: task.title,
            description: task.description,
            category: task.category,
            priority: task.priority,
            dueDate: task.dueDate,
            dueTime: task.dueTime,
            tags: task.tags,
            subtasks: task.subtasks.map(st => st.text || st),
            recurring: task.recurring,
            reminder: task.reminder
        });
        setEditingTask(task.id);
        setShowAddTask(true);
    };

    const filteredTasks = useMemo(() => {
        let filtered = tasks.filter(task => !task.archived);

        if (filterStatus !== 'all') {
            filtered = filtered.filter(task =>
                filterStatus === 'completed' ? task.completed : !task.completed
            );
        }

        if (filterCategory !== 'all') {
            filtered = filtered.filter(task => task.category === filterCategory);
        }

        if (filterPriority !== 'all') {
            filtered = filtered.filter(task => task.priority === filterPriority);
        }

        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        filtered.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'priority') {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else if (sortBy === 'dueDate') {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (sortBy === 'name') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

        return filtered;
    }, [tasks, filterStatus, filterCategory, filterPriority, searchTerm, sortBy]);

    const stats = useMemo(() => {
        const total = tasks.filter(t => !t.archived).length;
        const completed = tasks.filter(t => t.completed && !t.archived).length;
        const active = total - completed;
        const archived = tasks.filter(t => t.archived).length;
        const overdue = tasks.filter(t => !t.completed && !t.archived && t.dueDate && new Date(t.dueDate) < new Date()).length;

        const byCategory = categories.reduce((acc, cat) => {
            acc[cat] = tasks.filter(t => t.category === cat && !t.archived).length;
            return acc;
        }, {});

        const byPriority = {
            high: tasks.filter(t => t.priority === 'high' && !t.archived).length,
            medium: tasks.filter(t => t.priority === 'medium' && !t.archived).length,
            low: tasks.filter(t => t.priority === 'low' && !t.archived).length
        };

        return { total, completed, active, archived, overdue, byCategory, byPriority };
    }, [tasks, categories]);

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const getPriorityBg = (priority) => {
        switch(priority) {
            case 'high': return 'rgba(239, 68, 68, 0.1)';
            case 'medium': return 'rgba(245, 158, 11, 0.1)';
            case 'low': return 'rgba(16, 185, 129, 0.1)';
            default: return 'rgba(107, 114, 128, 0.1)';
        }
    };

    const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .app-container.dark {
      background: #111827;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      margin-bottom: 2rem;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .app-title h1 {
      font-size: 2rem;
      color: white;
      margin-bottom: 0.25rem;
    }

    .app-title p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.9rem;
    }

    .dark .app-title h1,
    .dark .app-title p {
      color: #f3f4f6;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
    }

    .icon-btn {
      width: 40px;
      height: 40px;
      border: none;
      background: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .icon-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .dark .icon-btn {
      background: #1f2937;
      color: #f3f4f6;
    }

    .stats-dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .stat-card {
      background: white;
      padding: 1.25rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .dark .stat-card {
      background: #1f2937;
      color: #f3f4f6;
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .dark .stat-label {
      color: #9ca3af;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1f2937;
    }

    .dark .stat-value {
      color: #f3f4f6;
    }

    .search-filters {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .dark .search-filters {
      background: #1f2937;
    }

    .search-filters-content {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .search-input-wrapper {
      flex: 1;
      min-width: 300px;
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
    }

    .search-input {
      width: 100%;
      padding: 0.625rem 0.875rem 0.625rem 2.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.875rem;
      background: #f9fafb;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .dark .search-input {
      background: #111827;
      border-color: #374151;
      color: #f3f4f6;
    }

    .filter-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .filter-select {
      padding: 0.625rem 0.875rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #f9fafb;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .dark .filter-select {
      background: #111827;
      border-color: #374151;
      color: #f3f4f6;
    }

    .add-task-btn {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .add-task-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .main-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .main-content.with-details {
      grid-template-columns: 2fr 1fr;
    }

    .tasks-section {
      min-height: 400px;
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .task-card {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .task-card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .task-card.completed {
      opacity: 0.75;
    }

    .task-card.selected {
      box-shadow: 0 0 0 2px #3b82f6;
    }

    .dark .task-card {
      background: #1f2937;
      color: #f3f4f6;
    }

    .task-card-content {
      display: flex;
      gap: 0.75rem;
    }

    .task-checkbox {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .checkbox-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .task-main {
      flex: 1;
    }

    .task-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .task-title.completed {
      text-decoration: line-through;
      color: #6b7280;
    }

    .dark .task-title {
      color: #f3f4f6;
    }

    .task-description {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .dark .task-description {
      color: #9ca3af;
    }

    .task-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }

    .task-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .priority-badge {
      color: white;
    }

    .category-badge {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    .dark .category-badge {
      background: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
    }

    .tag-badge {
      background: rgba(139, 92, 246, 0.1);
      color: #8b5cf6;
    }

    .dark .tag-badge {
      background: rgba(139, 92, 246, 0.2);
      color: #a78bfa;
    }

    .date-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #6b7280;
      font-size: 0.75rem;
    }

    .dark .date-badge {
      color: #9ca3af;
    }

    .task-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      padding: 0.25rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .action-btn:hover {
      background: #f3f4f6;
      color: #1f2937;
    }

    .dark .action-btn:hover {
      background: #374151;
      color: #f3f4f6;
    }

    .action-btn.delete {
      color: #ef4444;
    }

    .grid-task-card {
      position: relative;
      overflow: hidden;
    }

    .grid-task-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }

    .grid-task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
    }

    .grid-task-body {
      margin-bottom: 0.75rem;
    }

    .grid-task-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 0.5rem;
    }

    .dark .progress-bar {
      background: #374151;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      transition: width 0.3s ease;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
    }

    .empty-icon {
      width: 64px;
      height: 64px;
      background: #f3f4f6;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .dark .empty-icon {
      background: #1f2937;
    }

    .empty-title {
      color: #6b7280;
      margin-bottom: 0.5rem;
    }

    .dark .empty-title {
      color: #9ca3af;
    }

    .empty-subtitle {
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .dark .empty-subtitle {
      color: #6b7280;
    }

    .details-panel {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 2rem;
      max-height: calc(100vh - 4rem);
      overflow-y: auto;
    }

    .dark .details-panel {
      background: #1f2937;
    }

    .details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .details-title {
      font-size: 1.25rem;
      font-weight: bold;
      color: #1f2937;
    }

    .dark .details-title {
      color: #f3f4f6;
    }

    .details-content {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .details-section {
      padding-bottom: 1.25rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .dark .details-section {
      border-color: #374151;
    }

    .details-section:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .detail-item label {
      display: block;
      color: #6b7280;
      font-size: 0.75rem;
      margin-bottom: 0.25rem;
    }

    .dark .detail-item label {
      color: #9ca3af;
    }

    .subtasks-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .subtask-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .subtask-text {
      font-size: 0.875rem;
      color: #4b5563;
    }

    .subtask-text.completed {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .dark .subtask-text {
      color: #d1d5db;
    }

    .details-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .details-btn {
      flex: 1;
      padding: 0.5rem 0.75rem;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-complete {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    .btn-complete:hover {
      background: rgba(16, 185, 129, 0.2);
    }

    .btn-active {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
    }

    .btn-active:hover {
      background: rgba(245, 158, 11, 0.2);
    }

    .btn-edit {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    .btn-edit:hover {
      background: rgba(59, 130, 246, 0.2);
    }

    .btn-delete {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .btn-delete:hover {
      background: rgba(239, 68, 68, 0.2);
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 50;
      animation: fadeIn 0.2s ease;
    }

    .modal {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      max-width: 640px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dark .modal {
      background: #1f2937;
    }

    .modal-content {
      padding: 1.5rem;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1f2937;
    }

    .dark .modal-title {
      color: #f3f4f6;
    }

    .close-btn {
      padding: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .close-btn:hover {
      background: #f3f4f6;
    }

    .dark .close-btn:hover {
      background: #374151;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      color: #4b5563;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .dark .form-label {
      color: #d1d5db;
    }

    .form-input,
    .form-textarea,
    .form-select {
      width: 100%;
      padding: 0.625rem 0.875rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.875rem;
      background: #f9fafb;
      transition: all 0.2s ease;
    }

    .form-input:focus,
    .form-textarea:focus,
    .form-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .dark .form-input,
    .dark .form-textarea,
    .dark .form-select {
      background: #111827;
      border-color: #374151;
      color: #f3f4f6;
    }

    .form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .input-group {
      display: flex;
      gap: 0.5rem;
    }

    .input-group input {
      flex: 1;
    }

    .btn-primary {
      padding: 0.5rem 1rem;
      background: #8b5cf6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary:hover {
      background: #7c3aed;
    }

    .btn-secondary {
      padding: 0.5rem 1rem;
      background: #e5e7eb;
      color: #4b5563;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover {
      background: #d1d5db;
    }

    .dark .btn-secondary {
      background: #374151;
      color: #d1d5db;
    }

    .dark .btn-secondary:hover {
      background: #4b5563;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .tag-item {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.375rem 0.75rem;
      background: rgba(139, 92, 246, 0.1);
      color: #8b5cf6;
      border-radius: 9999px;
      font-size: 0.875rem;
    }

    .dark .tag-item {
      background: rgba(139, 92, 246, 0.2);
      color: #a78bfa;
    }

    .tag-remove {
      background: none;
      border: none;
      cursor: pointer;
      color: #8b5cf6;
      padding: 0;
      display: flex;
    }

    .tag-remove:hover {
      color: #7c3aed;
    }

    .subtasks-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .subtask-item-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: #f9fafb;
      border-radius: 8px;
    }

    .dark .subtask-item-form {
      background: #111827;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .checkbox-input {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }

    .modal-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .dark .modal-actions {
      border-color: #374151;
    }

    .btn-submit {
      flex: 1;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-submit:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn-cancel {
      padding: 0.75rem 1.5rem;
      background: #e5e7eb;
      color: #4b5563;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover {
      background: #d1d5db;
    }

    .dark .btn-cancel {
      background: #374151;
      color: #d1d5db;
    }

    .dark .btn-cancel:hover {
      background: #4b5563;
    }

    @media (max-width: 1024px) {
      .main-content.with-details {
        grid-template-columns: 1fr;
      }

      .details-panel {
        position: static;
        max-height: none;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .header-top {
        flex-direction: column;
        gap: 1rem;
      }

      .search-filters-content {
        flex-direction: column;
      }

      .search-input-wrapper {
        min-width: 100%;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .tasks-grid {
        grid-template-columns: 1fr;
      }

      .stats-dashboard {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .app-title h1 {
        font-size: 1.5rem;
      }

      .stats-dashboard {
        grid-template-columns: 1fr;
      }

      .modal-content {
        padding: 1rem;
      }
    }
  `;

    return (
        <>
            <style>{styles}</style>
            <div className={`app-container ${darkMode ? 'dark' : ''}`}>
                <div className="container">
                    <div className="header">
                        <div className="header-top">
                            <div className="logo-section">
                                <div className="logo">
                                    <CheckCircle2 size={30} color="white" />
                                </div>
                                <div className="app-title">
                                    <h1>TaskMaster Pro</h1>
                                    <p>Organize your life, achieve your goals</p>
                                </div>
                            </div>
                            <div className="header-actions">
                                <button onClick={() => setShowStats(!showStats)} className="icon-btn">
                                    <BarChart3 size={20} />
                                </button>
                                <button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')} className="icon-btn">
                                    {viewMode === 'list' ? <Grid3x3 size={20} /> : <List size={20} />}
                                </button>
                                <button onClick={() => setDarkMode(!darkMode)} className="icon-btn">
                                    {darkMode ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} />}
                                </button>
                            </div>
                        </div>

                        {showStats && (
                            <div className="stats-dashboard">
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <span className="stat-label">Total Tasks</span>
                                        <Layout size={16} color="#3b82f6" />
                                    </div>
                                    <div className="stat-value">{stats.total}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <span className="stat-label">Active</span>
                                        <Circle size={16} color="#f59e0b" />
                                    </div>
                                    <div className="stat-value">{stats.active}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <span className="stat-label">Completed</span>
                                        <CheckCircle2 size={16} color="#10b981" />
                                    </div>
                                    <div className="stat-value">{stats.completed}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <span className="stat-label">Overdue</span>
                                        <AlertCircle size={16} color="#ef4444" />
                                    </div>
                                    <div className="stat-value">{stats.overdue}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <span className="stat-label">Archived</span>
                                        <Archive size={16} color="#6b7280" />
                                    </div>
                                    <div className="stat-value">{stats.archived}</div>
                                </div>
                            </div>
                        )}

                        <div className="search-filters">
                            <div className="search-filters-content">
                                <div className="search-input-wrapper">
                                    <Search size={18} className="search-icon" />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search tasks, tags, descriptions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="filter-group">
                                    <select
                                        className="filter-select"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <select
                                        className="filter-select"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="filter-select"
                                        value={filterPriority}
                                        onChange={(e) => setFilterPriority(e.target.value)}
                                    >
                                        <option value="all">All Priorities</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                    <select
                                        className="filter-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="date">Sort by Date</option>
                                        <option value="priority">Sort by Priority</option>
                                        <option value="dueDate">Sort by Due Date</option>
                                        <option value="name">Sort by Name</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setShowAddTask(true)} className="add-task-btn">
                            <Plus size={20} />
                            <span>Add New Task</span>
                        </button>
                    </div>

                    <div className={`main-content ${selectedTask ? 'with-details' : ''}`}>
                        <div className="tasks-section">
                            {viewMode === 'list' ? (
                                <div className="tasks-list">
                                    {filteredTasks.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={() => setSelectedTask(task)}
                                            className={`task-card ${task.completed ? 'completed' : ''} ${selectedTask?.id === task.id ? 'selected' : ''}`}
                                        >
                                            <div className="task-card-content">
                                                <div className="task-checkbox">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleTask(task.id);
                                                        }}
                                                        className="checkbox-btn"
                                                    >
                                                        {task.completed ? (
                                                            <CheckCircle2 size={20} color="#10b981" />
                                                        ) : (
                                                            <Circle size={20} color="#9ca3af" />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="task-main">
                                                    <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                                                        {task.title}
                                                    </h3>
                                                    {task.description && (
                                                        <p className="task-description">{task.description}</p>
                                                    )}
                                                    <div className="task-meta">
                            <span
                                className="task-badge priority-badge"
                                style={{
                                    backgroundColor: getPriorityBg(task.priority),
                                    color: getPriorityColor(task.priority)
                                }}
                            >
                              {task.priority}
                            </span>
                                                        <span className="task-badge category-badge">
                              {task.category}
                            </span>
                                                        {task.dueDate && (
                                                            <span className="date-badge">
                                <Calendar size={12} />
                                                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                                                        )}
                                                        {task.tags.map(tag => (
                                                            <span key={tag} className="task-badge tag-badge">
                                #{tag}
                              </span>
                                                        ))}
                                                        {task.subtasks.length > 0 && (
                                                            <span className="date-badge">
                                {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
                              </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="task-actions">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            startEdit(task);
                                                        }}
                                                        className="action-btn"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            archiveTask(task.id);
                                                        }}
                                                        className="action-btn"
                                                    >
                                                        <Archive size={16} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteTask(task.id);
                                                        }}
                                                        className="action-btn delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="tasks-grid">
                                    {filteredTasks.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={() => setSelectedTask(task)}
                                            className={`task-card grid-task-card ${task.completed ? 'completed' : ''} ${selectedTask?.id === task.id ? 'selected' : ''}`}
                                            style={{ borderTop: `4px solid ${getPriorityColor(task.priority)}` }}
                                        >
                                            <div className="grid-task-header">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleTask(task.id);
                                                    }}
                                                    className="checkbox-btn"
                                                >
                                                    {task.completed ? (
                                                        <CheckCircle2 size={20} color="#10b981" />
                                                    ) : (
                                                        <Circle size={20} color="#9ca3af" />
                                                    )}
                                                </button>
                                                <div className="task-actions">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            startEdit(task);
                                                        }}
                                                        className="action-btn"
                                                    >
                                                        <Edit3 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteTask(task.id);
                                                        }}
                                                        className="action-btn delete"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid-task-body">
                                                <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                                                    {task.title}
                                                </h3>
                                                {task.description && (
                                                    <p className="task-description">{task.description}</p>
                                                )}
                                            </div>
                                            <div className="grid-task-footer">
                        <span className="task-badge category-badge">
                          {task.category}
                        </span>
                                                {task.dueDate && (
                                                    <span className="date-badge">
                            <Calendar size={12} />
                                                        {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                                                )}
                                            </div>
                                            {task.subtasks.length > 0 && (
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{ width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {filteredTasks.length === 0 && (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <CheckCircle2 size={32} color="#9ca3af" />
                                    </div>
                                    <p className="empty-title">No tasks found</p>
                                    <p className="empty-subtitle">Create your first task to get started</p>
                                </div>
                            )}
                        </div>

                        {selectedTask && (
                            <div className="details-panel">
                                <div className="details-header">
                                    <h2 className="details-title">Task Details</h2>
                                    <button onClick={() => setSelectedTask(null)} className="close-btn">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="details-content">
                                    <div className="details-section">
                                        <h3 className={`task-title ${selectedTask.completed ? 'completed' : ''}`}>
                                            {selectedTask.title}
                                        </h3>
                                        {selectedTask.description && (
                                            <p className="task-description">{selectedTask.description}</p>
                                        )}
                                    </div>

                                    <div className="details-section">
                                        <div className="details-grid">
                                            <div className="detail-item">
                                                <label>Priority</label>
                                                <span
                                                    className="task-badge priority-badge"
                                                    style={{
                                                        backgroundColor: getPriorityBg(selectedTask.priority),
                                                        color: getPriorityColor(selectedTask.priority)
                                                    }}
                                                >
                          {selectedTask.priority}
                        </span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Category</label>
                                                <span className="task-badge category-badge">
                          {selectedTask.category}
                        </span>
                                            </div>
                                            {selectedTask.dueDate && (
                                                <div className="detail-item">
                                                    <label>Due Date</label>
                                                    <span className="date-badge">
                            <Calendar size={14} />
                                                        {new Date(selectedTask.dueDate).toLocaleDateString()}
                          </span>
                                                </div>
                                            )}
                                            {selectedTask.dueTime && (
                                                <div className="detail-item">
                                                    <label>Due Time</label>
                                                    <span className="date-badge">
                            <Clock size={14} />
                                                        {selectedTask.dueTime}
                          </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {selectedTask.tags.length > 0 && (
                                        <div className="details-section">
                                            <label>Tags</label>
                                            <div className="tags-container">
                                                {selectedTask.tags.map(tag => (
                                                    <span key={tag} className="task-badge tag-badge">
                            #{tag}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedTask.subtasks.length > 0 && (
                                        <div className="details-section">
                                            <label>Subtasks</label>
                                            <div className="subtasks-list">
                                                {selectedTask.subtasks.map(subtask => (
                                                    <div key={subtask.id} className="subtask-item">
                                                        <button
                                                            onClick={() => toggleSubtask(selectedTask.id, subtask.id)}
                                                            className="checkbox-btn"
                                                        >
                                                            {subtask.completed ? (
                                                                <CheckCircle2 size={16} color="#10b981" />
                                                            ) : (
                                                                <Circle size={16} color="#9ca3af" />
                                                            )}
                                                        </button>
                                                        <span className={`subtask-text ${subtask.completed ? 'completed' : ''}`}>
                              {subtask.text}
                            </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="details-section">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280' }}>
                                            <span>Created: {new Date(selectedTask.createdAt).toLocaleDateString()}</span>
                                            {selectedTask.completedAt && (
                                                <span>Completed: {new Date(selectedTask.completedAt).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="details-actions">
                                        <button
                                            onClick={() => toggleTask(selectedTask.id)}
                                            className={`details-btn ${selectedTask.completed ? 'btn-active' : 'btn-complete'}`}
                                        >
                                            {selectedTask.completed ? 'Mark Active' : 'Mark Complete'}
                                        </button>
                                        <button onClick={() => startEdit(selectedTask)} className="details-btn btn-edit">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                deleteTask(selectedTask.id);
                                                setSelectedTask(null);
                                            }}
                                            className="details-btn btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {showAddTask && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title">
                                            {editingTask ? 'Edit Task' : 'Create New Task'}
                                        </h2>
                                        <button
                                            onClick={() => {
                                                resetForm();
                                                setShowAddTask(false);
                                            }}
                                            className="close-btn"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Title *</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                            placeholder="Enter task title..."
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-textarea"
                                            value={newTask.description}
                                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                            placeholder="Add task description..."
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Category</label>
                                            <select
                                                className="form-select"
                                                value={newTask.category}
                                                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Priority</label>
                                            <select
                                                className="form-select"
                                                value={newTask.priority}
                                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Due Date</label>
                                            <input
                                                type="date"
                                                className="form-input"
                                                value={newTask.dueDate}
                                                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Due Time</label>
                                            <input
                                                type="time"
                                                className="form-input"
                                                value={newTask.dueTime}
                                                onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Tags</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                                placeholder="Add a tag..."
                                            />
                                            <button onClick={addTag} className="btn-primary">
                                                Add
                                            </button>
                                        </div>
                                        {newTask.tags.length > 0 && (
                                            <div className="tags-container">
                                                {newTask.tags.map(tag => (
                                                    <span key={tag} className="tag-item">
                            #{tag}
                                                        <button onClick={() => removeTag(tag)} className="tag-remove">
                              <X size={14} />
                            </button>
                          </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Subtasks</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={subtaskInput}
                                                onChange={(e) => setSubtaskInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                                                placeholder="Add a subtask..."
                                            />
                                            <button onClick={addSubtask} className="btn-primary">
                                                Add
                                            </button>
                                        </div>
                                        {newTask.subtasks.length > 0 && (
                                            <div className="subtasks-container">
                                                {newTask.subtasks.map((subtask, index) => (
                                                    <div key={index} className="subtask-item-form">
                                                        <span>{subtask}</span>
                                                        <button onClick={() => removeSubtask(index)} className="action-btn delete">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Recurring</label>
                                            <select
                                                className="form-select"
                                                value={newTask.recurring}
                                                onChange={(e) => setNewTask({ ...newTask, recurring: e.target.value })}
                                            >
                                                <option value="none">None</option>
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox-group">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox-input"
                                                    id="reminder"
                                                    checked={newTask.reminder}
                                                    onChange={(e) => setNewTask({ ...newTask, reminder: e.target.checked })}
                                                />
                                                <label htmlFor="reminder" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    Set Reminder
                                                    <Bell size={16} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-actions">
                                        <button onClick={editingTask ? updateTask : addTask} className="btn-submit">
                                            {editingTask ? 'Update Task' : 'Create Task'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                resetForm();
                                                setShowAddTask(false);
                                            }}
                                            className="btn-cancel"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default App;