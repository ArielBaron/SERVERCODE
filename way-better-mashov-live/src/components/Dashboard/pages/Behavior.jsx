import React from 'react';
import PageLayout from '../PageLayout';
import './BehaviorTable.css';

const Behavior = () => { 
  const data = JSON.parse(localStorage.getItem('tables'));
  const behaviorData = data?.behavior || [];

  return (
    <PageLayout title="הערות התנהגות">
      {behaviorData.length === 0 ? (
        <p>אין הערות התנהגות</p>
      ) : (
        <div className="table-container">
          <table className="behavior-table">
            <thead>
              <tr>
                <th>תאריך</th>
                <th>מקצוע</th>
                <th>מורה</th>
                <th>אירוע</th>
                <th>נימוק</th>
                <th>שעה</th>
              </tr>
            </thead>
            <tbody>
              {behaviorData.map((item, index) => (
                <tr key={index} className={item.event === "חיסור" ? "absence" : ""}>
                  <td>{item.date}</td>
                  <td>{item.subject}</td>
                  <td>{item.reporter}</td>
                  <td className="event-cell">{item.event}</td>
                  <td>{item.justification}</td>
                  <td>{item.lessonHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageLayout>
  );
};

export default Behavior;