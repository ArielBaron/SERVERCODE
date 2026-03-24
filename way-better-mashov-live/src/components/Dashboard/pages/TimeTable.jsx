import React from 'react';
import PageLayout from '../PageLayout';
import './TimeTable.css';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];

const TimeTable = () => {
  const data = JSON.parse(localStorage.getItem('tables')) || {};
  const timetable = data.timetable || {};
  const { subjectTable = [], timeList = [] } = timetable;

  if (!subjectTable.length) return (
    <PageLayout title="מערכת שעות">
      <p>אין מערכת שעות</p>
    </PageLayout>
  );

  return (
    <PageLayout title="מערכת שעות">
      <div className="timetable-grid-container">
        <table className="timetable-grid">
          <thead>
            <tr>
              <th>שעה/יום</th>
              {days.slice().reverse().map((day, i) => (
                <th key={i}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeList.map((time, timeIndex) => (
              <tr key={timeIndex}>
                <td className="time-cell">{time}</td>
                {days.slice().reverse().map((_, dayIndex) => {
                  const lesson = subjectTable[days.length - 1 - dayIndex]?.[timeIndex];
                  return (
                    <td key={dayIndex} className="lesson-cell">
                      {lesson?.subject ? (
                        <>
                          <strong>{lesson.subject}</strong>
                          <br />
                          {lesson.teacher}
                          <br />
                          {lesson.class}
                        </>
                      ) : (
                        <span className="free-period">פנוי</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
};

export default TimeTable;
