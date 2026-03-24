import React, { useState, useMemo } from 'react';
import PageLayout from '../PageLayout';
import './Grades.css';

const Grades = () => {
  const data = JSON.parse(localStorage.getItem('tables')) || {};
  const { regularGrades = [], bagrutGrades = [] } = data;

  const [sortOption, setSortOption] = useState('');
  const [showBagrut, setShowBagrut] = useState(false);

  // Combine grades based on checkbox
  const combinedGrades = useMemo(() => {
    const regular = regularGrades.map(g => ({
      subject: g.subject,
      teacher: g.teacher,
      date: g.date,
      type: g.type,
      grade: g.grade,
      title: g.title,
    }));

    const bagrut = showBagrut
      ? bagrutGrades.map(g => ({
          category: 'בגרות',
          subject: g.title,
          teacher: '-',
          date: g.dateCode,
          type: 'בגרות',
          grade: g.finalGrade ?? '-',
          yearlyGrade: g.yearlyGrade ?? '-',
          title: g.title,
        }))
      : [];

    return [...regular, ...bagrut];
  }, [regularGrades, bagrutGrades, showBagrut]);

  // Sorting
  const sortedGrades = useMemo(() => {
    const gradesCopy = [...combinedGrades];
    switch (sortOption) {
      case 'subject':
        gradesCopy.sort((a, b) => a.subject.localeCompare(b.subject));
        break;
      case 'grade':
        gradesCopy.sort((a, b) => (b.grade || 0) - (a.grade || 0));
        break;
      case 'date':
        gradesCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    return gradesCopy;
  }, [sortOption, combinedGrades]);

  return (
    <PageLayout title="לוח ציונים">
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <label htmlFor="sort">מיין לפי: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">-- ללא מיון --</option>
          <option value="subject">נושא</option>
          <option value="grade">ציון</option>
          <option value="date">תאריך</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={showBagrut}
            onChange={(e) => setShowBagrut(e.target.checked)}
          />
          {' '}הצג בגרויות
        </label>
      </div>

      <div className="table-container">
        {sortedGrades.length === 0 ? (
          <p>אין ציונים</p>
        ) : (
          <table className="grades-table">
            <thead>
              <tr>
                {showBagrut && <th>קטגוריה</th>}
                <th>נושא</th>
                <th>שם הבוחן/מבחן</th>
                <th>מורה</th>
                <th>תאריך / סמסטר</th>
                <th>סוג</th>
                {showBagrut && <th>ציון שנתי</th>}
                <th>ציון</th>
              </tr>
            </thead>
            <tbody>
              {sortedGrades.map((grade, idx) => (
                <tr key={idx}>
                  {showBagrut && <td>{grade.category}</td>}
                  <td>{grade.subject}</td>
                  <td>{grade.title}</td>
                  <td>{grade.teacher}</td>
                  <td>{grade.date}</td>
                  <td>{grade.type}</td>
                  {showBagrut && <td>{grade.yearlyGrade ?? '-'}</td>}
                  <td>{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageLayout>
  );
};

export default Grades;
