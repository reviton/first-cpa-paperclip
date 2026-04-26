import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { claudeSkills as skills, skillCategories as categories, categoryColors } from '../data/claudeSkills';

const INITIAL_VISIBLE = 60;

const TasksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Sync search → URL ?q= so links from AgentDetailPage deep-link straight to a skill
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    if (q !== search) setSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setVisibleCount(INITIAL_VISIBLE);
    if (value) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const filtered = useMemo(() => {
    let result = skills;
    if (activeCategory !== 'all') {
      result = result.filter(s => s.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.command.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: skills.length };
    skills.forEach(s => { c[s.category] = (c[s.category] || 0) + 1; });
    return c;
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>⚡ קטלוג סקילים</h2>
        <span style={{ color: 'var(--text2)', fontSize: 14 }}>{filtered.length} מתוך {skills.length} סקילים</span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="🔍 חיפוש סקיל לפי שם, פקודה או תיאור..."
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none',
            direction: 'rtl',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Category Chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', maxHeight: 80, overflowY: 'auto' }}>
        {categories.map(cat => (
          <button
            type="button"
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setVisibleCount(INITIAL_VISIBLE); }}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: activeCategory === cat.id ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: activeCategory === cat.id ? 'var(--accent)' : 'white',
              color: activeCategory === cat.id ? 'white' : 'var(--text2)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: activeCategory === cat.id ? 600 : 400,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.15s ease',
            }}
          >
            {cat.icon} {cat.label}
            <span style={{
              background: activeCategory === cat.id ? 'rgba(255,255,255,0.3)' : '#f1f5f9',
              padding: '1px 6px',
              borderRadius: 10,
              fontSize: 11,
              marginRight: 2,
            }}>
              {counts[cat.id] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {filtered.slice(0, visibleCount).map(skill => (
          <div
            key={skill.command}
            className="card"
            onClick={() => setExpandedSkill(expandedSkill === skill.command ? null : skill.command)}
            style={{
              cursor: 'pointer',
              borderRight: `3px solid ${categoryColors[skill.category] || '#94a3b8'}`,
              transition: 'box-shadow 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <strong style={{ fontSize: 15 }}>{skill.name}</strong>
              <span style={{
                background: categoryColors[skill.category] || '#94a3b8',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 10,
                fontSize: 11,
                whiteSpace: 'nowrap',
              }}>
                {categories.find(c => c.id === skill.category)?.label}
              </span>
            </div>
            <code style={{
              display: 'inline-block',
              background: '#f1f5f9',
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: 13,
              color: '#0f172a',
              marginBottom: 6,
              direction: 'ltr',
              fontFamily: 'monospace',
            }}>
              {skill.command}
            </code>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
              {skill.description}
            </p>
            {expandedSkill === skill.command && (
              <div style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px solid var(--border)',
                fontSize: 12,
                color: 'var(--text2)',
              }}>
                <strong>שימוש:</strong> הקלד <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>{skill.command}</code> בכל שיחה עם Claude Code
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length > visibleCount && (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <button
            type="button"
            onClick={() => setVisibleCount(prev => prev + INITIAL_VISIBLE)}
            style={{
              padding: '10px 32px',
              border: '1px solid var(--accent)',
              borderRadius: 8,
              background: 'white',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            הצג עוד ({filtered.length - visibleCount} נוספים)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text2)' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <p>לא נמצאו סקילים מתאימים</p>
          <button
            onClick={() => { handleSearchChange(''); setActiveCategory('all'); }}
            style={{
              padding: '8px 20px',
              border: '1px solid var(--accent)',
              borderRadius: 6,
              background: 'white',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            נקה חיפוש
          </button>
        </div>
      )}
    </>
  );
};

export default TasksPage;
