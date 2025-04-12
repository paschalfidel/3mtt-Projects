import React from 'react';
import '../styles/listStyles.css';

const ListComponent = ({ 
  items, 
  renderItem, 
  emptyMessage = "No items to display",
  listClassName = "",
  itemClassName = ""
}) => {
  if (!items || items.length === 0) {
    return <div className="empty-message">{emptyMessage}</div>;
  }

  return (
    <ul className={`list ${listClassName}`}>
      {items.map((item, index) => (
        <li key={index} className={`list-item ${itemClassName}`}>
          {renderItem ? renderItem(item) : item.toString()}
        </li>
      ))}
    </ul>
  );
};

export default ListComponent;